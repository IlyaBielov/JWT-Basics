# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context

This is section **05-JWT-Basics** of a Node.js/Express Udemy course. The directory is a *starter* project that Ilya fills in by coding along with the videos. `controllers/main.js`, `routes/main.js` and `middleware/auth.js` begin empty and grow as the section progresses.

A completed reference implementation lives at `../final/` — consult it when you need to see the target architecture or resolve ambiguity about what a lesson is building toward. Do **not** copy-paste from `final/`; Ilya is learning and wants to type the code himself. Offer snippets inline in chat or explain approaches instead.

## Commands

- `npm install` — install dependencies
- `npm start` — runs `nodemon app.js` (auto-reloads on file changes)

There is no lint or test setup in this starter.

## Environment

`.env` (gitignored):
- `PORT=5000` — 3000 is taken by another local project
- `JWT_SECRET` — added during the lessons; used by `jwt.sign` / `jwt.verify`

No database in this section: `db/connect.js` and `mongoose` exist in the starter but are not used.

## Architecture

Express API + static frontend in `public/` (`index.html`, `browser-app.js` — login form that POSTs credentials, stores the token in `localStorage`, then GETs the dashboard with `Authorization: Bearer <token>`).

- **app.js** — loads `dotenv` and `express-async-errors`, serves `public/`, parses JSON, mounts `routes/main.js` at `/api/v1`, then `notFound` and `errorHandler`.
- **routes/main.js** — `POST /login` → `login`; `GET /dashboard` → `authMiddleware`, `dashboard`.
- **controllers/main.js** — `login` validates `username`/`password` (400 if missing) and signs a JWT (`{ id, username }`, `expiresIn`); `dashboard` reads `req.user` and returns a lucky number.
- **middleware/auth.js** — checks `Authorization: Bearer ...`, `jwt.verify`s it, sets `req.user`, calls `next()`; otherwise throws 401.
- **errors/** — `CustomAPIError` base class with `statusCode`; the section refactors it into `BadRequestError` (400) / `UnauthenticatedError` (401) plus an `errors/index.js` barrel, using `http-status-codes`.
- **middleware/error-handler.js** — returns `err.statusCode` + message for `CustomAPIError`, otherwise 500.

## Version differences vs the course

- `jsonwebtoken` is v9 (course uses v8): `sign`/`verify` API used here is the same. A missing `JWT_SECRET` in `.env` throws `secretOrPrivateKey must have a value` → 500.
- `dotenv` 16, `nodemon` 3, `express` 4.21.

## Course workflow

- When Ilya asks for help implementing something, explain the concept and show the code inline — don't write it to his files unless he explicitly asks.
- If he's stuck, compare his code against `../final/` mentally and point out specific differences rather than dumping the whole reference.
- Keep explanations tied to what the current lesson is teaching (JWT sign/verify, Bearer header, auth middleware, custom error classes, status codes).
- After a lesson he runs `/lesson-explain`; he often asks to commit afterwards; push only when he says so.
