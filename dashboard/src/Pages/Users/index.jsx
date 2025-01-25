import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Users() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      
      <Outlet /> 
    </div>
  )
}
