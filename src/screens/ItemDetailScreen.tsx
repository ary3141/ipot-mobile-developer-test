import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    colors,
    spacing,
    typography
} from "@/src/constants/theme";

import { mockMenu } from "@/src/data/mockMenu";
import { SelectedCustomization } from "@/src/models/cart";
import { CustomizationOption } from "@/src/models/menu";
import { useCartStore } from "@/src/state/cartStore";
import { getMenuItemEmoji } from "../utils/menu";

export default function ItemDetailScreen() {
    const { id } = useLocalSearchParams<{
        id: string;
    }>();

    const item = mockMenu.items.find(
        (menuItem) => menuItem.id === Number(id)
    );
    const addItem = useCartStore((state) => state.addItem);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");
    const [selectedCustomizations, setSelectedCustomizations] =
        useState<SelectedCustomization[]>([]);
    if (!item) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Item not found</Text>
            </SafeAreaView>
        );
    }
    const handleSelectCustomization = (
        groupId: number,
        groupName: string,
        option: CustomizationOption
    ) => {
        setSelectedCustomizations((current) => {
            const withoutSameGroup = current.filter(
                (item) => item.groupId !== groupId
            );

            return [
                ...withoutSameGroup,
                {
                    groupId,
                    groupName,
                    option,
                },
            ];
        });
    };

    const customizationTotal = selectedCustomizations.reduce(
        (sum, customization) =>
            sum + customization.option.price_modifier,
        0
    );

    const totalPrice =
        (item.price + customizationTotal) * quantity;

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.imageContainer}>
                        <Text style={styles.emojiStyle}>
                            {getMenuItemEmoji(item.name)}
                        </Text>
                    </View>

                    <Text style={styles.name}>
                        {item.name}
                    </Text>

                    <Text style={styles.description}>
                        {item.description}
                    </Text>

                    <Text style={styles.price}>
                        ${item.price.toFixed(2)}
                    </Text>

                    {item.customization_groups.map((group) => (
                        <View key={group.id} style={styles.customizationGroup}>
                            <Text style={styles.groupTitle}>
                                {group.name}
                                {group.required ? " *" : ""}
                            </Text>

                            {group.options.map((option) => {
                                const isSelected = selectedCustomizations.some(
                                    (customization) => customization.option.id === option.id
                                );

                                return (
                                    <Pressable
                                        key={option.id}
                                        style={[
                                            styles.optionRow,
                                            isSelected && styles.selectedOptionRow,
                                        ]}
                                        onPress={() =>
                                            handleSelectCustomization(
                                                group.id,
                                                group.name,
                                                option
                                            )
                                        }
                                    >
                                        <Text style={styles.optionText}>
                                            {option.name}
                                        </Text>

                                        <Text style={styles.optionPrice}>
                                            +${option.price_modifier.toFixed(2)}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    ))}

                    <View style={styles.quantityRow}>
                        <Text style={styles.groupTitle}>Quantity</Text>

                        <View style={styles.quantityControl}>
                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </Pressable>

                            <Text style={styles.quantityText}>{quantity}</Text>

                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </Pressable>
                        </View>
                    </View>

                    <Text style={styles.groupTitle}>Special Instructions</Text>

                    <TextInput
                        style={styles.noteInput}
                        placeholder="Add a note, e.g. no onion, extra sauce..."
                        placeholderTextColor={colors.secondary}
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />

                    <Pressable
                        style={styles.addButton}
                        onPress={() => {
                            addItem(item, selectedCustomizations, note, quantity);
                            router.replace("/cart" as any);
                        }}
                    >
                        <Text style={styles.addButtonText}>
                            Add to Cart • ${totalPrice.toFixed(2)}
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        padding: spacing.lg,
    },

    imageContainer: {
        height: 240,
        borderRadius: 28,
        backgroundColor: "#FFF7ED",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#FED7AA",
    },

    emoji: {
        fontSize: 96,
    },

    name: {
        marginTop: spacing.xl,
        fontSize: typography.heading,
        fontWeight: "700",
        color: colors.primary,
    },

    description: {
        marginTop: spacing.sm,
        fontSize: typography.body,
        color: colors.secondary,
        lineHeight: 24,
    },

    price: {
        marginTop: spacing.lg,
        fontSize: typography.heading,
        fontWeight: "700",
        color: "#F97316",
    },
    customizationGroup: {
        marginTop: spacing.xl,
    },

    groupTitle: {
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
        marginBottom: spacing.sm,
    },

    optionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: spacing.sm,
    },

    selectedOptionRow: {
        borderColor: "#F97316",
        backgroundColor: "#FFF7ED",
        borderWidth: 2,
    },

    optionText: {
        fontSize: typography.body,
        color: colors.primary,
    },

    optionPrice: {
        fontSize: typography.caption,
        color: colors.secondary,
    },

    quantityRow: {
        marginTop: spacing.xl,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    quantityButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "700",
    },

    quantityText: {
        minWidth: 28,
        textAlign: "center",
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
    },

    noteInput: {
        minHeight: 96,
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: spacing.md,
        fontSize: typography.body,
        color: colors.primary,
        textAlignVertical: "top",
    },

    addButton: {
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
        backgroundColor: "#F97316",
        paddingVertical: spacing.md,
        borderRadius: 16,
        alignItems: "center",
    },

    addButtonText: {
        color: colors.white,
        fontSize: typography.body,
        fontWeight: "700",
    },
    emojiStyle: {
        fontSize: 112,
    },
    keyboardView: {
        flex: 1,
    },
});
