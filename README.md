# Student Management System

A full-stack Student Management System built with React.js, Node.js, Express.js, MySQL, and Three.js.

## Features

- Student registration and login
- JWT authentication
- Teacher and Student role-based access
- Add, view, update, and delete students
- Search students
- Pagination
- Course management
- Student course enrollment
- Marks management
- Result and grade calculation
- Student-specific result access
- Interactive 3D campus interface
- REST API
- Postman API testing

## Tech Stack

**Frontend**
- React.js
- Vite
- Three.js
- React Three Fiber
- Drei
- GSAP
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MySQL
- JWT
- bcryptjs

**Tools**
- Postman
- Git & GitHub

## Project Structure

```text
student-management/
├── backend/
├── frontend/
├── README.md
└── .gitignore



Database

The project uses MySQL with the following main tables:

users
students
courses
enrollments
marks

Create the database:

CREATE DATABASE student_management;
Environment Variables

Create a .env file inside the backend folder:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=student_management
JWT_SECRET=your_secret_key


How to Run
Backend
cd backend
npm install
npm run dev

Backend runs on:

http://localhost:5000



Frontend

Open another terminal:

cd frontend
npm install
npm run dev

The frontend will run on the Vite development URL.


Demo Teacher Account
Email: teacher@college.com
Password: Teacher@123

Students can create their own accounts using the registration page.


Main API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login


Students
POST   /api/students
GET    /api/students
GET    /api/students/:id
GET    /api/students/search/:name
PUT    /api/students/:id
DELETE /api/students/:id



Courses
POST   /api/courses
GET    /api/courses
DELETE /api/courses/:id


Enrollments
POST /api/enrollments
GET  /api/enrollments


Marks
POST /api/marks


Results
GET /api/enrollments/student/:id/result
GET /api/enrollments/my-result



Security
JWT-based authentication
Password hashing using bcrypt
Protected routes
Role-based authorization
Teacher-only operations
Student-specific result access
Environment variables for sensitive information
Testing

Backend APIs were tested using Postman for:

Authentication
Student CRUD
Search
Pagination
Courses
Enrollments
Marks
Results
Authorization





Author---
Nitin Rathore