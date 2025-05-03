// file: src/pages/Auth/Register.jsx
// // Description: This file contains the Register component for user registration.
// // This component allows users to create a new account using their username, email, and password.


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../logic/apiManager";

export default function Register()
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const { error } = await registerUser({ username, email, password });
        if (error)
        {
            alert("Registration failed: " + error);
        } else
        {
            alert("Registration successful!");
            navigate("/login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 mb-4 w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 mb-4 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 mb-4 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700 transition"
                >
                    Register
                </button>

                <div className="text-center mt-4 text-sm">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
