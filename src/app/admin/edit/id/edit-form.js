'use client';

import { useState } from 'react';
import { validateDevice } from '@/utils/validation';
import { updateDeviceAction } from '../../actions';

export default function EditDeviceForm({ device }) {
  const [formData, setFormData] = useState({
    id: device.id,
    device_name: device.device_name,
    price: device.price,
    release_date: device.release_date,
    rating: device.rating
  });
  
  const [errors, setErrors] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form data
    const validationErrors = validateDevice(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors and submit the form
    setErrors([]);
    
    // Convert form data to FormData for the server action
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    
    // Submit using the server action
    updateDeviceAction(formDataObj);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
          <h3 className="text-red-800 font-medium mb-2">Please correct the following errors:</h3>
          <ul className="list-disc pl-5 text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" value={formData.id} />
        
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
            Update Device
          </button>
        </div>
      </form>
    </div>
  );
}