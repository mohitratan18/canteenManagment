"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { Loader } from "./ui/loader";

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAuthenticated,
    isAdminAuthenticated,
    isLoading,
    setIsAuthenticated,
    setIsAdminAuthenticated,
  } = useAuth(); // Get loading state

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated && !isAuthenticated) {
      // Check loading state
      router.push("/");
    }
  }, [isAdminAuthenticated, isAuthenticated, isLoading, router]);

  const closeDrawer = () => setIsOpen(false);

  return (
    <nav className="border-b dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative dark:bg-gray-900 dark:text-white">
        <Link href="/" className="font-semibold text-xl" onClick={closeDrawer}>
          <div className="flex items-center gap-4">
            <Image
              src={
                "https://images.shiksha.com/mediadata/images/1652957451phpTc4nIn.jpeg"
              }
              alt=""
              width={50}
              height={30}
              className="md:w-[20] md:h-[50px]"
            />
            <p className="font-bold text-2xl">Vignan Annapurna</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>

        <div
          className={cn(
            "fixed md:static top-0 left-0 w-full h-full md:h-auto md:w-auto bg-[#F4EEFF] dark:bg-gray-900 backdrop-blur-sm flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-4 p-4 md:p-0 z-50 transition-transform transform md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            className="md:hidden absolute top-4 right-4"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Conditionally render content based on authentication status */}
          <div className="md:hidden text-[#424874] dark:text-gray-200 text-xl font-bold mb-4">
            Vignan Annapurna
          </div>

          <div className="text-[#424874] dark:text-gray-200 flex flex-col md:flex-row gap-2 md:gap-4">
            {isAdmin ? (
              <>
                <Link href="/admin" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/admin/menu" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">Menu</Button>
                </Link>
                <Link href="/admin/bill" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">Bill</Button>
                </Link>
                <Link href="/admin/orders" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">Orders</Button>
                </Link>
                <Link href="/admin/out-of-stock" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">out of stock</Button>
                </Link>
                <Link href="/admin/feedbacks" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">FeedBacks</Button>
                </Link>
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsAdminAuthenticated(false);
                      setIsAuthenticated(false);
                      closeDrawer();
                      localStorage.removeItem("auth");
                      router.push("/login");
                    }}
                    className="text-destructive bg-destructive-foreground hover:text-white"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <div className="text-[#424874] dark:text-gray-200 flex">
                <Link href="/menu" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">MENU</Button>
                </Link>
                <Link href="/orders" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    ORDERS
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">CART</Button>
                </Link>

                {isAuthenticated ? (
                  <div>
                    <Link href="/feedback" onClick={closeDrawer}>
                      {" "}
                      {/* Added onClick handler */}
                      <Button variant="ghost">FeedBack</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsAdminAuthenticated(false);
                        setIsAuthenticated(false);
                        closeDrawer();
                        localStorage.removeItem("auth");
                        localStorage.clear();
                        router.push("/login");
                      }}
                      className="text-destructive"
                    >
                      SIGN OUT
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
