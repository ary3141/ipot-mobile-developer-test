import { StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700" },
});