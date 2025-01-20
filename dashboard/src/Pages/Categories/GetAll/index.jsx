import React, { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { useNavigate } from "react-router-dom";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";

const GetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    const {token}=useContext(AuthContext)
  
  const handleDelete = async (id) => {
    const response = await fetchData(`categories/${id}`,{
      method:'DELETE',
      headers:{
          'authorization':`brear ${token}`,
          "content-type":'application/json'
      }

    })
    if (response.success) {
      notify(response.message,'success')
      const newCat=categories.filter(e=>e._id!=id)
      setCategories(newCat)
    }
  };

  useEffect(() => {
    // Fetch categories from your API
    const fetchCategories = async () => {
      try {
        const response = await fetchData("categories"); // Replace with your API endpoint
        if (!response.success) {
          throw new Error("Failed to fetch categories");
        }
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            onClick={(e) => {
              if(!e.target.closest('.remove-btn')){
                navigate(`/categories/${category._id}`)}}

              }
            key={category._id}
            className="border flex justify-between items-center cursor-pointer p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              {category.icon && <box-icon name={category.icon}></box-icon>}
              <h2 className="text-xl ms-2 font-semibold">{category.title}</h2>
            </div>
            <button className="flex remove-btn items-center" onClick={()=>handleDelete(category._id)}>
              {" "}
              <box-icon color="#ff0000" name="trash" type="solid"></box-icon>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllCategories;
