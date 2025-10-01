const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  projects: { type: String }, 
  thumbnail: { type: String }, 
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Service", serviceSchema);
