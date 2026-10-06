import pytest

import models


@pytest.fixture
def sample_with_results(db, sample_data):
    """Yogurt (id 1) gets one result with two test values."""
    result = models.Result(sample_id=1, overall_status="completed", is_out_of_spec=False)
    db.add(result)
    db.flush()  # gives result an id, like alice.id in conftest

    db.add_all(
        [
            models.TestResult(
                result_id=result.id, parameter_name="pH", measured_value="6.8", unit="mg/L"
            ),
            models.TestResult(
                result_id=result.id,
                parameter_name="Concentration",
                measured_value=105.0,
                unit="mg/L",
            ),
        ]
    )
    db.commit()


def test_returns_sample_with_nested_results(client, sample_with_results):
    response = client.get("/samples/1")
    assert response.status_code == 200
    body = response.json()
    assert len(body["results"]) == 1
    assert len(body["results"][0]["test_results"]) == 2


def test_sample_without_results_returns_empty_list(client, sample_data):
    response = client.get("/samples/2")

    assert response.status_code == 200
    assert response.json()["results"] == []


def test_unknown_sample_returns_404(client, sample_data):
    response = client.get("/samples/9999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Sample not found"}
