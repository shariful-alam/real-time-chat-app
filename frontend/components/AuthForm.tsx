import React, { useState } from "react";

interface AuthFormProps {
  onSubmit: (username: string, password: string, isLogin: boolean) => void;
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSubmit = () => {
    onSubmit(username, password, isLogin);
  };

  return (
    <div className="p-6 bg-white rounded shadow w-80">
      <h1 className="text-xl font-bold text-center mb-4">
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
        onClick={handleSubmit}
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
  );
}
