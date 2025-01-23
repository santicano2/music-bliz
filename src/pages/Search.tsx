import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar álbumes, canciones o artistas..."
            className="w-full px-4 py-3 pl-12 text-white placeholder-gray-500 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-white mb-4">Resultados</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
              Comienza a escribir para buscar música
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
