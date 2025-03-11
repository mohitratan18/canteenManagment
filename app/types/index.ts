export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    menuItemId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  itemDescription: string;
  status: "pending" | "paid" | "cancelled";
  tokenNumber: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "faculty";
}

export interface BillItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Bill {
  id: string;
  items: BillItem[];
  itemDescription: string;
  total: number;
  createdAt: Date;
}
export interface FeedBack {
  id: string;
  userId: string;
  content: string;
  rating: number;
  improvement: string;
}
