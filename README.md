# Habit Tracker

> Client deployed at: https://block-by-block.netlify.app/ <br/>
> Server deployed at: https://block-by-block.herokuapp.com/

A simple application to help you track new habits by marking calendar days.

# API Docs

### Responses and Error Codes

All responses are JSON objects. In cases of failure, an 'error' property shall always exist with an appropriate error message. The following are all possible http response types:

| Code | Title                 | Description                                                                  |
| ---- | --------------------- | ---------------------------------------------------------------------------- |
| 200  | OK                    | Everything went smoothly!                                                    |
| 201  | Created               | Content was posted successfully                                              |
| 400  | Bad request           | At least one required field, or a JWT, was not provided                      |
| 401  | Unauthorized          | Login credentials mismatch, or JWT invalid                                   |
| 403  | Forbidden             | Inactive account attempting login                                            |
| 404  | Not Found             | Page, or resource (user, file) not found on the server                       |
| 409  | Conflict              | A resource with the provided unique identifier (email, phone) already exists |
| 500  | Internal Server Error | Something unexpected happened! Please report an issue asap                   |

<br/>

### Auth routes

| Endpoint                  | Desc                 | Method | Access | Payload                        | Return          | Notes                                   |
| ------------------------- | -------------------- | ------ | ------ | ------------------------------ | --------------- | --------------------------------------- |
| /api/auth                 | User login           | POST   | Public | {email, password }             | { token, User } | username can be passed instead of email |
| /api/auth/forget_password | request OTP          | POST   | Public | {email}                        |                 | An OTP is sent via email                |
| /api/auth/reset_password  | Change user password | POST   | Public | {id, oldPassword, newPassword} |                 |                                         |

<br/>

### User routes

| Endpoint          | Desc        | Method | Access | Payload                  | Return              | Notes                    |
| ----------------- | ----------- | ------ | ------ | ------------------------ | ------------------- | ------------------------ |
| /api/users/signup | User signup | POST   | Public | {name, email, username } | { id, name, email } | An OTP is sent via email |
|                   |

<br/>
