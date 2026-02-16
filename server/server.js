const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS FIRST
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// ✅ Body parser second
app.use(express.json());

// ✅ Routes after middleware
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Portfolio API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
