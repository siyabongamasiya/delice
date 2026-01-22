export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

export interface Order {
  id: string;
  trackingCode: string;
  items?: CartItem[];
  total?: number;
  guestCount?: number;
  date?: string;
  time?: string;
  status: string;
  type: "takeout" | "reservation";
}

export interface UserProfile {
  email: string;
  name?: string;
}
