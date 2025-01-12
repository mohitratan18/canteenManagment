"use client"
import React, { useContext } from 'react'
import { useAuth } from '../context/AuthContext'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FaMinus, FaPlus } from "react-icons/fa";


const page = () => {
  const {cartItems, setCartItems} = useAuth();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleIncrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) { // Prevent quantity going below 1
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id} className="border rounded-lg p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center"> {/* Align items vertically */}
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-lg font-medium">₹{item.price}</p>
            </div>
           <div className="flex justify-between items-center gap-4 mt-2"> {/* Added margin-top */}
                <div>
                  <p className="text-white">Quantity:</p>
                </div>
                <div className="flex items-center gap-2"> {/* Wrap quantity controls in flex */}
                  <button
                    className="bg-white text-black flex items-center justify-center w-8 h-8 rounded-md border border-gray-300"
                    onClick={() => handleDecrementItem(item.id)}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-white font-medium">{item.quantity}</span>
                  <button
                    className="bg-white text-black flex items-center justify-center w-8 h-8 rounded-md border border-gray-300"
                    onClick={() => handleIncrementItem(item.id)}
                  >
                    <FaPlus />
                  </button>
                  </div>
            </div>
            <p className="text-white font-medium mt-2">
              {/* Added margin-top */}
              Subtotal: ₹{item.quantity * item.price}
            </p>
            <Button onClick={() => handleRemoveItem(item.id)} className="mt-4 w-full bg-danger hover:opacity-90 text-white">
              Remove
            </Button>
          </Card>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-end">
            <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default page

