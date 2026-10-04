from datetime import date

import pytest
from utils.dates import calculate_due_date


@pytest.mark.parametrize(
    "duration, expected",
    [
        ("1-week", date(2026, 10, 8)),
        ("2-week", date(2026, 10, 15)),
        ("4-week", date(2026, 10, 29)),
        ("8-week", date(2026, 11, 26)),
        ("12-week", date(2026, 12, 24)),
        ("6-months", date(2027, 4, 1)),
        ("1-year", date(2027, 10, 1)),
    ],
)
def test_calculate_due_date(duration, expected):
    start_date = date(2026, 10, 1)

    assert calculate_due_date(start_date, duration) == expected


def test_no_start_date_returns_none():
    assert calculate_due_date(None, "4-week") is None


@pytest.mark.parametrize("duration", ["3-week", "2 weeks", None])
def test_invalid_duration_returns_none(duration):
    start_date = date(2026, 10, 1)

    assert calculate_due_date(start_date, duration) is None