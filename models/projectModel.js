const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  stack: { type: String },
  description: { type: String },
  link: { type: String },
  thumbnail: { type: String },
  github_url: { type: String },
  demo_url: { type: String },
  extra_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);
