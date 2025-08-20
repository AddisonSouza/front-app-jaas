import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useWebSocket from "../hooks/useWebSocket";
import SensorCard from "../components/SensorCard";

export default function HomeScreen() {
  const data = useWebSocket();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📡 Sensor Data</Text>
      <SensorCard title="Leitura do Sensor" value={data?.value} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
