This document explains the system design decisions made during Stage 2 of the Task Management API.

---

## 1. Conflict Handling (Optimistic Concurrency)

### Problem
Multiple users can update the same card at the same time, leading to data overwrites.

### Solution
Implemented **optimistic concurrency control** using the `updatedAt` field.

### How it Works
- Client sends `updatedAt` value when updating a card
- Server compares it with the current database value
- If mismatch → request is rejected

### Response

409 Conflict


### Benefit
- Prevents accidental overwrites
- No need for database locks
- Lightweight and scalable

---

## 2. Card Ordering Strategy

### Problem
Maintaining correct card order when:
- Moving cards
- Reordering within columns
- Moving across columns

### Solution
Used a **position-based ordering system with transactions**

### Strategy

#### When moving a card:

1. Increment positions in destination column:

position >= newPosition → +1


2. Decrement positions in source column:

position > oldPosition → -1


3. Update moved card:

columnId = newColumnId
position = newPosition


4. Wrap all operations in a transaction

### Why Transactions?
- Prevent partial updates
- Ensure atomic operations

### Benefit
- No duplicate positions
- Consistent ordering
- Safe under concurrent operations

---

## 3. Real-Time Updates

### Problem
Clients need instant updates when:
- Cards are created
- Cards are moved
- Comments are added

### Solution
Implemented **Socket.io for real-time communication**

### Events

| Event | Trigger |
|------|--------|
cardCreated | When a card is created |
cardMoved | When a card is moved |
commentAdded | When a comment is added |

### Flow

1. Client sends HTTP request
2. Server processes request
3. Server emits event via Socket.io
4. All connected clients receive update

### Example

```js
io.emit("cardCreated", card);
Improvement (Room-Based Broadcasting)

Clients can join rooms:

socket.join(cardId);

Emit only to relevant users:

io.to(cardId).emit("commentAdded", comment);
Benefits

Real-time collaboration

Reduced polling

Efficient updates

Conclusion

The system evolved from a basic CRUD API into a collaborative, real-time system with:

Conflict-safe updates

Reliable ordering logic

Event-driven architecture

These improvements make the API scalable, consistent, and production-ready.