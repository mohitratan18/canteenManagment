"use client";
import { Card } from "@/components/ui/card";
import { Order } from "../types";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

// Temporary mock data
const orders: Order[] = [
  {
    id: "1",
    userId: "1",
    items: [
      {
        menuItemId: "1",
        quantity: 2,
        price: 120,
      },
    ],
    total: 240,
    status: "pending",
    tokenNumber: "A001",
    createdAt: new Date(),
  },
];

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  useEffect(()=>{
    console.log(isAuthenticated);
    
  },[])
  return (
    <>
      {isAuthenticated ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">
                      Order #{order.tokenNumber}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.menuItemId} className="flex justify-between">
                      <span>
                        {item.quantity}x Item #{item.menuItemId}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₹{order.total}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold">Please Login to see the orders</p>
        </div>
      )}
    </>
  );
}
