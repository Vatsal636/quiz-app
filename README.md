# QuizHub

QuizHub is a full-stack quiz web application featuring a React + Vite frontend and a Node.js + Express backend.

## Project Structure

- `backend/`: Node.js + Express REST API serving quiz data.
- `quizapp/`: React + Vite frontend application.

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and adjust if needed:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd quizapp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` to connect to the backend:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.
