import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { api } from "../services/api";

export default function HomeScreen({ navigation }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.getAlerts().then(setAlerts).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌡️ Heatwave Alerts</Text>
      <FlatList
        data={alerts}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.region}>{item.region}</Text>
            <Text style={styles.level}>{item.level}</Text>
            <Text>UTCI: {item.utci_max} °C</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f1115" },
  title: { color: "#fff", fontSize: 22, marginBottom: 16, fontWeight: "bold" },
  card: { backgroundColor: "#1a1d24", padding: 16, borderRadius: 12, marginBottom: 12 },
  region: { color: "#fff", fontWeight: "bold" },
  level: { color: "#ff7b54", marginVertical: 4 },
});
