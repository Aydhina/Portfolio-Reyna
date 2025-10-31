const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session"); 
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// koneksi ke DB
connectDB();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Session middleware
const MongoStore = require("connect-mongo");

app.use(session({
  secret: process.env.SESSION_SECRET, // dari .env
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60 // session 14 hari
  }),
  cookie: { secure: false }
}));


// routes
app.use("/", projectRoutes);

const HOST = '0.0.0.0'; 

app.listen(PORT, HOST, () => {
  console.log(`Server berjalan di host ${HOST} dan port ${PORT}`);
});
