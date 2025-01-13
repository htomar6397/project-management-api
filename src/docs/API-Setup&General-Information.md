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