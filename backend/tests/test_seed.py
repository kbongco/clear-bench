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
