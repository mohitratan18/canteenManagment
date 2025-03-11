// app/admin/bill/page.tsx
"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Card } from "@/components/ui/card";
import { BillItem, Bill } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function BillPage() {
  const { bill, setBill, addToBill } = useAuth();

  const handleIncrementItem = (menuItemId: string) => {
    if (!bill) return;

    const updatedItems = bill.items.map((item) =>
      item.menuItemId === menuItemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    const updatedTotal = updatedItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    setBill({ ...bill, items: updatedItems, total: updatedTotal });
  };

  const handleDecrementItem = (menuItemId: string) => {
    if (!bill) return;

    const updatedItems = bill.items.map((item) => {
      if (item.menuItemId === menuItemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    const updatedTotal = updatedItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    setBill({ ...bill, items: updatedItems, total: updatedTotal });
  };

  const handleRemoveItem = (menuItemId: string) => {
    if (!bill) return;

    const updatedItems = bill.items.filter(
      (item) => item.menuItemId !== menuItemId
    );
    const updatedTotal = updatedItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setBill({ ...bill, items: updatedItems, total: updatedTotal });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bill</h1>

      {bill ? (
        bill.items.map((item) => (
          <Card
            key={item.menuItemId}
            className="border rounded-lg p-4 mb-4 shadow-md"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-lg font-medium">₹{item.price}</p>
            </div>
            <div className="flex justify-between items-center gap-4 mt-2">
              <div>
                <p>Quantity:</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="bg-white text-black flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 p-2"
                    onClick={() => handleDecrementItem(item.menuItemId)}
                  >
                    <FaMinus />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    className="bg-white text-black flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 p-2"
                    onClick={() => handleIncrementItem(item.menuItemId)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex items-center mb-3">
                  <Button
                    onClick={() => handleRemoveItem(item.menuItemId)}
                    className="mt-4 w-full bg-destructive hover:opacity-90 text-white"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <p className="font-medium mt-2">
              Subtotal: ₹{item.quantity * item.price}
            </p>
          </Card>
        ))
      ) : (
        <p>No items added to the bill yet.</p>
      )}

      {bill && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-end items-center gap-4">
            <p className="text-xl font-bold">Total: ₹{bill.total}</p>
            <Button className="bg-destructive text-white" onClick={()=>{setBill(null)}}>Done</Button>
          </div>
        </div>
      )}
    </div>
  );
}
