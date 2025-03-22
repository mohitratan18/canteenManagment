"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "../types";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Loader } from "@/components/ui/loader";
import { getItems } from "@/lib/api";
import startImage from "@/public/images/college1.jpg";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [constItems, setConstItems] = useState<Item[] | []>([]);
  const router = useRouter();
  const {
    cartItems,
    setCartItems,
    isAuthenticated,
    setIsAuthenticated,
    setIsLoading,
    isLoading,
    items,
    setItems,
  } = useAuth();

  const fetchItems = () => {
    const unsubscribe = getItems((fetchedItems) => {
      setItems(fetchedItems);
      setConstItems(fetchedItems);
      setIsLoading(false);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem("auth")?.trim()) {
      router.push("/login");
    }
    setIsAuthenticated(true);
    fetchItems;
  }, []);

  useEffect(() => {
    if (searchTerm?.trim() === "") {
      fetchItems();
    } else {
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setItems(filteredItems);
    }
  }, [searchTerm]);

  const handleAddItem = (id: string, name: string, price: number) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { id, name, quantity: 1, price }]);
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleIncrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const checkIfPresent = (id: string) => {
    let flag = false;
    cartItems.filter((item) => {
      if (item.id === id) {
        flag = true;
      }
    });
    return flag;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="space-y-6">
      <div className="relative">
        <Image
          src={startImage}
          alt=""
          className="bg-white h-[300px] rounded-md object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-3xl font-bold drop-shadow-lg mt-12">
            Dine at Vignan Canteen!
          </p>
        </div>
      </div>
      <p className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100 text-center mt-4">
        Feeling Hungry! Don&apos;t Wait and get the Best food available{" "}
      </p>
      <h1 className="text-3xl font-bold pt-4">Our Menu</h1>

      <div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            className="bg-white w-full p-2 md:p-4 pl-8 md:pl-10 border border-1 border-card rounded-lg"
            placeholder="Search the Items"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items
          .filter((item) => item.isAvailable)
          .map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden transition-all ease-in-out border-0 hover:border hover:border-solid"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-medium">₹{item.price}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {item.description}
                </p>

                {checkIfPresent(item.id) ? (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center justify-center w-12 h-10 rounded-md"
                        onClick={() => handleDecrementItem(item.id)}
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-center border border-1 border-gray-300 dark:border-gray-600 items-center justify-center w-12 h-10 rounded-lg no-spinners"
                        value={
                          cartItems.find((cartItem) => cartItem.id === item.id)
                            ?.quantity || 0
                        }
                      />
                      <button
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center justify-center w-12 h-10 rounded-md"
                        onClick={() => handleIncrementItem(item.id)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleAddItem(item.id, item.name, item.price);
                    }}
                  >
                    Add to Order
                  </Button>
                )}
              </div>
            </Card>
          ))}
      </div>

      <style jsx>{`
        .no-spinners::-webkit-inner-spin-button,
        .no-spinners::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .no-spinners[type="number"] {
          -moz-appearance: textfield; /* Firefox */
        }
      `}</style>
    </div>
  );
}
