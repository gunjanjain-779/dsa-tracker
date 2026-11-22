# DSA Compass: Smart DSA Revision Tracker
 
A centralized platform where users track their DSA journey, monitor progress, and revise solved questions on a smart schedule.
 
## The Problem
 
Solving a DSA problem once is not enough. Most students forget problems within weeks, and they have no system to decide what to revise and when. DSA Compass records every attempt and automatically schedules the next revision, so old problems come back at the right time.
 
## MVP Features
 
- Register, login and logout using JWT stored in an httpOnly cookie
- Add problems with title, link, topic and difficulty
- Record each attempt with a result: solved alone, solved with a hint, or couldn't solve
- Automatic revision scheduling based on the result
- "Today's revision" list showing what is due
- Basic stats: total solved and problems by topic
## Tech Stack
 
- Frontend: React
- Backend: Node.js and Express
- Database: MongoDB with Mongoose
- Auth: JWT in an httpOnly cookie, passwords hashed with bcryptjs
- AI (later): Gemini
## Data Models
 
### User
 
- `name`: String (required)
- `email`: String (required, unique, lowercase)
- `password`: String (required, hashed)
- `createdAt`, `updatedAt`: Date (added by Mongoose)
### Problem
 
- `user`: ObjectId, reference to User (required)
- `title`: String (required), for example "Two Sum"
- `link`: String, the URL of the problem. The frontend chooses the site icon from the domain.
- `topic`: String, for example "Arrays" or "Binary Search"
- `difficulty`: String, one of `Easy`, `Medium`, `Hard`
- `status`: String, one of `not_attempted`, `solved_alone`, `solved_with_hint`, `could_not_solve`. Defaults to `not_attempted`.
- `stage`: Number, position on the revision ladder. Defaults to 0.
- `nextRevisionDate`: Date. Empty until the first attempt.
- `attempts`: array of objects, each with:
  - `date`: Date
  - `result`: String, one of `solved_alone`, `solved_with_hint`, `could_not_solve`
- `createdAt`, `updatedAt`: Date (added by Mongoose)
A problem counts as solved if its latest attempt is `solved_alone` or `solved_with_hint`.
 
## Revision Rule
 
The revision ladder is `[1, 3, 7, 14, 30]` days, and `stage` is the position on it.
 
| Result | New stage | Next revision date |
| --- | --- | --- |
| Solved alone | stage + 1 (stops at the last step) | today + the gap at the new stage |
| Solved with a hint | stays the same | today + the gap at the current stage |
| Couldn't solve | reset to 0 | tomorrow |
 
A newly added problem has status `not_attempted`, stage 0 and no `nextRevisionDate`. It appears in the "not attempted" list and not in today's revision.
 
## API Routes
 
All `/api/problems` and `/api/stats` routes require a logged-in user (valid cookie).
 
### Auth
 
| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account (name, email, password) |
| POST | `/api/auth/login` | Log in with email and password, sets the cookie |
| POST | `/api/auth/logout` | Clears the cookie |
| GET | `/api/auth/me` | Returns the logged-in user |
 
### Problems
 
| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/problems` | Add a problem |
| GET | `/api/problems` | List the user's problems (filters: topic, difficulty, status) |
| GET | `/api/problems/today` | Problems due for revision today or overdue |
| POST | `/api/problems/:id/attempt` | Record an attempt and update the schedule |
 
### Stats
 
| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/stats` | Total solved, counts by topic and status |
 
## Project Structure
 
```
backend/
  src/
    config/        database connection
    controllers/   request handling and logic
    middleware/    auth, validation, error handling
    models/        Mongoose schemas
    routes/        route definitions
    server.js      app entry point
```
 
## Getting Started
 
1. Clone the repo and go to the backend folder:
```
cd backend
npm install
```
2. Create a `.env` file in `backend` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=a_long_random_string
NODE_ENV=development
```
3. Start the server:
```
npm run dev
```
4. Check that `http://localhost:5000/health` returns `{"status":"ok"}`.
## Later
 
- Logout with token blacklisting, or refresh tokens
- AI: weakness analysis and hints that don't reveal the solution
- AI: help with code
- Dashboard charts and streaks
- Notes per problem
 