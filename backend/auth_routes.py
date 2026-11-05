import os

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from sqlalchemy.orm import Session

import models
from database import get_db
from schemas import CurrentUser, LoginRequest
from security import create_access_token, decode_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

COOKIE_NAME = "access_token"
# Secure cookies are only sent over https. Turn it off for local http with COOKIE_SECURE=false.
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "true").lower() != "false"

# Checked when the email doesn't exist, so a wrong email takes as long as a wrong password.
_DUMMY_HASH = hash_password("not-a-real-password")

def get_current_user(
    access_token: str | None = Cookie(default=None), db: Session = Depends(get_db)
) -> models.User:
    user_id = decode_access_token(access_token) if access_token else None
    user = db.get(models.User, user_id) if user_id is not None else None
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user

def to_current_user(user: models.User) -> CurrentUser:
    """The same shape the frontend's useCurrentUser() uses: role, id, name."""
    if user.role == "scientist":
        return CurrentUser(role="scientist", id=user.scientist.id, name=user.scientist.name)
    return CurrentUser(role="labtech", id=user.lab_tech.id, name=user.lab_tech.name)

@router.post("/login", response_model=CurrentUser)
def login(body: LoginRequest, response: Response, db: Session = Depends(get_db)):
    email = body.email.strip().lower()
    user = db.query(models.User).filter(models.User.email == email).first()

    password_ok = verify_password(body.password, user.password_hash if user else _DUMMY_HASH)
    if user is None or not password_ok:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    response.set_cookie(
        key=COOKIE_NAME,
        value=create_access_token(user.id),
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=8 * 60 * 60,
    )
    return to_current_user(user)

@router.post("/logout", status_code=204)
def logout(response: Response):
    response.delete_cookie(COOKIE_NAME, httponly=True, secure=COOKIE_SECURE, samesite="lax")


@router.get("/me", response_model=CurrentUser)
def me(user: models.User = Depends(get_current_user)):
    return to_current_user(user)