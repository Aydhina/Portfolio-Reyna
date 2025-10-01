const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const multer = require("multer");
const path = require("path");

// Konfigurasi upload
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
router.post("/service/add", upload.single("thumbnail"), serviceController.createService);
router.post("/service/edit/:id", upload.single("thumbnail"), serviceController.updateService);
router.post("/service/delete/:id", serviceController.deleteService);

module.exports = router;
