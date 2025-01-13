# User Routes

### 1. **Get User**
**GET** `/users/:id`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id (string): The ID of the User.`

**Response:**
- `200 Ok`
```json
{
    "id": "b65c14ba-4dfc-4b3e-8861-5eea753935a3",
    "name": "xyy xyy",
    "email": "xyy@xyy.xyy",
    "createdAt": "2025-01-12T15:59:03.734Z",
    "projects": [
        {
            "id": "f9c1246e-dfc2-438b-a5f4-9c1ec8e54316",
            "name": "change name",
            "description": "Website development project",
            "status": "PLANNED",
            "createdAt": "2025-01-12T16:02:51.366Z",
            "userId": "b65c14ba-4dfc-4b3e-8861-5eea753935a3"
        }
    ],
    "tasks": [
        {
            "id": "1d3daf81-b481-4a0e-8820-3059534d63fc",
            "title": "Design Homepage 2",
            "description": "Create wireframes for the homepage",
            "status": "TODO",
            "createdAt": "2025-01-12T16:05:45.717Z",
            "projectId": "f9c1246e-dfc2-438b-a5f4-9c1ec8e54316",
            "assignedUserId": "b65c14ba-4dfc-4b3e-8861-5eea753935a3"
        }
    ]
}
```
**ERROR:**:
- ` if Id -> not exists`
```json
{ 
    "error": "User not exists with this id" 
}
```
-  `Internal Error`
```json
{ 
    "message": "Failed to get user details" , "error": "show error message" 
}
```

---

### 2. **Get Users List**
**GET** `/users`

**Headers:**
```http
Authorization: Bearer <your_token>
```

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
**ERROR:**
-  `Internal Error`
```json
{ 
    "message": "Failed to fetch users" , "error": "show error message" 
}
```

---

### 3. **Update User (Self-Updation)**
**PUT** `/users/:id`
- `/users/e3c4e197-31d1-40ad-bd6c-3e5cec099790`

**Path Parameters:**
- `id (string): The ID of the user to update.`

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
**ERROR:**
- `if User not exists with this id`
```json
{
  "error": "User not exists with this id"
}
```
- `if trying to update another user's account`
```json
{
  "error": "You can only update your own account."
}
```
-  `Internal Error`
```json
{ 
    "message": "Failed to update User details" , "error": "show error message" 
}
```

---


### 4. **Delete User (Self-Deletion)**
**DELETE** `/users/:id`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id` (string): The ID of the user to delete.

**Response:**
- `200 OK`
```json
{
  "message": "Your account and associated projects(with their tasks) have been successfully deleted and your assigned task transfer to their project owner."
}
```
**ERROR:**
- `if User not exists with this id`
```json
{
  "error": "User not found"
}
```
- `if trying to delete another user's account`
```json
{
  "error": "You can only delete your own account."
}
```
-  `Internal Error`
```json
{ 
    "message": "Failed to delete your account" , "error": "show error message" 
}
```

---
