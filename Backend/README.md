# API Documentation

## POST /user/register

### Description

This endpoint registers a new user. The request needs to include the user's full name, email, and password. The password will be hashed before storing, and an authentication token is generated upon successful registration.

### Request Body

```json
{
  "fullname": {
    "firstname": "string (min 3 characters)",
    "lastname": "string (min 3 characters)"
  },
  "email": "string (min 5 characters, unique)",
  "password": "string (required)"
}
```

### Response

- **201 Created**
  - Returns a JSON object containing the authentication token and the newly created user object.
- **400 Bad Request**
  - Returned when required fields are missing or validations fail.

### Example Request

```bash
curl -X POST http://localhost:3000/user/register \
-H 'Content-Type: application/json' \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```
