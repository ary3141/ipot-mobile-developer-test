import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/src/constants/theme";

type MenuItemCardProps = {
  name: string;
  description: string;
  price: string;
};

export default function MenuItemCard({
  name,
  description,
  price,
}: MenuItemCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      <Pressable style={styles.addButton}>
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
    backgroundColor: "#D1D5DB",
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
});