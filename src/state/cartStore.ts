import { create } from "zustand";

import { CartItem } from "@/src/models/cart";
import { MenuItem } from "@/src/models/menu";

type CartStore = {
    items: CartItem[];
    addItem: (
        menuItem: MenuItem,
        selectedCustomizations?: CartItem["selectedCustomizations"]
    ) => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
    decreaseItem: (menuItemId: string) => void;
    removeItem: (menuItemId: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (
        menuItem,
        selectedCustomizations = []
    ) => {
        const currentItems = get().items;

        const customizationKey = selectedCustomizations
            .map((item) => item.option.id)
            .sort()
            .join("-");

        const cartItemId =
            `${menuItem.id}-${customizationKey}`;

        const existingItem = currentItems.find(
            (item) => item.id === cartItemId
        );

        if (existingItem) {
            set({
                items: currentItems.map((item) =>
                    item.id === cartItemId
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                ),
            });

            return;
        }

        set({
            items: [
                ...currentItems,
                {
                    id: cartItemId,
                    menuItem,
                    selectedCustomizations,
                    quantity: 1,
                },
            ],
        });
    },

    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    getSubtotal: () => {
        return get().items.reduce((total, item) => {
            const customizationTotal = (
                item.selectedCustomizations ?? []
            ).reduce(
                (sum, customization) =>
                    sum + customization.option.price_modifier,
                0
            );

            return (
                total +
                (item.menuItem.price + customizationTotal) *
                item.quantity
            );
        }, 0);
    },

    decreaseItem: (cartItemId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
            (item) => item.id === cartItemId
        );

        if (!existingItem) return;

        if (existingItem.quantity === 1) {
            set({
                items: currentItems.filter(
                    (item) => item.id !== cartItemId
                ),
            });
            return;
        }

        set({
            items: currentItems.map((item) =>
                item.id === cartItemId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ),
        });
    },

    removeItem: (cartItemId) => {
        set({
            items: get().items.filter(
                (item) => item.id !== cartItemId
            ),
        });
    },

    clearCart: () => {
        set({ items: [] });
    },
}));