import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { useAuth } from "../lib/auth";
import { getFriends, toggleLike, checkIfLiked } from "../lib/api";

export function Home() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      user: "María García",
      action: "rated",
      item: "The Dark Side of the Moon",
      rating: 5,
      type: "album",
      image:
        "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&q=80&w=200",
      liked: false,
    },
    {
      id: 2,
      user: "Carlos Ruiz",
      action: "reviewed",
      item: "Bohemian Rhapsody",
      type: "track",
      image:
        "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?auto=format&fit=crop&q=80&w=200",
      liked: false,
    },
  ]);

  useEffect(() => {
    if (user) {
      loadFriends();
      checkLikedStatus();
    }
  }, [user, checkLikedStatus]);

  async function loadFriends() {
    try {
      const friendsData = await getFriends();
      setFriends(friendsData);
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  }

  async function checkLikedStatus() {
    const updatedActivity = await Promise.all(
      recentActivity.map(async (activity) => ({
        ...activity,
        liked: await checkIfLiked(activity.id.toString(), activity.type),
      }))
    );
    setRecentActivity(updatedActivity);
  }

  async function handleLike(activityId: number) {
    if (!user) return;

    try {
      const isNowLiked = await toggleLike(activityId.toString(), "album");
      setRecentActivity((prev) =>
        prev.map((activity) =>
          activity.id === activityId
            ? { ...activity, liked: isNowLiked }
            : activity
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">
          Inicia sesión para ver la actividad de tus amigos
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-white mb-6">
          Actividad Reciente
        </h1>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={activity.image}
                  alt={activity.item}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">
                    <Link
                      to={`/profile/${activity.user}`}
                      className="font-medium text-emerald-500 hover:text-emerald-400"
                    >
                      {activity.user}
                    </Link>{" "}
                    {activity.action}{" "}
                    <Link
                      to={`/album/${activity.id}`}
                      className="font-medium text-white hover:text-emerald-400"
                    >
                      {activity.item}
                    </Link>
                  </p>
                  {activity.rating && (
                    <div className="flex items-center mt-1">
                      {[...Array(activity.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-current text-emerald-500"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleLike(activity.id)}
                  className={`p-2 transition-colors ${
                    activity.liked
                      ? "text-emerald-500 hover:text-emerald-600"
                      : "text-gray-500 hover:text-emerald-500"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      activity.liked ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
