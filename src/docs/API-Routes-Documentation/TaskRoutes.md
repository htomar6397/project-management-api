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
- `/tasks/:54c01d4d-cff2-48e4-a219-c2ecc4236316`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id` (string): The ID of the task to update.

**Request Body:**
```json
{
        "title": "Design Homepage - Final",
        "description": "Create wireframes and finalize design",
        "status": "IN_PROGRESS",
}
```

**Response:**
- `200 OK`
```json
{
    "messsage": "Task Updated Succesfully",
    "updatedTask": {
        "id": "54c01d4d-cff2-48e4-a219-c2ecc4236316",
        "title": "Design Homepage - Final",
        "description": "Create wireframes and finalize design",
        "status": "IN_PROGRESS",
        "createdAt": "2025-01-13T05:39:18.114Z",
        "projectId": "e47da334-b2df-427b-ab92-2408157466f4",
        "assignedUserId": "e3c4e197-31d1-40ad-bd6c-3e5cec099790"
    }
}
```
- ' if given taskID is not in DB'
```json
{
    "error": "Task not found"
}
```

- ' if the LoggedInUSER(JWT decoded) is not assigned to OR not project owner of that task'
```json
{
    "error": "Unauthorized to access this task"
}
```
- ' if None of (name , description and status) is given then'
``` json
{
    "error": "Please provide any of these details to update , title, description, status, assignedUserId"
}
```
- ' if status is other than TODO ,IN_PROGRESS and DONE then '
```json
{
    "error": "Invalid status : status can only have {TODO, IN_PROGRESS, DONE}"
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

