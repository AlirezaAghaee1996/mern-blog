import React, { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { useNavigate } from "react-router-dom";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";

export default function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const {token}=useContext(AuthContext)
  // Fetch all users
  useEffect(() => {
    (async () => {
      const response = await fetchData("users", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.success) {
        setUsers(response.data);
      } else {
        notify("Failed to fetch users", "error");
      }
    })();
  }, []);

  // Handle user deletion
  const handleDelete = async (id) => {
    const response = await fetchData(`users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });

    if (response.success) {
      notify(response.message, "success");
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } else {
      notify(response.message, "error");
    }
  };

  // Map users to table rows
  const userItems = users?.map((user, index) => (
    <tr
      key={index}
      onClick={(e) => {
        if (!e.target.closest(".deleteBtn")) {
          navigate(`/users/${user._id}`);
        }
      }}
      className="hover:bg-gray-200 even:bg-gray-50"
    >
      <td className="py-2 px-4 text-center border-b">{user.username}</td>
      <td className="py-2 px-4 text-center border-b">{user.email}</td>
      <td className="py-2 px-4 text-center border-b">{user.role}</td>
      <td className="py-2 px-4 text-center border-b">
        <button
          disabled={user.username=='superAdmin'}
          onClick={() => handleDelete(user._id)}
          className="deleteBtn py-1 disabled:opacity-5 px-3 rounded hover:bg-gray-300 focus:outline-none transform hover:scale-105 transition-transform"
        >
          <box-icon name="trash" type="solid" color="#ff0000" />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>{userItems}</tbody>
        </table>
      </div>
    </div>
  );
}
