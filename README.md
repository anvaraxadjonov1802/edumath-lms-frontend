# EduMath LMS Frontend

EduMath LMS Frontend — “Iqtisodchilar uchun matematika” ta’lim platformasining frontend qismi.

Ushbu frontend Django REST Framework backend API bilan ishlaydi. Platforma orqali foydalanuvchi ro‘yxatdan o‘tadi, email tasdiqlaydi, login qiladi, kurslarni ko‘radi, mavzularni o‘rganadi, materiallarni ochadi, test ishlaydi va natijalarini ko‘radi.

---

## Project Overview

EduMath LMS — zamonaviy ta’lim platformasi bo‘lib, talabalar uchun matematika fanini nazariy, amaliy va test shaklida o‘rganish imkonini beradi.

Frontend qismi React va Vite asosida qurilgan. Backend esa Django REST Framework orqali API taqdim etadi.

---

## Main Features

- Landing page
- Register page
- Email verification page
- Login page
- Dashboard
- Courses page
- Course detail page
- Topic detail page
- Materials page
- Test page
- My Results page
- Glossary page
- References page
- Profile page
- Logout
- Protected routes
- JWT token authentication
- Axios interceptor
- Responsive LMS UI

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React
- JavaScript JSX

---

## Backend API

Frontend quyidagi backend API bilan ishlaydi:

```text
http://127.0.0.1:8000/api
```

Backend API documentation:

```text
http://127.0.0.1:8000/api/docs/
```

---

## Project Structure

```text
edumath-lms-frontend/
│
├── public/
│
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   ├── topicApi.js
│   │   ├── materialApi.js
│   │   └── ...
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ...
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── VerifyEmailPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── CourseDetailPage.jsx
│   │   ├── TopicDetailPage.jsx
│   │   ├── MaterialsPage.jsx
│   │   ├── TestPage.jsx
│   │   ├── MyResultsPage.jsx
│   │   ├── GlossaryPage.jsx
│   │   ├── ReferencesPage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

### 1. Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/edumath-lms-frontend.git
cd edumath-lms-frontend
```

`YOUR_USERNAME` o‘rniga o‘z GitHub username’ingizni yozing.

---

### 2. Install dependencies

```bash
npm install
```

---

## Environment Variables

Project root’da `.env` fayl yarating.

`.env.example` fayldan nusxa oling.

Windows CMD:

```bash
copy .env.example .env
```

Git Bash / Linux / macOS:

```bash
cp .env.example .env
```

---

## Example `.env`

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_APP_NAME=EduMath LMS
VITE_APP_VERSION=1.0.0
```

---

## Important Notes About `.env`

Frontend `.env` ichida faqat public qiymatlar bo‘lishi kerak.

Quyidagilarni frontend `.env` ichiga yozmang:

```env
SECRET_KEY=
DATABASE_URL=
EMAIL_HOST_PASSWORD=
DJANGO_SECRET_KEY=
```

Sababi frontenddagi `VITE_` bilan boshlangan qiymatlar browser orqali ko‘rinadi.

GitHub’ga quyidagi fayl chiqadi:

```text
.env.example
```

GitHub’ga chiqmasligi kerak:

```text
.env
node_modules/
dist/
```

---

## Run Development Server

```bash
npm run dev
```

Frontend odatda quyidagi manzilda ochiladi:

```text
http://127.0.0.1:3000/
```

Yoki Vite boshqa port bersa:

```text
http://localhost:5173/
```

---

## Backendni Ishga Tushirish

Frontend ishlashi uchun backend ham yoniq bo‘lishi kerak.

Backend papkasida:

```bash
venv\Scripts\activate
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

API URL:

```text
http://127.0.0.1:8000/api
```

---

## Authentication Flow

Platformada authentication quyidagicha ishlaydi:

```text
Register → Email Verify → Login → Dashboard
```

### Register

Endpoint:

```http
POST /api/auth/register/
```

Frontend register formdan quyidagi ma’lumotlarni yuboradi:

```json
{
  "email": "student@gmail.com",
  "full_name": "Test Student",
  "password": "student12345"
}
```

Registerdan keyin foydalanuvchi email verification sahifasiga o‘tadi.

---

### Verify Email

Endpoint:

```http
POST /api/auth/verify-email/
```

Body:

```json
{
  "email": "student@gmail.com",
  "code": "123456"
}
```

Local development holatida verification code backend terminalida chiqadi.

---

### Login

Endpoint:

```http
POST /api/auth/login/
```

Body:

```json
{
  "email": "student@gmail.com",
  "password": "student12345"
}
```

Login response ichida `access`, `refresh` va `user` qaytadi.

Frontend quyidagilarni `localStorage` ga saqlaydi:

```text
access
refresh
user
```

---

## Protected Routes

Login talab qiladigan sahifalar `ProtectedRoute` orqali himoyalangan.

Agar foydalanuvchi login qilmagan bo‘lsa, u `/login` sahifasiga yuboriladi.

Protected pages:

```text
/dashboard
/courses
/courses/:slug
/topics/:id
/topics/:id/materials
/topics/:id/test
/results
/glossary
/references
/profile
```

---

## API Integration

Axios instance `src/api/axios.js` ichida sozlangan.

Base URL:

```js
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
```

Har bir requestga access token avtomatik qo‘shiladi:

```http
Authorization: Bearer ACCESS_TOKEN
```

Agar backend `401 Unauthorized` qaytarsa, tokenlar tozalanadi va foydalanuvchi logout qilinadi.

---

## Main Routes

```text
/                         Landing page
/login                    Login page
/register                 Register page
/verify-email             Email verification page
/dashboard                Dashboard page
/courses                  Courses page
/courses/:slug            Course detail page
/topics/:id               Topic detail page
/topics/:id/materials     Materials page
/topics/:id/test          Test page
/results                  My Results page
/glossary                 Glossary page
/references               References page
/profile                  Profile page
```

---

## Course Pages

### Courses Page

Frontend endpointdan kurslarni oladi:

```http
GET /api/courses/
```

Backend pagination formatda javob qaytaradi:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": []
}
```

Shuning uchun frontend `response.data.results` dan foydalanadi.

---

### Course Detail Page

Endpoint:

```http
GET /api/courses/{slug}/
```

Bu sahifada course ichidagi modules va topics ko‘rsatiladi.

---

## Topic Detail Page

Endpoint:

```http
GET /api/topics/{id}/
```

Topic detail sahifada quyidagi bo‘limlar bor:

```text
Nazariy qism
Amaliy qism
Prezentatsiya
Mustaqil ish
Testni boshlash
Barcha materiallar
```

Material bo‘limlari quyidagi URL’larga o‘tadi:

```text
/topics/1/materials?type=theory
/topics/1/materials?type=practice
/topics/1/materials?type=presentation
/topics/1/materials?type=assignment
```

---

## Materials Page

Materials sahifa backenddan materiallarni filter bilan oladi:

```http
GET /api/topics/{topic_id}/materials/?type=theory
GET /api/topics/{topic_id}/materials/?type=practice
GET /api/topics/{topic_id}/materials/?type=presentation
GET /api/topics/{topic_id}/materials/?type=assignment
```

Aslida backendda bitta endpoint bor:

```http
GET /api/topics/{topic_id}/materials/
```

`type` query parameter orqali filter qiladi.

Material types:

```text
theory        Nazariy qism
practice      Amaliy qism
presentation  Prezentatsiya
assignment    Mustaqil ish
literature    Adabiyot
other         Boshqa
```

Agar materialda `file_url` bo‘lsa, frontend “Faylni ochish” tugmasi orqali faylni yangi tabda ochadi.

---

## Test Page

Test savollari endpointdan olinadi:

```http
GET /api/topics/{topic_id}/questions/
```

Backend correct answerni public response’da qaytarmaydi.

Test submit endpoint:

```http
POST /api/topics/{topic_id}/submit-test/
```

Request body:

```json
{
  "answers": [
    {
      "question_id": 1,
      "answer_id": 1
    },
    {
      "question_id": 2,
      "answer_id": 5
    }
  ]
}
```

Submitdan keyin backend natijani hisoblaydi:

```json
{
  "message": "Test muvaffaqiyatli yakunlandi",
  "result": {
    "score": 3,
    "total_questions": 3,
    "percentage": 100,
    "grade": "A'lo"
  }
}
```

---

## My Results Page

Endpoint:

```http
GET /api/my-results/
```

Token talab qiladi:

```http
Authorization: Bearer ACCESS_TOKEN
```

Bu sahifada studentning test natijalari ko‘rsatiladi.

---

## Glossary Page

Endpoint:

```http
GET /api/glossary/
```

Search:

```http
GET /api/glossary/?search=limit
```

---

## References Page

Endpoint:

```http
GET /api/references/
```

Search:

```http
GET /api/references/?search=matematika
```

Agar reference ichida `file_url` yoki `link` bo‘lsa, frontend uni ochish imkonini beradi.

---

## Profile Page

Endpoint:

```http
GET /api/auth/profile/
```

Bu sahifada foydalanuvchi ma’lumotlari ko‘rsatiladi:

```text
Full name
Email
Role
Email verification status
```

---

## Build Project

Production build qilish:

```bash
npm run build
```

Build natijasi `dist/` papkaga tushadi.

Buildni preview qilish:

```bash
npm run preview
```

---

## Useful Commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

Lint check:

```bash
npm run lint
```

---

## Git Workflow

O‘zgarishlarni GitHub’ga saqlash:

```bash
git status
git add .
git commit -m "Your commit message"
git push
```

Tavsiya qilinadigan commit message namunalari:

```text
Initial EduMath LMS frontend
Connect frontend with backend API
Fix frontend blank screen issue
Fix material navigation and filters
Complete frontend backend integration
Add frontend README documentation
```

---

## Local Development Checklist

Loyihani localda ishga tushirish tartibi:

```bash
git clone https://github.com/YOUR_USERNAME/edumath-lms-frontend.git
cd edumath-lms-frontend

npm install

copy .env.example .env

npm run dev
```

Git Bash / Linux / macOS:

```bash
git clone https://github.com/YOUR_USERNAME/edumath-lms-frontend.git
cd edumath-lms-frontend

npm install

cp .env.example .env

npm run dev
```

Backend ham alohida terminalda yoniq bo‘lishi kerak:

```bash
python manage.py runserver
```

---

## Final Test Checklist

Topshirishdan oldin quyidagilarni tekshiring:

```text
Register ishlaydi
Email verify ishlaydi
Login ishlaydi
Logout ishlaydi
Dashboard ochiladi
Courses chiqadi
Course detail ochiladi
Topic detail ochiladi
Nazariy qism ochiladi
Amaliy qism ochiladi
Prezentatsiya ochiladi
Mustaqil ish ochiladi
Material file ochiladi
Test savollari chiqadi
Test submit bo‘ladi
Natija chiqadi
My Results natijani ko‘rsatadi
Glossary ishlaydi
References ishlaydi
Profile ishlaydi
Protected routes ishlaydi
```

---

## Notes

- Frontend Vite bilan ishlaydi.
- Backend API URL `.env` orqali boshqariladi.
- List API response’lar `results` ichidan olinadi.
- JWT access token `localStorage` da saqlanadi.
- `.env` GitHub’ga push qilinmaydi.
- `node_modules/` GitHub’ga push qilinmaydi.
- `dist/` GitHub’ga push qilinmaydi.

---

## Current Status

Frontend backend bilan ulangan va asosiy funksiyalar ishlaydi.

Completed:

```text
Landing page
Register
Email verification
Login
Dashboard
Courses
Course detail
Topic detail
Materials
Test
My Results
Glossary
References
Profile
Logout
Protected routes
Axios API integration
Material type filters
JWT token handling
```

---

## Next Steps

Keyingi bosqichlar:

```text
Final UI polish
Real course materials upload
Project screenshots
Deployment
Presentation
Defense preparation
```

---

## Author

Project theme:

```text
Iqtisodchilar uchun matematika ta’lim platformasi
```

Frontend part of EduMath LMS.