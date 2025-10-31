const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// --- Konfigurasi Cloudinary ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_reyna",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// --- ROUTES UTAMA ---
router.get("/", projectController.getAllProjects);
router.get("/home", projectController.getAllProjects);

// --- PROJECT DESC (PKL) ---
router.get("/pkl/astra", (req, res) => {
  res.render("pkl/astra", { title: "PKL - ASTRA", session: req.session });
});

router.get("/pkl/toko_online", (req, res) => {
  res.render("pkl/toko_online", { title: "PKL - Toko Online", session: req.session });
});

router.get("/pkl/inventory_barang", (req, res) => {
  res.render("pkl/inventory_barang", { title: "PKL - Inventory Barang", session: req.session });
});

// --- CRUD PROJECT (login required) ---
router.post("/project/add", auth, upload.single("thumbnail"), projectController.createProject);
router.post("/project/edit/:id", auth, upload.single("thumbnail"), projectController.updateProject);
router.post("/project/delete/:id", auth, projectController.deleteProject);

// --- AUTH ---
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.send("Username salah");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Password salah");

  req.session.isLogin = true;
  res.redirect("/"); // ✅ bukan /api/home agar aman di Vercel
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
