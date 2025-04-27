export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Product Management Platform</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Browse the catalog of devices or manage the product-line through the admin panel.
      </p>
      <div className="flex space-x-4">
        <a 
          href="/collection" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse Devices
        </a>
        <a 
          href="/admin" 
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Admin Panel
        </a>
      </div>
    </div>
  );
}