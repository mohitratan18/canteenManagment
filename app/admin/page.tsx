"use client";

import SalesChart from "@/components/SalesChart";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";


export default function AdminDashboard() {
  const [todaySales] = useState(2450);
  const [monthlySales] = useState(45670);
  const [totalOrders] = useState(28);
  const {isAdminAuthenticated} = useAuth();
  const router = useRouter();

  const salesData = [
    { date: "1-10-2025", sales: "5200" },
    { date: "1-11-2025", sales: "6700" },
    { date: "1-12-2025", sales: "5200" },
    { date: "1-13-2025", sales: "5200" },
    { date: "1-14-2025", sales: "6700" },
    { date: "1-15-2025", sales: "5200" },
  ];
  useEffect(() => {
    if(!localStorage.getItem("auth")?.trim() || !isAdminAuthenticated ){
      router.push("/login");
    }
  }, [])
  
  return (
    <div className="space-y-6 flex flex-col w-full items-center gap-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 w-full">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Today's Sales
          </h3>
          <p className="text-2xl font-bold">₹{todaySales.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Monthly Sales
          </h3>
          <p className="text-2xl font-bold">₹{monthlySales.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Orders
          </h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </Card>
      </div>
      <div className="w-[90vw] md:w-[60vw] h-[500px] p-2">
        <SalesChart salesData={salesData} />
      </div>
    </div>
  );
}
