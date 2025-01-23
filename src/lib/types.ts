export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  favorite_albums: string[];
  created_at: string;
};

export type Rating = {
  id: string;
  user_id: string;
  item_id: string;
  item_type: "album" | "track";
  rating: number;
  created_at: string;
};

export type Review = {
  id: string;
  user_id: string;
  item_id: string;
  item_type: "album" | "track";
  content: string;
  created_at: string;
};

export type Like = {
  id: string;
  user_id: string;
  item_id: string;
  item_type: "album" | "track";
  created_at: string;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  created_at: string;
  status: "pending" | "accepted";
};
