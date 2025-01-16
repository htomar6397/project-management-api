# Project Management API

This is a RESTful API for managing users, projects, and tasks. The API includes features like user authentication, data validation, role-based access, and proper handling of undefined endpoints.

---


## Prerequisites

Ensure you have the following installed:

- **Node.js**: v16+
- **PostgreSQL**
- **npm** or **yarn**
- **Prisma CLI** (installed globally)

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/htomar6397/project-management-api.git
   cd project-management-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   JWT_SECRET=<your-secret-key>
   ```
   - `by Default <username> -> postgres , <host>:<port> -> localhost:5432 `
   - `<password> -> created password during setUp postgresql , <database> -> choose any name you want `

4. **Run Prisma Migrations**:
   ```bash
   cd src
   npx prisma migrate dev
   ```

5. **Start the Server**:
   ```bash
   npm start
   ```

---

## Testing

**Use Postman or any API testing tool to test the endpoints.** 
- IMPORT Collection From `docs/project management api.postman_collection.json` to Postman(desktop version or VScode Extention)

---

## Video Demonstration

A video demonstrating endpoint testing is available. Check the `docs/videos/` directory for the recording.

---

## Features

- **User Management**: Register, log in, view details, and delete user accounts.
- **Project Management**: Create, update, list, and delete projects.
- **Task Management**: Manage tasks under projects, including creation, assignment, updates, and deletions.
- **Authentication**: Secure endpoints with JWT authentication.
- **Validation**: Handles request validation and ensures proper data format.
- **Error Handling**: Handles undefined endpoints, invalid data, and expired tokens gracefully.

---

## API Endpoints
### Auth Routes
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT.

## Protected Routes (Require Authentication)
### User Routes
- **GET /users/:id**: Retrieve a user's details.  
- **GET /users/**: Retrieve a list of users.  
- **PUT /users/:id**: Update the logged-in user's name.  
- **DELETE /users/:id**: Delete the logged-in user account.  

### Project Routes
- **POST /projects**: Create a new project.  
- **GET /projects**: List all projects.  
- **PUT /projects/:id**: Update your project (only name, description, status).  
- **DELETE /projects/:id**: Delete your project and its tasks.  

### Task Routes
- **POST /projects/:id/tasks**: Create a task under your project.  
- **GET /projects/:id/tasks**: List all tasks in only your project (query by assigned user/status).  
- **GET /tasks**: List all tasks (query by assigned user/status).  
- **PUT /tasks/:id**: Update a task (project owner or assigned user only).  
- **DELETE /tasks/:id**: Delete a task (project owner or assigned user only).  

---

## Validation

- **Request Body Validation**: Ensures required fields are present and formatted correctly.
- **Data Integrity**: Prevents deletion of users/projects/tasks with foreign key violations.
- **Undefined Endpoints**: Returns a `404` response for invalid routes.

---


## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License.
