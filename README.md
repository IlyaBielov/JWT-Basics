# JWT Basics

A small Express API that shows token-based authentication with JSON Web Tokens. It comes with a minimal frontend. Built while following the JWT section of John Smilga's Node.js / Express Udemy course.

## Features

- `POST /api/v1/login` checks that `username` and `password` are present and signs a JWT `{ id, username }` that is valid for 30 days.
- `GET /api/v1/dashboard` is protected by an auth middleware. The middleware reads the `Authorization: Bearer <token>` header, runs `jwt.verify` and sets `req.user`.
- The frontend in `public/` submits the login form, stores the token in `localStorage` and requests the dashboard with the token.
- Errors are handled in one place. `BadRequestError` (400) and `UnauthenticatedError` (401) extend `CustomAPIError`. A single error handler turns them into JSON responses, using constants from `http-status-codes`.

## Tech stack

Node.js, Express 4, jsonwebtoken 9, express-async-errors, http-status-codes, dotenv.

## Getting started

```bash
npm install
```

Create a `.env` file:

```
PORT=5000
JWT_SECRET=<long random string>
```

```bash
npm start
```

Open http://localhost:5000 and log in with any username and password to get a token, then click **Get Data**.

## API

| Method | Endpoint             | Auth         | Response                             |
| ------ | -------------------- | ------------ | ------------------------------------ |
| POST   | `/api/v1/login`      | —            | `200 { msg, token }` / `400 { msg }` |
| GET    | `/api/v1/dashboard`  | Bearer token | `200 { msg, secret }` / `401 { msg }` |

## Project structure

```
app.js                 # app setup, middleware order
routes/main.js         # /login, /dashboard (behind auth)
controllers/main.js    # login (jwt.sign), dashboard
middleware/auth.js     # Bearer token check + jwt.verify → req.user
middleware/error-handler.js
errors/                # CustomAPIError, BadRequestError, UnauthenticatedError
public/                # demo frontend
```

> This is a demo. There is no user database: login accepts any credentials.
