"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuItem, Bill, BillItem } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
interface AuthContextType {
  isAdmin: boolean;
  cartItems: Item[];
  setCartItems: (items: Item[]) => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  bill: Bill | null;
  setBill: (bill: Bill | null) => void;
  addToBill: (item: BillItem) => void;
  removeFromBill: (menuItemId: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  items: MenuItem[];
  setItems: (items: MenuItem[]) => void;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState<Item[] | []>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [bill, setBill] = useState<Bill | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<MenuItem[] | []>([]);
  const addToBill = (item: BillItem) => {
    setBill((prevBill) => {
      if (!prevBill) {
        return {
          id: "1",
          items: [item],
          total: item.price * item.quantity,
          createdAt: new Date(),
        }; // Initialize bill
      }

      const existingItemIndex = prevBill.items.findIndex(
        (billItem) => billItem.menuItemId === item.menuItemId
      );

      if (existingItemIndex > -1) {
        // If item exists, update quantity and total
        const updatedItems = [...prevBill.items];
        updatedItems[existingItemIndex] = {
          ...item,
          quantity:
            (updatedItems[existingItemIndex].quantity ?? 0) + item.quantity,
        }; // Increment quantity
        const updatedTotal = updatedItems.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );
        return { ...prevBill, items: updatedItems, total: updatedTotal };
      } else {
        // If item doesn't exist, add it to the bill
        const updatedItems = [...prevBill.items, item];
        const updatedTotal = updatedItems.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );
        return { ...prevBill, items: updatedItems, total: updatedTotal };
      }
    });
  };

  const removeFromBill = (menuItemId: string) => {
    setBill((prevBill) => {
      if (!prevBill) {
        return null; // Nothing to remove from
      }

      const updatedItems = prevBill.items.filter(
        (item) => item.menuItemId !== menuItemId
      );

      if (updatedItems.length === 0) {
        return null; // Bill is empty, reset it
      }

      const updatedTotal = updatedItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      return { ...prevBill, items: updatedItems, total: updatedTotal };
    });
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth?.trim()) {
      setIsAuthenticated(true);
      if (localStorage.getItem("role") === "ADMIN") {
        setIsAdminAuthenticated(true);
      }
    }
    setIsLoading(false); // Set loading to false after checking auth

    // Redirect moved into Navbar component
  }, [isAdminAuthenticated, isAuthenticated, router]);

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    cartItems,
    setCartItems,
    menuItems,
    setMenuItems,
    bill,
    setBill,
    addToBill,
    removeFromBill,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    isLoading,
    setIsLoading,
    items,
    setItems,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
