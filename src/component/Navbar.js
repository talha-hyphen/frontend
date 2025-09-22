import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Community AI Forum
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Feed
          </Link>
          <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 font-medium">
            Leaderboard
          </Link>
          <Link to="/create" className="text-gray-700 hover:text-blue-600 font-medium">
            Create Post
          </Link>
          {isLoggedIn && (
            <Link to="/profile/me" className="text-gray-700 hover:text-blue-600 font-medium">
              Profile
            </Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
