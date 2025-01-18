import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Categories() {
  return (
    <div>
    <h1 className="text-3xl font-bold mb-4">Categories</h1>
    <nav className="mb-6">
      <Link to="/categories/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create New Categories
      </Link>
    </nav>
    <Outlet /> 
  </div>
  )
}
