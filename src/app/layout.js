import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Velocity Devices Inventory',
  description: 'Inventory management system for Velocity Devices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-700 text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">Velocity Devices Inventory</h1>
              <nav className="mt-2">
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/collection" className="hover:underline">
                      Browse Devices
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin" className="hover:underline">
                      Admin Panel
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          
          <footer className="bg-gray-200 p-4 mt-auto">
            <div className="container mx-auto text-center">
              <p>© 2025 Velocity Devices. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}