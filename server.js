const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5174", // Local React dev
  "https://jigar-gules.vercel.app/", // Vercel domain
];

// 2. Configure CORS with the whitelist
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

// Database connection - PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.stack);
  } else {
    console.log("Connected to PostgreSQL database");
    release();
  }
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Get songs by playlist - Fixed with ILIKE and all fields
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

//Send Playlists with song count
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT playlist FROM fanaa");
    const rows = result.rows;

    // Count Songs
    const counts = {};
    rows.forEach((row) => {
      row.playlist
        .split(",")
        .map((p) => p.trim())
        .forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
    });

    // Send as array
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

//Search Songs - Returns all fields
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
