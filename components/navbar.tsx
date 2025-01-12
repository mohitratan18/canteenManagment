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
    return <></>;
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        <Link href="/" className="font-semibold text-xl" onClick={closeDrawer}>
          {" "}
          {/* Added onClick handler */}
          College Canteen
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
            "fixed md:static top-0 left-0 w-full h-full md:h-auto md:w-auto bg-black/90 backdrop-blur-sm flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-4 p-4 md:p-0 z-50 transition-transform transform md:translate-x-0",
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
          <div className="md:hidden text-white text-xl font-bold mb-4">
            College Canteen
          </div>

          <div className="text-white flex flex-col md:flex-row gap-2 md:gap-4">
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
                    localStorage.removeItem("auth");
                    router.push("/login");
                    closeDrawer();
                    setIsAdminAuthenticated(false);
                    setIsAuthenticated(false);
                  }}
                  className="text-danger hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/menu" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">menu</Button>
                </Link>
                <Link href="/orders" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Orders
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeDrawer}>
                  {" "}
                  {/* Added onClick handler */}
                  <Button variant="ghost">Cart</Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    localStorage.removeItem("auth");
                    router.push("/login");
                    closeDrawer();
                    setIsAdminAuthenticated(false);
                    setIsAuthenticated(false);
                  }}
                  className="text-danger hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
