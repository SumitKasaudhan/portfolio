import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);

        navigate("/admin");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <form onSubmit={login} className="bg-gray-900 p-10 rounded-xl space-y-4">

                <h2 className="text-2xl font-bold">Admin Login</h2>

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-gray-800 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-800 rounded"
                />

                <button className="w-full bg-blue-500 p-3 rounded">
                    Login
                </button>

            </form>
        </div>
    );
};

export default AdminLogin;
