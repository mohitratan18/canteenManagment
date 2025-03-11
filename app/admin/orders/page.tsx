"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from "@/app/types";
import { changeBillStatus, getAdminBills } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { InputIcon } from "@radix-ui/react-icons";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [searchTerm, setsearchTerm] = useState("");
  const fetchOrders = async () => {
    try {
      const response = await getAdminBills({});
      setOrders(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (searchTerm?.trim() === "") {
      fetchOrders();
    } else {
      const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setOrders(filteredOrders);
    }
  };
  const handleOrderComplete = async (id: string) => {
    const response = await changeBillStatus(id);
    console.log(response);
    if (response?.status === 200) {
      const data = orders.map((item) => {
        if (item.id === id) {
          item.status = "paid";
          return item;
        } else {
          return item;
        }
      });
      alert('Order Completed')
      setOrders(data);
    }
    else{
      alert("Error Please try Aagain")
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Management</h1>

      <div className="space-y-4">
        <Input
          className="px-4 py-2 text-lg"
          placeholder="Please search the Bill"
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
        />
        {orders?.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                variant={order?.status === "paid" ? "secondary" : "default"}
                disabled={order?.status === "paid"}
                onClick={() => {
                  handleOrderComplete(order.id);
                }}
              >
                {order?.status === "paid" ? "paid" : "Mark as Complete"}
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{order?.itemDescription}</span>
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
  );
}
