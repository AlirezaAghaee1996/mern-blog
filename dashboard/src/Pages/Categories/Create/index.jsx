import React, { useState } from 'react';
import useFormFields from '../../../Utils/useFormFields';
import fetchData from '../../../Utils/fetchData';
import { useContext } from 'react';
import { AuthContext } from '../../../Utils/AuthContext';
import notify from '../../../Utils/notify';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
 const [errors,setErrors]=useState('')
  const [fields,handleChange]=useFormFields()
  const [loading,setLoding]=useState(false)
  const {token}=useContext(AuthContext)
  const navigate=useNavigate()
  const handleSubmit = async(e) => {
      e.preventDefault()
      const response=await fetchData('categories',{
        method:'POST',
        headers:{
            'authorization':`brear ${token}`,
            "content-type":'application/json'
        },
        body:JSON.stringify(fields)

      })
      if(response.success){
        notify(response.message,'success')
        navigate('/categories')
      }else{
        notify(response.message,'error')

      }
  };

  return (
    <div className="h-[100%] bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Category</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Icon Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon URL</label>
            <input
              type="text"
              name='icon'
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter icon URL (optional)"
            />
          </div>

          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={handleChange}
              name='title'
              required
              className={`mt-1 block w-full px-4 py-2 border ${
                errors ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter category title"
            />
            {errors?.title && (
              <p className="mt-2 text-sm text-red-500">{errors}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full disabled:opacity-25 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;