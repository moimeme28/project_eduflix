# EduFlix — Full Project Documentation

> An educational movie and TV series recommendation platform helping students, teachers, and lifelong learners discover curated content tailored to their subjects, learning levels, and formats.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [Project Structure](#6-project-structure)
7. [Frontend](#7-frontend)
   - [Routing](#71-routing)
   - [Global State (App.js)](#72-global-state-appjs)
   - [Components](#73-components)
   - [Data Layer](#74-data-layer)
   - [Services](#75-services)
   - [Styling](#76-styling)
8. [Backend](#8-backend)
   - [Server Setup](#81-server-setup)
   - [Database Models](#82-database-models)
   - [API Routes](#83-api-routes)
   - [Middleware](#84-middleware)
9. [API Reference](#9-api-reference)
10. [Data Reference](#10-data-reference)
11. [User Roles & Permissions](#11-user-roles--permissions)
12. [Authentication Flow](#12-authentication-flow)
13. [Educational Features](#13-educational-features)
14. [Design System](#14-design-system)
15. [Security](#15-security)
16. [Development Scripts](#16-development-scripts)
17. [Troubleshooting](#17-troubleshooting)

---

## 1. Project Overview

EduFlix is a full-stack web application built with **React** (frontend) and **Express + MongoDB** (backend). It mirrors a Netflix-style browsing experience but focuses entirely on educational content — documentaries, films, series, biographies, and more — organized by academic subject, topic, learning level, and format.

### Core Goals

- Help students discover educational media aligned with their curriculum
- Give teachers tools to assign and track educational content for their classes
- Enable lifelong learners to explore curated content across 10 subject areas
- Provide AI-assisted recommendations and personalized study guidance

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                  │
│   React 18 + React Router 6 + Tailwind CSS          │
│   State: useState / useEffect (App.js)              │
│   Animations: Framer Motion                          │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP (Axios) / WebSocket (Socket.io)
┌──────────────────────▼──────────────────────────────┐
│               Backend (Express 4)                    │
│   Port: 5000                                         │
│   Auth: JWT + bcrypt                                 │
│   Rate Limiting: express-rate-limit (100 req/15min)  │
│   Security: Helmet, CORS                             │
│   Real-time: Socket.io                               │
│   Logging: Winston                                   │
└──────────────────────┬──────────────────────────────┘
                       │ Mongoose ODM
┌──────────────────────▼──────────────────────────────┐
│                  MongoDB Database                    │
│   Collections: users, educationalmovies             │
└─────────────────────────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
   TMDB API (v3)           Google AI API
   Movie metadata          AI chat assistant
```

---

## 3. Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | ^18.2.0 | UI framework |
| React Router DOM | ^6.20.0 | Client-side routing |
| Tailwind CSS | ^3.3.0 | Utility-first styling |
| Framer Motion | ^10.16.0 | Animations and transitions |
| Lucide React | ^0.300.0 | Icon library |
| Recharts | ^2.10.0 | Data visualization / charts |
| Axios | ^1.6.0 | HTTP requests |
| date-fns | ^2.30.0 | Date formatting utilities |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Express | ^4.18.2 | Web server framework |
| Mongoose | ^7.6.3 | MongoDB ODM |
| bcryptjs | ^2.4.3 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT-based authentication |
| helmet | ^7.1.0 | HTTP security headers |
| express-rate-limit | ^7.1.5 | API rate limiting |
| socket.io | ^4.7.2 | Real-time WebSocket communication |
| winston | ^3.10.0 | Server logging |
| express-validator | — | Request body validation |
| cors | — | Cross-origin resource sharing |
| dotenv | — | Environment variable management |

### External APIs

| API | Usage |
|---|---|
| TMDB (The Movie Database) | Movie metadata, posters, trailers |
| Google AI API | AI Assistant chatbot (frontend integration) |

---

## 4. Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- MongoDB instance (local or Atlas)
- TMDB API key (optional — enhances movie data)

### Frontend Setup

```bash
# 1. Navigate to the project root
cd project_eduflix

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env
# Then edit .env and fill in your API keys

# 4. Start the development server
npm start
# App runs at http://localhost:3000
```

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd project_eduflix/backend

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env
# Then edit .env with your MongoDB URI, JWT secret, etc.

# 4. Start the backend server (with hot reload)
npm run dev
# API runs at http://localhost:5000
```

---

## 5. Environment Variables

### Frontend (`project_eduflix/.env`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `REACT_APP_API_URL` | No | Backend API base URL | `http://localhost:5000` |
| `REACT_APP_TMDB_API_KEY` | No | TMDB API key for movie data | `your_tmdb_key` |
| `REACT_APP_TMDB_BASE_URL` | No | TMDB base URL | `https://api.themoviedb.org/3` |
| `REACT_APP_GOOGLE_AI_API_KEY` | No | Google AI API key for chatbot | `your_google_ai_key` |

### Backend (`project_eduflix/backend/.env`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `MONGODB_URI` | **Yes** | MongoDB connection string | `mongodb://localhost:27017/eduflix` |
| `JWT_SECRET` | **Yes** | Secret for signing JWT tokens | `a_long_random_string` |
| `PORT` | No | Server port | `5000` |
| `FRONTEND_URL` | No | Frontend URL for CORS | `http://localhost:3000` |
| `TMDB_API_KEY` | No | TMDB API key | `your_tmdb_key` |

---

## 6. Project Structure

```
project_eduflix/
├── .env                        # Active environment variables
├── .env.example                # Environment variable template
├── .gitignore
├── package.json                # Frontend dependencies & scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Quick-start readme
├── DOCUMENTATION.md            # This file
│
├── public/                     # CRA static assets
│   └── index.html
│
├── src/                        # Frontend React source
│   ├── index.js                # React DOM entry point
│   ├── index.css               # Global styles (Tailwind + custom)
│   ├── App.js                  # Root component, routing, global state
│   │
│   ├── components/             # All React page/UI components
│   │   ├── Navbar.js           # Top navigation bar
│   │   ├── Home.js             # Landing page (hero + features)
│   │   ├── SubjectSelection.js # Subject category browser
│   │   ├── TopicSelection.js   # Topic drill-down per subject
│   │   ├── Recommendations.js  # Movie recommendation grid
│   │   ├── MovieDetails.js     # Full movie detail view
│   │   ├── StudentDashboard.js # Student stats & progress
│   │   ├── TeacherDashboard.js # Teacher class management
│   │   ├── AIAssistant.js      # Floating AI chatbot modal
│   │   ├── Login.js            # Login form
│   │   ├── Signup.js           # Signup form with role selection
│   │   ├── Profile.js          # User profile & settings
│   │   ├── AdvancedSearch.js   # Advanced search with filters
│   │   └── Dashboard.js        # Legacy/generic dashboard
│   │
│   ├── data/
│   │   └── subjects.js         # Subject categories, topics, levels, formats
│   │
│   └── services/
│       └── eduflixService.js   # API service layer (TMDB + backend calls)
│
└── backend/                    # Express.js backend
    ├── package.json            # Backend dependencies & scripts
    └── src/
        ├── app.js              # Express app + Socket.io server entry
        ├── models/
        │   ├── User.js         # Mongoose User schema
        │   └── Movie.js        # Mongoose EducationalMovie schema
        ├── routes/
        │   ├── auth.js         # POST /api/auth/* (register, login, etc.)
        │   ├── users.js        # GET/PUT /api/users/* (profile, stats, etc.)
        │   ├── movies.js       # GET/POST /api/movies/* (CRUD, watchlist)
        │   ├── recommendations.js  # GET /api/recommendations/*
        │   └── ai.js           # POST /api/ai/* (chat, summary, quiz)
        ├── controllers/
        │   └── authController.js   # Auth business logic
        ├── middleware/
        │   ├── auth.js         # JWT authentication middleware
        │   └── errorHandler.js # Global error handler
        └── utils/
            ├── database.js     # MongoDB connection utility
            └── logger.js       # Winston logger configuration
```

---

## 7. Frontend

### 7.1 Routing

Routing is handled by **React Router DOM v6** in `App.js`. All routes are defined within a single `<Router>`.

| Path | Component | Auth Required | Description |
|---|---|---|---|
| `/` | `Home` | No | Landing page |
| `/subjects` | `SubjectSelection` | No | Browse subject categories |
| `/topics/:subjectId` | `TopicSelection` | No | Browse topics for a subject |
| `/recommendations` | `Recommendations` | No | Movie recommendations grid |
| `/movie/:id` | `MovieDetails` | No | Detailed movie view |
| `/dashboard` | `StudentDashboard` or `TeacherDashboard` | Soft | Role-based dashboard |
| `/login` | `Login` | No | Login page |
| `/signup` | `Signup` | No | Registration page |
| `/profile` | `Profile` | Soft | User profile & settings |
| `*` | Redirect to `/` | — | Catch-all fallback |

> **Note:** "Soft" auth means the component renders for unauthenticated users but shows limited functionality. The `user` object is passed down as a prop.

### 7.2 Global State (App.js)

`App.js` is the root component that manages global application state and passes it down as props.

| State Variable | Type | Default | Description |
|---|---|---|---|
| `user` | Object \| null | `null` | Logged-in user object (persisted to `localStorage`) |
| `selectedSubject` | Object \| null | `null` | Currently selected subject category |
| `selectedTopic` | Object \| null | `null` | Currently selected topic within a subject |
| `selectedLevel` | string | `'intermediate'` | Active learning level filter |
| `selectedFormat` | string | `'documentary'` | Active content format filter |
| `recommendations` | Array | `[]` | Current list of recommended movies |
| `loading` | boolean | `false` | Loading state for recommendations fetch |
| `showAI` | boolean | `false` | Toggle for the AI Assistant modal |

**Key behaviors:**
- User session is persisted to and restored from `localStorage` under key `eduflix_user`.
- Recommendations automatically reload when `selectedLevel` or `selectedFormat` change (via `useEffect`).
- The `TopicSelectionWrapper` component reads `:subjectId` from the URL to sync the subject state when navigating directly to a topic URL.

### 7.3 Components

#### `Navbar.js`
Top navigation bar displayed on all pages.
- **Props:** `user`, `onLogout`, `onAI`
- Shows user name and role if logged in; shows login/signup links otherwise.
- Contains the AI Assistant trigger button.

#### `Home.js`
Landing page with a hero section, feature highlights, and subject category preview.
- No props required.
- Links users into the `/subjects` browse flow.

#### `SubjectSelection.js`
Displays a grid of all subject categories for the user to choose from.
- **Props:** `categories` (array of subjects), `onSelect` (callback)
- On selection, navigates to `/topics/:subjectId`.

#### `TopicSelection.js`
Shows topics and subtopics for a specific subject.
- **Props:** `subject` (subject object), `onSelect` (callback)
- On topic selection, triggers `loadRecommendations` in `App.js` and navigates to `/recommendations`.

#### `Recommendations.js`
Renders the filtered movie recommendation grid.
- **Props:** `subject`, `topic`, `level`, `format`, `movies`, `loading`, `onLevelChange`, `onFormatChange`
- Contains level and format filter controls.
- Each movie card links to `/movie/:id`.

#### `MovieDetails.js`
Full detail view for an individual educational movie.
- **Props:** None (reads `:id` from URL params)
- Displays: poster, synopsis, educational metadata (learning objectives, key concepts, vocabulary, discussion questions, quiz).

#### `StudentDashboard.js`
Personal learning dashboard for students.
- **Props:** `user`
- Displays: learning streak, hours watched, subjects explored, completed courses, achievements, watchlist, progress charts (Recharts).

#### `TeacherDashboard.js`
Classroom management dashboard for teachers.
- **Props:** `user`
- Displays: classes managed, student list, assignments, student progress overview.

#### `AIAssistant.js`
Floating modal chatbot powered by the Google AI API.
- **Props:** `onClose`
- Sends messages to the AI and displays conversational responses with recommendation guidance.
- Triggered by the AI button in `Navbar`.

#### `Login.js`
Login form with email/password fields.
- **Props:** `onLogin` (callback with user data)
- On success, calls `handleLogin` in `App.js` which persists the session.

#### `Signup.js`
Registration form with name, email, password, and role selection (Student / Teacher).
- **Props:** `onLogin` (callback — auto-logs in after signup)

#### `Profile.js`
User profile page with editable name, bio, avatar, subject preferences, and notification settings.
- **Props:** `user`

#### `AdvancedSearch.js`
Advanced search interface with multiple simultaneous filters (subject, level, format, keyword).

### 7.4 Data Layer

#### `src/data/subjects.js`

Exports three main constants used throughout the app:

**`SUBJECT_CATEGORIES`** — Array of 10 subject objects:

| Subject | ID | Topics |
|---|---|---|
| Science | `science` | Biology, Chemistry, Physics, Environmental Science, Astronomy, Genetics, Microbiology, Anatomy |
| Mathematics | `mathematics` | Algebra, Geometry, Calculus, Statistics, Probability |
| Technology | `technology` | Computer Science, Programming, AI, Cybersecurity, Robotics, Data Science |
| Engineering | `engineering` | Mechanical, Civil, Electrical, Aerospace, Biomedical |
| Social Sciences | `social-sciences` | History, Geography, Economics, Sociology, Political Science, Government |
| Health | `health` | Medicine, Nursing, Psychology, Public Health, Nutrition |
| Business | `business` | Entrepreneurship, Marketing, Accounting, Finance, Leadership |
| Arts | `arts` | Literature, Philosophy, Languages, Music, Art History |
| Environment | `environment` | Climate Change, Conservation, Renewable Energy |
| Life Skills | `life-skills` | Personal Finance, Public Speaking, Critical Thinking, Communication, Productivity |

Each subject object shape:
```js
{
  id: string,
  name: string,
  icon: string,      // emoji
  color: string,     // hex color
  topics: [
    {
      id: string,
      name: string,
      subtopics: string[]
    }
  ]
}
```

**`LEARNING_LEVELS`** — 4 levels:

| ID | Name | Description |
|---|---|---|
| `beginner` | Beginner | New to the subject |
| `intermediate` | Intermediate | Some foundational knowledge |
| `advanced` | Advanced | Deep understanding expected |
| `professional` | Professional | Expert-level content |

**`LEARNING_FORMATS`** — 9 formats:

| ID | Name |
|---|---|
| `movie` | Movie |
| `tv-series` | TV Series |
| `documentary` | Documentary |
| `animated-film` | Animated Film |
| `historical-drama` | Historical Drama |
| `biography` | Biography |
| `based-on-real-events` | Based on Real Events |
| `short-film` | Short Film |
| `mini-series` | Mini Series |

### 7.5 Services

#### `src/services/eduflixService.js`

Service module that abstracts all external API calls. Consumed by `App.js` to load recommendations.

**Primary method:**
```js
eduflixService.getEducationalMovies(subjectId, topicId, level, format)
// Returns: Promise<Array<MovieObject>>
```

Internally, this service integrates with:
- The **TMDB API** (using `REACT_APP_TMDB_API_KEY`) to fetch real movie/documentary data
- The backend `/api/movies` and `/api/recommendations` endpoints
- Falls back to curated static data when APIs are unavailable

### 7.6 Styling

EduFlix uses **Tailwind CSS v3** with a custom theme defined in `tailwind.config.js`.

**Custom Color Palette:**

| Token | Usage |
|---|---|
| `primary-*` | Sky-blue scale for interactive elements, buttons, links |
| `dark-bg` | Main page background |
| `dark-surface` | Card and panel backgrounds |
| `dark-card` | Elevated card background |
| `dark-border` | Border and divider color |
| `dark-text` | Body text color |

**Custom Fonts:**

| Font | Tailwind Class | Usage |
|---|---|---|
| Inter | `font-sans` | Body and UI text |
| Cinzel | `font-display` | Hero headings and titles |

**Custom Animations:**

| Name | Description |
|---|---|
| `fade-in` | Opacity 0 → 1 entry |
| `slide-up` | Translate Y up + fade in |
| `scale-in` | Scale 0.95 → 1 + fade in |
| `pulse-slow` | Slow pulse effect |

---

## 8. Backend

### 8.1 Server Setup

**Entry point:** `backend/src/app.js`

The backend uses Express 4 with an HTTP server wrapped by Socket.io. On startup it:
1. Loads environment variables via `dotenv`
2. Applies middleware: `helmet`, `cors`, `express.json`, rate limiter
3. Mounts all route modules under `/api/`
4. Connects to MongoDB via `connectDatabase()`
5. Starts the HTTP + WebSocket server

**Rate Limiting:** 100 requests per IP per 15-minute window on all `/api/` routes.

**Socket.io Events:**

| Event | Direction | Description |
|---|---|---|
| `connection` | Server ← Client | New WebSocket connection established |
| `join_user_room` | Server ← Client | Client joins a personal room (`user_<userId>`) |
| `disconnect` | Server ← Client | Client disconnected |

### 8.2 Database Models

#### `User` Model (`backend/src/models/User.js`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | String | Yes | Unique, lowercased |
| `password` | String | Yes | Min 6 chars, bcrypt hashed (salt rounds: 10) |
| `name` | String | Yes | |
| `role` | String | Yes | Enum: `student`, `teacher`, `admin`. Default: `student` |
| `avatar` | String | No | URL to avatar image |
| `bio` | String | No | Max 500 chars |
| `joinDate` | Date | No | Default: now |
| `preferences.favoriteSubjects` | [String] | No | Array of subject names |
| `preferences.learningLevel` | String | No | Enum of 6 levels. Default: `Lifelong Learner` |
| `preferences.preferredFormat` | [String] | No | Array of format names |
| `preferences.theme` | String | No | `light` or `dark`. Default: `dark` |
| `preferences.notifications.*` | Boolean | No | `newRecommendations`, `learningReminders`, `progressReports` |
| `learningStats.hoursWatched` | Number | No | Default: 0 |
| `learningStats.subjectsExplored` | Number | No | Default: 0 |
| `learningStats.completedCourses` | Number | No | Default: 0 |
| `learningStats.learningStreak` | Number | No | Consecutive days active |
| `learningStats.lastActiveDate` | Date | No | Used to calculate streak |
| `learningStats.watchlist` | [ObjectId] | No | Refs to `EducationalMovie` |
| `learningStats.watched` | [ObjectId] | No | Refs to `EducationalMovie` |
| `learningStats.savedPlaylists` | [Object] | No | `{ name, movies[] }` |
| `teacherData.classes` | [Object] | No | `{ name, students[], assignments[] }` |
| `achievements` | [ObjectId] | No | Refs to `Achievement` model |
| `subscription.type` | String | No | `free` or `premium`. Default: `free` |
| `subscription.expires` | Date | No | null for free tier |

**Hooks & Methods:**
- `pre('save')`: Auto-hashes password with bcrypt when modified
- `comparePassword(candidatePassword)`: Returns boolean for login validation
- `toJSON()`: Strips `password` field from serialized output

#### `EducationalMovie` Model (`backend/src/models/Movie.js`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | String | Yes | |
| `synopsis` | String | Yes | Max 1000 chars |
| `genre` | String | Yes | Enum: Documentary, Drama, Biography, History, Science, Technology, Nature, Animation, Adventure |
| `year` | Number | Yes | 1900 to current year + 5 |
| `duration` | Number | Yes | Minutes |
| `director` | String | No | |
| `cast` | [String] | No | |
| `subject` | String | Yes | Enum of 12 subjects |
| `topics` | [String] | No | Specific topics covered |
| `learningLevel` | String | Yes | Enum of 6 levels |
| `format` | String | Yes | Enum: Documentary, Movie, TV Series, Mini-Series, Lecture, Animation |
| `educationalTags` | [String] | No | |
| `learningObjectives` | [String] | No | |
| `keyConcepts` | [String] | No | |
| `discussionQuestions` | [String] | No | |
| `vocabulary` | [{ term, definition }] | No | Key terms with definitions |
| `quiz` | [{ question, options, correctAnswer }] | No | Multiple-choice questions |
| `summary` | String | No | AI-generated summary |
| `streaming` | [String] | No | Available platforms (Netflix, YouTube, etc.) |
| `rating` | Number | No | 0–10 scale |
| `poster` | String | No | URL |
| `trailer` | String | No | URL |
| `popularity` | Number | No | Default: 0 |
| `releaseDate` | Date | Yes | |
| `tmdbId` | String | No | Unique, sparse |
| `imdbId` | String | No | Unique, sparse |
| `youtubeId` | String | No | |

**Database Indexes:**
- `{ subject: 1, learningLevel: 1 }` — Primary filter query
- `{ title: 'text', synopsis: 'text' }` — Full-text search
- `{ popularity: -1 }` — Default sort order
- `{ topics: 1 }` — Topic filter
- `{ format: 1 }` — Format filter

### 8.3 API Routes

All routes are prefixed with `/api/`.

#### Auth Routes (`/api/auth`)
No authentication required unless noted.

| Method | Path | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ email, password, name, role? }` | Register new user |
| POST | `/api/auth/login` | `{ email, password }` | Login, returns JWT |
| POST | `/api/auth/logout` | — | Logout (clears session) |
| POST | `/api/auth/verify` | `{ token }` | Verify a JWT token |

**Register validation:** email format, password ≥ 6 chars, name non-empty, role in enum.

#### Movie Routes (`/api/movies`)

| Method | Path | Auth | Query Params | Description |
|---|---|---|---|---|
| GET | `/api/movies` | No | `subject`, `learningLevel`, `format`, `topic`, `page`, `limit` | List movies with filters + pagination |
| GET | `/api/movies/:id` | No | — | Get single movie by MongoDB ID |
| GET | `/api/movies/search/query` | No | `q`, `page`, `limit` | Full-text search |
| POST | `/api/movies/:id/watchlist` | **Yes** | — | Add movie to user's watchlist |
| DELETE | `/api/movies/:id/watchlist` | **Yes** | — | Remove from watchlist |
| POST | `/api/movies/:id/watched` | **Yes** | — | Mark as watched (+2 hrs to stats) |

Pagination response shape:
```json
{
  "movies": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### Recommendation Routes (`/api/recommendations`)

| Method | Path | Auth | Query Params | Description |
|---|---|---|---|---|
| GET | `/api/recommendations` | **Yes** | `subject`, `topic`, `learningLevel`, `format`, `limit` | Personalized recommendations (uses user preferences, excludes watched) |
| GET | `/api/recommendations/subject/:subject` | No | `learningLevel`, `limit` | Recommendations by subject |
| GET | `/api/recommendations/trending/all` | No | `limit` | Trending/most popular movies |
| GET | `/api/recommendations/similar/:id` | No | — | Movies similar to given ID (same subject, topics, or level) |

#### User Routes (`/api/users`)
All routes require authentication (`authMiddleware`).

| Method | Path | Body | Description |
|---|---|---|---|
| GET | `/api/users/profile` | — | Get current user's profile |
| PUT | `/api/users/profile` | `{ name?, bio?, avatar? }` | Update profile |
| PUT | `/api/users/preferences` | `{ favoriteSubjects?, learningLevel?, preferredFormat?, theme?, notifications? }` | Update preferences |
| GET | `/api/users/stats` | — | Get learning statistics |
| POST | `/api/users/progress` | `{ hoursWatched?, subjectsExplored?, completedCourses? }` | Update progress + streak |
| GET | `/api/users/watchlist` | — | Get watchlist (populated) |
| GET | `/api/users/watched` | — | Get watch history (populated) |
| POST | `/api/users/playlists` | `{ name, movieIds? }` | Create a playlist |
| GET | `/api/users/playlists` | — | Get all playlists (populated) |
| GET | `/api/users/teacher/data` | — | Get teacher class data (teacher role only) |
| POST | `/api/users/teacher/classes` | `{ name }` | Create a new class (teacher role only) |

#### AI Routes (`/api/ai`)
All routes require authentication.

| Method | Path | Body | Description |
|---|---|---|---|
| POST | `/api/ai/chat` | `{ message, context? }` | AI chatbot conversation |
| POST | `/api/ai/summary/:movieId` | — | Generate/retrieve educational summary |
| POST | `/api/ai/quiz/:movieId` | — | Generate/retrieve 4-question quiz |

> **Note:** Currently, the AI routes use template-based response generation. In production, these would call an external AI API (OpenAI, Anthropic, etc.).

#### Health Check

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Returns server status, timestamp, uptime |

### 8.4 Middleware

#### `authMiddleware` (`backend/src/middleware/auth.js`)
Validates the Bearer JWT token from the `Authorization` header. Attaches the decoded user payload to `req.user`.

#### `errorHandler` (`backend/src/middleware/errorHandler.js`)
Global Express error handler. Catches unhandled errors and returns a standardized JSON error response.

---

## 9. API Reference

### Request Headers

For authenticated endpoints:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Common Response Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request / validation error |
| 401 | Unauthorized (missing or invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Resource not found |
| 429 | Too many requests (rate limit exceeded) |
| 500 | Internal server error |

### Example: Register & Login Flow

**Register:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "securepass123",
  "name": "Alex Johnson",
  "role": "student"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6571abc...",
    "name": "Alex Johnson",
    "email": "student@example.com",
    "role": "student"
  }
}
```

---

## 10. Data Reference

### Subject-to-Topics Mapping (Summary)

| Subject | Key Topics |
|---|---|
| Science | Biology, Chemistry, Physics, Astronomy, Genetics, Anatomy |
| Mathematics | Algebra, Calculus, Statistics, Geometry, Probability |
| Technology | Computer Science, AI, Programming, Cybersecurity, Data Science |
| Engineering | Mechanical, Civil, Electrical, Aerospace, Biomedical |
| Social Sciences | History, Geography, Economics, Sociology, Political Science |
| Health | Medicine, Psychology, Nutrition, Public Health, Nursing |
| Business | Entrepreneurship, Finance, Marketing, Leadership |
| Arts | Literature, Philosophy, Music, Art History, Languages |
| Environment | Climate Change, Conservation, Renewable Energy |
| Life Skills | Personal Finance, Public Speaking, Critical Thinking |

### Streaming Platforms Supported

Netflix, Hulu, Disney+, Amazon Prime, HBO Max, YouTube, Kanopy, CuriosityStream, PBS, BBC

---

## 11. User Roles & Permissions

| Feature | Student | Teacher | Admin |
|---|---|---|---|
| Browse subjects & topics | ✅ | ✅ | ✅ |
| View recommendations | ✅ | ✅ | ✅ |
| View movie details | ✅ | ✅ | ✅ |
| Add to watchlist | ✅ | ✅ | ✅ |
| Mark as watched | ✅ | ✅ | ✅ |
| Create playlists | ✅ | ✅ | ✅ |
| View student dashboard | ✅ | — | ✅ |
| View teacher dashboard | — | ✅ | ✅ |
| Create classes | — | ✅ | ✅ |
| Assign content to students | — | ✅ | ✅ |
| Access AI assistant | ✅ | ✅ | ✅ |
| Manage users/content | — | — | ✅ |

The `/dashboard` route automatically redirects based on role:
- `user.role === 'teacher'` → `TeacherDashboard`
- All others → `StudentDashboard`

---

## 12. Authentication Flow

```
1. User submits login form (Login.js)
        ↓
2. POST /api/auth/login with { email, password }
        ↓
3. Backend validates credentials via bcrypt.compare()
        ↓
4. Backend signs JWT with user ID + role (secret: JWT_SECRET)
        ↓
5. Frontend receives { token, user }
        ↓
6. App.js calls handleLogin(userData)
        ↓
7. user state is set, localStorage.setItem('eduflix_user', ...)
        ↓
8. On page refresh: useEffect reads localStorage, restores session
        ↓
9. Logout: handleLogout() clears state + localStorage
```

For API calls requiring auth, the JWT is sent in the `Authorization: Bearer <token>` header by the Axios service layer.

---

## 13. Educational Features

### Learning Metadata (per movie)

Each `EducationalMovie` document can contain a full learning package:

| Field | Description |
|---|---|
| `learningObjectives` | Array of learning goals (e.g., "Understand the water cycle") |
| `keyConcepts` | Array of core concepts covered |
| `discussionQuestions` | Prompts for classroom or self-reflection |
| `vocabulary` | Array of `{ term, definition }` objects |
| `quiz` | Array of multiple-choice questions with `correctAnswer` index |
| `summary` | AI-generated or curated text summary |

### Progress Tracking (Student)

The `learningStats` sub-document tracks:

| Metric | How It Updates |
|---|---|
| `hoursWatched` | +2 hours per movie marked as watched |
| `subjectsExplored` | Incremented via `/api/users/progress` |
| `completedCourses` | Incremented via `/api/users/progress` |
| `learningStreak` | +1 if active on consecutive days, resets if gap > 1 day |
| `lastActiveDate` | Updated every time `/api/users/progress` is called |

### AI Chat Responses (Current Implementation)

The AI assistant provides rule-based responses for:
- Recommendation requests (generic or subject-specific)
- Subject-specific queries (biology, history, etc.)
- Study plan / learning path requests
- General learning guidance

In a production deployment, the AI routes would integrate with **OpenAI GPT** or **Google Gemini** to provide dynamic, contextual responses.

---

## 14. Design System

EduFlix follows a **Netflix-inspired dark mode** design language with glassmorphism accents.

### Principles

- **Dark First:** All components are designed for dark backgrounds
- **Glass Cards:** Semi-transparent cards with `backdrop-blur` and subtle borders
- **Gradient Accents:** Sky-blue to purple gradients on CTAs and featured elements
- **Motion:** Framer Motion for page transitions, card entrances, and hover states

### Breakpoints (Tailwind defaults)

| Name | Min Width | Usage |
|---|---|---|
| `sm` | 640px | Mobile landscape, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

### Accessibility

- Minimum 44×44px touch targets on interactive elements
- Semantic HTML elements used throughout components
- Alt text provided for images
- Focus-visible styles preserved

---

## 15. Security

| Measure | Implementation |
|---|---|
| Password hashing | bcrypt with salt rounds = 10 |
| JWT authentication | `jsonwebtoken`, signed with `JWT_SECRET` |
| HTTP security headers | `helmet` middleware |
| CORS | Configured to allow only `FRONTEND_URL` origin |
| Rate limiting | 100 requests / IP / 15 minutes on all `/api/` routes |
| Input validation | `express-validator` on auth routes |
| Request size limit | 10MB cap on JSON and URL-encoded bodies |
| Credential exclusion | `toJSON()` strips `password` from all User serializations |

---

## 16. Development Scripts

### Frontend (`project_eduflix/`)

```bash
npm start         # Start development server (http://localhost:3000)
npm run build     # Production build to /build
npm test          # Run test suite (Jest + React Testing Library)
npm run eject     # Eject from Create React App (irreversible)
```

### Backend (`project_eduflix/backend/`)

```bash
npm run dev       # Start with nodemon (hot reload)
npm start         # Start production server
npm test          # Run backend tests
```

---

## 17. Troubleshooting

### Frontend

**Movies not loading / empty recommendations page**
- Verify the backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env` points to the correct backend URL
- Open browser DevTools → Network tab to inspect failed requests

**TMDB posters not loading**
- Verify `REACT_APP_TMDB_API_KEY` is set in `.env`
- Ensure the key is valid at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

**Styles not applying**
- Run `npm install` to ensure Tailwind packages are installed
- Confirm `index.css` is imported in `index.js`
- Confirm `tailwind.config.js` is present in the project root

**AI Assistant not responding**
- Check `REACT_APP_GOOGLE_AI_API_KEY` is set in `.env`
- Check browser console for API errors

### Backend

**Server won't start**
- Confirm `MONGODB_URI` is set and your MongoDB instance is running
- Confirm `JWT_SECRET` is set

**Authentication errors (401)**
- Verify the frontend is sending the `Authorization: Bearer <token>` header
- Check token hasn't expired
- Ensure `JWT_SECRET` matches between token issuance and verification

**CORS errors in browser**
- Confirm `FRONTEND_URL` in backend `.env` matches the frontend origin exactly (including port)

**Rate limit errors (429)**
- You've exceeded 100 requests in 15 minutes from the same IP
- Reduce request frequency or increase the limit in `app.js` for development

---

*Built for students, teachers, and lifelong learners.*
