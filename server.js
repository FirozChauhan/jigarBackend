const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());

//Allowed URLs
const allowedOrigins = [
  "http://localhost:5174",
  "https://jigar-gules.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect((err, client, release) => {
  if (err) console.error("Error connecting to PostgreSQL:", err.stack);
  else {
    console.log("Connected to PostgreSQL database");
    release();
  }
});

// 🟢 API Key Middleware
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || req.query.apiKey;
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
  next();
};

// Apply to ALL routes (protects everything)
app.use(checkApiKey);

// Routes
app.get("/:playlist", async (req, res) => {
  const playlist = req.params.playlist;
  try {
    const result = await pool.query(
      "SELECT * FROM fanaa WHERE playlist ILIKE $1",
      [`%${playlist}%`],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT playlist FROM fanaa");
    const rows = result.rows;
    const counts = {};
    rows.forEach((row) => {
      row.playlist
        .split(",")
        .map((p) => p.trim())
        .forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
    });
    const playlists = Object.entries(counts).map(([name, songs]) => ({
      name,
      songs,
    }));
    res.json(playlists);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.get("/songs/:song", async (req, res) => {
  const song = req.params.song;
  try {
    const result = await pool.query(
      "SELECT * FROM fanaa WHERE title ILIKE $1 OR artist ILIKE $2",
      [`%${song}%`, `%${song}%`],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

// POST: Add a new song
app.post("/add-song", async (req, res) => {
  try {
    const { title, artist, album, cover, url, playlist } = req.body;

    // Validation: All except 'album' are required
    if (!title || !artist || !cover || !url || !playlist) {
      return res.status(400).json({
        error:
          "Missing required fields: title, artist, cover, url, and playlist are required.",
      });
    }

    const result = await pool.query(
      `INSERT INTO fanaa (title, artist, album, cover, url, playlist) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [title, artist, album || null, cover, url, playlist],
    );

    res.status(201).json({
      message: "Song added successfully!",
      song: result.rows[0],
    });
  } catch (err) {
    console.error("Error adding song:", err);
    return res.status(500).json({ error: "Database error" });
  }
});


//Authentication
const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Jigar Music"');
    return res.status(401).json({ error: "Unauthorized" });
  }
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  if (username === process.env.APP_USERNAME && password === process.env.APP_PASSWORD) {
    return next();
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="Jigar Music"');
  return res.status(401).json({ error: "Invalid username or password" });
};

// Apply it
app.use(checkAuth);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
