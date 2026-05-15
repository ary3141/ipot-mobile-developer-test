import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { getMenu } from "@/src/api/menuApi";
import CategoryChip from "@/src/components/CategoryChip";
import MenuItemCard from "@/src/components/MenuItemCard";
import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/constants/theme";
import { MenuResponse } from "@/src/models/menu";
import { useCartStore } from "@/src/state/cartStore";
import { getMenuItemEmoji } from "@/src/utils/menu";

export default function MenuScreen() {
    const { tableId } = useLocalSearchParams<{
        tableId?: string;
    }>();

    const currentTableId = tableId ?? "T001";

    const [menu, setMenu] = useState<MenuResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    const totalItems = useCartStore((state) => state.getTotalItems());
    const subtotal = useCartStore((state) => state.getSubtotal());

    useEffect(() => {
        async function loadMenu() {
            setIsLoading(true);

            const response = await getMenu(currentTableId);

            setMenu(response);
            setIsLoading(false);
        }

        loadMenu();
    }, [currentTableId]);

    const categories = [
        { id: 0, name: "All" },
        ...(menu?.categories ?? []),
    ];

    const filteredItems = (menu?.items ?? []).filter((item) => {
        const keyword = searchText.toLowerCase();

        const matchesSearch =
            item.name.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword);

        const matchesCategory =
            selectedCategoryId === 0 ||
            item.category_id === selectedCategoryId;

        return matchesSearch && matchesCategory;
    });

    const selectedCategoryName =
        categories.find(
            (category) => category.id === selectedCategoryId
        )?.name ?? "Popular Items";

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>
                        Loading menu...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <Text style={styles.restaurantName}>
                        {menu?.restaurant.name}
                    </Text>

                    <Text style={styles.tableText}>
                        Table {menu?.restaurant.table_id}
                    </Text>
                </View>

                <TextInput
                    placeholder="Search menu items..."
                    placeholderTextColor={colors.secondary}
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {categories.map((category) => (
                        <CategoryChip
                            key={category.id}
                            label={category.name}
                            isActive={selectedCategoryId === category.id}
                            onPress={() =>
                                setSelectedCategoryId(category.id)
                            }
                        />
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>
                    {selectedCategoryId === 0
                        ? "Popular Items"
                        : selectedCategoryName}
                </Text>

                <View style={styles.cardsContainer}>
                    {filteredItems.map((item) => (
                        <MenuItemCard
                            key={item.id}
                            name={item.name}
                            description={item.description}
                            price={`$${item.price.toFixed(2)}`}
                            emoji={getMenuItemEmoji(item.name)}
                            onAddPress={() =>
                                router.push(`/item/${item.id}` as any)
                            }
                        />
                    ))}

                    {filteredItems.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>
                                No menu items found
                            </Text>

                            <Text style={styles.emptySubtitle}>
                                Try another search or category.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {totalItems > 0 && (
                <Pressable
                    style={styles.cartButton}
                    onPress={() => router.push("/cart" as any)}
                >
                    <Text style={styles.cartButtonText}>
                        View Cart • {totalItems} item
                        {totalItems > 1 ? "s" : ""} • $
                        {subtotal.toFixed(2)}
                    </Text>
                </Pressable>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingBottom: 120,
    },

    header: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
    },

    restaurantName: {
        fontSize: typography.heading,
        fontWeight: "700",
        color: colors.primary,
    },

    tableText: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
    },

    searchInput: {
        marginTop: spacing.lg,
        marginHorizontal: spacing.lg,
        backgroundColor: colors.white,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        fontSize: typography.body,
    },

    categoriesContainer: {
        paddingHorizontal: spacing.lg,
        marginTop: spacing.lg,
        gap: spacing.sm,
    },

    sectionTitle: {
        marginTop: spacing.xl,
        marginHorizontal: spacing.lg,
        fontSize: typography.heading,
        fontWeight: "700",
        color: colors.primary,
    },

    cardsContainer: {
        marginHorizontal: spacing.lg,
    },

    cartButton: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: radius.md,
        alignItems: "center",
    },

    cartButtonText: {
        color: colors.white,
        fontSize: typography.body,
        fontWeight: "700",
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        fontSize: typography.body,
        color: colors.secondary,
    },

    emptyState: {
        marginTop: spacing.xl,
        alignItems: "center",
    },

    emptyTitle: {
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
    },

    emptySubtitle: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
    },
});