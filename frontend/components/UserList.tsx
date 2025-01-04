import React from "react";
import { User } from "../types";

interface UserListProps {
  users: User[];
  onUserSelect: (userId: string) => void;
}

export default function UserList({ users, onUserSelect }: UserListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <li
          key={user._id}
          className="p-4 bg-white rounded shadow hover:bg-gray-100 cursor-pointer"
          onClick={() => onUserSelect(user._id)}
        >
          {user.username}
        </li>
      ))}
    </ul>
  );
}
