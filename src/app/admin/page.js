import Link from 'next/link';
import { getAllDevices } from '../../utils/api';
import { deleteDeviceAction } from './actions';

export default async function AdminPage() {
  const devices = await getAllDevices();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link 
          href="/admin/create"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Create New
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devices.map((device) => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap">{device.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.device_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${device.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.release_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/admin/edit/${device.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    E
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <form action={deleteDeviceAction}>
                    <input type="hidden" name="id" value={device.id} />
                    <button 
                      type="submit"
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      D
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}