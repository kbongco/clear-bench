import pytest
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError

from models import LabTech, Scientist, User
from security import hash_password, verify_password
from seed_all import seed_all, seed_demo_users


# 1. Password round-trips
def test_password_round_trip():
    password = "SecurePassword123!"

    hashed = hash_password(password)

    assert verify_password(password, hashed) is True


# 2. Wrong password fails
def test_wrong_password_fails():
    password = "SecurePassword123!"
    hashed = hash_password(password)

    assert verify_password("WrongPassword123!", hashed) is False


# 3. Same password produces different hashes (salting)
def test_password_hashes_are_salted():
    password = "SecurePassword123!"

    hash_one = hash_password(password)
    hash_two = hash_password(password)

    assert hash_one != hash_two


# 4. Hash does not contain plaintext password
def test_hash_does_not_contain_password():
    password = "SecurePassword123!"

    hashed = hash_password(password)

    assert password not in hashed


# 5. Duplicate email raises IntegrityError
def test_duplicate_email_raises_integrity_error(db, sample_data):
    alice = db.query(Scientist).filter_by(name="Alice").one()
    marcus = db.query(Scientist).filter_by(name="Marcus").one()

    db.add_all(
        [
            User(
                email="same@example.com", password_hash="h", role="scientist", scientist_id=alice.id
            ),
            User(
                email="same@example.com",
                password_hash="h",
                role="scientist",
                scientist_id=marcus.id,
            ),
        ]
    )

    with pytest.raises(IntegrityError):
        db.commit()

    db.rollback()


# 6. Lab tech role linked to scientist raises IntegrityError
def test_role_check_constraint_raises_integrity_error(db, sample_data):
    alice = db.query(Scientist).filter_by(name="Alice").one()

    user = User(
        email="invalid-role@example.com",
        password_hash="hashed-password",
        role="lab_tech",
        scientist_id=alice.id,
    )

    db.add(user)

    with pytest.raises(IntegrityError):
        db.commit()

    db.rollback()


# 7. Seed users match scientist and lab tech profiles
def test_seed_demo_users_creates_matching_users(db):
    seed_all(db)
    seed_demo_users(db)

    users = db.scalars(select(User)).all()

    scientist_count = db.scalar(select(func.count()).select_from(Scientist))

    lab_tech_count = db.scalar(select(func.count()).select_from(LabTech))

    assert len(users) == scientist_count + lab_tech_count

    for user in users:
        if user.role == "scientist":
            assert user.scientist is not None
            assert user.lab_tech is None

        elif user.role == "lab_tech":
            assert user.lab_tech is not None
            assert user.scientist is None

        else:
            pytest.fail(f"Unexpected role: {user.role}")


# 8. Running seed_demo_users twice doesn't create duplicates
def test_seed_demo_users_is_idempotent(db):
    seed_all(db)
    seed_demo_users(db)

    initial_count = db.scalar(select(func.count()).select_from(User))

    seed_demo_users(db)

    final_count = db.scalar(select(func.count()).select_from(User))

    assert final_count == initial_count
