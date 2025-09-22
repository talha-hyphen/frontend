import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiClient
      .get("/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.error("Error fetching posts", err.response?.data || err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📢 Community Feed</h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-all"
            >
              <Link to={`/post/${post._id}`}>
                <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                  {post.title}
                </h3>
              </Link>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 text-sm font-medium px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-between">
                <span>👍 {post.votes?.length || 0} votes</span>
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  View Discussion →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
