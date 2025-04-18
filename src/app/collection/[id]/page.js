import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllDevices } from '../../../utils/api'

export async function generateStaticParams() {
  const devices = await getAllDevices()
  return devices
    .slice(0, 10)
    .map((device) => ({ id: device.id.toString() }))
}

export default async function DeviceDetailPage({ params }) {
  try {
    const res = await fetch(
      `http://localhost:4000/devices/${params.id}`,
      { cache: 'no-store' }
    )
    if (!res.ok) {
      return notFound()
    }
    const device = await res.json()

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

        <h1 className="text-3xl font-bold mb-6">
          {device.device_name}
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 bg-gray-50 font-medium">
                  ID
                </td>
                <td className="px-6 py-4">{device.id}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 bg-gray-50 font-medium">
                  Device Name
                </td>
                <td className="px-6 py-4">
                  {device.device_name}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 bg-gray-50 font-medium">
                  Price
                </td>
                <td className="px-6 py-4">
                  ${device.price.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 bg-gray-50 font-medium">
                  Release Date
                </td>
                <td className="px-6 py-4">
                  {device.release_date}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 bg-gray-50 font-medium">
                  Rating
                </td>
                <td className="px-6 py-4">
                  {device.rating} / 5
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching device:', error)
    return (
      <div className="text-red-600">
        Error loading device: {error.message}
      </div>
    )
  }
}