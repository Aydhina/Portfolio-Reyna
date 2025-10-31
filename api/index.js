const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const projectRoutes = require("../routes/projectRoutes");

dotenv.config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// session
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

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// routes
app.use("/", projectRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});

// koneksi DB
connectDB().catch(err => console.error(err));

// export handler untuk Vercel
module.exports = app;
