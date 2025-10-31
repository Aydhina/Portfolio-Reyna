const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const MongoStore = require("connect-mongo");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Koneksi DB
connectDB();

// --- Middleware dasar
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- Trust proxy (PENTING untuk session di Vercel)
app.set("trust proxy", 1);

// --- Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // true saat di vercel
      sameSite: "lax",
    },
  })
);

// --- View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Routes
app.use("/", projectRoutes);

// --- Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`✅ Server berjalan di ${HOST}:${PORT}`);
});
