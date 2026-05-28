## This architecture follows:

* Controller Layer
* Service Layer
* Repository Layer
* Dependency Injection
* Singleton Pattern

It is scalable and maintainable for large applications.

---

# Architecture Flow

```txt
HTTP Request
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

---

# Folder Responsibilities

## controllers/

Handles:

* HTTP requests
* Route definitions
* Request/Response handling

Example:

* login endpoint
* register endpoint

Controllers should NOT contain business logic.

---

## services/

Contains:

* business logic
* validations
* application rules

Example:

* password hashing
* checking existing users
* token generation

---

## repositories/

Handles:

* database queries only

Example:

* create user
* find user
* update user

Repositories should not contain business logic.

---

## interfaces/

Contains:

* TypeScript interfaces
* abstraction contracts

Used for:

* dependency injection
* loose coupling

---

## container/

Contains:

* dependency injection bindings
* inversify registrations

Responsible for:

* singleton registration
* service injection

---

## middlewares/

Contains:

* auth middleware
* validation middleware
* global error middleware

---

## validations/

Contains:

* zod schemas
* request validation schemas

---

## prisma/

Contains:

* prisma singleton client
* database seed logic

---

## utils/

Contains:

* helper utilities
* jwt helpers
* hashing helpers
* api response wrappers

---

# Why Use Inversify?

Benefits:

* loose coupling
* easier testing
* scalable architecture
* singleton management
* cleaner dependency management

---

# Why Singleton Repository?

Repositories are stateless.

Singleton repositories:

* reduce memory usage
* reuse prisma instance
* improve architecture consistency

---

# Recommended Coding Rules

## Controllers

Should only:

* receive request
* call service
* return response

---

## Services

Should contain:

* business logic
* validation logic
* orchestration

---

## Repositories

Should only:

* communicate with database

No business logic inside repositories.

---

# Recommended Future Additions

* Swagger
* Winston Logger
* Redis
* BullMQ
* Role Based Access Control
* Refresh Tokens
* Unit Testing
* Docker Deployment
* CI/CD

---

# Best Practices

* Use interfaces for every service/repository
* Use dependency injection everywhere
* Keep prisma singleton
* Keep controllers thin
* Move logic to services
* Move queries to repositories
* Use global error handling
* Use validation middleware
* Use async wrappers

