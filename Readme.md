# Shorten URL API

Shorten URL API is a simple API built with Fastify, PostgreSQL and Redis to shorten long URLs and track access metrics.

## How to use

### Installation

1. Make sure you have Node.js and npm installed on your machine.
2. Clone this repository:

```bash
git https://github.com/AdrianoVolter/encur_URL.git

```
### Navigate to the project directory:

```bash
cd encur_URL
```

### Install dependencies:

```bash
npm install
```

### Configure PostgreSQL and Redis by editing the src/lib/postgres.ts and src/lib/redis.ts files, respectively.

### Start the server

```bash
npm run dev
```

## Endpoints

- GET /:code: Redirects to the original URL corresponding to the provided code.
- GET /api/links: Returns all shortened links.
- POST /api/links: Shortens a long URL and returns the shortened link code.
- GET /api/metrics: Returns access metrics for shortened links.

## Technologies Used
Fastify:Fast and efficient web framework for Node.js.
PostgreSQL: Relational database for storing shortened links.
Redis: In-memory database for storing access metrics.