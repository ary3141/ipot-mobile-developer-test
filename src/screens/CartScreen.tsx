import { SafeAreaView } from "react-native-safe-area-context";

import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/constants/theme";

import { useCartStore } from "@/src/state/cartStore";

import { createOrder } from "@/src/api/orderApi";
import { router } from "expo-router";
import { useState } from "react";

export default function CartScreen() {
    const items = useCartStore((state) => state.items);

    const addItem = useCartStore((state) => state.addItem);

    const decreaseItem = useCartStore(
        (state) => state.decreaseItem
    );

    const subtotal = useCartStore(
        (state) => state.getSubtotal()
    );

    const clearCart = useCartStore((state) => state.clearCart);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitOrder = async () => {
        try {
            setIsSubmitting(true);

            const response = await createOrder();

            clearCart();

            router.push({
                pathname: "/confirmation",
                params: {
                    orderId: response.orderId,
                    estimatedMinutes: String(response.estimatedMinutes),
                },
            } as any);
        } finally {
            setIsSubmitting(false);
        }
    };
    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        Your cart is empty
                    </Text>

                    <Text style={styles.emptySubtitle}>
                        Add some delicious items to begin ordering.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Your Cart
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {items.map((item) => (
                    <View
                        key={item.id}
                        style={styles.cartItem}
                    >
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>
                                {item.menuItem.name}
                            </Text>

                            <Text style={styles.itemPrice}>
                                ${item.menuItem.price.toFixed(2)}
                            </Text>

                            {(item.selectedCustomizations ?? []).map((customization) => (
                                <Text
                                    key={customization.option.id}
                                    style={styles.customizationText}
                                >
                                    {customization.groupName}: {customization.option.name}
                                    {customization.option.price_modifier > 0
                                        ? ` (+$${customization.option.price_modifier.toFixed(2)})`
                                        : ""}
                                </Text>
                            ))}
                            {item.note && item.note.trim().length > 0 && (
                                <Text style={styles.noteText}>
                                    Note: {item.note}
                                </Text>
                            )}
                        </View>

                        <View style={styles.quantityContainer}>
                            <Pressable
                                style={styles.quantityButton}
                                onPress={() =>
                                    decreaseItem(item.id)
                                }
                            >
                                <Text style={styles.quantityButtonText}>
                                    -
                                </Text>
                            </Pressable>

                            <Text style={styles.quantityText}>
                                {item.quantity}
                            </Text>

                            <Pressable
                                style={styles.quantityButton}
                                onPress={() =>
                                    addItem(item.menuItem, item.selectedCustomizations)
                                }
                            >
                                <Text style={styles.quantityButtonText}>
                                    +
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.subtotalRow}>
                    <Text style={styles.subtotalLabel}>
                        Subtotal
                    </Text>

                    <Text style={styles.subtotalValue}>
                        ${subtotal.toFixed(2)}
                    </Text>
                </View>

                <Pressable
                    style={styles.checkoutButton}
                    onPress={handleSubmitOrder}
                    disabled={items.length === 0 || isSubmitting}
                >
                    <Text style={styles.checkoutButtonText}>
                        {isSubmitting ? "Submitting..." : "Submit Order"}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
    },

    title: {
        fontSize: typography.heading,
        fontWeight: "700",
        color: colors.primary,
    },

    content: {
        padding: spacing.lg,
    },

    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },

    itemInfo: {
        flex: 1,
    },

    itemName: {
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
    },

    itemPrice: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "700",
    },

    quantityText: {
        minWidth: 24,
        textAlign: "center",
        fontSize: typography.body,
        fontWeight: "600",
    },

    footer: {
        padding: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.white,
    },

    subtotalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.md,
    },

    subtotalLabel: {
        fontSize: typography.body,
        color: colors.secondary,
    },

    subtotalValue: {
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
    },

    checkoutButton: {
        backgroundColor: "#F97316",
        paddingVertical: spacing.md,
        borderRadius: radius.md,
        alignItems: "center",
    },

    checkoutButtonText: {
        color: colors.white,
        fontSize: typography.body,
        fontWeight: "700",
    },

    customizationText: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.xl,
    },

    emptyTitle: {
        fontSize: typography.heading,
        fontWeight: "700",
        color: colors.primary,
    },

    emptySubtitle: {
        marginTop: spacing.sm,
        fontSize: typography.body,
        color: colors.secondary,
        textAlign: "center",
    },
    noteText: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: "#F97316",
        fontWeight: "600",
    },
});