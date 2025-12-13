import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * Habits Tab Screen
 * Path: app/(tabs)/habits.tsx → "/(tabs)/habits"
 *
 * This screen will display and manage user habits
 * Currently a placeholder - you can build out the full functionality later
 */
export default function HabitsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Empty State */}
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle-outline" size={80} color="#007AFF" />
          <Text style={styles.emptyTitle}>No Habits Yet</Text>
          <Text style={styles.emptyDescription}>
            Start building better habits by creating your first one!
          </Text>
        </View>

        {/* Placeholder Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <Text style={styles.cardText}>
            This is where you'll track your daily habits. You can add features
            like:
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark" size={20} color="#34C759" />
              <Text style={styles.featureText}>Create custom habits</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark" size={20} color="#34C759" />
              <Text style={styles.featureText}>Track daily completion</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark" size={20} color="#34C759" />
              <Text style={styles.featureText}>View streaks and progress</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark" size={20} color="#34C759" />
              <Text style={styles.featureText}>Set reminders</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Styles for the Habits Screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#333",
  },
});
