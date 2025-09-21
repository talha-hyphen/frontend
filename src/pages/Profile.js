// src/pages/Profile.js

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { id } = useParams(); // user id
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch user info
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setUser(res.data.user);
        setPosts(res.data.posts || []);
        setComments(res.data.comments || []);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={`${user.username}'s avatar`}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
          />
          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
            <p className="text-gray-600 mt-2">{user.bio || "This user has no bio yet."}</p>
            <div className="mt-4">
              <span className="text-gray-600">Reputation: </span>
              <span className="text-blue-600 font-semibold">{user.score}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Posts by {user.username}</h3>
          {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post._id} className="bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition">
                <Link to={`/post/${post._id}`} className="text-xl font-medium text-blue-700 hover:underline">
                  {post.title}
                </Link>
                <div className="text-sm text-gray-600 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Comments by {user.username}</h3>
          {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
          <ul className="space-y-4">
            {comments.map(c => (
              <li key={c._id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                <Link to={`/post/${c.postId}`} className="font-medium text-blue-600 hover:underline">
                  {c.postTitle || "View Post"}
                </Link>
                <p className="text-gray-800 mt-1">{c.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
