# 🎵 Fanaa Music API

A secure, high-performance music catalog API built with Node.js, Express, and PostgreSQL.

Designed for fast playlist discovery, song search, and curated music management, Fanaa provides a streamlined backend for music applications while maintaining strong access controls through API key authentication and protected administration endpoints.

---

## ✨ Features

### 🔍 Intelligent Music Search

* Search songs by title
* Search songs by artist
* Partial and case-insensitive matching
* Fast PostgreSQL-powered queries

### 🎼 Playlist Discovery

* Automatically aggregates playlists from the music library
* Generates playlist statistics
* Counts songs per playlist
* Supports multi-playlist categorization

### ➕ Song Management

* Add new songs through a protected API endpoint
* Input validation for required fields
* Structured JSON responses

### 🔐 Multi-Layer Security

* API Key authentication for all requests
* CORS whitelist protection
* Environment-based credential management
* Basic Authentication for administrative access

### 🗄 PostgreSQL Integration

* Connection pooling
* Secure SSL connections
* Parameterized queries
* Protection against SQL injection

---

# 🏗 Architecture

```text
Client Application
        │
        ▼
 ┌─────────────────┐
 │  Express Server │
 └─────────────────┘
        │
 ┌──────┴─────────┐
 │ Authentication │
 └──────┬─────────┘
        ▼
 ┌─────────────────┐
 │ PostgreSQL Pool │
 └─────────────────┘
        │
        ▼
    Music Library
```

---

# 🚀 API Endpoints

## Get All Playlists

```http
GET /
```

### Response

```json
[
  {
    "name": "Chill",
    "songs": 24
  },
  {
    "name": "Rock",
    "songs": 12
  }
]
```

---

## Search by Playlist

```http
GET /:playlist
```

### Example

```http
GET /chill
```

Returns all songs matching the requested playlist.

---

## Search Songs

```http
GET /songs/:song
```

### Example

```http
GET /songs/Arijit
```

Searches both:

* Song titles
* Artist names

---

## Add New Song

```http
POST /add-song
```

### Request Body

```json
{
  "title": "Song Name",
  "artist": "Artist Name",
  "album": "Album Name",
  "cover": "https://image-url.com",
  "url": "https://audio-url.com",
  "playlist": "Chill,Vibes"
}
```

### Success Response

```json
{
  "message": "Song added successfully!"
}
```

---

# 🔐 Authentication

All endpoints require a valid API key.

### Header

```http
x-api-key: YOUR_API_KEY
```

or

```http
?apiKey=YOUR_API_KEY
```

Requests without a valid key are rejected with:

```json
{
  "error": "Forbidden: Invalid API Key"
}
```

---

# ⚙ Environment Variables

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=postgresql://user:password@host/database

API_KEY=your_api_key

APP_USERNAME=admin
APP_PASSWORD=strong_password
```

---

# 🛠 Installation

### Clone

```bash
git clone https://github.com/yourusername/fanaa-api.git
cd fanaa-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

```bash
cp .env.example .env
```

### Start Server

```bash
node server.js
```

Development:

```bash
npm run dev
```

---

# 📦 Technology Stack

| Technology | Purpose                |
| ---------- | ---------------------- |
| Node.js    | Runtime                |
| Express.js | REST API Framework     |
| PostgreSQL | Database               |
| pg         | Database Driver        |
| CORS       | Origin Protection      |
| dotenv     | Environment Management |

---

# 📈 Design Goals

* Minimal API surface
* Secure by default
* Fast database queries
* Simple deployment
* Easy integration with web and mobile applications
* Scalable playlist-based music organization

---

# Example Use Cases

* Music streaming applications
* Personal music collections
* Playlist discovery platforms
* Artist catalogs
* Audio content management systems
* Mobile music apps

---

# License

MIT License

---

Built for fast music discovery, secure content management, and clean API integrations.
