import supabase from "./supabase";
import type { Like, Friendship } from "./types";

// Funciones para manejar amigos
export async function sendFriendRequest(friendId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No user logged in");

  const { error } = await supabase.from("friendships").insert({
    user_id: user.id,
    friend_id: friendId,
    status: "pending",
  });

  if (error) throw error;
}

export async function acceptFriendRequest(friendshipId: string) {
  const { error } = await supabase
    .from("friendships")
    .update({ status: "accepted" })
    .eq("id", friendshipId);

  if (error) throw error;
}

export async function getFriendRequests() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No user logged in");

  const { data, error } = await supabase
    .from("friendships")
    .select(
      `
      id,
      user_id,
      friend_id,
      created_at,
      status,
      profiles!friendships_user_id_fkey (username, avatar_url)
    `
    )
    .eq("friend_id", user.id)
    .eq("status", "pending");

  if (error) throw error;
  return data;
}

export async function getFriends() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No user logged in");

  const { data, error } = await supabase
    .from("friendships")
    .select(
      `
      id,
      user_id,
      friend_id,
      created_at,
      profiles!friendships_friend_id_fkey (username, avatar_url)
    `
    )
    .eq("user_id", user.id)
    .eq("status", "accepted");

  if (error) throw error;
  return data;
}

// Funciones para manejar ratings
export async function rateItem(
  itemId: string,
  itemType: "album" | "track",
  rating: number
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No user logged in");

  const { error } = await supabase.from("ratings").upsert({
    user_id: user.id,
    item_id: itemId,
    item_type: itemType,
    rating,
  });

  if (error) throw error;
}

export async function getItemRating(
  itemId: string,
  itemType: "album" | "track"
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("ratings")
    .select("rating")
    .eq("user_id", user.id)
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .single();

  if (error) return null;
  return data?.rating;
}

// Funciones para manejar reviews
export async function addReview(
  itemId: string,
  itemType: "album" | "track",
  content: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No user logged in");

  const { error } = await supabase.from("reviews").insert({
    user_id: user.id,
    item_id: itemId,
    item_type: itemType,
    content,
  });

  if (error) throw error;
}

export async function getItemReviews(
  itemId: string,
  itemType: "album" | "track"
) {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      content,
      created_at,
      profiles (username, avatar_url)
    `
    )
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Funciones para manejar likes
export async function toggleLike(itemId: string, itemType: "album" | "track") {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No user logged in");

  // Verificar si ya existe el like
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .single();

  if (existingLike) {
    // Si existe, eliminar el like
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", existingLike.id);

    if (error) throw error;
    return false; // Retorna false para indicar que se quitó el like
  } else {
    // Si no existe, crear el like
    const { error } = await supabase.from("likes").insert({
      user_id: user.id,
      item_id: itemId,
      item_type: itemType,
    });

    if (error) throw error;
    return true; // Retorna true para indicar que se agregó el like
  }
}

export async function checkIfLiked(
  itemId: string,
  itemType: "album" | "track"
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .single();

  if (error) return false;
  return !!data;
}

export async function getLikes(itemId: string, itemType: "album" | "track") {
  const { data, error } = await supabase
    .from("likes")
    .select(
      `
      id,
      user_id,
      created_at,
      profiles (username, avatar_url)
    `
    )
    .eq("item_id", itemId)
    .eq("item_type", itemType);

  if (error) throw error;
  return data;
}
