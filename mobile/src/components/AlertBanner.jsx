import React from "react";
import { View, Text } from "react-native";

export default function AlertBanner({ level }) {
  const colors = { GREEN: "#4caf50", YELLOW: "#ffc107", ORANGE: "#ff7b54", RED: "#e53935" };
  return (
    <View style={{ backgroundColor: colors[level] || "#888", padding: 8, borderRadius: 8 }}>
      <Text style={{ color: "#111", fontWeight: "bold" }}>{level} ALERT</Text>
    </View>
  );
}
