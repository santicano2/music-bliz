import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Users, Check, X } from "lucide-react";
import { useAuth } from "../lib/auth";
import { getFriends, getFriendRequests, acceptFriendRequest } from "../lib/api";

export function Friends() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    if (user) {
      loadFriends();
      loadFriendRequests();
    }
  }, [user]);

  async function loadFriends() {
    try {
      const friendsData = await getFriends();
      setFriends(friendsData);
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  }

  async function loadFriendRequests() {
    try {
      const requests = await getFriendRequests();
      setFriendRequests(requests);
    } catch (error) {
      console.error("Error loading friend requests:", error);
    }
  }

  async function handleAcceptRequest(friendshipId: string) {
    try {
      await acceptFriendRequest(friendshipId);
      await loadFriendRequests();
      await loadFriends();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Inicia sesión para ver tus amigos</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Amigos</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md">
          <UserPlus className="w-4 h-4" />
          <span>Agregar Amigo</span>
        </button>
      </div>

      {friendRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-4">
            Solicitudes Pendientes
          </h2>
          <div className="space-y-4">
            {friendRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-900 rounded-lg p-4 border border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        request.profiles.avatar_url ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
                      }
                      alt={request.profiles.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-white">
                        {request.profiles.username}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Quiere ser tu amigo
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 rounded-md">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {friends.map((friend) => (
          <Link
            key={friend.id}
            to={`/profile/${friend.profiles.username}`}
            className="block bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  friend.profiles.avatar_url ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
                }
                alt={friend.profiles.username}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-white">
                  {friend.profiles.username}
                </h3>
                <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>
                    Amigos desde{" "}
                    {new Date(friend.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {friends.length === 0 && (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            No tienes amigos aún. ¡Comienza a agregar algunos!
          </div>
        )}
      </div>
    </div>
  );
}
