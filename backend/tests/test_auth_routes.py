
import base64
import json
from datetime import datetime, timedelta, timezone

import jwt

from security import ALGORITHM, SECRET_KEY


def login(client, email="alice@test.com", password="alice-password"):
    return client.post(
        "/auth/login",
        json={"email": email, "password": password},
    )


# 1. Correct login returns Alice and sets an HttpOnly cookie.
def test_login_success(client, auth_data):
    response = login(client)

    assert response.status_code == 200
    assert response.json() == {
        "role": "scientist",
        "id": auth_data["alice"].id,
        "name": "Alice",
    }

    cookie_header = response.headers.get("set-cookie", "").lower()
    assert "access_token=" in cookie_header
    assert "httponly" in cookie_header


# 2. Email is case- and space-insensitive.
def test_login_normalizes_email(client, auth_data):
    response = login(
        client,
        email="  Alice@Test.com ",
    )

    assert response.status_code == 200
    assert response.json()["name"] == "Alice"


# 3. Wrong password returns 401 with the expected generic detail.
def test_login_wrong_password(client, auth_data):
    response = login(client, password="wrong-password")

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"
    assert "set-cookie" not in response.headers


# 4. Unknown email returns the same error as a wrong password.
def test_login_unknown_email(client, auth_data):
    response = login(
        client,
        email="unknown@test.com",
        password="alice-password",
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"
    assert "set-cookie" not in response.headers


# 5. /auth/me returns Alice after login.
def test_me_after_login(client, auth_data):
    login_response = login(client)

    assert login_response.status_code == 200

    response = client.get("/auth/me")

    assert response.status_code == 200
    assert response.json() == {
        "role": "scientist",
        "id": auth_data["alice"].id,
        "name": "Alice",
    }


# 6. /auth/me without a cookie returns 401.
def test_me_without_cookie(client, auth_data):
    response = client.get("/auth/me")

    assert response.status_code == 401


# 7. A tampered token is rejected.
def test_me_with_tampered_token(client, auth_data):
    token = login(client).cookies["access_token"]
    header, payload, signature = token.split(".")

    claims = json.loads(base64.urlsafe_b64decode(payload + "=="))
    claims["sub"] = str(auth_data["marcus_user"].id)
    forged_payload = base64.urlsafe_b64encode(json.dumps(claims).encode()).rstrip(b"=").decode()

    client.cookies.clear()
    client.cookies.set("access_token", f"{header}.{forged_payload}.{signature}")

    assert client.get("/auth/me").status_code == 401


# 8. A token signed with a different key is rejected.
def test_me_with_wrong_signing_key(client, auth_data):
    token = jwt.encode(
        {
            "sub": str(auth_data["alice_user"].id),
            "exp": datetime.now(timezone.utc) + timedelta(minutes=10),
        },
        "a-completely-different-test-secret-key",
        algorithm=ALGORITHM,
    )

    client.cookies.set("access_token", token)
    response = client.get("/auth/me")

    assert response.status_code == 401


# 9. An expired token is rejected.
def test_me_with_expired_token(client, auth_data):
    token = jwt.encode(
        {
            "sub": str(auth_data["alice_user"].id),
            "exp": datetime.now(timezone.utc) - timedelta(minutes=1),
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    client.cookies.set("access_token", token)
    response = client.get("/auth/me")

    assert response.status_code == 401


# 10. Logout clears the cookie and makes /auth/me unauthorized.
def test_logout(client, auth_data):
    login_response = login(client)

    assert login_response.status_code == 200
    assert client.get("/auth/me").status_code == 200

    logout_response = client.post("/auth/logout")

    assert logout_response.status_code == 204
    assert client.get("/auth/me").status_code == 401


# 11. A lab tech login returns the labtech role.
def test_labtech_login(client, auth_data):
    response = login(
        client,
        email="sarah@test.com",
        password="sarah-password",
    )

    assert response.status_code == 200
    assert response.json() == {
        "role": "labtech",
        "id": auth_data["sarah"].id,
        "name": "Sarah",
    }
