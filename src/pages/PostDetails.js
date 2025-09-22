// src/pages/PostDetails.js

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function PostDetails() {
  const { id } = useParams(); // post id from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    apiClient
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data.post);
      })
      .catch((err) => console.error(err));

    apiClient
      .get(`/comments/${id}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await apiClient.post(
        `/comments/${id}`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prev) => [...prev, res.data.comment]);
      setCommentText("");
    } catch (err) {
      console.error("Error posting comment", err.response?.data || err);
      alert(err.response?.data?.message || "Can't add comment");
    }
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      {/* Post Header */}
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">By <span className="font-medium">{post.user.username}</span></p>

      {/* Post Content */}
      <div className="prose max-w-none mb-8 whitespace-pre-wrap">{post.content}</div>

      {/* Comments Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments ({comments.length})</h2>

        {comments.length === 0 && (
          <p className="text-gray-500 mb-4">No comments yet. Be the first to comment!</p>
        )}

        <div className="space-y-4 mb-8">
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-700">
                <strong className="font-semibold">{c.user.username}</strong>: {c.content}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        {token ? (
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-600">
            Please <span className="text-blue-600 font-semibold">login</span> to add comments.
          </p>
        )}
      </section>
    </div>
  );
}
