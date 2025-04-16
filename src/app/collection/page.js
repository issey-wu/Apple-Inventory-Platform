import Link from 'next/link';
import { getAllDevices } from '../../utils/api';

export default async function CollectionPage() {
  const devices = await getAllDevices();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Device Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div 
            key={device.id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{device.device_name}</h2>
              <span className="text-gray-500">ID: {device.id}</span>
            </div>
            <Link 
              href={`/collection/${device.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}