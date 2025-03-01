"use client";
import { Card } from "@/components/ui/card";
import { Order } from "../types";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { getBillsOfUser } from "@/lib/api";

export default function OrdersPage() {
  const { isAuthenticated, userBills, setUserBills } = useAuth();
  useEffect(() => {
    const fetchBills = async () => {
      const email = localStorage.getItem("email");
      const response = await getBillsOfUser({ email });
      if (response && response.status === 200) {
        setUserBills(response.data.bills);
      } else {
        alert("error Fetching the Bills");
      }
    };
    fetchBills();
  }, []);
  return (
    <>
      {isAuthenticated ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <div className="space-y-4">
            {userBills.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                    {"paid"}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{order.itemDescription}</span>
                  </div>
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
