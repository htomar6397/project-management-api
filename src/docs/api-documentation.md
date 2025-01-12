# API Documentation

## Base URL
All endpoints are prefixed with `/api`. Replace `{BASE_URL}` with the 'http://localhost:3000/api' 

---

## Authentication
### Authenticate Token Middleware
Every protected route requires a valid JWT token in the `Authorization` header.

```http
Authorization: Bearer <your_token>
```

---

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

<!-- Authenticated Routes -->
<!-- common header to all routes  -->
**Headers:**
```http
Authorization: Bearer <your_token>
```
<!-- ...... -->


## User Routes
### 1. **Get User**
**GET** `/users/:id`



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
### 2. **Get Users List**
### 3. **Update User (Self-Updation)**
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

## Project Routes

### 1. **Create a Project**
**POST** `/projects`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Request Body:**
```json
{
  "name": "New Website",
  "description": "Website development project",
  "status": "PLANNED"
}
```

**Response:**
- `201 Created`
```json
{
    "message": "Project Created with  name, description, status Successfully ",
    "newProject": {
        "id": "a1994796-ca0c-4ebd-b47a-a19b68b6aac9",
        "name": "New Website",
        "description": "Website development project",
        "status": "PLANNED",
        "createdAt": "2025-01-12T17:06:35.733Z",
        "userId": "e3c4e197-31d1-40ad-bd6c-3e5cec099790"
    }
}
```
### 2. **List All projects**
### 3. **Update a project**
### 2. **Delete a Project**
**DELETE** `/projects/:id`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id` (string): The ID of the project to delete.

**Response:**
- `200 OK`
```json
{
  "message": "Project deleted successfully."
}
```

---





## Task Routes

### 1. **Create a Task**
**POST** `/projects/:id/tasks`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id` (string): The ID of the project to which the task belongs.

**Request Body:**
```json
{
  "title": "Design Homepage",
  "description": "Create wireframes for the homepage",
  "status": "TODO",
  "assignedUserId": "cb38d218-6666-45fb-8995-2e87a7d6931d"
}
```

**Response:**
- `201 Created`
```json
{
    "message": "Task created Succesfuly ",
    "newTask": {
        "id": "dce376d8-67c7-4373-a107-f2488fb27b3b",
        "title": "Design Homepage",
        "description": "Create wireframes for the homepage",
        "status": "TODO",
        "createdAt": "2025-01-12T14:31:23.292Z",
        "projectId": "fb828adc-6db9-49f5-bfe4-7f4c03c3e92b",
        "assignedUserId": "cb38d218-6666-45fb-8995-2e87a7d6931d"
    }
}
```

### 2. **List Tasks for a Project**
**GET** `/projects/:id/tasks`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id` (string): The ID of the project whose tasks you want to retrieve.

**Response:**
- `200 OK`
```json
[
  {
    "id": "taskId",
    "title": "Task 1",
    "description": "This is a test task."
  },
  {
    "id": "taskId2",
    "title": "Task 2",
    "description": "Another test task."
  }
]
```

### 3. **List All Task By Filter(assigned User and status)**

### 3. **Update a Task**
**PUT** `/tasks/:id`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id` (string): The ID of the task to update.

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description."
}
```

**Response:**
- `200 OK`
```json
{
  "message": "Task updated successfully.",
  "task": {
    "id": "taskId",
    "title": "Updated Task",
    "description": "Updated description."
  }
}
```

### 4. **Delete a Task**
**DELETE** `/tasks/:id`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id` (string): The ID of the task to delete.

**Response:**
- `200 OK`
```json
{
  "message": "Task deleted successfully."
}
```

---

## Error Responses
### Common Error Format
```json
{
  "error": "Error message"
}
```

- `400 Bad Request`: Invalid input.
- `401 Unauthorized`: Token missing or invalid.
- `403 Forbidden`: Unauthorized action.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected server error.

---
# API Documentation

