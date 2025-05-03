// file: src/pages/Auth/Login.jsx
// Description: This file contains the Login component for user authentication.
// This component allows users to log in using their email and password.



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../logic/apiManager";

export default function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setIsLoggedIn] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const { error } = await loginUser({ email, password });
        if (error)
        {
            alert("Login failed: " + error);
        } else
        {
            setIsLoggedIn(true);
            navigate("/"); // Redirect to the main page after successful login

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
                <button type="submit" className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700">
                    Login
                </button>
                <div className="text-center mt-4">
                    <a href="/register" className="text-blue-500 hover:underline">Don't have an account? Register</a>
                </div>
            </form>
        </div>
    );
}
