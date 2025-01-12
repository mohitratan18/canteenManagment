'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Order } from '@/app/types';

export default function AdminOrders() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      userId: '1',
      items: [
        {
          menuItemId: '1',
          quantity: 2,
          price: 120,
        },
      ],
      total: 240,
      status: 'pending',
      tokenNumber: 'A001',
      createdAt: new Date(),
    },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Management</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #{order.tokenNumber}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                variant={order.status === 'completed' ? 'secondary' : 'default'}
                disabled={order.status === 'completed'}
              >
                {order.status === 'completed' ? 'Completed' : 'Mark as Complete'}
              </Button>
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
  );
}