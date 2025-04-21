"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import { getFeedbacks } from "@/lib/api";

const FeedBack = () => {
  const { feedBacks, setFeedBacks } = useAuth();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getFeedbacks();
        if (response?.data) {
          setFeedBacks(response.data);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
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
            <Card className="p-4 mb-2 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800">
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

export default FeedBack;
