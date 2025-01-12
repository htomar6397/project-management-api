# Project Management API

This is a RESTful API for managing users, projects, and tasks. The API includes features like user authentication, data validation, role-based access, and proper handling of undefined endpoints.

---

## Features

- **User Management**: Register, log in, view details, and delete user accounts.
- **Project Management**: Create, update, list, and delete projects.
- **Task Management**: Manage tasks under projects, including creation, assignment, updates, and deletions.
- **Authentication**: Secure endpoints with JWT authentication.
- **Validation**: Handles request validation and ensures proper data format.
- **Error Handling**: Handles undefined endpoints, invalid data, and expired tokens gracefully.

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
   git clone <repository-url>
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

## API Endpoints
### Auth Routes
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT.

//require Authentication
### User Routes
- **GET /users/:id**: Retrieve the current user's details .
- **GET /users/**: Retrieve the the list of users.
- **PUT /users/:id**: Update the current user's details 
- **DELETE /users/:id**: Delete the logged-in user account.

### Project Routes
- **POST /projects**: Create a new project (requires authentication).
- **GET /projects**: List all projects (requires authentication).
- **GET /projects/:id**: Get details of a specific project.
- **DELETE /projects/:id**: Delete a project and its associated tasks.

### Task Routes
- **POST /projects/:projectId/tasks**: Create a new task under a project.
- **GET /projects/:projectId/tasks**: List all tasks under a project.
- **PUT /projects/:projectId/tasks/:id**: Update a task.
- **DELETE /projects/:projectId/tasks/:id**: Delete a task.

---

## Validation

- **Request Body Validation**: Ensures required fields are present and formatted correctly.
- **Data Integrity**: Prevents deletion of users/projects/tasks with foreign key violations.
- **Undefined Endpoints**: Returns a `404` response for invalid routes.

---

## Video Demonstration

A video demonstrating endpoint testing is available. Check the `docs/videos/` directory for the recording.

---

## Testing

Use Postman or any API testing tool to test the endpoints. 

---

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License.
