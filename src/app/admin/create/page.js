import Link from 'next/link';
import { createDeviceAction } from '../actions';

export default function CreateDevicePage() {
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
        <form action={createDeviceAction} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="number"
              id="id"
              name="id"
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