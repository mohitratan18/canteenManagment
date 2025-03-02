"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Bill } from "../.././types/index";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "@/components/ui/loader";
import { addBill, addBillToAdmin } from "@/lib/api";
import { useAuth } from "@/app/context/AuthContext";

interface Params {
  id: string;
}

export default function Page({ params }: { params: Params }) {
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState<Number | null>(null);
  const { userBills, setUserBills } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        setLoading(true);
        const url = `https://canteen-managment-system-backend.onrender.com/api/payment/${id}`;
        const response = await axios.get(url);
        const { order_status, order_amount } = response?.data;
        setOrderAmount(order_amount);

        if (order_status === "PAID") {
          // NEED TO CREATE A BILL AND NEED TO ADD IT IN USERS ACCOUNT

          const itemDescription = localStorage.getItem("billitems");
          const bill: Bill = {
            itemDescription: itemDescription ? itemDescription : "",
            total: order_amount,
            id: uuidv4(),
            createdAt: new Date(Date.now()),
            items: [],
          };
          try {
            const response = await addBill({
              email: localStorage.getItem("email"),
              bill: bill,
            });
            if (response?.status === 200) {
              // add bill to the admin bills
              const res = await addBillToAdmin({ bill });

              if (res?.status === 201) {
                setUserBills(response.data.bills);
                alert("Order Placed Successfully");
                localStorage.removeItem("cart");
                localStorage.removeItem("billitems");
                router.push("/orders");
              }
            } else {
              console.log(response);
              alert("error occureed");
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, []);

  return <div>{loading && <Loader />}</div>;
}
