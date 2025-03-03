"use client";

import SalesChart from "@/components/SalesChart";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { getAdminDashBoardDetails } from "@/lib/api";

export default function AdminDashboard() {
  const [todaySales, setTodaySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useAuth();
  const router = useRouter();


  useEffect(() => {
    localStorage.getItem("role") === "ADMIN" && setIsAdminAuthenticated(true);
    if (!localStorage.getItem("auth")?.trim() || !isAdminAuthenticated) {
      console.log(localStorage.getItem("auth"), " ", isAdminAuthenticated);
      if (localStorage.getItem("role") !== "ADMIN") {
        router.push("/login");
      }
    }

    try {
      const getData = async () => {
        const response = await getAdminDashBoardDetails({});
        console.log(response);
        setTodaySales(response?.data?.todaySales);
        setTotalOrders(response?.data.totalOrders);
        setSalesData(response?.data?.salesData);
        setMonthlySales(response?.data?.monthlySales);
      };

      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
