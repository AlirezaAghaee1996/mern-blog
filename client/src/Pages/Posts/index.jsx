import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { categoryId,categoryName } = useParams();
  const navigate=useNavigate()
  useEffect(() => {
    (async () => {
      const res = await fetchData(
        `posts?populate=categoryId${
          categoryId !== "all" ? `&filters[categoryId][$eq]=${categoryId}` : ""
        }`
      );
      setPosts(res.data);
    })();
  }, [categoryId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {categoryId === "all" ? "All Posts" : `Posts in Category: ${categoryName}`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <div
            onClick={()=>navigate(`/post-details/${post._id}/${post.title.replaceAll(' ','-')}`)}
            key={post._id}
            className="bg-white hover:cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {post.images.length > 0 && (
              <img
                src={import.meta.env.VITE_BASE_FILE+post.images[0]}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title.split(' ').slice(0,9).join(' ')}....</h2>
              <p className="text-gray-600 mb-4">{post.description.split(' ').slice(0,9).join(' ')}...</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Category: {post.categoryId?.title || "Uncategorized"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}