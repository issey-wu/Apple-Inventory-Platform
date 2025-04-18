'use client';

import { useState } from 'react';
import { validateDevice } from '../../../../utils/validation';

export default function EditDeviceForm({ device, updateDeviceAction }) {
  const [formData, setFormData] = useState({
    id: device.id,
    device_name: device.device_name,
    price: device.price,
    release_date: device.release_date,
    rating: device.rating,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  // Handle controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'id':
        if (isNaN(parseInt(value)) || parseInt(value) <= 0) {
          return "ID must be a positive number.";
        }
        break;
      case 'device_name':
        if (!value || value.length < 3 || value.length > 30) {
          return "Device name must be between 3 and 30 characters.";
        }
        break;
      case 'price':
        const price = parseFloat(value);
        if (isNaN(price) || price <= 0 || price >= 10000) {
          return "Price must be a number between $0 - $10,000";
        }
        break;
      case 'rating':
        const rating = parseFloat(value);
        if (isNaN(rating) || rating < 1 || rating > 5) {
          return "Rating must be a number between 1 and 5";
        }
        break;
    }
    return null;
  };

  // Handle blur event to validate fields as user leaves them
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate form before submission
  const handleFormAction = async (formData) => {
    const deviceData = {
      id: formData.get('id'),
      device_name: formData.get('device_name'),
      price: parseFloat(formData.get('price')),
      release_date: formData.get('release_date'),
      rating: parseFloat(formData.get('rating'))
    };
    
    // Validate all fields at once
    const newFieldErrors = {};
    let hasErrors = false;
    
    // Check each field
    Object.entries(deviceData).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) {
        newFieldErrors[field] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setFieldErrors(newFieldErrors);
      return; // Don't proceed with the server action
    }
    
    // Clear errors and proceed
    setFieldErrors({});
    return updateDeviceAction(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form action={handleFormAction} className="space-y-4" noValidate>
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md ${fieldErrors.id ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            required
          />
          {fieldErrors.id && (
            <div className="mt-1 text-sm text-red-600">{fieldErrors.id}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="device_name" className="block text-sm font-medium text-gray-700">
            Device Name
          </label>
          <input
            type="text"
            id="device_name"
            name="device_name"
            value={formData.device_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md ${fieldErrors.device_name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            required
          />
          {fieldErrors.device_name && (
            <div className="mt-1 text-sm text-red-600">{fieldErrors.device_name}</div>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (CAD$)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md ${fieldErrors.price ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            required
          />
          {fieldErrors.price && (
            <div className="mt-1 text-sm text-red-600">{fieldErrors.price}</div>
          )}
        </div>

        <div>
          <label htmlFor="release_date" className="block text-sm font-medium text-gray-700">
            Release Date
          </label>
          <input
            type="date"
            id="release_date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md ${fieldErrors.rating ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            required
          />
          {fieldErrors.rating && (
            <div className="mt-1 text-sm text-red-600">{fieldErrors.rating}</div>
          )}
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