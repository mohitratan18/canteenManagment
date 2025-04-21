"use client";
import { useState } from "react";
import { FeedBack } from "@/app/types";
import { Card } from "@/components/ui/card";
import StarRating from "@/app/components/StarRating";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { feedbackPost } from "@/lib/api";

const FeedbackForm = () => {
  const { toast } = useToast();
  const [feedbackData, setFeedbackData] = useState<FeedBack>({
    id: "",
    userId: "",
    content: "",
    rating: 0,
    improvement: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const handleRatingChange = (rating: number) => {
    setFeedbackData({ ...feedbackData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {

      const response = await feedbackPost({
        id: feedbackData.id,
        userId: uuidv4(),
        content: feedbackData.content,
        rating: feedbackData.rating,
        improvement: feedbackData.improvement,

      });

      if (response?.status === 201) {
        toast({
          title: "Success",
          description: "Thank you for your feedback!",
          duration: 3000,
        });

        // Reset form
        setFeedbackData({
          id: "",
          userId: "",
          content: "",
          rating: 0,
          improvement: "",
        });
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Give us your Feedback
      </h1>
      <Card className="max-w-4xl mx-auto">
        <form className="p-6 rounded-lg mb-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300" htmlFor="content">
              Your Feedback
            </label>
            <textarea
              id="content"
              name="content"
              value={feedbackData.content}
              onChange={handleChange}
              className="w-full p-2 rounded bg-background text-gray-900 dark:text-gray-100"
              rows={5}
              required
            />

            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300" htmlFor="improvement">
              Suggestions for Improvement
            </label>
            <textarea
              id="improvement"
              name="improvement"
              value={feedbackData.improvement}
              onChange={handleChange}
              className="w-full p-2 rounded bg-background text-gray-900 dark:text-gray-100"
              rows={3}
            />
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300" htmlFor="rating">
              Rating (1-5)
            </label>

            <StarRating onChange={handleRatingChange} />

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              {" "}
              Submit Feedback
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default FeedbackForm;
