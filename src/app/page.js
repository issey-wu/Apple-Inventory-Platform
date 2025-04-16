import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Velocity Devices</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Browse our catalog of latest electronic devices or manage the inventory through our admin panel.
      </p>
      <div className="flex space-x-4">
        <Link 
          href="/collection" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse Devices
        </Link>
        <Link 
          href="/admin" 
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
}