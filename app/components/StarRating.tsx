"use client";

import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid"; //Make sure you have this installed.  If not, run `npm install @heroicons/react`


interface StarRatingProps {
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    onChange(rating);
  };

  return (
    <div className="flex items-center justify-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-12 w-14 cursor-pointer ${
            index < selectedRating
              ? "text-starColor" // Filled star
              : "text-grayTextColor" // Unfilled star
          }`}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
