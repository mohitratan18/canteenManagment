import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic
export async function POST(request: Request) {
  const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
  const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
  const orderId = uuidv4();

  try {
    const { orderAmount, orderItems } = await request.json();

    const calculatedTotal = orderItems.reduce(
      (sum: number, item: { quantity: number; price: number }) =>
        sum + item.quantity * item.price,
      0
    );
    if (orderAmount !== calculatedTotal) {
      return NextResponse.json(
        { error: "Order amount mismatch" },
        { status: 400 }
      );
    }

    const formattedItems = orderItems.map(
      (item: { name: string; quantity: number }) =>
        `${item.name} x ${item.quantity}`
    );
    const itemDescription = formattedItems.join(", ");

    const payload = {
      order_id: orderId,
      order_currency: "INR",
      order_amount: orderAmount,
      orderItems : orderItems,
      item_description: itemDescription,
      customer_details: {
        customer_id: "mohit1811", // Replace with actual customer ID retrieval
        customer_email: "mohitratan2003@gmail.com", // Replace with actual customer email retrieval
        customer_phone: "8144436109", // Replace with actual customer phone retrieval
        item_description: itemDescription,
      },
    };

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

    // Include totalAmount and itemDescription in the response
    return NextResponse.json({
      paymentSessionId: data.payment_session_id,
      orderId: orderId,
      totalAmount: orderAmount, // Add totalAmount
      itemDescription: itemDescription, // Add itemDescription
    });
  } catch (error) {
    console.error("Error creating payment session:", error); //Improved error logging
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}
