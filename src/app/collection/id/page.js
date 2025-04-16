import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllDevices, getDeviceById } from '../../utils/api';

// Generate static pages for first 10 devices
export async function generateStaticParams() {
  const devices = await getAllDevices();
  const firstTenDevices = devices.slice(0, 10);
  
  return firstTenDevices.map((device) => ({
    id: device.id.toString(),
  }));
}

export default async function DeviceDetailPage({ params }) {
  const device = await getDeviceById(params.id);
  
  if (!device) {
    notFound();
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/collection"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← back
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">{device.device_name}</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap bg-gray-50 font-medium">ID</td>
              <td className="px-6 py-4 whitespace-nowrap">{device.id}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap bg-gray-50 font-medium">Device Name</td>
              <td className="px-6 py-4 whitespace-nowrap">{device.device_name}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap bg-gray-50 font-medium">Price</td>
              <td className="px-6 py-4 whitespace-nowrap">${device.price.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap bg-gray-50 font-medium">Release Date</td>
              <td className="px-6 py-4 whitespace-nowrap">{device.release_date}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap bg-gray-50 font-medium">Rating</td>
              <td className="px-6 py-4 whitespace-nowrap">{device.rating} / 5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}