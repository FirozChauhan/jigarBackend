# 🚀 jigarBackend

**A secure, PostgreSQL-powered music backend built for fast discovery, playlist intelligence, and scalable content management.**

jigarBackend serves as the core API layer behind a modern music platform, providing playlist aggregation, song discovery, metadata management, and protected administrative operations through a clean REST architecture.

---

## Overview

jigarBackend is designed around three principles:

* **Performance** — Efficient PostgreSQL queries with connection pooling.
* **Security** — API-key protection, CORS restrictions, and credential-based administration.
* **Simplicity** — Lightweight architecture that is easy to deploy, maintain, and extend.

Whether powering a personal music collection, a streaming prototype, or a curated playlist platform, jigarBackend provides the foundation needed to manage and serve music data reliably.

---

## Features

### 🎵 Music Discovery

* Search songs by title
* Search songs by artist
* Partial and case-insensitive matching
* Fast PostgreSQL-backed lookups

### 📚 Playlist Intelligence

* Automatic playlist aggregation
* Playlist popularity statistics
* Song counts per playlist
* Multi-category playlist support

### ➕ Content Management

* Add songs through API endpoints
* Input validation
* Structured responses
* Database persistence

### 🔒 Security Layers

* API Key Authentication
* Restricted CORS Origins
* Environment-based secrets
* Protected administration access

### ⚡ Database Optimized

* PostgreSQL connection pooling
* Parameterized queries
* SSL-enabled database connections
* SQL injection protection

---

## Architecture

```text
                Client Applications
                         │
                         ▼
                 ┌─────────────┐
                 │ Express API │
                 └──────┬──────┘
                        │
         ┌──────────────┼──────────────┐
         ▼                              ▼
 Authentication                 Route Handlers
         │                              │
         └──────────────┬──────────────┘
                        ▼
               PostgreSQL Database
```

---

## API Endpoints

### Get Available Playlists

```http
GET /
```

Returns all playlists with their song counts.

---

### Search by Playlist

```http
GET /:playlist
```

Example:

```http
GET /lofi
```

Returns songs belonging to matching playlists.

---

### Search Songs

```http
GET /songs/:song
```

Example:

```http
GET /songs/arijit
```

Searches both title and artist fields.

---

### Add Song

```http
POST /add-song
```

Request Body:

```json
{
  "title": "Song Name",
  "artist": "Artist Name",
  "album": "Album Name",
  "cover": "https://cover-url.com",
  "url": "https://audio-url.com",
  "playlist": "Chill,Vibes"
}
```

---

## Authentication

All requests require an API key.

### Header

```http
x-api-key: YOUR_API_KEY
```

or

```http
?apiKey=YOUR_API_KEY
```

Unauthorized requests receive:

```json
{
  "error": "Forbidden: Invalid API Key"
}
```

---

## Environment Variables

```env
PORT=5000

DATABASE_URL=postgresql://user:password@host/database

API_KEY=your_api_key

APP_USERNAME=admin
APP_PASSWORD=strong_password
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/jigarBackend.git
cd jigarBackend
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```bash
cp .env.example .env
```

Run:

```bash
node server.js
```

---

## Technology Stack

| Layer         | Technology      |
| ------------- | --------------- |
| Runtime       | Node.js         |
| Framework     | Express.js      |
| Database      | PostgreSQL      |
| Driver        | pg              |
| Security      | CORS + API Keys |
| Configuration | dotenv          |

---

## Why jigarBackend?

Most music backends focus solely on CRUD operations.

jigarBackend goes further by combining:

* Secure API access
* Playlist analytics
* Flexible music discovery
* Scalable PostgreSQL architecture
* Clean REST design

The result is a backend that is lightweight enough for personal projects and structured enough to serve as the foundation for larger music platforms.

---

## License

MIT
