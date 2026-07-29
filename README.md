# Perplexity Clone

Perplexity is a full-stack AI chat application inspired by modern AI assistants. It lets users register and log in, chat with an AI model, receive markdown-formatted answers, and use internet search capabilities for richer responses.

## What this product does

This project combines:
- a React + Vite frontend for the chat experience
- an Express + MongoDB backend for authentication, chat APIs, and real-time sockets
- AI-powered responses using Mistral via LangChain
- internet search integration using Tavily
- email verification for user registration through Gmail OAuth

## Main features

- User registration and login
- Email verification flow
- Protected routes and JWT-based authentication
- Real-time chat experience with Socket.IO
- AI-generated responses with markdown formatting
- Internet search support for up-to-date answers
- Chat history and conversation management

## Project structure

- Backend: server, API routes, models, services, sockets, auth middleware
- Frontend: React app, Redux store, chat UI, routing, API integration

## Prerequisites

Before you start, make sure you have:
- Node.js 18+ recommended
- npm or pnpm
- MongoDB Atlas connection string or a local MongoDB instance
- Mistral API key
- Tavily API key
- Google OAuth credentials for Gmail mail sending

## Environment variables

Create a file named Backend/.env using the values from Backend/.envsample.

Required variables:
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret used for JWT signing
- MISTRAL_API_KEY: API key for the Mistral model
- TAVILY_API_KEY: API key for Tavily internet search
- GOOGLE_CLIENT_ID: Google OAuth client ID
- GOOGLE_CLIENT_SECRET: Google OAuth client secret
- GOOGLE_USER: Gmail address used to send emails
- GOOGLE_REFRESH_TOKEN: Gmail OAuth refresh token

## Backend setup

1. Open the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the sample environment file and update the values:
   ```bash
   copy .envsample .env
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend runs on port 3000 by default.

## Frontend setup

1. Open the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs on Vite and is usually available at http://localhost:5173.

## Important packages

### Backend
- express: web server and API routing
- mongoose: MongoDB object modeling
- jsonwebtoken: JWT authentication
- bcrypt: password hashing
- cookie-parser: cookie-based auth support
- cors: cross-origin resource sharing for frontend requests
- socket.io: real-time chat communication
- nodemailer: email sending for verification
- dotenv: environment variable loading
- langchain: AI agent orchestration
- @langchain/mistralai: Mistral model integration
- @tavily/core: internet search integration
- zod: schema validation for tool inputs

### Frontend
- react: UI library
- react-dom: React rendering
- react-redux and @reduxjs/toolkit: global state management
- axios: API requests
- socket.io-client: frontend socket connection
- react-markdown and remark-gfm: markdown rendering and GitHub-flavored markdown support
- tailwindcss: styling
- vite: fast frontend build tool

## Notes

- The app is configured to allow requests from http://localhost:5173 in development.
- Email verification requires valid Gmail OAuth credentials; if those are not configured, registration may fail at the email step.
- You may need to adjust the frontend/backend URLs if you run the app on different ports or hosts.
