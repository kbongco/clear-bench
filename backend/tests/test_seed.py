from datetime import date, timedelta

import models
from seed_all import seed_all


def test_seed_fills_an_empty_database(db):
    seed_all(db)

    assert db.query(models.Scientist).count() > 0
    assert db.query(models.Sample).count() > 0


def test_seed_skips_a_database_that_has_data(db, capsys):
    seed_all(db)
    scientists = db.query(models.Scientist).count()
    capsys.readouterr()  # ignore the first run's output

    seed_all(db)

    # seed_all catches its own errors, so check it skipped on purpose
    # rather than failing and rolling back.
    assert "skipping seed" in capsys.readouterr().out
    assert db.query(models.Scientist).count() == scientists


def test_seed_includes_a_rejected_sample_with_its_reason(db):
    seed_all(db)

    rejected = db.query(models.Sample).filter(models.Sample.test_status == "rejected").all()
    assert len(rejected) == 1

    actions = [event.action for event in rejected[0].events]
    assert sorted(actions) == ["rejected", "submitted"]

    rejection = next(event for event in rejected[0].events if event.action == "rejected")
    assert rejection.note == "Label missing batch number. Please relabel and resubmit."
    assert rejection.from_status == "pending"


def test_seed_dates_are_recent(db):
    seed_all(db)
    today = date.today()
    for sample in db.query(models.Sample).all():
        assert abs((sample.due_date - today).days) <= 30, sample.name


def test_seed_due_dates_are_two_weeks_after_start(db):
    seed_all(db)
    for sample in db.query(models.Sample).all():
        assert sample.due_date - sample.test_start == timedelta(days=14), sample.name


def test_seed_has_an_overdue_sample_in_progress(db):
    seed_all(db)
    in_progress = db.query(models.Sample).filter(models.Sample.test_status == "in_progress").all()
    assert any(sample.due_date < date.today() for sample in in_progress)


def test_seed_pending_samples_start_today_or_later(db):
    seed_all(db)
    pending = db.query(models.Sample).filter(models.Sample.test_status == "pending").all()
    assert pending
    assert all(sample.test_start >= date.today() for sample in pending)
