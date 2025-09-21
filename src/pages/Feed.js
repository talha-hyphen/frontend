import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">📢 Community Feed</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-5 transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            <Link to={`/post/${post._id}`}>
              <h3 className="text-xl font-semibold text-blue-700 hover:underline mb-2">
                {post.title}
              </h3>
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>👍 {post.votes?.length || 0} votes</span>
              <span>🕒 {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No posts yet. Be the first to create one!
        </div>
      )}
    </div>
  );
}

export default Feed;
