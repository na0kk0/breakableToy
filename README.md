# Breakable Toy

A full-stack To-Do app built with React (front-end) and Spring Boot (back-end), demonstrating modern web app architecture, scalable patterns, and robust testing.

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Features](#features)
- [Quickstart](#quickstart)
- [Directory Structure](#directory-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Breakable Toy is a learning-focused project featuring a robust, full-stack to-do manager. It uses:
- React (TypeScript) for the front end
- Spring Boot (Java, JPA, PostgreSQL/MySQL) for the back end
- RESTful API for communication

---

## Architecture

### System Overview
```mermaid
flowchart TD
    subgraph Frontend [React App]
        FE[User Interface]
    end

    subgraph Backend [Spring Boot API]
        BE[API Controller]
        SRV[Service Layer]
        REPO[TaskRepository (JPA)]
        DB[(Database)]
    end

    FE -- REST/JSON --> BE
    BE --> SRV
    SRV --> REPO
    REPO -- JDBC --> DB
```

### Folder Structure

```
breakableToy/
│
├── front-end/   # React (TypeScript) client
├── back-end/    # Spring Boot API
├── docker-compose.yml
├── README.md
└── ... etc ...
```

---

## Features

- Add, edit, delete, and filter to-dos by status, priority, and date
- Metrics panel with completion stats
- Responsive, accessible UI
- Persistent storage with relational database
- API with OpenAPI/Swagger documentation
- Linting, formatting, and automated tests

---

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Java 17+](https://adoptopenjdk.net/)
- [Docker](https://www.docker.com/) (for local DB)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/na0kk0/breakableToy.git
   cd breakableToy
   ```

2. **Start the database (PostgreSQL):**
   ```bash
   docker-compose up -d
   ```

3. **Back-end:**
   ```bash
   cd back-end
   ./mvnw spring-boot:run
   ```

4. **Front-end (in a new terminal):**
   ```bash
   cd front-end
   npm install
   npm start
   ```

---

## Directory Structure

- `/front-end`: React app source
- `/back-end`: Spring Boot sources (API, services, repository, tests)
- `/docs`: Architecture diagrams, API docs, DB schema, etc.

---

## API Reference

The API follows RESTful conventions. All responses are in JSON.

### Authentication

*(If authentication is implemented, add details here, e.g., JWT Bearer token usage)*

### Endpoints

#### Get All Tasks

```http
GET /api/todos
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "dueDate": "2025-07-16",
    "completed": false,
    "priority": "High",
    "createDate": "2025-07-14",
    "doneDate": null
  }
]
```

#### Create a Task

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Read a book",
  "dueDate": "2025-07-18",
  "priority": "Medium"
}
```

**Response:**
```json
{
  "id": 2,
  "title": "Read a book",
  "dueDate": "2025-07-18",
  "completed": false,
  "priority": "Medium",
  "createDate": "2025-07-14",
  "doneDate": null
}
```

#### Update a Task

```http
PUT /api/todos/2
Content-Type: application/json

{
  "title": "Read a novel",
  "priority": "Low"
}
```

#### Mark Task as Done

```http
PUT /api/todos/2/done
```

#### Delete a Task

```http
DELETE /api/todos/2
```

#### Filtering, Sorting, and Search

```http
GET /api/todos/search?title=book&priority=High&completed=false
GET /api/todos/sortPriorityUp
GET /api/todos/sortDueDateDown
```

---

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, code style, and pull request process.

---

## License

This project is [MIT](LICENSE) licensed.
