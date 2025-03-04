import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Utils/AuthContext';

const Layout = () => {
  const {handleAuth}=useContext(AuthContext)
  const navigate=useNavigate()
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
        <div className="text-2xl font-semibold text-white px-4">
          Dashboard
        </div>
        <nav>
          <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Home
          </Link>
          <Link to="/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Posts
          </Link>
          <Link to="/comments" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Comments
          </Link>
          <Link to="/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Users
          </Link>
          <Link to="/categories" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Categories
          </Link>
        </nav>
        <button onClick={()=>{handleAuth(null,null)
          navigate('/login')
        }} className='bg-red-500 text-white px-6 py-2 rounded-md mx-auto block'>LogOut</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;