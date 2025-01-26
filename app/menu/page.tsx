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

export default function MenuPage() {
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

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem("auth")?.trim()) {
      router.push("/login");
    }
    setIsAuthenticated(true);
    const unsubscribe = getItems((fetchedItems) => {
      setItems(fetchedItems);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
    return cartItems.some((item) => item.id === id);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Our Menu</h1>
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
                        className="bg-white text-black flex items-center justify-center w-12 h-10 rounded-md"
                        onClick={() => handleDecrementItem(item.id)}
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        className="bg-white text-black text-center border border-1 border-black border-solid items-center justify-center w-12 h-10 rounded-lg no-spinners"
                        value={
                          cartItems.find((cartItem) => cartItem.id === item.id)
                            ?.quantity || 0
                        }
                      />{" "}
                      {/* Display quantity */}
                      <button
                        className="bg-white text-black flex items-center justify-center w-12 h-10 rounded-md"
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
