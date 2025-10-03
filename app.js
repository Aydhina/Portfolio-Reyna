const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
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

// routes
app.use("/", projectRoutes);

// start
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
