const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  // Hash password and generate OTP
  const hashed = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min from now

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    // Update existing user with new OTP
    user.password = hashed;
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    user.role = role;
    await user.save();
  } else {
    user = await User.create({ email, password: hashed, otp, otpExpiresAt, role });
  }

  res.json({ msg: "OTP sent (simulated)", otp }); // simulate OTP send
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp)
    return res.status(400).json({ msg: "Invalid OTP" });

  if (user.otpExpiresAt && user.otpExpiresAt < new Date())
    return res.status(400).json({ msg: "OTP expired" });

  // OTP is valid: remove it & send token
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
