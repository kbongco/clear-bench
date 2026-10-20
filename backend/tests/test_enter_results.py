import pytest

import models


@pytest.fixture
def setup_sample(db, sample_data):
    """An in-progress Food sample with pH (numeric) and visual (pass/fail) at 25C and 40C."""
    db.add_all(
        [
            models.ProductSpec(
                sample_type="Food",
                test_type="ph",
                parameter_name="pH",
                kind="numeric",
                unit="pH",
                min_value=4,
                max_value=7,
            ),
            models.ProductSpec(
                sample_type="Food",
                test_type="visual",
                parameter_name="Appearance",
                kind="pass_fail",
            ),
        ]
    )
    sample = models.Sample(
        name="Test yogurt",
        scientist_id=1,
        sample_type="Food",
        test_types=["ph", "visual"],
        temperature=["25C", "40C"],
        test_status="in_progress",
    )
    db.add(sample)
    db.commit()
    lab_tech = db.query(models.LabTech).first()
    return {"sample": sample, "lab_tech": lab_tech}


def valid_payload(lab_tech_id):
    """Every cell in spec: pH 5 and 6, appearance passes at both conditions."""
    return {
        "lab_tech_id": lab_tech_id,
        "test_method": "Internal SOP",
        "values": [
            {"test_type": "ph", "condition": "25C", "measured_value": 5},
            {"test_type": "ph", "condition": "40C", "measured_value": 6},
            {"test_type": "visual", "condition": "25C", "passed": True},
            {"test_type": "visual", "condition": "40C", "passed": True},
        ],
    }


def post_results(client, sample_id, payload):
    return client.post(f"/samples/{sample_id}/results", json=payload)


def result_counts(db, sample_id):
    """How many Result and TestResult rows exist for this sample."""
    results = db.query(models.Result).filter(models.Result.sample_id == sample_id).count()
    test_results = (
        db.query(models.TestResult)
        .join(models.Result)
        .filter(models.Result.sample_id == sample_id)
        .count()
    )
    return results, test_results


def test_all_cells_in_spec_pass(client, db, setup_sample):
    sample = setup_sample["sample"]
    response = post_results(client, sample.id, valid_payload(setup_sample["lab_tech"].id))

    assert response.status_code == 200
    data = response.json()
    assert data["test_status"] == "completed"
    assert data["out_of_spec"] is False

    result = db.query(models.Result).filter(models.Result.sample_id == sample.id).one()
    assert result.overall_status == "pass"
    assert result.is_out_of_spec is False
    assert result.test_method == "Internal SOP"
    assert result_counts(db, sample.id) == (1, 4)


def test_one_cell_out_of_spec_at_40c_fails(client, db, setup_sample):
    sample = setup_sample["sample"]
    payload = valid_payload(setup_sample["lab_tech"].id)
    payload["values"][1]["measured_value"] = 8  # pH at 40C, limit is 7

    response = post_results(client, sample.id, payload)

    assert response.status_code == 200
    data = response.json()
    assert data["out_of_spec"] is True
    assert data["events"][0]["action"] == "results_entered"
    assert data["events"][0]["note"] == "3 of 4 in spec"

    result = db.query(models.Result).filter(models.Result.sample_id == sample.id).one()
    assert result.overall_status == "fail"

    ph_40 = (
        db.query(models.TestResult)
        .filter(models.TestResult.test_type == "ph", models.TestResult.condition == "40C")
        .one()
    )
    assert ph_40.is_within_spec is False
    assert ph_40.measured_value == 8
    assert ph_40.expected_range_min == 4
    assert ph_40.expected_range_max == 7


def test_pass_fail_rows_are_saved(client, db, setup_sample):
    sample = setup_sample["sample"]
    payload = valid_payload(setup_sample["lab_tech"].id)
    payload["values"][3]["passed"] = False  # appearance fails at 40C

    response = post_results(client, sample.id, payload)

    assert response.status_code == 200
    visual_40 = (
        db.query(models.TestResult)
        .filter(models.TestResult.test_type == "visual", models.TestResult.condition == "40C")
        .one()
    )
    assert visual_40.passed is False
    assert visual_40.is_within_spec is False
    assert visual_40.measured_value is None


@pytest.mark.parametrize(
    ("sample_state", "tech_exists", "expected_status", "message"),
    [
        ("in_progress", False, 404, "Lab tech not found"),
        ("pending", True, 400, "in progress"),
        ("completed", True, 400, "in progress"),
    ],
)
def test_400_and_404_errors(
    client, db, setup_sample, sample_state, tech_exists, expected_status, message
):
    sample = setup_sample["sample"]
    sample.test_status = sample_state
    db.commit()
    lab_tech_id = setup_sample["lab_tech"].id if tech_exists else 999

    response = post_results(client, sample.id, valid_payload(lab_tech_id))

    assert response.status_code == expected_status
    assert message.lower() in response.json()["detail"].lower()
    assert result_counts(db, sample.id) == (0, 0)


def test_sample_not_found_returns_404(client, setup_sample):
    response = post_results(client, 999, valid_payload(setup_sample["lab_tech"].id))

    assert response.status_code == 404
    assert response.json()["detail"] == "Sample not found"


def test_no_storage_conditions_returns_400(client, db, setup_sample):
    sample = setup_sample["sample"]
    sample.temperature = []
    db.commit()

    response = post_results(client, sample.id, valid_payload(setup_sample["lab_tech"].id))

    assert response.status_code == 400
    assert "storage conditions" in response.json()["detail"]
    assert result_counts(db, sample.id) == (0, 0)


def test_missing_spec_returns_400(client, db, setup_sample):
    sample = setup_sample["sample"]
    sample.test_types = ["ph", "microbial"]
    db.commit()

    response = post_results(client, sample.id, valid_payload(setup_sample["lab_tech"].id))

    assert response.status_code == 400
    assert response.json()["detail"] == "No spec for Food: microbial"
    assert result_counts(db, sample.id) == (0, 0)


@pytest.mark.parametrize(
    ("mutate", "message"),
    [
        (lambda p: p["values"].pop(), "Missing:"),
        (lambda p: p["values"].append(dict(p["values"][0])), "only be entered once"),
        (
            lambda p: p["values"].append(
                {"test_type": "ph", "condition": "30C", "measured_value": 5}
            ),
            "Extra:",
        ),
    ],
    ids=["missing-cell", "duplicate-cell", "extra-cell"],
)
def test_wrong_grid_returns_422(client, db, setup_sample, mutate, message):
    sample = setup_sample["sample"]
    payload = valid_payload(setup_sample["lab_tech"].id)
    mutate(payload)

    response = post_results(client, sample.id, payload)

    assert response.status_code == 422
    assert message in response.json()["detail"]
    assert result_counts(db, sample.id) == (0, 0)


def test_numeric_without_value_returns_422(client, db, setup_sample):
    sample = setup_sample["sample"]
    payload = valid_payload(setup_sample["lab_tech"].id)
    del payload["values"][0]["measured_value"]

    response = post_results(client, sample.id, payload)

    assert response.status_code == 422
    assert response.json()["detail"] == "pH needs a measured value"


def test_pass_fail_without_passed_returns_422(client, db, setup_sample):
    sample = setup_sample["sample"]
    payload = valid_payload(setup_sample["lab_tech"].id)
    del payload["values"][2]["passed"]

    response = post_results(client, sample.id, payload)

    assert response.status_code == 422
    assert "pass/fail" in response.json()["detail"]


def test_failed_request_changes_nothing(client, db, setup_sample):
    """The last cell fails in stage D, after every other cell was judged."""
    sample = setup_sample["sample"]
    payload = valid_payload(setup_sample["lab_tech"].id)
    del payload["values"][3]["passed"]

    response = post_results(client, sample.id, payload)

    assert response.status_code == 422
    assert result_counts(db, sample.id) == (0, 0)
    db.refresh(sample)
    assert sample.test_status == "in_progress"
    assert sample.events == []


def test_cannot_enter_results_twice(client, db, setup_sample):
    sample = setup_sample["sample"]
    payload = valid_payload(setup_sample["lab_tech"].id)

    assert post_results(client, sample.id, payload).status_code == 200
    assert post_results(client, sample.id, payload).status_code == 400
    assert result_counts(db, sample.id) == (1, 4)
