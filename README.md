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
- Contains reusable utilities such as the global error handler and socket event emitters.

This separation allows each layer to focus on a specific responsibility which makes the codebase scalable and easier to maintain.

---

# Architecture Evolution (Stage 2)

As the system evolved, additional mechanisms were introduced to support collaboration, data consistency, and real-time updates.

---

## 1. Conflict Handling (Optimistic Concurrency Control)

To support multiple users interacting with the same data, the system implements **optimistic concurrency control** using the `updatedAt` field.

### Strategy:
- Each update request includes the `updatedAt` timestamp.
- Before updating, the system compares:
  - Client timestamp vs Database timestamp
- If they do not match:
  - The request is rejected with a **409 Conflict error**

### Why this works:
- Prevents overwriting another user's changes
- Lightweight compared to locking mechanisms
- Ideal for collaborative systems

### Example:
Two users editing the same card:
- User A updates → success
- User B updates (with stale timestamp) → rejected

---

## 2. Card Ordering Strategy

The system maintains card order within columns using a **position-based indexing system**.

### Key Principles:
- Each card has a `position` field
- Positions are unique within a column
- Ordering is maintained using database transactions

### Move Operation Strategy:
When a card is moved:

1. **Destination Column Adjustment**
   - All cards with position ≥ new position are incremented

2. **Source Column Adjustment**
   - All cards with position > old position are decremented

3. **Card Update**
   - Card is assigned new column and position

4. **Transaction Safety**
   - All operations are wrapped in a database transaction
   - Prevents partial updates and data corruption

### Benefits:
- Prevents duplicate positions
- Maintains consistent ordering
- Handles concurrent updates safely

---

## 3. Real-Time Updates (Socket.io)

To enable live collaboration, the system integrates **WebSocket communication using Socket.io**.

### Events Implemented:
- `cardCreated`
- `cardMoved`
- `commentAdded`

### Architecture:
- HTTP handles data changes
- Socket.io broadcasts events after successful operations

### Flow:
1. Client sends HTTP request (e.g., create comment)
2. Server processes request
3. Server emits event via Socket.io
4. Connected clients receive updates instantly

### Example:
```js
emitCommentAdded(io, comment);

