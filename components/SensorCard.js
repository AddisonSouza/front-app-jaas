import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SensorCard({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value ?? "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
});
