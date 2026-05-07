# EduMath LMS Frontend

React + Vite + Tailwind frontend for the EduMath LMS project.

This frontend is connected to the Django REST Framework backend built for the “Iqtisodchilar uchun matematika” educational platform.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React

## Main Features

- Landing page
- Email register page
- Email verification page
- Login page
- Protected dashboard layout
- Courses page
- Course detail page
- Topic detail page
- Materials page
- Test page
- Test result page
- My results page
- Glossary page
- References page
- Profile page
- Axios interceptor with JWT Bearer token
- Protected routes
- Pagination-ready API integration

## Backend API

Default backend URL:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

The frontend expects the Django backend endpoints:

```text
POST /api/auth/register/
POST /api/auth/verify-email/
POST /api/auth/resend-code/
POST /api/auth/login/
GET  /api/auth/profile/

GET  /api/courses/
GET  /api/courses/{slug}/
GET  /api/topics/
GET  /api/topics/{id}/
GET  /api/topics/{topic_id}/materials/
GET  /api/topics/{topic_id}/questions/
POST /api/topics/{topic_id}/submit-test/
GET  /api/my-results/
GET  /api/glossary/
GET  /api/references/
```

## Installation

```bash
npm install
```

## Environment Variables

Create `.env` file from `.env.example`:

```bash
copy .env.example .env
```

For Git Bash / Linux / macOS:

```bash
cp .env.example .env
```

Example `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Run Development Server

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000/
```

## Build

```bash
npm run build
```

## Check TypeScript/JSX

```bash
npm run lint
```

## Important Notes

- Backend must be running on `http://127.0.0.1:8000/`.
- Frontend runs on `http://127.0.0.1:3000/`.
- Backend CORS must allow frontend origin.
- API list responses use pagination, so pages read `response.data.results`.
- JWT access token is saved in `localStorage` as `access_token`.
- Refresh token is saved in `localStorage` as `refresh_token`.
- Protected routes redirect unauthenticated users to `/login`.

## Suggested Run Flow

Start backend first:

```bash
python manage.py runserver
```

Then start frontend:

```bash
npm run dev
```
