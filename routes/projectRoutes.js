const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Konfigurasi multer untuk upload thumbnail
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes utama
router.get("/", projectController.getAllProjects); // default route
router.get("/home", projectController.getAllProjects);

// CRUD project
router.post("/project/add", auth, upload.single("thumbnail"), projectController.createProject);
router.get("/project/edit/:id", auth, projectController.formEdit);
router.post("/project/edit/:id", auth, upload.single("thumbnail"), projectController.updateProject);
router.post("/project/delete/:id", auth, projectController.deleteProject);

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
  res.redirect("/home");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/home");
  });
});


module.exports = router;
