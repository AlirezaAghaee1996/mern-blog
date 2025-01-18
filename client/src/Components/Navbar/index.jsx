import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Utils/AuthContext";
import fetchData from "../../Utils/fetchData";

export default function Navbar() {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetchData("categories");
      if (res.success) {
        setCategories(res.data);
      }
    })();
  }, []);

  const items = categories?.map((e, index) => (
    <li key={index} className="hover:text-[#DCD7C9] transition duration-200">
      <Link to={`/posts/${e._id}/${e.title.replaceAll(" ", "-")}`}>{e.title}</Link>
    </li>
  ));

  return (
    <nav className="bg-[#2C3639] text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#DCD7C9]">
          Rokad Blog
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li className="hover:text-[#DCD7C9] transition duration-200">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-[#DCD7C9] transition duration-200">
            <Link to="/posts/all/all-category">Posts</Link>
          </li>
          <li className="relative group">
            <span className="cursor-pointer hover:text-[#DCD7C9] transition duration-200">
              Categories
            </span>
            <ul className="absolute hidden group-hover:block bg-[#2C3639] text-sm rounded shadow-lg mt-2 py-2">
              {items?.length ? (
                items
              ) : (
                <li className="px-4 py-2 text-gray-400">Loading...</li>
              )}
            </ul>
          </li>
          {token ? (
            <li className="hover:text-[#DCD7C9] transition duration-200">
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <li className="hover:text-[#DCD7C9] transition duration-200">
              <Link to="/auth">Login/Register</Link>
            </li>
          )}
        </ul>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search For Anything..."
            className="px-4 py-2 w-64 bg-[#2C3639] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[#DCD7C9] focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <ul className="bg-[#2C3639] space-y-2 p-4 text-sm">
          <li>
            <Link to="/" className="block hover:text-[#DCD7C9]">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts/all/all-category" className="block hover:text-[#DCD7C9]">
              Posts
            </Link>
          </li>
          <li className="block">
            <span className="block hover:text-[#DCD7C9]">Categories</span>
            <ul className="pl-4 space-y-1">
              {items?.length ? (
                items
              ) : (
                <li className="text-gray-400">Loading...</li>
              )}
            </ul>
          </li>
          {token ? (
            <li>
              <Link to="/profile" className="block hover:text-[#DCD7C9]">
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/auth" className="block hover:text-[#DCD7C9]">
                Login/Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
