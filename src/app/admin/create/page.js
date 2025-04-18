'use client';

import Link from 'next/link';
import { useState } from 'react';
import { validateDevice } from '../../../utils/validation';
import { createDeviceAction } from '../actions';

export default function CreateDevicePage() {
  const [formData, setFormData] = useState({
    id: '',
    device_name: '',
    price: '',
    release_date: '',
    rating: ''
  });
  const [errors, setErrors] = useState([]);
  
  // Handle controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Create a wrapped action that does validation first
  const handleFormAction = async (formData) => {
    const deviceData = {
      id: formData.get('id'),
      device_name: formData.get('device_name'),
      price: parseFloat(formData.get('price')),
      release_date: formData.get('release_date'),
      rating: parseFloat(formData.get('rating'))
    };
    
    const validationErrors = validateDevice(deviceData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // No need to update formData here since we're using controlled inputs
      return; // Don't proceed with the server action
    }
    
    // Clear errors and proceed
    setErrors([]);
    return createDeviceAction(formData);
  };

  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/admin"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Admin
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Create New Device</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
            <h3 className="text-red-800 font-medium mb-2">
              Please correct the following errors:
            </h3>
            <ul className="list-disc pl-5 text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <form action={handleFormAction} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="device_name" className="block text-sm font-medium text-gray-700">Device Name</label>
            <input
              type="text"
              id="device_name"
              name="device_name"
              value={formData.device_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (CAD$)</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="release_date" className="block text-sm font-medium text-gray-700">Release Date</label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              Create Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}