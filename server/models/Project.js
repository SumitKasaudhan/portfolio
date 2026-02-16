const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        techStack: [{ type: String }],
        image: String,
        githubUrl: String,
        liveUrl: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
