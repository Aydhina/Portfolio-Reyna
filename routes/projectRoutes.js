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
router.get("/pkl/inventori_barang", (req, res) => {
  res.render("pkl/inventori_barang", { title: "PKL - Inventory Barang", session: req.session });
});

// --- CRUD PROJECT (login required) ---
router.post("/project/add", auth, upload.single("thumbnail"), projectController.createProject);
router.post("/project/edit/:id", auth, upload.single("thumbnail"), projectController.updateProject);
router.post("/project/delete/:id", auth, projectController.deleteProject);

// --- AUTH ---
// Tampilkan halaman login
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Proses login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.render("login", { error: "Username salah" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("login", { error: "Password salah" });
    }

    // ✅ Simpan session login
    req.session.isLogin = true;

    // Pastikan session tersimpan sebelum redirect
    req.session.save((err) => {
      if (err) console.error("❌ Session save error:", err);
      console.log("✅ Login berhasil untuk user:", username);
      res.redirect("/"); // kembali ke halaman utama
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).render("login", { error: "Terjadi kesalahan server" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
