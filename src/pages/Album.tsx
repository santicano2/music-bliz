import { useParams, Link } from "react-router-dom";
import { Star, Heart, MessageCircle, Share2, Clock } from "lucide-react";

export function Album() {
  const { id } = useParams();

  // Datos de ejemplo
  const album = {
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: "1973",
    image:
      "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&q=80&w=400",
    tracks: [
      { title: "Speak to Me", duration: "1:30" },
      { title: "Breathe", duration: "2:43" },
      { title: "On the Run", duration: "3:30" },
      { title: "Time", duration: "7:01" },
      { title: "The Great Gig in the Sky", duration: "4:15" },
    ],
    rating: 4.5,
    reviews: 1234,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={album.image}
            alt={album.title}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(album.rating)
                      ? "text-emerald-500 fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">
              {album.rating} ({album.reviews})
            </span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md flex items-center justify-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Rate</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-emerald-500 border border-gray-800 rounded-md">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-emerald-500 border border-gray-800 rounded-md">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-emerald-500 border border-gray-800 rounded-md">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{album.title}</h1>
          <Link
            to={`/artist/${id}`}
            className="text-emerald-500 hover:text-emerald-400 text-lg"
          >
            {album.artist}
          </Link>
          <p className="text-gray-400 mt-1">{album.year}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Tracks</h2>
            <div className="space-y-2">
              {album.tracks.map((track, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 bg-gray-900 rounded-md hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 w-6">{index + 1}</span>
                    <span className="text-gray-200">{track.title}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
