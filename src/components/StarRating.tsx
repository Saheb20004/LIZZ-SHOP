import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
  }

  return (
    <div className="flex items-center space-x-0.5">
      {stars}
    </div>
  );
};

export default StarRating;