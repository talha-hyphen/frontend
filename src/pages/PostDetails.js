// src/pages/PostDetails.js

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetails() {
  const { id } = useParams();  // post id from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch post
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setPost(res.data.post);
        setComments(res.data.comments || []);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(prev => [...prev, res.data.comment]);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment", err);
      alert("Failed to add comment");
    }
  };

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>By {post.author?.username || "Unknown"}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <div className="prose mb-6">
          {post.content}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <hr className="my-6" />

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {comments.length === 0 && (
            <p className="text-gray-500 mb-4">No comments yet. Be the first to comment.</p>
          )}
          <ul className="space-y-4 mb-6">
            {comments.map((c) => (
              <li
                key={c._id}
                className="bg-gray-50 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="font-medium">{c.user?.username || "User"}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(c.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-800">{c.content}</p>
              </li>
            ))}
          </ul>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-blue-200"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
