const Service = require("../models/serviceModel");

// Ambil semua services
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ created_at: -1 });
    const services = await Service.find().sort({ created_at: -1 });
    res.render("intro", { title: "Intro Page", projects, services });
  } catch (err) {
    res.status(500).send("Error ambil data: " + err.message);
  }
};

// Tambah service
exports.createService = async (req, res) => {
  try {
    const { title, description, projects } = req.body;
    const newService = new Service({
      title,
      description,
      projects,
      thumbnail: req.file ? "/img/uploads/" + req.file.filename : null
    });
    await newService.save();
    res.redirect("/intro");
  } catch (err) {
    res.status(500).send("Error create service: " + err.message);
  }
};

// Edit service
exports.updateService = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      projects: req.body.projects
    };
    if (req.file) {
      updateData.thumbnail = "/img/uploads/" + req.file.filename;
    }
    await Service.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/intro");
  } catch (err) {
    res.status(500).send("Error update service: " + err.message);
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.redirect("/intro");
  } catch (err) {
    res.status(500).send("Error delete service: " + err.message);
  }
};

