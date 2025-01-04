"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../types";

export default function ChatPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/auth/users");
      if (response.ok) {
        const data: User[] = await response.json();
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const openChat = (userId: string) => {
    router.push(`/chat/${userId}`);
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">Chat Users</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <li
              key={user._id}
              className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => openChat(user._id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
