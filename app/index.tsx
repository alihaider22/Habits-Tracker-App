import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

/**
 * Index Screen (Root Screen)
 * This is the first screen that loads when the app starts
 * Path: app/index.tsx → "/"
 *
 * Purpose:
 * - Check if user is logged in
 * - Redirect to appropriate screen based on auth status
 * - Show loading indicator while checking authentication
 */
export default function Index() {
  // Get authentication state from AuthContext
  const { user, loading } = useAuth();

  /**
   * While checking authentication status, show a loading spinner
   * This prevents flashing between screens
   */
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  /**
   * Once loading is complete, redirect based on authentication status:
   * - If user is logged in → redirect to main app (tabs)
   * - If user is NOT logged in → redirect to login screen
   *
   * Using <Redirect /> from expo-router for navigation
   */
  if (user) {
    // User is authenticated, go to main app
    return <Redirect href="/(tabs)" />;
  } else {
    // User is not authenticated, go to login
    return <Redirect href="/login" />;
  }
}

/**
 * Styles for the loading screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
