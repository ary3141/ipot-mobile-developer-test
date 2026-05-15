import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    colors,
    radius,
    spacing,
    typography,
} from "@/src/constants/theme";

export default function ScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanning, setIsScanning] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [connectedTableId, setConnectedTableId] = useState<string | null>(null);

    const handleQRCodeScanned = ({ data }: { data: string }) => {
        if (!isScanning) return;
        const scannedValue = data.trim();


        if (!scannedValue.startsWith("ipot://table/")) {
            setErrorMessage("Invalid QR code. Please scan a valid IPOT table QR.");
            setIsScanning(false);
            return;
        }

        const tableId = scannedValue.replace("ipot://table/", "");
        setIsScanning(false);

        setConnectedTableId(tableId);


    };
    const scanTranslateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isScanning) return;

        scanTranslateY.setValue(0);

        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(scanTranslateY, {
                    toValue: 220,
                    duration: 1800,
                    useNativeDriver: true,
                }),
                Animated.timing(scanTranslateY, {
                    toValue: 0,
                    duration: 1800,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, [isScanning, scanTranslateY]);
    if (!permission) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.subtitle}>Checking camera permission...</Text>
            </SafeAreaView>
        );
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Camera Permission</Text>
                    <Text style={styles.subtitle}>
                        Camera access is required to scan your table QR code.
                    </Text>
                </View>

                <Pressable style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Allow Camera</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>IPOT Order</Text>

                <Text style={styles.subtitle}>
                    Scan your table QR to begin ordering
                </Text>
            </View>

            {isScanning && (
                <View style={styles.cameraContainer}>
                    <CameraView
                        style={styles.camera}
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr"],
                        }}
                        onBarcodeScanned={handleQRCodeScanned}
                    />

                    <View style={styles.scanFrame} />

                    <Animated.View
                        style={[
                            styles.scanLine,
                            {
                                transform: [{ translateY: scanTranslateY }],
                            },
                        ]}
                    />
                </View>
            )}

            {!isScanning && connectedTableId == null && (
                <View style={styles.statusPill}>
                    <View
                        style={[
                            styles.statusDot,
                            connectedTableId
                                ? styles.connectedDot
                                : styles.offDot,
                        ]}
                    />

                    <Text style={styles.statusText}>
                        {connectedTableId
                            ? `Connected to Table ${connectedTableId}`
                            : "Camera is off"}
                    </Text>
                </View>
            )}
            {errorMessage.length > 0 && (
                <View style={styles.errorCard}>
                    <Text style={styles.errorIcon}>!</Text>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            )}
            {connectedTableId && (
                <>
                    <View style={styles.connectedCard}>
                        <View style={styles.successCircle}>
                            <Text style={styles.successIcon}>✓</Text>
                        </View>

                        <View>
                            <Text style={styles.connectedTitle}>
                                Table Connected
                            </Text>

                            <Text style={styles.connectedSubtitle}>
                                Table {connectedTableId} • Sushi Zen
                            </Text>
                        </View>
                    </View>

                    <Pressable
                        onPress={() => {
                            setConnectedTableId(null);
                            setErrorMessage("");
                            setIsScanning(true);
                        }}
                    >
                        <Text style={styles.scanAnotherText}>
                            Scan Another Table
                        </Text>
                    </Pressable>
                </>
            )}
            <Pressable
                style={styles.button}
                onPress={() => {
                    if (connectedTableId) {
                        router.push({
                            pathname: "/menu",
                            params: { tableId: connectedTableId },
                        } as any);


                        return;
                    }

                    setConnectedTableId(null);
                    setErrorMessage("");
                    setIsScanning(true);
                }}
            >

                <Text style={styles.buttonText}>
                    {connectedTableId
                        ? "View Menu"
                        : isScanning
                            ? "Scanning..."
                            : "Open Camera"}
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

    camera: {
        flex: 1,
        borderRadius: radius.lg,
        overflow: "hidden",
    },

    errorText: {
        flex: 1,
        color: colors.danger,
        fontSize: typography.caption,
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
    connectedCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },

    successCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.success,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.md,
    },

    successIcon: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "700",
    },

    connectedTitle: {
        fontSize: typography.body,
        fontWeight: "700",
        color: colors.primary,
    },

    connectedSubtitle: {
        marginTop: spacing.xs,
        fontSize: typography.caption,
        color: colors.secondary,
    },
    scanAnotherText: {
        marginTop: -120,
        textAlign: "center",
        color: "#F97316",
        fontWeight: "400",
        textDecorationLine: "underline",
    },
    scanFrame: {
        position: "absolute",
        width: 240,
        height: 240,
        borderWidth: 4,
        borderColor: colors.white,
        borderRadius: 24,
        alignSelf: "center",
        top: "25%",
    },

    scanLine: {
        position: "absolute",
        height: 2,
        width: 240,
        backgroundColor: "#F97316",
        alignSelf: "center",
        top: "25%",
    },

    errorCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },

    errorIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FFF7ED",
        color: "#F97316",
        textAlign: "center",
        lineHeight: 28,
        fontWeight: "700",
        marginRight: spacing.sm,
    },
    cameraContainer: {
        flex: 1,
        marginVertical: spacing.lg,
        position: "relative",
    },
    statusPill: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: colors.white,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.border,
    },

    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: spacing.sm,
    },

    connectedDot: {
        backgroundColor: colors.success,
    },

    offDot: {
        backgroundColor: "#9CA3AF",
    },

    statusText: {
        fontSize: typography.caption,
        fontWeight: "600",
        color: colors.primary,
    },
});