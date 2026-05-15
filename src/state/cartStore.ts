import { create } from "zustand";

import { CartItem } from "@/src/models/cart";
import { MenuItem } from "@/src/models/menu";

type CartStore = {
  items: CartItem[];
  addItem: (menuItem: MenuItem) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
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
}));