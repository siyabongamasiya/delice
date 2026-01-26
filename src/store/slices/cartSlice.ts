import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialItems: CartItem[] = [
  {
    id: "meal-1",
    name: "Grilled Chicken",
    price: 129.99,
    quantity: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1604909052715-3027fae1d434?q=80&w=800&auto=format&fit=crop",
    category: "meals",
  },
  {
    id: "drink-1",
    name: "Iced Latte",
    price: 38.0,
    quantity: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=800&auto=format&fit=crop",
    category: "drinks",
  },
];

const initialState: CartState = {
  items: initialItems,
  total: calculateTotal(initialItems),
};

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = calculateTotal(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.total = calculateTotal(state.items);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.total = calculateTotal(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
