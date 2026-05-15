import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/constants/theme";

import CategoryChip from "@/src/components/CategoryChip";
import MenuItemCard from "@/src/components/MenuItemCard";

export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.restaurantName}>
              Sushi Zen 
            </Text>

            <Text style={styles.tableText}>
              Table T001
            </Text>
          </View>
        </View>

        <TextInput
          placeholder="Search menu items..."
          placeholderTextColor={colors.secondary}
          style={styles.searchInput}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
            <CategoryChip label="All" isActive />
            <CategoryChip label="Appetizers" />
            <CategoryChip label="Main Course" />
            <CategoryChip label="Drinks" />
        </ScrollView>

        <Text style={styles.sectionTitle}>
          Popular Items
        </Text>

        <View style={styles.cardsContainer}>
        <MenuItemCard
            name="Chicken Ramen"
            description="Rich broth with egg and noodles"
            price="$14.99"
        />

        <MenuItemCard
            name="Salmon Sashimi"
            description="Fresh Norwegian salmon, 8 pieces"
            price="$16.99"
        />

        <MenuItemCard
            name="Green Tea"
            description="Hot Japanese green tea"
            price="$3.50"
        />
        </View>
      </ScrollView>
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

  activeCategory: {
    backgroundColor: "#F97316",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },

  activeCategoryText: {
    color: colors.white,
    fontWeight: "600",
  },

  category: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  categoryText: {
    color: colors.primary,
    fontWeight: "500",
  },

  sectionTitle: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.primary,
  },

  foodCard: {
    flexDirection: "row",
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  foodImage: {
    width: 80,
    height: 80,
    borderRadius: radius.md,
    backgroundColor: "#D1D5DB",
  },

  foodInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "space-between",
  },

  foodName: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.primary,
  },

  foodDescription: {
    fontSize: typography.caption,
    color: colors.secondary,
  },

  foodPrice: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.primary,
  },

  cardsContainer: {
  marginHorizontal: spacing.lg,
  },
});