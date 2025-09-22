// src/pages/Leaderboard.js

import { useEffect, useState } from "react";
 import apiClient from "../api/apiClient";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiClient.get("/leaderboard")
      .then(res => setUsers(res.data.users || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Top Contributors</h2>
        <ol className="divide-y divide-gray-200">
          {users.map((u, index) => (
            <li key={u._id} className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold">{index + 1}.</span>
                <img
                  src={u.avatar || "/default-avatar.png"}
                  alt={`${u.username}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                />
                <Link to={`/profile/${u._id}`} className="text-lg font-medium text-gray-800 hover:underline">
                  {u.username}
                </Link>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {u.score}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
