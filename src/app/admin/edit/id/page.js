// src/app/admin/edit/[id]/page.js
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDeviceById } from '@/utils/api';
import { updateDeviceAction } from '@/app/actions'; // Adjust this path as needed
import EditDeviceForm from './edit-form'; // Assumes edit-form.js is in the same folder

export default async function EditDevicePage({ params }) {
  const device = await getDeviceById(params.id);
  
  if (!device) {
    notFound();
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Admin
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Edit Device: {device.device_name}</h1>
      
      {/* Pass the server action as a prop to the client component */}
      <EditDeviceForm device={device} updateDeviceAction={updateDeviceAction} />
    </div>
  );
}