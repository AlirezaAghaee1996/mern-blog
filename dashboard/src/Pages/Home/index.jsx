import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
     

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Admin!</h1>
          <p className="text-gray-600">Here's what's happening today.</p>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-gray-500">+5% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">$12,345</p>
            <p className="text-sm text-gray-500">+10% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Active Projects</h3>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-gray-500">+3 from last week</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">Manage Users</h3>
            <p className="text-sm text-gray-500">View and manage all users.</p>
            <a
              href="#"
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Go to Users
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">View Reports</h3>
            <p className="text-sm text-gray-500">Generate and view reports.</p>
            <a
              href="#"
              className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              View Reports
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">Settings</h3>
            <p className="text-sm text-gray-500">Update your settings.</p>
            <a
              href="#"
              className="mt-4 inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Go to Settings
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}