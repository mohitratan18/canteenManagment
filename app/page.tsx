"use client"
import Image from "next/image";
// import navbar from '../components/navbar';
import Link from "next/link";
import puri from "../public/images/puri.png";
import { useEffect, useState } from "react";

const images = [
  "https://i.ibb.co/mc9qq8N/puri-removebg-preview.png",
  "https://i.ibb.co/6sL9m7q/idli-removebg-preview.png", // Example image URLs
  "https://i.ibb.co/YjjFxKt/bonda-removebg-preview.png", 
  "https://i.ibb.co/qBCjGSk/dosa-removebg-preview.png", // Add more as needed
  // ... more image URLs
];


export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
  return (
    <>
      <div className=" flex-col lg:flex lg:flex-row items-center justify-center mt-[100px] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl mb-8">
            Order Food Online
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            We offer a variety of food items, from Indian food to International
            cuisine.
          </p>
          <div className="mt-5 sm:mt-8 flex justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                href="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:flex sm:justify-center md:w-[600px] md:h-[500px] ">
        <Image
          src={images[currentImageIndex]}
          alt={`Food Item ${currentImageIndex + 1}`}
          width={500}
          height={500}
          className="rounded-lg mb-2"
          priority
        />
      </div>
      </div>
    </>
  );
}
