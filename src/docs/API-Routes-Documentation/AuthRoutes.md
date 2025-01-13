
## Auth Routes

### 1. **Register a User**
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "xy xy",
  "email": "xy@xy.xy",
  "password": "xyxyxy"
}
```

**Response:**
- `201 Created`
```json
{
    "message": "User registered successfully",
    "user": {
        "id": "e3c4e197-31d1-40ad-bd6c-3e5cec099790",
        "name": "xy xy",
        "email": "xy@xy.xy",
        "password": "$2b$10$UbnpRKIpUyakpnhsIuzmvOAukrwUfJ9.gW/0/jpad/qqg31Nze1OG",
        "createdAt": "2025-01-12T16:09:40.044Z"
    }
}
```
- `if any of  these - name, email and password is missing then `
*For Name*
```json
{
    "error": "Name is required and must be a string."
}
```
*For Email(any@any.any)*
```json
{
    "error": "A valid email is required."
}
```
*For Password*
```json
{
    "error": "Password is required and must be at least 6 characters long."
}
```
- `For Unqiue Email Contraint`
```json
{
    "error": "Email already exists"
}
```


### 2. **Login a User**
**POST** `/auth/login`

**Request Body:**
```json
{
  "name": "xy xy",
  "email": "xy@xy.xy",
}
```

**Response:**
- `200 OK`
```json
{
  "token": "your_jwt_token"
}
```

- `if any of  these - email and password is missing then`
*For Email(any@any.any)*
```json
{
    "error": "A valid email is required."
}
```
*For Password*
```json
{
    "error": "Password is required and must be at least 6 characters long."
}
```
- `if Email Not in DB`
```json
{
    "error": "User not Found"
}
```
- `Invalid Password`
```json
{
  "error": "Invalid credentials"
}
```



