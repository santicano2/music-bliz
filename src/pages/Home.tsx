import { Star, Heart } from "lucide-react";

export function Home() {
  // Fake data
  const recentActivity = [
    {
      id: 1,
      user: "María García",
      action: "rated",
      item: "The Dark Side of the Moon",
      rating: 5,
      type: "album",
      image:
        "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 2,
      user: "Carlos Ruiz",
      action: "reviewed",
      item: "Bohemian Rhapsody",
      type: "track",
      image:
        "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?auto=format&fit=crop&q=80&w=200",
    },
  ];

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
                    <span className="font-medium text-emerald-500">
                      {activity.user}
                    </span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium text-white">
                      {activity.item}
                    </span>
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
                <button className="p-2 text-gray-500 hover:text-emerald-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
