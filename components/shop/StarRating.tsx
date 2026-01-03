import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  className?: string;
}

const StarRating = ({
  rating,
  maxStars = 5,
  size = "md",
  showRating = false,
  className = "",
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        let fillPercentage = 0;

        if (rating >= starNumber) {
          fillPercentage = 100;
        } else if (rating > index && rating < starNumber) {
          fillPercentage = (rating - index) * 100;
        }

        return (
          <div key={index} className="relative">
            <Star
              className={`${sizeClasses[size]} text-gray-300 fill-current`}
            />

            {fillPercentage > 0 && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star
                  className={`${sizeClasses[size]} text-yellow-400 fill-current`}
                />
              </div>
            )}
          </div>
        );
      })}
      {showRating && (
        <span className={`text-gray-600 ml-1 ${textSizes[size]}`}>
          {rating.toFixed(1)} reviews
        </span>
      )}
    </div>
  );
};

export default StarRating;
