// src/pages/CreateEditPost.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateEditPost({ mode = "create" }) {
  const { id } = useParams();  // for edit
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: ""  // a comma-separated string
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => {
          const post = res.data.post;
          setForm({
            title: post.title,
            content: post.content,
            tags: post.tags.join(", ")
          });
        })
        .catch(err => console.error(err));
    }
  }, [mode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      title: form.title,
      content: form.content,
      tags: form.tags.split(",").map(t => t.trim()).filter(t => t)
    };
    try {
      if (mode === "edit") {
        await axios.put(
          `http://localhost:5000/api/posts/${id}`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/posts`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      navigate(`/post/${mode === "edit" ? id : /* new post id from resp */ ""}`);
    } catch (err) {
      console.error("Error saving post", err);
      alert("Failed to save post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          {mode === "edit" ? "Edit Post" : "Create New Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              name="tags"
              type="text"
              value={form.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {mode === "edit" ? "Update Post" : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

