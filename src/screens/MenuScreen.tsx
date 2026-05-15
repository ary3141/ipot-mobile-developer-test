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

import { mockMenu } from "@/src/data/mockMenu";

export default function MenuScreen() {

    const categories = [{ id: 0, name: "All" }, ...mockMenu.categories];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.restaurantName}>
              {mockMenu.restaurant.name}
            </Text>

            <Text style={styles.tableText}>
              Table {mockMenu.restaurant.table_id}
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
            {categories.map((category, index) => (
                <CategoryChip
                    key={category.id}
                    label={category.name}
                    isActive={index === 0}
                />
            ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>
          Popular Items
        </Text>

        <View style={styles.cardsContainer}>
            {mockMenu.items.map((item) => (
                <MenuItemCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={`$${item.price.toFixed(2)}`}
                />
            ))}
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
});