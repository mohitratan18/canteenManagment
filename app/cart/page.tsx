"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaMinus, FaPlus } from "react-icons/fa";
import PaymentPage from "@/components/paymnet_gateway";

const page = () => {
  const { cartItems, setCartItems, isAuthenticated, isLoading, setIsLoading} =
    useAuth();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [orderId, setOrderId] = useState("");

  
  
  

  const getSession = async () => {
    setIsLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price, // Include price for server-side total verification
      }));

      const res = await fetch("/api/create-payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderAmount: totalPrice,
          orderItems: orderItems, // Send item details
        }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Try to get more detailed error info
        const errorMessage =
          errorData.message ||
          `Failed to create payment session (${res.status})`;
        throw new Error(errorMessage);
      }

      const { paymentSessionId, itemDescription, totalAmount, orderId } =
        await res.json();
      console.log(itemDescription);
      setItemDescription(itemDescription);
      localStorage.setItem("billitems", itemDescription);
      setOrderId(orderId);
      setTotalAmount(totalAmount);
      setIsSessionLoaded(true);
      setSessionId(paymentSessionId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleIncrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        // Prevent quantity going below 1
        return { ...item, quantity: item.quantity - 1 };
      }
      return item; // Return item unchanged if quantity is already 1
    });
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-[#191a29]">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-[#191a29]">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <Card
                key={item.id}
                className="border rounded-lg p-4 mb-4 shadow-md"
              >
                <div className="flex justify-between items-center">
                  {" "}
                  {/* Align items vertically */}
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-lg font-medium">₹{item.price}</p>
                </div>
                <div className="flex justify-between items-center gap-4 mt-2">
                  {" "}
                  {/* Added margin-top */}
                  <div>
                    <p className="text-[#191a29]">Quantity:</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {" "}
                    {/* Wrap quantity controls in flex */}
                    <button
                      className="bg-white text-black flex items-center justify-center w-8 h-8 rounded-md border border-gray-300"
                      onClick={() => handleDecrementItem(item.id)}
                    >
                      <FaMinus />
                    </button>
                    <span className="text-black font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-white text-black flex items-center justify-center w-8 h-8 rounded-md border border-gray-300"
                      onClick={() => handleIncrementItem(item.id)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <p className="text-[#191a29]font-medium mt-2">
                  {/* Added margin-top */}
                  Subtotal: ₹{item.quantity * item.price}
                </p>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-4 w-full bg-danger hover:opacity-90 text-[#191a29] bg-accent text-accent-foreground"
                >
                  Remove
                </Button>
              </Card>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 flex items-center justify-end gap-4">
              <div className="flex justify-end">
                <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
              </div>
              <Button
                className="bg-destructive/90 text-white hover:text-black"
                onClick={() => {
                  getSession();
                }}
              >
                Proceed To Pay
              </Button>
            </div>
          )}

          <div>
            {isSessionLoaded ? (
              <>
                <PaymentPage
                  sessionId={sessionId}
                  returnUrl={`https://canteen-managment.vercel.app/checkpayment/${orderId}`}
                  // returnUrl={`http://localhost:3000/checkpayment/${orderId}`}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold">Please Login to see the orders</p>
        </div>
      )}
    </>
  );
};

export default page;
