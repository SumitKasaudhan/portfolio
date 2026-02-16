import { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchProjects = async () => {
        const res = await API.get("/projects");
        setProjects(res.data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const addProject = async () => {
        await API.post("/projects", { title, description });
        setTitle("");
        setDescription("");
        fetchProjects();
    };

    const deleteProject = async (id) => {
        await API.delete(`/projects/${id}`);
        fetchProjects();
    };

    return (
        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="space-y-3 mb-10">
                <input
                    placeholder="Project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-gray-800 rounded"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 bg-gray-800 rounded"
                />

                <button onClick={addProject} className="bg-green-500 p-3 rounded">
                    Add Project
                </button>
            </div>

            <div className="space-y-4">
                {projects.map((p) => (
                    <div key={p._id} className="bg-gray-900 p-4 rounded flex justify-between">
                        <div>
                            <h3 className="font-bold">{p.title}</h3>
                            <p className="text-gray-400">{p.description}</p>
                        </div>

                        <button
                            onClick={() => deleteProject(p._id)}
                            className="bg-red-500 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminDashboard;
