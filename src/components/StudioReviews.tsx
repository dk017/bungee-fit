"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Star } from "lucide-react";

interface Review {
  authorName: string;
  rating?: number;
  reviewText?: string;
  reviewDate?: string;
  stars?: string;
}

export const StudioReviews = ({ reviews }: { reviews: Review[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center w-full"
      >
        <h3 className="text-lg font-semibold">Testimonials</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {reviews.map((review) => (
            <div
              key={`${review.authorName}-${review.reviewDate}`}
              className="border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{review.authorName}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (review.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(review.reviewDate || "").toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700 whitespace-pre-line">
                {review.reviewText}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
