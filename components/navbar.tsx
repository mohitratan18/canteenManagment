"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAdminAuthenticated,
    isAuthenticated,
    setIsAdminAuthenticated,
    setIsAuthenticated,
  } = useAuth();
  const closeDrawer = () => {
    setIsOpen(false);
  };
  if (!isAdminAuthenticated && !isAuthenticated) {
    router.push("/login");
    return <></>;
  }

  return (
    <nav className="border-b ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        <Link href="/" className="font-semibold text-xl" onClick={closeDrawer}>
          {" "}
          {/* Added onClick handler */}
          <div className="flex items-center gap-4">
            <img
              src="https://vignan.ac.in/newvignan/assets/images/Logo%20with%20Deemed.svg"
              alt="Logo"
              className="w-[16] h-[30px] md:w-[20] md:h-[50px]"
            />
            <p className="font-bold text-2xl">College Canteen</p>
          </div>
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div
          className={cn(
            "fixed md:static top-0 left-0 w-full h-full md:h-auto md:w-auto bg-[#F4EEFF] backdrop-blur-sm flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-4 p-4 md:p-0 z-50 transition-transform transform md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            className="md:hidden absolute top-4 right-4"
            onClick={closeDrawer} // Added onClick handler
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="md:hidden text-[#424874] text-xl font-bold mb-4">
            College Canteen
          </div>

          <div className="text-[#424874 flex flex-col md:flex-row gap-2 md:gap-4 ">
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
              </>
            ) : (
              <div className="text-[#424874] flex">
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
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsAdminAuthenticated(false);
                    setIsAuthenticated(false);
                    closeDrawer();
                    localStorage.removeItem("auth");
                    router.push("/login");
                  }}
                  className="text-destructive"
                >
                  SIGN OUT
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
