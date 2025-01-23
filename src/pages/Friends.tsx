import { Link } from "react-router-dom";
import { UserPlus, Users } from "lucide-react";

export function Friends() {
  // Datos de ejemplo
  const friends = [
    {
      username: "maria_garcia",
      name: "María García",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      mutualFriends: 12,
    },
    {
      username: "carlos_ruiz",
      name: "Carlos Ruiz",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      mutualFriends: 8,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Amigos</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md">
          <UserPlus className="w-4 h-4" />
          <span>Agregar Amigo</span>
        </button>
      </div>

      <div className="space-y-4">
        {friends.map((friend) => (
          <Link
            key={friend.username}
            to={`/profile/${friend.username}`}
            className="block bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-white">{friend.name}</h3>
                <p className="text-gray-400">@{friend.username}</p>
                <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{friend.mutualFriends} amigos en común</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
