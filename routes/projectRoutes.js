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

// Routes utama
router.get("/intro", projectController.getAllProjects);
router.get("/", projectController.getAllProjects);

// CRUD project
router.post("/project/add", upload.single("thumbnail"), projectController.createProject);
router.get("/project/edit/:id", projectController.formEdit);
router.post("/project/edit/:id", upload.single("thumbnail"), projectController.updateProject);
router.post("/project/delete/:id", projectController.deleteProject);

// Route manual untuk halaman Astra
router.get("/pkl/astra", (req, res) => {
  const bulan = [
    {
      id:"juli",
      nama:"Juli",
      img:["/img/pkl/juli1.png","/img/juli2.png","/img/juli3.png","/img/juli4.png"], 
      desc:"Pada awal saya memasuki kegiatan PKL..."
    },
    {
      id:"agustus",
      nama:"Agustus",
      img:["/img/agust1.png","/img/agust2.png","/img/agust3.png"],
      desc:[
        "Setelah memahami materi awal...",
        "Dari video pembelajaran tersebut...",
        "Tidak hanya itu, saya juga mulai memahami..."
      ]
    },
    // dst untuk september & oktober
  ];

  res.render("pkl/astra", { title: "Halaman Astra", bulan });
});


module.exports = router;
