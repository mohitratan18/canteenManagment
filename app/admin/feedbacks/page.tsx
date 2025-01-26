"use client";
import { useAuth } from "@/app/context/AuthContext";
import { FeedBack } from "@/app/types";
import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";

const feedbackData: FeedBack[] = [
  {
    id: "1",
    userId: "u101",
    content: "Great service, really enjoyed the experience!",
    rating: 5,
    improvement:
      "Keep up the good work and maintain the same level of quality.",
  },
  {
    id: "2",
    userId: "u102",
    content: "The product quality was good, but delivery was delayed.",
    rating: 4,
    improvement:
      "Improve the delivery timelines to enhance the overall experience.",
  },
  {
    id: "3",
    userId: "u103",
    content: "Not satisfied with the customer support. Needs improvement.",
    rating: 2,
    improvement:
      "Focus on training the customer support team to be more responsive and helpful.",
  },
  {
    id: "4",
    userId: "u104",
    content: "Decent experience overall, but some features were buggy.",
    rating: 3,
    improvement:
      "Conduct thorough testing to eliminate bugs and improve feature reliability.",
  },
  {
    id: "5",
    userId: "u105",
    content: "Absolutely fantastic! Highly recommend this to everyone.",
    rating: 5,
    improvement:
      "Consider adding more features to surprise and delight your customers.",
  },
  {
    id: "6",
    userId: "u106",
    content: "It was okay, but I expected more from the premium plan.",
    rating: 3,
    improvement: "Enhance the premium plan with additional exclusive benefits.",
  },
  {
    id: "7",
    userId: "u107",
    content: "Terrible experience. Won't be coming back.",
    rating: 1,
    improvement:
      "Address major pain points, such as product quality or service consistency, to regain trust.",
  },
];

const feedBack = () => {
  const { feedBacks, setFeedBacks } = useAuth();

  useEffect(() => {
    setFeedBacks(feedbackData);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="text-yellow-500 text-2xl mr-1">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-white text-2xl mr-1">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      {feedBacks.map((feedBack) => {
        return (
          <div key={feedBack.id}>
            {" "}
            {/* Added key prop */}
            <Card className="p-4 mb-2 hover:scale-0 ">
              <p>
                <span className="text-black font-semibold text-lg lg:text-xl">
                  UserID
                </span>{" "}
                - {feedBack.userId}
              </p>
              <div className="flex items-center mb-2">
                {" "}
                {/*Added div for stars*/}
                <p className="text-md lg:text-lg font-semibold">
                  <span className="text-black font-medium">Rating:</span>
                </p>
                {renderStars(feedBack.rating)}
              </div>
              <p className="text-md lg:text-lg font-semibold">
                <span className="text-black font-medium">FeedBack:</span>{" "}
                {feedBack.content}
              </p>
              <p className="text-md lg:text-lg font-semibold">
                <span className="text-black font-medium">Improvements:</span>{" "}
                {feedBack.improvement}
              </p>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default feedBack;
