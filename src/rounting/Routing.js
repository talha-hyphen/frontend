import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import Login from '.././pages/Login';
import Register from '.././pages/Register';
import Feed from '.././pages/Feed';
import PostDetails from '.././pages/PostDetails';
import CreatePost from '../pages/CreateEditPost';
 import Profile from '.././pages/Profile';
import Leaderboard from '.././pages/Leaderboard';
 import React from 'react'
 import Navbar from "../component/Navbar";
export default function Routing() {
  return (
    <div> 
         <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Feed />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/create" element={<CreatePost />} />
         <Route path="/profile/:id" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
    </div>
  )
}
