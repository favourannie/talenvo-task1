# Task Management API

A RESTful API for managing boards, columns, cards, tags, and comments.  
This project was built as part of my Talenvo Backend Internship Task to demonstrate backend engineering skills including database design, REST API architecture, and relationship management using Node.js and MySQL.

---

# Live API

Deployed API:

https://talenvo-task1.onrender.com

Swagger Documentation:

https://talenvo-task1.onrender.com/api-docs

---

# Database Schema Diagram

The system is designed using a **relational database structure** where different entities interact through well-defined relationships.

### Main Entities

- Users
- Boards
- Columns
- Cards
- Tags
- Comments

### Relationships

| Relationship | Type |
|---------------|------|
User → Boards | One-to-Many |
Board → Columns | One-to-Many |
Column → Cards | One-to-Many |
Card → Comments | One-to-Many |
Card → Tags | Many-to-Many |

This design ensures efficient data organization and easy querying of related entities.

---

# Architecture

The application follows a **layered architecture** which separates concerns and improves maintainability.

### Layers

**Routes Layer**
- Handles HTTP requests.
- Maps endpoints to controller functions.

**Controller Layer**
- Contains the business logic.
- Processes requests and returns responses.

**Model Layer**
- Defines database structure using Sequelize ORM.
- Handles database interactions.

**Config Layer**
- Manages database configuration.

**Utils Layer**
- Contains reusable utilities such as the global error handler.

This separation allows each layer to focus on a specific responsibility which makes the codebase scalable and easier to maintain.

---

# Folder Structure
│
├── config/
│ └── database.js
│
├── controllers/
│ └── (business logic)
│
├── models/
│ ├── user.js
│ ├── board.js
│ ├── column.js
│ ├── card.js
│ ├── tag.js
│ ├── comment.js
│ └── associations.js
│
├── routes/
│ ├── userRoutes.js
│ ├── boardRoutes.js
│ ├── columnRoutes.js
│ ├── cardRoutes.js
│ ├── tagRoutes.js
│ └── commentRoutes.js
│
├── utils/
│ └── errorHandler.js
│
└── index.js

### Reasoning Behind the Structure

- **Modularity:** Each feature is separated into its own route and model.
- **Scalability:** Makes it easier to add more modules in the future.
- **Maintainability:** Code is easier to debug and update.

---

# Key Engineering Decisions

### 1. Sequelize ORM

I chose **Sequelize** because it simplifies interaction with MySQL while still allowing flexibility with SQL queries.

Benefits:
- Model-based structure
- Built-in relationships
- Easier migrations and schema syncing

---

### 2. Relationship Management

Relationships between models were defined using Sequelize associations.

Examples:

**User → Board**

A user can own multiple boards.

**Board → Column**

A board can contain multiple columns.

**Column → Card**

Each column can contain multiple cards.

**Card → Comment**

Cards can have multiple comments.

**Card → Tag (Many-to-Many)**

Cards can have multiple tags and tags can belong to multiple cards.

This was implemented using a **junction table**.

---

### 3. Global Error Handling

A centralized error handler was implemented to ensure consistent API responses and simplify debugging.

Example error response:

---

### 4. API Documentation

Swagger was integrated using:

- swagger-jsdoc
- swagger-ui-express

This allows developers to explore and test the API easily.

---

# Running the Project Locally

### Clone Repository

### Install Dependencies

### Run Server

Server will run on:
http://localhost:1976

Production:
https://talenvo-task1.onrender.com/api-docs

---

# Author

Favour Johnson  
Backend Developer

GitHub:  
https://github.com/favourannie
