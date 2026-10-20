import pytest
from sqlalchemy.exc import IntegrityError

import models


def test_get_all_specs(client, db):
    """All product specs are returned."""
    db.add_all(
        [
            models.ProductSpec(
                sample_type="Food",
                test_type="ph",
                parameter_name="pH",
                kind="numeric",
                min_value=6.0,
                max_value=8.0,
            ),
            models.ProductSpec(
                sample_type="Food",
                test_type="viscosity",
                parameter_name="Viscosity",
                kind="numeric",
                unit="cP",
                min_value=10.0,
                max_value=20.0,
            ),
            models.ProductSpec(
                sample_type="Cosmetics",
                test_type="ph",
                parameter_name="pH",
                kind="numeric",
                min_value=4.0,
                max_value=7.0,
            ),
        ]
    )
    db.commit()

    response = client.get("/specs")

    assert response.status_code == 200
    assert len(response.json()) == 3


def test_get_specs_filters_by_sample_type(client, db):
    """Only specs matching the requested sample type are returned."""
    db.add_all(
        [
            models.ProductSpec(
                sample_type="Food",
                test_type="ph",
                parameter_name="pH",
                kind="numeric",
                min_value=6.0,
                max_value=8.0,
            ),
            models.ProductSpec(
                sample_type="Food",
                test_type="viscosity",
                parameter_name="Viscosity",
                kind="numeric",
                unit="cP",
                min_value=10.0,
                max_value=20.0,
            ),
            models.ProductSpec(
                sample_type="Cosmetics",
                test_type="ph",
                parameter_name="pH",
                kind="numeric",
                min_value=4.0,
                max_value=7.0,
            ),
        ]
    )
    db.commit()

    response = client.get("/specs?sample_type=Food")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert all(spec["sample_type"] == "Food" for spec in data)


def test_get_specs_unknown_type_returns_empty_list(client, db):
    """An unknown sample type returns an empty list, not a 404."""
    response = client.get("/specs?sample_type=Unknown")

    assert response.status_code == 200
    assert response.json() == []


def test_product_spec_sample_type_test_type_unique_constraint(db):
    """Duplicate sample_type and test_type combinations are rejected."""
    db.add(
        models.ProductSpec(
            sample_type="Food",
            test_type="ph",
            parameter_name="pH",
            kind="numeric",
            min_value=6.0,
            max_value=8.0,
        )
    )
    db.commit()

    db.add(
        models.ProductSpec(
            sample_type="Food",
            test_type="ph",
            parameter_name="pH",
            kind="numeric",
            min_value=5.0,
            max_value=9.0,
        )
    )

    with pytest.raises(IntegrityError):
        db.commit()

    db.rollback()
