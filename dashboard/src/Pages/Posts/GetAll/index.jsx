import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { useNavigate } from "react-router-dom";
import notify from "../../../Utils/notify";

export default function GetAllPost() {
  const [posts, setPosts] = useState();
  const navigate=useNavigate()
  useEffect(() => {
    (async () => {
      const response = await fetchData("posts?populate=categoryId");
      setPosts(response.data);
    })();
  }, []);
  const handleDelete=async (id) => {
    const response = await fetchData(`posts/${id}`,{
      method:'DELETE',
      headers:{
          'authorization':`brear ${token}`,
          "content-type":'application/json'
      }
    })
    if (response.success) {
      notify(response.message,'success')
      const newPost=posts.filter(e=>e._id!=id)
      setPosts(newPost)
    }
  };
  const items = posts?.map((post, index) => (
    <tr key={index} onClick={(e)=>{
      if(!e.target.closest('.deleteBtn')){
        navigate(`/posts/${post._id}`)
      }
    }} className="hover:bg-gray-200 even:bg-gray-50">
      <td className="py-2 px-4 text-center border-b">{post?.title}</td>
      <td className="py-2 px-4 text-center border-b">
        <img
          src={import.meta.env.VITE_BASE_FILE+post?.images[0]}
          alt={post.title}
          className="w-[60px] block mx-auto h-[60px] rounded"
        />
      </td>
      <td className="py-2 px-4 text-center border-b">{post?.categoryId?.title}</td>
      <td className="py-2 px-4 text-center border-b">
        <button
          onClick={()=>handleDelete(post?._id)}
          className="deleteBtn py-1 px-3 rounded hover:bg-gray-300 focus:outline-none transform hover:scale-105 transition-transform"
        >
          <box-icon name='trash' type='solid' color='#ff0000'/>
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Category Name</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    </div>
  );
}
