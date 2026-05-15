import { mockMenu } from "@/src/data/mockMenu";
import { MenuResponse } from "@/src/models/menu";

export async function getMenu(
    tableId: string
) : Promise<MenuResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500)
    );

    return {
        ...mockMenu,
        restaurant: {
            ...mockMenu.restaurant,
            table_id: tableId,
        },
    };
}