import Image from "next/image";
// import navbar from '../components/navbar';
import Link from "next/link";
import puri from "../public/images/puri.png";

export default function Home() {
  return (
    <>
      <div className=" flex-col lg:flex lg:flex-row items-center justify-center mt-[100px] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl mb-8">
            Order Food Online
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
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
        <div className="mt-8 sm:flex sm:justify-center">
          <Image
            src="https://i.ibb.co/mc9qq8N/puri-removebg-preview.png"
            alt="Indian Thali"
            width={500}
            height={500}
            className="rounded-lg mb-2" // Add some styling
            priority // Optional: prioritize loading this image
          />
        </div>
      </div>

      <footer className="border-t mt-8">
        {/* Full-width container */}
        <div className="px-4 py-6 sm:py-8 md:py-12 w-full mx-auto">  {/* Removed max-w restriction */}
            <div className="container mx-auto"> {/* Inner container for content */}
              <div className="grid sm:flex sm:flex-row justify-between items-center">
                <Link href="/" className="font-semibold text-lg mb-4 sm:mb-0">
                  College Canteen
                </Link>
                <div className="flex gap-4 text-sm text-gray-600">
                  {/* Footer Links */}
                  <Link href="/about">
                    <>About Us</>
                  </Link>
                  <Link href="/contact">
                    <>Contact</>
                  </Link>
                </div>
                <div className="text-sm text-gray-600 mt-4 sm:mt-0">
                  &copy; {new Date().getFullYear()} College Canteen. All rights reserved.
                </div>
              </div>
           </div>
        </div>
      </footer>
    </>
  );
}
