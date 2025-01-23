import { Link, Outlet } from "react-router-dom";
import { Music, Search, User } from "lucide-react";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Music className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">
                  MusicRate
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/search"
                className="p-2 text-gray-600 hover:text-indigo-600"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                to="/profile"
                className="p-2 text-gray-600 hover:text-indigo-600"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
