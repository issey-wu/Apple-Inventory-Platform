import Link from 'next/link';

export default function EditDeviceNotFound() {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Device Not Found</h1>
      <p className="text-lg mb-6">Sorry, no device with that ID exists in our inventory.</p>
      <Link 
        href="/admin"
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back to Admin Panel
      </Link>
    </div>
  );
}