from types import SimpleNamespace

import pytest

from utils.spec import check_value


@pytest.fixture
def food_ph_spec():
    """Food pH: inclusive range 3.5–4.6."""
    return SimpleNamespace(
        kind="numeric",
        parameter_name="Food pH",
        min_value=3.5,
        max_value=4.6,
    )


@pytest.fixture
def microbial_spec():
    """Microbial count: maximum 100 CFU/g."""
    return SimpleNamespace(
        kind="numeric",
        parameter_name="Microbial count",
        min_value=None,
        max_value=100,
    )


@pytest.fixture
def minimum_only_spec():
    """Only a minimum: at least 10."""
    return SimpleNamespace(
        kind="numeric",
        parameter_name="Minimum concentration",
        min_value=10,
        max_value=None,
    )


@pytest.fixture
def visual_spec():
    """Visual inspection: pass/fail."""
    return SimpleNamespace(
        kind="pass_fail",
        parameter_name="Visual inspection",
        min_value=None,
        max_value=None,
    )


# Numeric specs with both limits


def test_numeric_value_inside_range_passes(food_ph_spec):
    assert check_value(food_ph_spec, measured_value=4.0) is True


def test_numeric_value_at_minimum_passes(food_ph_spec):
    assert check_value(food_ph_spec, measured_value=3.5) is True


def test_numeric_value_at_maximum_passes(food_ph_spec):
    assert check_value(food_ph_spec, measured_value=4.6) is True


def test_numeric_value_below_minimum_fails(food_ph_spec):
    assert check_value(food_ph_spec, measured_value=3.4) is False


def test_numeric_value_above_maximum_fails(food_ph_spec):
    assert check_value(food_ph_spec, measured_value=4.7) is False


# Numeric specs with only a maximum


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        (0, True),
        (100, True),
        (101, False),
    ],
)
def test_numeric_value_with_maximum_only(microbial_spec, value, expected):
    assert check_value(microbial_spec, measured_value=value) is expected


# Numeric specs with only a minimum


def test_numeric_value_above_minimum_only_passes(minimum_only_spec):
    assert check_value(minimum_only_spec, measured_value=15) is True


def test_numeric_value_below_minimum_only_fails(minimum_only_spec):
    assert check_value(minimum_only_spec, measured_value=5) is False


# Pass/fail specs


def test_pass_fail_true_passes(visual_spec):
    assert check_value(visual_spec, passed=True) is True


def test_pass_fail_false_fails(visual_spec):
    assert check_value(visual_spec, passed=False) is False


# Missing input validation


def test_numeric_spec_without_measured_value_raises_value_error(food_ph_spec):
    with pytest.raises(ValueError, match="Food pH needs a measured value"):
        check_value(food_ph_spec)


def test_pass_fail_spec_without_passed_raises_value_error(visual_spec):
    with pytest.raises(
        ValueError,
        match="Visual inspection is pass/fail and needs passed=True or False",
    ):
        check_value(visual_spec)
