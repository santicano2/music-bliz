import React, { useState } from "react";
import { useAuth } from "../lib/auth";
import { Rating } from "./Rating";

interface ReviewProps {
  itemId: string;
  itemType: "album" | "track";
  onSubmit: (review: { rating: number; content: string }) => Promise<void>;
}

export function Review({ itemId, itemType, onSubmit }: ReviewProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, content });
      setContent("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user) {
    return (
      <div className="text-center py-4 text-gray-400">
        Inicia sesión para dejar una reseña
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tu calificación
        </label>
        <Rating value={rating} onChange={setRating} size="lg" />
      </div>

      <div>
        <label
          htmlFor="review"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Tu reseña
        </label>
        <textarea
          id="review"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Escribe tu reseña..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || rating === 0 || !content.trim()}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Publicar Reseña"}
      </button>
    </form>
  );
}
