🎵 Jigar Backend API
A secure, high-performance RESTful API for a personal music streaming platform. Built with Express.js and PostgreSQL, featuring robust authentication, playlist management, and real-time search capabilities.

✨ Features
🔐 Dual-Layer Security – API Key middleware + HTTP Basic Authentication to protect all endpoints.

📦 PostgreSQL Integration – Neon serverless Postgres database with automatic SSL.

🎶 Playlist Management – Dynamic song grouping, real-time count aggregation, and genre tagging.

🔍 Fuzzy Search – Case-insensitive ILIKE queries for songs, artists, and playlists.

📝 CRUD Operations – Full support for adding new songs with validated payloads.

🌐 CORS Configured – Whitelisted origins for local development and Vercel deployment.

⚡ Railway Ready – Zero-config deployment with environment variable injection.

🛠️ Tech Stack
Category	Technology
Runtime	Node.js
Framework	Express.js
Database	PostgreSQL (Neon)
Security	CORS, Basic Auth, API Key
Deployment	Railway
📂 Project Structure
bash
.
├── server.js          # Entry point & route definitions
├── .env               # Environment variables (DB_URL, API_KEY, credentials)
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
🔧 Installation & Setup
1. Clone the repository
bash
git clone https://github.com/your-username/jigar-backend.git
cd jigar-backend
2. Install dependencies
bash
npm install
3. Configure environment variables
Create a .env file in the root directory and populate it:

env
DATABASE_URL=postgresql://user:password@neon-host/neondb
API_KEY=your_secret_api_key
APP_USERNAME=your_username
APP_PASSWORD=your_password
4. Run the server
bash
npm start
# or for development:
npm run dev
The server will start on http://localhost:5000.

📡 API Endpoints
Method	Endpoint	Description	Auth Required
GET	/	Retrieve all playlists with song counts	✅
GET	/:playlist	Fetch all songs for a specific playlist	✅
GET	/songs/:song	Search songs by title or artist	✅
POST	/add-song	Add a new song to the database	✅
Authentication: All endpoints require both an x-api-key header and a valid Authorization: Basic header.

🛡️ Security Implementation
This API enforces a two-step security gate for all incoming requests:

checkApiKey Middleware – Verifies the presence of a valid x-api-key header (or query parameter) against the API_KEY environment variable.

checkAuth Middleware – Enforces HTTP Basic Authentication, requiring a valid username:password pair.

This ensures that even if one credential is leaked, the database remains protected.

💡 Future Roadmap
JWT-based token authentication

Bulk import/export of playlists

Rate limiting and request throttling

Multi-user support with role-based access

📄 License
This project is open-source and available under the MIT License.

🙌 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

📬 Contact
Built by [Your Name] – [Your GitHub Profile Link]


