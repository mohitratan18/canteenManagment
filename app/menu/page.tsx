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

const dummyMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Chicken Burger",
    price: 120,
    description: "Juicy chicken patty with fresh vegetables",
    category: "Fast Food",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Veg Pizza",
    price: 150,
    description: "Fresh vegetables on a crispy base",
    category: "Fast Food",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Masala Dosa",
    price: 80,
    description: "Crispy dosa with spicy potato filling",
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1630409351241-e90e7f5e434d?w=500",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Pasta Alfredo",
    price: 200,
    description: "Creamy Alfredo sauce with penne pasta",
    category: "Italian",
    image: "data:image/webp;base64,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",
    isAvailable: true,
  },
  {
    id: "5",
    name: "Caesar Salad",
    price: 100,
    description: "Classic Caesar salad with croutons and parmesan",
    category: "Salads",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxjXJtz9cjMmMVJCbIbbVufGeBcYfmoKaX5_IpsGmwStl6p01Q5hyMNoyQry6sioOkj7qOGcP9Tg04ijgQ0HxWe43QvrrFzIVibbmJDA",
    isAvailable: true,
  },
  {
    id: "6",
    name: "Chicken Biryani",
    price: 180,
    description: "Fragrant rice with tender chicken pieces",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
    isAvailable: true,
  },
  {
    id: "7",
    name: "Samosa",
    price: 30,
    description: "Crispy pastry with spiced potato filling",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    isAvailable: true,
  },
  {
    id: "8",
    name: "Grilled Cheese Sandwich",
    price: 70,
    description: "Cheesy goodness between crispy toasted bread",
    category: "Snacks",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT68-8zrq86dlHpl6g2haDokbHHUfW6IQzNLtmRnp-TVWHqOMXsV665AFiGjWDXOuv1Xx514soX_bBx5uByDsGNmvtYlnEH92nvVEzwXA",
    isAvailable: true,
  },
  {
    id: "9",
    name: "Margarita Pizza",
    price: 170,
    description: "Classic pizza with fresh basil and mozzarella",
    category: "Fast Food",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRktkR2ZlQTg7TIAjYqahVUSX6LphMmqBiqHCdlo7tftSaOz5Shd3M2VQdFRIgthnPe_TgF5UOjOAyF5dlLA70IfzN0x9xQiI7bSC2qYQ",
    isAvailable: true,
  },
  {
    id: "10",
    name: "Chocolate Brownie",
    price: 60,
    description: "Rich and gooey chocolate brownie",
    category: "Desserts",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQENNAsqX_am7erOzEfncxgfN3eRBm1Nyse5dfKJEItxizYJ2SAzLlBkAcaJc8egewCd-46xnRJH_SgDZH0oTkkil7SZ64S-J3A8gIVDQ",
    isAvailable: true,
  },
  {
    id: "11",
    name: "Tandoori Chicken",
    price: 250,
    description: "Spicy grilled chicken marinated in yogurt and spices",
    category: "Main Course",
    image: "data:image/jpeg;base64,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",
    isAvailable: true,
  },
];

export default function MenuPage() {
  const [menuItems] = useState(dummyMenuItems);
  const router = useRouter();
  const { cartItems, setCartItems, isAuthenticated, setIsAuthenticated , setIsLoading , isLoading} =
    useAuth();

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem("auth")?.trim()) {
      router.push("/login");
    } else setIsAuthenticated(true);

    setIsLoading(false);
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

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Our Menu</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems
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
