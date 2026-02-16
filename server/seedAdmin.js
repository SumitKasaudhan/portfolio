const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
connectDB();

const createAdmin = async () => {
    await User.deleteMany();

    await User.create({
        email: "admin@portfolio.com",
        password: "admin123",
    });

    console.log("Admin created");
    process.exit();
};

createAdmin();
