import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

  const handleQRCodeScanned = ({ data }: { data: string }) => {
    if (!isScanning) return;
    const scannedValue = data.trim();
    
    console.log("QR DATA:", scannedValue);
    if (!scannedValue.startsWith("ipot://table/")) {
      setErrorMessage("Invalid QR code. Please scan a valid IPOT table QR.");
      setIsScanning(false);
      return;
    }

    const tableId = scannedValue.replace("ipot://table/", "");

    router.push({
      pathname: "/menu",
      params: { tableId },
    } as any);

    
  };

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
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleQRCodeScanned}
        />
      )}

      {errorMessage.length > 0 && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <Pressable
        style={styles.button}
        onPress={() => {
          setErrorMessage("");
          setIsScanning(true);
        }}
      >
        <Text style={styles.buttonText}>
          {isScanning ? "Scanning..." : "Open Camera"}
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
    marginVertical: spacing.lg,
    borderRadius: radius.lg,
    overflow: "hidden",
  },

  errorText: {
    color: colors.danger,
    fontSize: typography.caption,
    textAlign: "center",
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