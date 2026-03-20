# Task Management API

A RESTful API for managing boards, columns, cards, tags, and comments.  
Built as part of the Talenvo Backend Internship Task to demonstrate backend engineering skills including system design, real-time communication, and data consistency handling.

---

# Live API

Deployed API:

https://talenvo-task1.onrender.com

Swagger Documentation:

https://talenvo-task1.onrender.com/api-docs

---

# Features Implemented

## Core Features
- User authentication (JWT)
- Board and column management
- Card creation, update, deletion
- Tagging system
- Due dates for cards

## Advanced Features (Stage 2)

### Real-Time Updates
- Implemented using **Socket.io**
- Events:
  - `cardCreated`
  - `cardMoved`
  - `commentAdded`

### Comment System
- Comments on cards
- Threaded replies (2-level nesting supported)
- Edit comment
- Delete comment

### Card Reordering
- Move cards within and across columns
- Maintains position integrity
- Uses transactions to prevent corruption

### Optimistic Updates
- Conflict detection using `updatedAt`
- Prevents overwriting changes from other users

### Performance Improvements
- Indexed frequently queried fields:
  - `columnId`
  - `position`
- Pagination support for:
  - Boards
  - Cards
- Reduced unnecessary queries using Sequelize includes

### Logging
- Request logging using **morgan**

---

# Database Schema

### Entities
- Users
- Boards
- Columns
- Cards
- Tags
- Comments

### Relationships

| Relationship | Type |
|-------------|------|
User → Boards | One-to-Many |
Board → Columns | One-to-Many |
Column → Cards | One-to-Many |
Card → Comments | One-to-Many |
Card → Tags | Many-to-Many |

---

# Architecture

The application follows a **layered architecture**:

### Layers

**Routes**
- Define API endpoints

**Controllers**
- Handle business logic

**Models**
- Define database schema (Sequelize)

**Middleware**
- Authentication
- Validation

**Utils**
- Error handling
- Socket event emitters

---

# Folder Structure


├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── tests/
└── index.js


---

# Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL (Aiven)
- Socket.io
- Swagger (API Docs)

---

# Running Locally

### Install dependencies

npm install


### Start server

npm run dev


Server runs on:
http://localhost:1976

---

# Author

Favour Johnson  
Backend Developer  

GitHub:  
https://github.com/favourannie