# DSA Compass: Smart DSA Revision Tracker

A centralized platform where users track their DSA journey, monitor progress, and revise solved questions systematically.

## MVP Features
- Register, login and logout (logout: the frontend deletes the token)
- Add problems with name, link, topic and difficulty
- Record each attempt with a status: solved independently, solved with a hint, or couldn't solve
- Dashboard showing which problems to revise today
- Total questions solved

## Tech Stack
- Frontend: React
- Backend: Node.js and Express
- Database: MongoDB
- AI: Gemini

## API Routes
- POST /api/auth/register: create an account (name, email, password)
- POST /api/auth/login: log in with email and password
- GET /api/problems: list the user's problems
- POST /api/problems: add a problem
- GET /api/user/dashboard: problems to revise today and total solved

## Data Models
### User
- name: String
- email: String (unique)
- password: String (hashed)

### Problem
TODO

## Revision Rule
TODO

## Later
- Logout with token blacklisting
- AI: weakness analysis and hints without revealing the solution
- AI: help with code