const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
};

exports.createProject = async (req, res) => {
    const project = await Project.create(req.body);
    res.json(project);
};

exports.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
};
