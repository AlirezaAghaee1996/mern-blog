import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";

export default function GetAllPost() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetchData("posts?populate=categoryId");
      setPosts(response.data);
    })();
  }, []);
  const handleDelete=(id)=>{

  }
  const items = posts?.map((e, index) => (
    <tr key={index} className="hover:bg-gray-200 even:bg-gray-50">
      <td className="py-2 px-4 text-center border-b">{e?.title}</td>
      <td className="py-2 px-4 text-center border-b">
        <img
          src={import.meta.env.VITE_BASE_FILE+e?.images[0]}
          alt={e.title}
          className="w-[60px] block mx-auto h-[60px] rounded"
        />
      </td>
      <td className="py-2 px-4 text-center border-b">{e?.categoryId?.title}</td>
      <td className="py-2 px-4 text-center border-b">
        <button
          onClick={()=>handleDelete(e?._id)}
          className=" py-1 px-3 rounded hover:bg-gray-300 focus:outline-none transform hover:scale-105 transition-transform"
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
