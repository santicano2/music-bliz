import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Settings, LogOut, UserPlus, Check, Clock } from "lucide-react";
import { useAuth } from "../lib/auth";
import { getFriends, sendFriendRequest } from "../lib/api";
import type { Profile as ProfileType } from "../lib/types";

export function Profile() {
  const { username } = useParams();
  const { user, profile: currentUserProfile, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [friends, setFriends] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadFriends();
    }
  }, [user, username]);

  async function loadProfile() {
    if (!username) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  async function loadFriends() {
    try {
      const friendsData = await getFriends();
      setFriends(friendsData);

      if (profile) {
        setIsFriend(friendsData.some((f) => f.friend_id === profile.id));
        // Verificar si hay una solicitud pendiente
        const { data } = await supabase
          .from("friendships")
          .select("status")
          .eq("user_id", user?.id)
          .eq("friend_id", profile.id)
          .single();

        setIsPending(data?.status === "pending");
      }
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  }

  async function handleFriendRequest() {
    if (!profile) return;

    try {
      await sendFriendRequest(profile.id);
      setIsPending(true);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  }

  const isOwnProfile =
    !username ||
    (currentUserProfile && currentUserProfile.username === username);
  const profileToShow = isOwnProfile ? currentUserProfile : profile;

  if (!profileToShow) {
    return (
      <div className="text-center py-8 text-gray-400">Cargando perfil...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                profileToShow.avatar_url ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
              }
              alt={profileToShow.username}
              className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-800"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                {profileToShow.username}
              </h1>
              <p className="text-gray-400">@{profileToShow.username}</p>
            </div>
            <div className="flex space-x-2">
              {isOwnProfile ? (
                <>
                  <button className="p-2 text-gray-500 hover:text-emerald-500 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleFriendRequest}
                  disabled={isFriend || isPending}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    isFriend
                      ? "bg-gray-700 text-gray-300 cursor-default"
                      : isPending
                      ? "bg-gray-700 text-gray-300 cursor-default"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white"
                  }`}
                >
                  {isFriend ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Amigos</span>
                    </>
                  ) : isPending ? (
                    <>
                      <Clock className="w-4 h-4" />
                      <span>Pendiente</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Agregar Amigo</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-white mb-4">
              Álbumes Favoritos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {profileToShow.favorite_albums?.map((albumId, i) => (
                <Link
                  key={albumId}
                  to={`/album/${albumId}`}
                  className="aspect-square bg-gray-800 rounded-md flex items-center justify-center border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <span className="text-gray-500">Álbum {i + 1}</span>
                </Link>
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
