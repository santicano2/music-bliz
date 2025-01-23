import { Link, Outlet } from "react-router-dom";
import { Music, Search, User } from "lucide-react";

export function Layout() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Music className="w-6 h-6 text-emerald-500" />
                <span className="text-xl font-bold text-white">MusicRate</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-300 hover:text-white"
                >
                  INICIO
                </Link>
                <Link
                  to="/search"
                  className="text-sm font-medium text-gray-300 hover:text-white"
                >
                  EXPLORAR
                </Link>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-300 hover:text-white"
                >
                  DIARIO
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/search"
                className="p-2 text-gray-400 hover:text-white md:hidden"
              >
                <Search className="w-5 h-5" />
              </Link>
              <div className="relative group">
                <Link to="/profile" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white">
                    <User className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            © 2024 MusicRate. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
