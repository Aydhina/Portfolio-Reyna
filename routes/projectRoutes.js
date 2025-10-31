const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Konfigurasi Cloudinary (Menggunakan ENV)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_reyna",
    allowed_formats: ["jpg", "png", "jpeg"]
  },
});

const upload = multer({ storage });

// Routes utama
router.get("/", projectController.getAllProjects);
router.get("/home", projectController.getAllProjects);

// CRUD project
router.post("/project/add", auth, upload.single("thumbnail"), projectController.createProject);
router.post("/project/edit/:id", auth, upload.single("thumbnail"), projectController.updateProject);
router.post("/project/delete/:id", auth, projectController.deleteProject);

// --- ROUTES BARU /PKL ---
router.get("/pkl", (req, res) => {
  // Jika /pkl membutuhkan data dari controller, panggil controller di sini
  // Sementara, ini hanya untuk memastikan route-nya berfungsi
  res.send("Ini adalah halaman PKL!");
});
// Contoh dengan parameter
router.get("/pkl/:id", (req, res) => {
  res.send(`Detail PKL untuk ID: ${req.params.id}`);
});

// Auth
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
  // --- PERBAIKAN KRITIS: REDIRECT KE /home (TANPA /api) ---
  res.redirect("/home"); 
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    // --- PERBAIKAN KRITIS: REDIRECT KE / (TANPA /api) ---
    res.redirect("/");
  });
});

module.exports = router;
