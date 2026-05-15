import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/src/constants/theme";

type MenuItemCardProps = {
    name: string;
    description: string;
    price: string;
    emoji?: string;
    onAddPress: () => void;
};

export default function MenuItemCard({
    name,
    description,
    price,
    emoji,
    onAddPress,
}: MenuItemCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.imagePlaceholder}>
                <Text style={styles.emoji}>{emoji}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>

            <Pressable style={styles.addButton} onPress={onAddPress}>
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: spacing.md,
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: radius.md,
        backgroundColor: "#FFF7ED",
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        flex: 1,
        marginLeft: spacing.md,
    },
    name: {
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
    },
    description: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
        lineHeight: 20,
    },
    price: {
        marginTop: spacing.sm,
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F97316",
        alignItems: "center",
        justifyContent: "center",
    },
    addButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "700",
    },
    emoji: {
        fontSize: 50,
    },
});