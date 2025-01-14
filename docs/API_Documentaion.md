# API Documentation

## Base URL
All endpoints are prefixed with `/api`. Replace `{BASE_URL}` with the 'http://localhost:3000/api' 

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

**KNOWN ERRORS:**
- `if any of  these - name, email and password is missing then `
- `For Unqiue Email Contraint`

---

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

**KNOWN ERRORS:**
- `if any of these - email and password is missing then`
- `if Email Not in DB`
- `Invalid Password`

---


## Authentication(Below are protected routes)
### Authenticate Token Middleware
Every protected route requires a valid JWT token in the `Authorization` header.

**Common Header:**
```http
Authorization: Bearer <your_token>
```

---

## User Routes

### 1. **Get User**

**GET** `/users/:id`
- `/users/b65c14ba-4dfc-4b3e-8861-5eea753935a3`

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
**KNOWN ERROR:**:
- ` if Id -> not exists`

---

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
**KNOWN ERRORS:**
- `if User not exists with this id`
- `if trying to update another user's account`

---

### 4. **Delete User (Self-Deletion)**

**DELETE** `/users/:id`
- `/users/b65c14ba-4dfc-4b3e-8861-5eea753935a3`

**Path Parameters:**
- `id` (string): The ID of the user to delete.

**Response:**
- `200 OK`
```json
{
  "message": "Your account and associated projects(with their tasks) have been successfully deleted and your assigned task transfer to their project owner."
}
```
**KNOWN ERRORS:**
- `if User not exists with this id`
- `if trying to delete another user's account`

---


## Project Routes

### 1. **Create a Project**

**POST** `/projects`

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

**KNOWN ERRORS:**:
- ` if any of name, description and status -> not exists`
- ` if status have value other than -> {PLANNED, ONGOING, COMPLETED}`

---

### 2. **List All projects**

**GET** `/projects`

**Resonse:**
- `200 OK`
```json
[
    {
        "id": "f9c1246e-dfc2-438b-a5f4-9c1ec8e54316",
        "name": "New Project 1",
        "description": "Website development project 1",
        "status": "PLANNED",
        "createdAt": "2025-01-12T16:02:51.366Z",
        "userId": "b65c14ba-4dfc-4b3e-8861-5eea753935a3"
    },
    {
        "id": "a1994796-ca0c-4ebd-b47a-a19b68b6aac9",
        "name": "New Website 2",
        "description": "Website development project 2",
        "status": "PLANNED",
        "createdAt": "2025-01-12T17:06:35.733Z",
        "userId": "e3c4e197-31d1-40ad-bd6c-3e5cec099790"
    }
]
```

---

### 3. **Update a project**

**PUT** `/projects/:id`
- `{{baseURL}}/projects/f9c1246e-dfc2-438b-a5f4-9c1ec8e54316`

**Path Parameters:**
- `id (string): The ID of the project to Update.`

**Response Body**
```json
{
    "status" : "ONGOING"
}
```
**Response:**
- `200 OK`
```json
{
    "message": "Updated Succesfully - details can be updated only (name, description or status) ",
    "updatedProject": {
        "id": "f9c1246e-dfc2-438b-a5f4-9c1ec8e54316",
        "name": "New Website 1",
        "description": "Website development project 1",
        "status": "ONGOING",
        "createdAt": "2025-01-13T05:24:55.792Z",
        "userId": "e3c4e197-31d1-40ad-bd6c-3e5cec099790"
    }
}
```

**KNOWN ERRORS:**:
- ` if none of name, description and status -> ALL not exists`
- ` if status have value other than -> {PLANNED, ONGOING, COMPLETED}`
- ` if project not found in DB`
- ` LoggedIN user ID not match with project owner ID -> you can only update projects created by You`

---

### 2. **Delete a Project**

**DELETE** `/projects/:id`
- `{{baseURL}}/projects/f9c1246e-dfc2-438b-a5f4-9c1ec8e54316`

**Path Parameters:**
- `id (string): The ID of the project to delete.`

**Response:**
- `200 OK`
```json
{
  "message": "Project deleted and all associated tasks deleted successfully"
}
```

**KNOWN ERRORS::**
- ` if project not found in DB`
- ` LoggedIN user ID not match with project owner ID -> you can only delete projects created by You`

---


## Task Routes

### 1. **Create a Task**

**POST** `/projects/:id/tasks`

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
**KNOWN ERRORS:**
- `if any of these - title, description, status and assignedUserId is missing then`
- ` if status have value other than -> {TODO, IN_PROGRESS, DONE}`
- `if Assigned User not found in DB`

---

### 2. **List Tasks for a Project**

**GET** `/projects/:id/tasks`

**Path Parameters:**
- `id` (string): The ID of the project whose tasks you want to retrieve.

**Response:**
- `200 OK`
```json
[
    {
        "id": "54c01d4d-cff2-48e4-a219-c2ecc4236316",
        "title": "Design Homepage - Final",
        "description": "Create wireframes and finalize design",
        "status": "IN_PROGRESS",
        "createdAt": "2025-01-13T05:39:18.114Z",
        "projectId": "e47da334-b2df-427b-ab92-2408157466f4",
        "assignedUserId": "e3c4e197-31d1-40ad-bd6c-3e5cec099790",
        "assignedUser": {
            "id": "e3c4e197-31d1-40ad-bd6c-3e5cec099790",
            "name": "changed",
            "email": "xy@xy.xy",
            "password": "$2b$10$UbnpRKIpUyakpnhsIuzmvOAukrwUfJ9.gW/0/jpad/qqg31Nze1OG",
            "createdAt": "2025-01-12T16:09:40.044Z"
        }
    }
]
```
**KNOWN ERRORS:**
- ` if project is not found in DB`
- ` LoggedIN user ID not match with project owner ID -> you can only watch task of projects created by You`

---

### 3. **List All Task By Filter(assigned User and status)**

**GET** `/tasks`
- `/tasks/?status=IN_PROGRESS&assignedUserId=e3c4e197-31d1-40ad-bd6c-3e5cec099790`

**Response:**
```json
[
    {
        "id": "54c01d4d-cff2-48e4-a219-c2ecc4236316",
        "title": "Design Homepage - Final",
        "description": "Create wireframes and finalize design",
        "status": "IN_PROGRESS",
        "createdAt": "2025-01-13T05:39:18.114Z",
        "projectId": "e47da334-b2df-427b-ab92-2408157466f4",
        "assignedUserId": "e3c4e197-31d1-40ad-bd6c-3e5cec099790",
        "assignedUser": {
            "id": "e3c4e197-31d1-40ad-bd6c-3e5cec099790",
            "name": "changed",
            "email": "xy@xy.xy",
            "password": "$2b$10$UbnpRKIpUyakpnhsIuzmvOAukrwUfJ9.gW/0/jpad/qqg31Nze1OG",
            "createdAt": "2025-01-12T16:09:40.044Z"
        },
        "project": {
            "id": "e47da334-b2df-427b-ab92-2408157466f4",
            "name": "New Website",
            "description": "Website development project",
            "status": "ONGOING",
            "createdAt": "2025-01-13T05:24:55.792Z",
            "userId": "e3c4e197-31d1-40ad-bd6c-3e5cec099790"
        }
    }
]
```

---

### 3. **Update a Task**

**PUT** `/tasks/:id`
- `/tasks/:54c01d4d-cff2-48e4-a219-c2ecc4236316`

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
**KNOWN ERRORS:**
- ' if given taskID is not in DB'
- ' if the LoggedInUSER(JWT decoded) is (not assigned to that task) AND (not project owner of that task)'
- ' if None of (name , description and status) is given then'
- ' if status is other than TODO ,IN_PROGRESS and DONE then '

---

### 4. **Delete a Task**

**DELETE** `/tasks/:id`
- `/tasks/:54c01d4d-cff2-48e4-a219-c2ecc4236316`

**Path Parameters:**
- `id` (string): The ID of the task to delete.

**Response:**
- `200 OK`
```json
{
  "message": "Task deleted successfully."
}
```
**KNOWN ERRORS:**
- ' if given taskID is not in DB'
- ' if the LoggedInUSER(JWT decoded) is (not assigned to that task) AND (not project owner of that task)'

---

## Error Responses

- **`DB Disconnect`**: Database connection failed.  
- **`Missing Token`**: No valid token in the `Authorization` header (Bearer Token).  
- **`Invalid Token`**: Decoded JWT does not match any user in the database.  
- **`Expired Token`**: JWT token has expired (1-hour expiration).  
- **`Invalid JSON`**: Malformed JSON in the request body.  
- **`Route Not Found`**: Requested route does not exist.  
- **`Unexpected Error`**: Internal server error.  

### Status Codes
- `400 Bad Request`: Invalid input.  
- `401 Unauthorized`: Token missing or invalid.  
- `403 Forbidden`: Unauthorized action.  
- `404 Not Found`: Resource not found.  
- `500 Internal Server Error`: Unexpected server error.  

---

