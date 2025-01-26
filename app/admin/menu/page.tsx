"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BillItem, MenuItem } from "@/app/types";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { getItems, toggleAvailability } from "@/lib/api";
import { Loader } from "@/components/ui/loader";

export default function AdminMenu() {
  const {
    menuItems,
    setMenuItems,
    bill,
    addToBill,
    removeFromBill,
    setIsLoading,
    isLoading,
    setIsAuthenticated,
    setIsAdminAuthenticated,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem("auth")?.trim()) {
      router.push("/login");
    }
    setIsAuthenticated(true);
    setIsAdminAuthenticated(true);
    const unsubscribe = getItems((fetchedItems) => {
      setMenuItems(fetchedItems);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleAvailable = async (id: string) => {
    setIsLoading(true);
    try {
      const data = {
        id,
      };
      const response = await toggleAvailability(data);
      console.log(response?.status);
      if (response?.status == 200) {
        const updatedItems: MenuItem[] = [...menuItems];
        updatedItems.forEach((item: MenuItem) => {
          if (item.id === id) {
            item.isAvailable = !item.isAvailable;
          }
        });
        setMenuItems(updatedItems);
      } else {
        alert("Please try again later");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToBill = (item: MenuItem) => {
    const billItem: BillItem = {
      menuItemId: item.id,
      name: item.name,
      quantity: 1,
      price: item.price,
    };
    addToBill(billItem);
  };

  const handleRemoveFromBill = (item: MenuItem) => {
    removeFromBill(item.id);
  };

  const isItemInBill = (itemId: string): boolean => {
    return bill?.items.some((item) => item.menuItemId === itemId) ?? false;
  };

  return isLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button
          onClick={() => {
            router.push("/admin/addItem");
          }}
        >
          Add New Item
        </Button>
      </div>

      <div className="grid gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={item.isAvailable}
                    onCheckedChange={() => toggleAvailable(item.id)}
                  />
                  <Label>Available</Label>
                </div>

                {item.isAvailable ? (
                  <Button
                    onClick={() =>
                      isItemInBill(item.id)
                        ? handleRemoveFromBill(item)
                        : handleAddToBill(item)
                    }
                  >
                    {isItemInBill(item.id) ? "Remove from Bill" : "Add to Bill"}
                  </Button>
                ) : (
                  <p className="text-danger">
                    {" "}
                    *Make it Available to Add to Bill*
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
