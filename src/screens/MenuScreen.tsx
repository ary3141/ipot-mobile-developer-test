import {
    SafeAreaView,
} from "react-native-safe-area-context";

import { router } from "expo-router";

import {
    Modal,
    Pressable,
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

import { SelectedCustomization } from "@/src/models/cart";
import { CustomizationOption, MenuItem, MenuResponse } from "@/src/models/menu";

import { getMenu } from "@/src/api/menuApi";
// import { MenuResponse } from "@/src/models/menu";
import { useCartStore } from "@/src/state/cartStore";
import { useEffect, useState } from "react";

export default function MenuScreen() {
    const [menu, setMenu] = useState<MenuResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
    useEffect(() => {
        async function loadMenu() {
            const response = await getMenu("T001");

            setMenu(response);
            setIsLoading(false);
        }

        loadMenu();
    }, []);
    const handleAddPress = (item: MenuItem) => {
  if (item.customization_groups.length === 0) {
    addItem(item);
    return;
  }

  setSelectedItem(item);
  setSelectedCustomizations([]);
};

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

const handleConfirmCustomization = () => {
  if (!selectedItem) return;

  addItem(selectedItem, selectedCustomizations);
  setSelectedItem(null);
  setSelectedCustomizations([]);
};
    const filteredItems = (menu?.items ?? []).filter((item) => {
        const keyword = searchText.toLowerCase();

        const matchesSearch =
            item.name.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword);

        const matchesCategory =
            selectedCategoryId === 0 || item.category_id === selectedCategoryId;

        return matchesSearch && matchesCategory;
    });

    const categories = [{ id: 0, name: "All" }, ...menu?.categories ?? []];

    const addItem = useCartStore((state) => state.addItem);
    const totalItems = useCartStore((state) => state.getTotalItems());
    const subtotal = useCartStore((state) => state.getSubtotal());

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
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.restaurantName}>
              {menu?.restaurant.name}
            </Text>

            <Text style={styles.tableText}>
              Table {menu?.restaurant.table_id}
            </Text>
          </View>
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
            {categories.map((category, index) => (
                <CategoryChip
                    key={category.id}
                    label={category.name}
                    isActive={selectedCategoryId === category.id}
                    onPress={() => setSelectedCategoryId(category.id)}
                />
            ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>
          Popular Items
        </Text>

        <View style={styles.cardsContainer}>
            {filteredItems.map((item) => (
                <MenuItemCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={`$${item.price.toFixed(2)}`}
                    onAddPress={() => handleAddPress(item)}
                />
            ))}
        </View>
      </ScrollView>
      {totalItems > 0 && (
        <Pressable
            style={styles.cartButton}
            onPress={() => router.push("/cart" as any)}
        >
            <Text style={styles.cartButtonText}>
               View Cart • {totalItems} item{totalItems > 1 ? "s" : ""} • ${subtotal.toFixed(2)}
            </Text>

        </Pressable>
      )}
    <Modal
  visible={selectedItem !== null}
  animationType="slide"
  transparent
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>
        {selectedItem?.name}
      </Text>

      <Text style={styles.modalSubtitle}>
        Choose your preferences
      </Text>

      {selectedItem?.customization_groups.map((group) => (
        <View key={group.id} style={styles.customizationGroup}>
          <Text style={styles.groupTitle}>
            {group.name}
            {group.required ? " *" : ""}
          </Text>

          {group.options.map((option) => {
            const isSelected = selectedCustomizations.some(
              (item) => item.option.id === option.id
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

      <Pressable
        style={styles.confirmButton}
        onPress={handleConfirmCustomization}
      >
        <Text style={styles.confirmButtonText}>
          Add to Cart
        </Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => setSelectedItem(null)}
      >
        <Text style={styles.cancelButtonText}>
          Cancel
        </Text>
      </Pressable>
    </View>
  </View>
</Modal>
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
  modalOverlay: {
  flex: 1,
  justifyContent: "flex-end",
  backgroundColor: "rgba(0,0,0,0.4)",
},

modalContent: {
  backgroundColor: colors.white,
  padding: spacing.lg,
  borderTopLeftRadius: radius.lg,
  borderTopRightRadius: radius.lg,
},

modalTitle: {
  fontSize: typography.heading,
  fontWeight: "700",
  color: colors.primary,
},

modalSubtitle: {
  marginTop: spacing.xs,
  fontSize: typography.caption,
  color: colors.secondary,
},

customizationGroup: {
  marginTop: spacing.lg,
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
  padding: spacing.md,
  borderRadius: radius.md,
  borderWidth: 1,
  borderColor: colors.border,
  marginBottom: spacing.sm,
},

selectedOptionRow: {
  borderColor: "#F97316",
  backgroundColor: "#FFF7ED",
},

optionText: {
  fontSize: typography.body,
  color: colors.primary,
},

optionPrice: {
  fontSize: typography.caption,
  color: colors.secondary,
},

confirmButton: {
  marginTop: spacing.md,
  backgroundColor: "#F97316",
  paddingVertical: spacing.md,
  borderRadius: radius.md,
  alignItems: "center",
},

confirmButtonText: {
  color: colors.white,
  fontSize: typography.body,
  fontWeight: "700",
},

cancelButton: {
  marginTop: spacing.sm,
  paddingVertical: spacing.md,
  alignItems: "center",
},

cancelButtonText: {
  color: colors.secondary,
  fontSize: typography.body,
  fontWeight: "600",
},
});