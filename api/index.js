const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
// serverless-http dihapus, karena tidak diperlukan lagi

dotenv.config();

const app = express();

// --- PENGATURAN PATH ABSOLUT KRITIS UNTUK VERCEL ---
// Menentukan path absolut dari root proyek, ini lebih stabil di Vercel
const rootDir = path.resolve(__dirname, '..'); // '..' dari api/index.js adalah root

// UBAH SEMUA REQUIRE RELATIF menjadi ABSOLUT
const connectDB = require(path.join(rootDir, "config/db"));
const projectRoutes = require(path.join(rootDir, "routes/projectRoutes")); 

// 1. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Asset Statis (public)
// Gunakan path absolut
app.use(express.static(path.join(rootDir, "public")));

// 3. Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: { secure: process.env.NODE_ENV === "production" }
}));

// 4. EJS Views
app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views")); 

// 5. Routes
app.use("/", projectRoutes); 

// 6. Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});

// 7. Koneksi DB
connectDB().catch(err => console.error("Database connection failed:", err));

// 8. Export Handler untuk Vercel
module.exports = app;
