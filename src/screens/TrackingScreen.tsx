import { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
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

const ORDER_STATUSES = [
  "Order Received",
  "Preparing",
  "Ready for Pickup",
  "Served",
];

export default function TrackingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= ORDER_STATUSES.length - 1) {
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentStep]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Track Your Order
        </Text>

        <Text style={styles.subtitle}>
          Your food is being prepared
        </Text>
      </View>

      <View style={styles.etaCard}>
        <Text style={styles.etaLabel}>
          Estimated Arrival
        </Text>

        <Text style={styles.etaValue}>
          15 Minutes
        </Text>
      </View>

      <View style={styles.timeline}>
        {ORDER_STATUSES.map((status, index) => {
          const isCompleted = index <= currentStep;

          return (
            <View
              key={status}
              style={styles.timelineRow}
            >
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.activeCircle,
                ]}
              />

              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.statusText,
                    isCompleted &&
                      styles.activeStatusText,
                  ]}
                >
                  {status}
                </Text>

                {index === currentStep && (
                  <Text style={styles.liveText}>
                    In Progress
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  header: {
    marginTop: spacing.md,
  },

  title: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.primary,
  },

  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.secondary,
  },

  etaCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  etaLabel: {
    fontSize: typography.caption,
    color: colors.secondary,
  },

  etaValue: {
    marginTop: spacing.sm,
    fontSize: 32,
    fontWeight: "700",
    color: "#F97316",
  },

  timeline: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },

  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
    marginTop: 4,
  },

  activeCircle: {
    backgroundColor: "#F97316",
  },

  timelineContent: {
    marginLeft: spacing.md,
  },

  statusText: {
    fontSize: typography.body,
    color: colors.secondary,
    fontWeight: "500",
  },

  activeStatusText: {
    color: colors.primary,
    fontWeight: "700",
  },

  liveText: {
    marginTop: spacing.xs,
    fontSize: typography.caption,
    color: "#F97316",
    fontWeight: "600",
  },
});