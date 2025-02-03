import React, { useContext, useState } from "react";
import fetchData from "../../../Utils/fetchData"; // Adjust the path as needed
import useFormFields from "../../../Utils/useFormFields"; // Adjust the path as needed
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ handlePageType }) => {
  const [fields, handleChange] = useFormFields();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError("");
    try {
      const response = await fetchData("auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      console.log(response);
      if (response.success) {
        notify(response.message, "success");
        handleAuth(response.data.token, response.data.user);
        navigate("/");
      } else {
        setError(response.message || "Invalid username or password");
      }
    } catch (error) {
      setError("Connection Lost");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={fields.username || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={fields.password || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <span className="cursor-pointer " onClick={handlePageType}>
              If you don't have An Account ? Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
