"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/app/types";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function OutOfStockPage() {
  const { menuItems } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Out of Stock Items</h1>
      <div className="grid gap-6">
        {menuItems.map((item) =>
          !item.isAvailable ? (
            <Card key={item.id} className="p-6">
              <div className="flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="text-sm font-medium mt-2">₹{item.price}</p>
                    </div>
                    <Button variant="outline">Mark as Available</Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}
