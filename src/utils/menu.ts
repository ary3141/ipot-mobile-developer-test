export const getMenuItemEmoji = (
    itemName: string
) => {
    if (itemName.includes("Edamame")) return "🫛";
    if (itemName.includes("Salmon")) return "🍣";
    if (itemName.includes("Green Tea")) return "🍵";
    if (itemName.includes("Ramen")) return "🍜";

    return "🍽️";
};