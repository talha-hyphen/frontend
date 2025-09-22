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

//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 py-10 px-4">
//   <div className="max-w-6xl mx-auto">
//     <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
//       📢 Explore Community Feed
//     </h2>

//     {posts.length === 0 ? (
//       <p className="text-center text-gray-500 text-lg">No posts yet. Be the first to post!</p>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <div
//             key={post._id}
//             className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
//           >
//             {/* Title */}
//             <Link to={`/post/${post._id}`}>
//               <h3 className="text-xl font-semibold text-blue-700 hover:underline mb-2 line-clamp-2">
//                 {post.title}
//               </h3>
//             </Link>

//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {post.tags.map((tag, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>

//             {/* Footer */}
//             <div className="mt-auto">
//               <div className="flex items-center justify-between text-sm text-gray-600">
//                 <span>👍 {post.votes?.length || 0} votes</span>
//                 <Link
//                   to={`/post/${post._id}`}
//                   className="text-blue-500 hover:underline font-medium"
//                 >
//                   View Discussion →
//                 </Link>
//               </div>
//               {/* Optional: Author */}
//               {post.user?.username && (
//                 <div className="mt-3 text-xs text-gray-400 italic">
//                   Posted by <span className="font-semibold">{post.user.username}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// </div>

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
