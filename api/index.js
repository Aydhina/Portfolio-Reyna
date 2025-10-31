const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("../config/db"); // sesuaikan kalau file ini di api/
const projectRoutes = require("../routes/projectRoutes");

dotenv.config();

const app = express();

// --- Koneksi DB ---
connectDB();

// --- Middleware dasar ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// --- Trust proxy (wajib di Vercel) ---
app.set("trust proxy", 1);

// --- Session ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "rahasiaSuperAman",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // 14 hari
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// --- EJS ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// --- Routes ---
app.use("/", projectRoutes);

module.exports = app;
