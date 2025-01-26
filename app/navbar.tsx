'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={isAdmin ? '/admin' : '/'} className="font-semibold text-xl">
          Vignan Annapurna
        </Link>
        
        <div className="flex items-center gap-4">
          {isAdmin ? (
            <>
              <Link href="/admin">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/admin/menu">
                <Button variant="ghost">Menu</Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="ghost">Orders</Button>
              </Link>
              <Link href="/admin/out-of-stock">
                <Button variant="ghost">Out of Stock</Button>
              </Link>
              
            </>
          ) : (
            <>
              <Link href="/orders">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Orders
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost">Cart</Button>
              </Link>
            
            </>
          )}
        </div>
      </div>
    </nav>
  );
}