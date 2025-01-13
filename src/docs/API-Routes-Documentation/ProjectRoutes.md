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

**ERROR**:
- ` if any of name, description and status -> not exists`
```json
{ 
    "error": "Please provide name, description, status" 
}
```
- ` if status have value other than -> {PLANNED, ONGOING, COMPLETED}`
```json
{ 
    "error": "Invalid status : status can only have {PLANNED, ONGOING, COMPLETED}" 
}
```
-  `Internal Error`
```json
{ 
    "message": "Failed to create projects" , "error": "show error message" 
}
```


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
**ERROR**:
-  `Internal Error`
```json
{ 
    "message": "Failed to fetch projects" , "error": "show error message" 
}
```

### 3. **Update a project**
**PUT** `/projects/:id`
- `{{baseURL}}/projects/f9c1246e-dfc2-438b-a5f4-9c1ec8e54316`

**Headers:**
```http
Authorization: Bearer <your_token>
```

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
**ERROR**:
- ` if none of name, description and status -> ALL not exists`
```json
{ 
    "error": "Please provide any of these details to update , name, description or status" 
}
```
- ` if status have value other than -> {PLANNED, ONGOING, COMPLETED}`
```json
{ 
    "error": "Invalid status : status can only have {PLANNED, ONGOING, COMPLETED}" 
}
```
- ` if project not found in DB`
```json
{
     "error": "Project not found" 
}
```
- ` LoggedIN user ID not match with project owner ID -> you can only update projects created by You`
```json
{
     "error": "Unauthorized to access this project" 
}
```
-  `Internal Error`
```json
{ 
    "message": "Failed to update projects" , "error": "show error message" 
}
```


### 2. **Delete a Project**
**DELETE** `/projects/:id`
- `{{baseURL}}/projects/f9c1246e-dfc2-438b-a5f4-9c1ec8e54316`

**Headers:**
```http
Authorization: Bearer <your_token>
```

**Path Parameters:**
- `id (string): The ID of the project to delete.`

**Response:**
- `200 OK`
```json
{
  "message": "Project deleted and all associated tasks deleted successfully"
}
```
**ERROR:**
- ` if project not found in DB`
```json
{
     "error": "Project not found" 
}
```
- ` LoggedIN user ID not match with project owner ID -> you can only delete projects created by You`
```json
{
     "error": "Unauthorized to access this project" 
}
```
-  `Internal Error`
```json
{ 
    "message": "Failed to delete projects" , "error": "show error message" 
}
```

---




