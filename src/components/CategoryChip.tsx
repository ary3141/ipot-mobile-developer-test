import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing } from "@/src/constants/theme";

type CategoryChipProps = {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
};

export default function CategoryChip({
  label,
  isActive = false,
  onPress,
}: CategoryChipProps) {
  return (
    <Pressable
      style={[
        styles.container,
        isActive && styles.activeContainer,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          isActive && styles.activeLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeContainer: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  label: {
    color: colors.primary,
    fontWeight: "500",
  },
  activeLabel: {
    color: colors.white,
    fontWeight: "600",
  },
});