import { Settings, LogOut } from "lucide-react";

export function Profile() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-800"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Usuario</h1>
              <p className="text-gray-400">@username</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-emerald-500 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-white mb-4">
              Álbumes Favoritos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-800 rounded-md flex items-center justify-center border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <span className="text-gray-500">Álbum {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-white mb-4">
              Actividad Reciente
            </h2>
            <div className="space-y-4">
              <div className="text-center text-gray-500 py-4 bg-gray-800 rounded-lg border border-gray-700">
                No hay actividad reciente
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
