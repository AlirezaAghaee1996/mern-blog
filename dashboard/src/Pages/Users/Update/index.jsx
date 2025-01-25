import React, { useState, useEffect, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Utils/AuthContext";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { id:userId } = useParams();
  const navigate = useNavigate();
  const {token}=useContext(AuthContext)
  // Fetch user data
  useEffect(() => {
    (async () => {
      const response = await fetchData(`users/${userId}`,{
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.success) {
        notify("Failed to fetch user data", "error");
        navigate("/users"); // Redirect if user not found
      } else {
        setFormData({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        });
      }
    })();
  }, [userId, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetchData(`users/${userId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to update user");
      }

      notify("User updated successfully!", "success");
      navigate("/users"); // Redirect to users list
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role *
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;