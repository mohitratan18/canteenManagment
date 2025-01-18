import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    
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
  )
}

export default Footer
