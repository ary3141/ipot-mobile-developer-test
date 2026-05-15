import { create } from "zustand";

import { CartItem } from "@/src/models/cart";
import { MenuItem } from "@/src/models/menu";

type CartStore = {
  items: CartItem[];
  addItem: (menuItem: MenuItem) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  decreaseItem: (menuItemId: number) => void;
  removeItem: (menuItemId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (menuItem) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(
      (item) => item.menuItem.id === menuItem.id
    );

    if (existingItem) {
      set({
        items: currentItems.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
      return;
    }

    set({
      items: [
        ...currentItems,
        {
          menuItem,
          quantity: 1,
        },
      ],
    });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );
  },

  decreaseItem: (menuItemId) => {  
    const currentItems = get().items;
    const existingItem = currentItems.find(
      (item) => item.menuItem.id === menuItemId
    );

    if (!existingItem) return;

    if (existingItem.quantity === 1) {
        set({
            items: currentItems.filter(
                (item) => item.menuItem.id !== menuItemId
            ),
        });
        return;
    }
    
    set({
        items: currentItems.map((item) =>
            item.menuItem.id === menuItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
    });
  },
  
  removeItem: (menuItemId) => {
    set({
      items: get().items.filter((item) => item.menuItem.id !== menuItemId),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },
}));