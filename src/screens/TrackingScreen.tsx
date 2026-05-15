import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/constants/theme";

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
};
const ORDER_STEPS = ["Pending", "Confirmed", "Preparing", "Ready", "Served"];

export default function TrackingScreen() {
    const [currentStep, setCurrentStep] = useState(2);
    const baseTime = useMemo(() => new Date(), []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((previousStep) => {
                if (previousStep >= ORDER_STEPS.length - 1) {
                    clearInterval(interval);
                    return previousStep;
                }

                return previousStep + 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const orderSteps = ORDER_STEPS.map((title, index) => {
        const status =
            index < currentStep
                ? "done"
                : index === currentStep
                    ? "active"
                    : "waiting";

        const time =
            index <= currentStep
                ? formatTime(new Date(baseTime.getTime() + index * 60 * 1000))
                : "";

        return { title, status, time };
    });

    const currentStatus = ORDER_STEPS[currentStep];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Order Status</Text>
                <Text style={styles.orderId}>Order #ORD-001</Text>
            </View>

            <View style={styles.statusHero}>
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>🛍️</Text>
                </View>

                <Text style={styles.currentStatus}>{currentStatus}</Text>
                <Text style={styles.description}>
                    {currentStep >= ORDER_STEPS.length - 1
                        ? "Your order has been served. Enjoy your meal!"
                        : "Our kitchen is preparing your delicious food."}
                </Text>
            </View>

            <View style={styles.timeline}>
                {orderSteps.map((step, index) => {
                    const isDone = step.status === "done";
                    const isActive = step.status === "active";

                    return (
                        <View key={step.title} style={styles.stepRow}>
                            <View style={styles.leftColumn}>
                                <View
                                    style={[
                                        styles.circle,
                                        (isDone || isActive) && styles.orangeCircle,
                                    ]}
                                >
                                    {isDone && <Text style={styles.check}>✓</Text>}
                                </View>

                                {index !== orderSteps.length - 1 && (
                                    <View
                                        style={[
                                            styles.line,
                                            (isDone || isActive) && styles.orangeLine,
                                        ]}
                                    />
                                )}
                            </View>

                            <View style={styles.stepContent}>
                                <Text
                                    style={[
                                        styles.stepTitle,
                                        (isDone || isActive) && styles.activeStepTitle,
                                    ]}
                                >
                                    {step.title}
                                </Text>

                                {step.time.length > 0 && (
                                    <Text style={styles.stepTime}>{step.time}</Text>
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={styles.etaCard}>
                <Text style={styles.etaLabel}>Estimated Time</Text>
                <Text style={styles.etaValue}>
                    {currentStep >= ORDER_STEPS.length - 1 ? "Served" : "15–20 min"}
                </Text>
                <Text style={styles.etaDescription}>
                    {currentStep >= ORDER_STEPS.length - 1
                        ? "Thank you for ordering with Sushi Zen."
                        : "We'll notify you when your order is ready."}
                </Text>
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
        alignItems: "center",
        marginTop: spacing.md,
    },

    title: {
        fontSize: typography.heading,
        fontWeight: "700",
        color: colors.primary,
    },

    orderId: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
    },

    statusHero: {
        alignItems: "center",
        marginTop: spacing.xl,
    },

    iconCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: "#FFF7ED",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 44,
    },

    currentStatus: {
        marginTop: spacing.md,
        fontSize: typography.heading,
        fontWeight: "700",
        color: "#F97316",
    },

    description: {
        marginTop: spacing.xs,
        fontSize: typography.body,
        color: colors.secondary,
        textAlign: "center",
        lineHeight: 22,
    },

    timeline: {
        marginTop: spacing.xl,
    },

    stepRow: {
        flexDirection: "row",
        minHeight: 56,
    },

    leftColumn: {
        width: 36,
        alignItems: "center",
    },

    circle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
    },

    orangeCircle: {
        backgroundColor: "#F97316",
    },

    check: {
        color: colors.white,
        fontSize: 13,
        fontWeight: "700",
    },

    line: {
        width: 2,
        flex: 1,
        backgroundColor: "#D1D5DB",
        marginTop: 4,
    },

    orangeLine: {
        backgroundColor: "#F97316",
    },

    stepContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: spacing.md,
    },

    stepTitle: {
        fontSize: typography.body,
        color: colors.secondary,
        fontWeight: "600",
    },

    activeStepTitle: {
        color: colors.primary,
    },

    stepTime: {
        fontSize: typography.caption,
        color: colors.secondary,
    },

    etaCard: {
        marginTop: "auto",
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
        marginTop: spacing.xs,
        fontSize: typography.body,
        fontWeight: "700",
        color: "#F97316",
    },

    etaDescription: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
        lineHeight: 20,
    },
});