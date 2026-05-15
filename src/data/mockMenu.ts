import { MenuResponse } from "@/src/models/menu";

export const mockMenu: MenuResponse = {
  restaurant: {
    id: "R001",
    name: "Sushi Zen",
    table_id: "T001",
  },
  categories: [
    { id: 1, name: "Appetizers", sort_order: 1 },
    { id: 2, name: "Main Course", sort_order: 2 },
    { id: 3, name: "Drinks", sort_order: 3 },
  ],
  items: [
    {
      id: 1,
      name: "Edamame",
      description: "Steamed soybeans with sea salt",
      price: 5.99,
      category_id: 1,
      image_url: null,
      customization_groups: [],
    },
    {
      id: 2,
      name: "Salmon Sashimi",
      description: "Fresh Norwegian salmon, 8 pieces",
      price: 16.99,
      category_id: 2,
      image_url: null,
      customization_groups: [],
    },
    {
      id: 3,
      name: "Green Tea",
      description: "Hot Japanese green tea",
      price: 3.5,
      category_id: 3,
      image_url: null,
      customization_groups: [],
    },
    {
      id: 4,
      name: "Chicken Ramen",
      description: "Rich chicken broth with chashu, egg, and noodles",
      price: 14.99,
      category_id: 2,
      image_url: null,
      customization_groups: [],
    },
  ],
};