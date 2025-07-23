const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp: String,
  otpExpiresAt: Date,
  role: { type: String, enum: ["admin", "seller", "buyer"], default: "buyer" },
});

module.exports = mongoose.model("User", userSchema);
