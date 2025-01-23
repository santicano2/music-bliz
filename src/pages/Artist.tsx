import { useParams, Link } from "react-router-dom";
import { Star, Users } from "lucide-react";

export function Artist() {
  const { id } = useParams();

  // Datos de ejemplo
  const artist = {
    name: "Pink Floyd",
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=400",
    followers: "1.2M",
    albums: [
      {
        id: "1",
        title: "The Dark Side of the Moon",
        year: "1973",
        image:
          "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&q=80&w=200",
        rating: 4.8,
      },
      {
        id: "2",
        title: "The Wall",
        year: "1979",
        image:
          "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?auto=format&fit=crop&q=80&w=200",
        rating: 4.7,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="h-48 bg-gradient-to-b from-gray-800 to-black rounded-t-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end space-x-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-32 h-32 rounded-lg shadow-lg ring-2 ring-gray-800"
          />
          <div>
            <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{artist.followers} seguidores</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Álbumes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {artist.albums.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`} className="group">
              <div className="bg-gray-900 rounded-lg p-4 transition-all duration-200 hover:bg-gray-800">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <h3 className="font-medium text-white group-hover:text-emerald-500 truncate">
                  {album.title}
                </h3>
                <p className="text-sm text-gray-400">{album.year}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-emerald-500 fill-current" />
                  <span className="text-sm text-gray-400">{album.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
