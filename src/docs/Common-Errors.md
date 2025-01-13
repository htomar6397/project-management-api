- ` SomeThing Went Wrong `

- ` if Protected Routes (I made ALL ROUTES expect AUTH(login , regester) to protected , means they required a valid Token to access) -> not found any TOKEN associated in HEADER(Bearer Token) `
```json
{
    "error": "Access token missing"
}
```

- ` if Token that extract from JWT then DECODED , Dont match to any user In DB `
```json
{ 
    "error": "Token with that query does not link to any User" 
}
```
- ` if Token that extract from JWT -> Expires (I set Expiration Time to 1Hour) `
```json
{ 
    "error": "Invalid or expired token" 
}
```
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

