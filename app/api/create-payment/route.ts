// app/api/create-payment/route.ts
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
  const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
  const orderId = uuidv4();

  // Calculate total amount from your cart logic
  const orderAmount = 1; // Replace with actual total

  const payload = {
    order_id: orderId,
    order_currency: "INR",
    order_amount: orderAmount,
    customer_details: {
      customer_id: "mohit1811",
      customer_email: "mohitratan2003@gmail.com",
      customer_phone: "8144436109",
    },
  };

  try {
    console.log("hello");

    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID!,
        "x-client-secret": CASHFREE_SECRET_KEY!,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);

    return NextResponse.json({ paymentSessionId: data.payment_session_id  , orderId: orderId });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}
