import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Posts = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <nav className="mb-6">
        <Link to="/posts/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Post
        </Link>
      </nav>
      <Outlet /> 
    </div>
  );
};

export default Posts;