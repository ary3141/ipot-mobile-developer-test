import { router, useLocalSearchParams } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    Pressable,
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

export default function ConfirmationScreen() {
  const { orderId, estimatedMinutes } =
    useLocalSearchParams<{
      orderId: string;
      estimatedMinutes: string;
    }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          🎉
        </Text>

        <Text style={styles.title}>
          Order Confirmed
        </Text>

        <Text style={styles.description}>
          Your order has been successfully placed.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Order ID
          </Text>

          <Text style={styles.value}>
            {orderId}
          </Text>

          <Text style={styles.label}>
            Estimated Preparation Time
          </Text>

          <Text style={styles.value}>
            {estimatedMinutes} minutes
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push("/tracking" as any)
        }
      >
        <Text style={styles.buttonText}>
          Track Order
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    fontSize: 72,
  },

  title: {
    marginTop: spacing.lg,
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.primary,
  },

  description: {
    marginTop: spacing.sm,
    fontSize: typography.body,
    color: colors.secondary,
    textAlign: "center",
  },

  card: {
    width: "100%",
    marginTop: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },

  label: {
    fontSize: typography.caption,
    color: colors.secondary,
  },

  value: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.primary,
  },

  button: {
    backgroundColor: "#F97316",
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
  },

  buttonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: "700",
  },
});