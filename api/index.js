const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
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
  cookie: { secure: false }
}));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// routes
app.use("/", projectRoutes);

// test route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});

// koneksi DB
let isConnected = false;
connectDB().then(() => { isConnected = true; }).catch(err => console.log(err));

module.exports = app;
module.exports.handler = serverless(app); // wajib untuk Vercel
