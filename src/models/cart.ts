import { CustomizationOption, MenuItem } from "@/src/models/menu";

export type SelectedCustomization = {
    groupId: number;
    groupName: string;
    option: CustomizationOption;
};

export type CartItem = {
    id: string
    menuItem: MenuItem;
    quantity: number;
    selectedCustomizations?: SelectedCustomization[];
    note?: string;
};

export type CartState = {
    items: CartItem[];
};