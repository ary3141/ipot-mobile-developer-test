import { MenuItem } from "@/src/models/menu";
import { useCartStore } from "@/src/state/cartStore";

const ramen: MenuItem = {
    id: 1,
    name: "Chicken Ramen",
    description: "Rich broth",
    price: 14.99,
    category_id: 2,
    image_url: null,
    customization_groups: [],
};

describe("cartStore", () => {
    beforeEach(() => {
        useCartStore.getState().clearCart();
    });

    it("adds an item to the cart", () => {
        useCartStore.getState().addItem(ramen);

        expect(useCartStore.getState().items).toHaveLength(1);
        expect(useCartStore.getState().getTotalItems()).toBe(1);
    });

    it("increases quantity when adding the same item again", () => {
        useCartStore.getState().addItem(ramen);
        useCartStore.getState().addItem(ramen);

        expect(useCartStore.getState().items[0].quantity).toBe(2);
        expect(useCartStore.getState().getSubtotal()).toBeCloseTo(29.98);
    });
    it("creates separate cart items for different customizations", () => {
        useCartStore.getState().addItem(
            ramen,
            [
                {
                    groupId: 1,
                    groupName: "Spice",
                    option: {
                        id: 1,
                        name: "Mild",
                        price_modifier: 0,
                    },
                },
            ]
        );

        useCartStore.getState().addItem(
            ramen,
            [
                {
                    groupId: 1,
                    groupName: "Spice",
                    option: {
                        id: 2,
                        name: "Spicy",
                        price_modifier: 1,
                    },
                },
            ]
        );

        expect(useCartStore.getState().items).toHaveLength(2);
    });
});