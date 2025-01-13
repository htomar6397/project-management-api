## User Routes
### 1. **Get User**
**GET** `/users/:id`

**Request Body:**
```json
{
  "name": "xy xy",
  "email": "xy@xy.xy",
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

### 2. **Get Users List**
**GET** `/users`
**Responses:**
- `200 OK`
```json
[
    {
        "id": "b65c14ba-4dfc-4b3e-8861-5eea753935a3",
        "name": "xyy xyy",
        "email": "xyy@xyy.xyy",
        "createdAt": "2025-01-12T15:59:03.734Z"
    },
    {
        "id": "e3c4e197-31d1-40ad-bd6c-3e5cec099790",
        "name": "xy xy",
        "email": "xy@xy.xy",
        "createdAt": "2025-01-12T16:09:40.044Z"
    }
]
```

### 3. **Update User (Self-Updation)**
**PUT** `/users/:id`
- `/users/e3c4e197-31d1-40ad-bd6c-3e5cec099790`

**Path Parameters:**
- `id` (string): The ID of the user to delete.
**Request Body:**
```json
{
  "name": "changed",
}
```
**Response:**
- `200 OK`
```json
{
    "message": "only name can be update",
    "user": {
        "id": "e3c4e197-31d1-40ad-bd6c-3e5cec099790",
        "name": "changed",
        "email": "xy@xy.xy",
        "createdAt": "2025-01-12T16:09:40.044Z"
    }
}
```

- `403 Forbidden` (if trying to update another user's account):
```json
{
  "error": "You can only update your own account."
}
```



### 4. **Delete User (Self-Deletion)**
**DELETE** `/users/:id`
**Path Parameters:**
- `id` (string): The ID of the user to delete.

**Response:**
- `200 OK`
```json
{
  "message": "Your account and associated projects(with their tasks) have been successfully deleted and your assigned task transfer to their project owner."
}
```

- `403 Forbidden` (if trying to delete another user's account):
```json
{
  "error": "You can only delete your own account."
}
```

---
