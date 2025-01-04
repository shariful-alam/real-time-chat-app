"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleAuth = async () => {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("userId", data.user._id);
      router.push("/chat");
    } else {
      alert("Authentication failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-4">
          {isLogin ? "Login" : "Register"}
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
}
