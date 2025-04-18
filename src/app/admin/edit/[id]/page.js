import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditDeviceForm from './edit-form';
import { updateDeviceAction } from '../../actions';

export default async function EditDevicePage({ params }) {
  try {
    const response = await fetch(`http://localhost:4000/devices/${params.id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return notFound();
    }
    
    const device = await response.json();
    
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
        
        <h1 className="text-3xl font-bold mb-6">Edit Device: {device.device_name}</h1>
        
        <EditDeviceForm device={device} updateDeviceAction={updateDeviceAction} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching device:", error);
    return <div>Error loading device: {error.message}</div>;
  }
}