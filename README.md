# Bank API

A simple Node.js / Express bank backend with MongoDB for user authentication, account management, and transaction processing.

## Features

- User registration and login using JWT
- Cookie-based authentication support
- Protected account creation and retrieval routes
- Account balance lookup
- Transaction creation with idempotency support
- System-only endpoint for initial fund transfers

## Technologies

- Node.js
- Express
- MongoDB / Mongoose
- JSON Web Tokens
- bcrypt for password hashing
- dotenv for environment configuration

## Requirements

- Node.js 18+ (or compatible)
- MongoDB instance or Atlas cluster

## Setup

1. Install dependencies

```bash
cd bank
npm install
```

2. Create a `.env` file in the `bank` folder with:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the server

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

The server listens on port `3000` by default.

## API Endpoints

### Auth

- `POST /api/auth/register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "secret" }`
  - Response: created user and JWT token

- `POST /api/auth/login`
  - Body: `{ "email": "john@example.com", "password": "secret" }`
  - Response: user and JWT token

- `POST /api/auth/logout`
  - Clears the auth cookie

### Accounts

All account endpoints require authentication via cookie or `Authorization: Bearer <token>`.

- `POST /api/accounts/`
  - Creates a new account for the authenticated user

- `GET /api/accounts/`
  - Returns all accounts belonging to the authenticated user

- `GET /api/accounts/balance/:accountId`
  - Returns the balance for the specified account if it belongs to the authenticated user

### Transactions

All transaction endpoints require authentication.

- `POST /api/transactions/`
  - Body: `{ "fromAccount": "<id>", "toAccount": "<id>", "amount": 100, "idempotencyKey": "unique-key" }`
  - Creates a transfer transaction between accounts

- `POST /api/transactions/system/initial-funds`
  - Protected route for system users only
  - Body: `{ "toAccount": "<id>", "amount": 1000, "idempotencyKey": "unique-key" }`

## Notes

- The app uses `token` cookie storage for JWT authentication.
- Passwords are hashed using `bcrypt`.
- The transaction endpoint includes idempotency checking and account status validation.
- The system funds route requires a user whose `systemUser` flag is `true`.

## Project Structure

- `server.js` — entry point
- `src/app.js` — Express app and routes
- `src/config/db.js` — MongoDB connection
- `src/routes/` — route definitions
- `src/controllers/` — request handlers
- `src/middleware/auth.middleware.js` — JWT auth middleware
- `src/models/` — Mongoose schemas
