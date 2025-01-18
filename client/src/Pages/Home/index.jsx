import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Rokad Blog</h1>
          <p className="text-lg mb-8">
            Discover insightful stories, latest trends, and creative ideas from our expert writers.
          </p>
          <Link
            to="/posts/all/all-category"
            className="bg-white text-green-600 px-6 py-3 rounded-full shadow-lg hover:bg-green-100 transition duration-300"
          >
            Explore Posts
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Post Cards */}
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={`https://via.placeholder.com/400x200?text=Post+Image+${post}`}
                alt={`Post ${post}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Post Title {post}</h3>
                <p className="text-gray-600 mb-4">
                  A short description or snippet about the post goes here...
                </p>
                <Link
                  to={`/post-details/${post}/sample-title`}
                  className="text-green-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Example Categories */}
            {["Tech", "Lifestyle", "Health", "Travel"].map((category, index) => (
              <Link
                key={index}
                to={`/posts/${index}/${category.toLowerCase()}`}
                className="bg-green-600 px-6 py-3 rounded-full text-white hover:bg-green-500 transition duration-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Stay updated with the latest posts and stories.</p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-full w-64 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-green-600 px-6 py-2 rounded-r-full hover:bg-gray-100 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
