const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://cerulean-babka-e93fdd.netlify.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
