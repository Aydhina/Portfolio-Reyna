const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const multer = require("multer");
const path = require("path");

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

// Routes
router.get("/intro", projectController.getAllProjects);

router.get("/", projectController.getAllProjects);
// router.get("/project/add", projectController.formAdd);
router.post("/project/add", upload.single("thumbnail"), projectController.createProject);

router.get("/project/edit/:id", projectController.formEdit);
router.post("/project/edit/:id", upload.single("thumbnail"), projectController.updateProject);

router.post("/project/delete/:id", projectController.deleteProject);

module.exports = router;
