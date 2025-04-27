import './globals.css';

export const metadata = {
  title: 'Apple Devices Inventory',
  description: 'Mock inventory management system for Apple Devices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-700 text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">Apple Product Line (Mock)</h1>
              <nav className="mt-2">
                <ul className="flex flex-wrap space-x-4 md:space-x-6">
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/collection" className="hover:underline">
                      Browse Devices
                    </a>
                  </li>
                  <li>
                    <a href="/admin" className="hover:underline">
                      Admin Panel
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          
          <main className="flex-grow container mx-auto py-6 px-4">
            {children}
          </main>
          
          <footer className="bg-gray-200 p-4 mt-auto">
            <div className="container mx-auto text-center">
              <p>© 2025 Apple Mock-Inventory Project | Issey Wu | For Educational Purposes Only</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}