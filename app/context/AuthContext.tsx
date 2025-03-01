"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { MenuItem, Bill, BillItem, FeedBack } from "../types";

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
  feedBacks: FeedBack[];
  setFeedBacks: (feedBacks: FeedBack[]) => void;
  userBills : Bill[];
  setUserBills: (userBills: Bill[]) => void;
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
  const [feedBacks, setFeedBacks] = useState<FeedBack[] | []>([]);
  const [userBills, setUserBills] = useState<Bill[]>([]);  


  const addToBill = (item: BillItem) => {
    // @ts-ignore
    setBill((prevBill) => {
      if (!prevBill) {
        return {
          id: "1",
          items: [item],
          total: item.price * item.quantity,
          createdAt: new Date(),
        }; // Initialize bill
      }

      // @ts-ignore
      const existingItemIndex = prevBill?.items.findIndex(
        (billItem) => billItem.menuItemId === item.menuItemId
      );

      if (existingItemIndex > -1) {
        // If item exists, update quantity and total
        // @ts-ignore
        const updatedItems = [...prevBill?.items];
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
        // @ts-ignore
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
      
      // @ts-ignore
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

  const updateCartItems = useCallback((newCartItems: Item[]) => {
    setCartItems(newCartItems);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }
  }, []);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
          // Handle the error appropriately, e.g., set an empty cart
          setCartItems([]);
        }
      }
    }
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    cartItems,
    setCartItems: updateCartItems,
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
    feedBacks,
    setFeedBacks,
    userBills,
    setUserBills,
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
