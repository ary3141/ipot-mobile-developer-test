import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/constants/theme";

export default function ScannerScreen() {
  const handleStartOrdering = () => {
    router.push({
        pathname: "/menu",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>IPOT Order</Text>

        <Text style={styles.subtitle}>
          Scan your table QR to begin ordering
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleStartOrdering}
      >
        <Text style={styles.buttonText}>
          Start Ordering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.primary,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: typography.body,
    color: colors.secondary,
    lineHeight: 24,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
  },

  buttonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: "600",
  },
});