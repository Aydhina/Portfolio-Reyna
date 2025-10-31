const Project = require("../models/projectModel");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ created_at: -1 });
    res.render("home", {
      title: "home Page",
      projects,
      session: req.session,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error ambil projects: " + err.message);
  }
};

// Simpan project baru
exports.createProject = async (req, res) => {
  try {
    const { title, description, github_url, demo_url, extra_url } = req.body;
    const newProject = new Project({
      title,
      description,
      github_url,
      demo_url,
      extra_url,
      thumbnail: req.file ? "/img/uploads/" + req.file.filename : null,
    });
    await newProject.save();
    res.redirect("/home");
  } catch (err) {
    res.status(500).send("Error create project: " + err.message);
  }
};

// Form edit project
exports.formEdit = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("Project tidak ditemukan");
    res.render("project_edit", { title: "Edit Project", project });
  } catch (err) {
    res.status(500).send("Error form edit: " + err.message);
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      github_url: req.body.github_url,
      demo_url: req.body.demo_url,
      extra_url: req.body.extra_url,
    };
    if (req.file) {
      updateData.thumbnail = "/img/uploads/" + req.file.filename;
    }
    await Project.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/home");
  } catch (err) {
    res.status(500).send("Error update project: " + err.message);
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect("/home");
  } catch (err) {
    res.status(500).send("Error delete project: " + err.message);
  }
};
