// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const connectDB = require("./config/db");

(async () => {
  await connectDB();

  const username = "rere";
  const password = "rere123"; // password asli
  const hashed = await bcrypt.hash(password, 10);

  await User.deleteMany(); // hapus user lama biar bersih
  await User.create({ username, password: hashed });

  console.log("✅ Admin berhasil dibuat:", username);
  process.exit();
})();
