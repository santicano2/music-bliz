import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Rating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: RatingProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const starSize = sizes[size];

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(rating)}
          className={`${
            readonly ? "cursor-default" : "cursor-pointer"
          } transition-colors`}
        >
          <Star
            className={`${starSize} ${
              rating <= value
                ? "text-emerald-500 fill-current"
                : "text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
