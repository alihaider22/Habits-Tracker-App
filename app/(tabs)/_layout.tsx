import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";

/**
 * Tabs Layout Component
 * Path: app/(tabs)/_layout.tsx → "/(tabs)"
 *
 * Purpose:
 * - Creates a bottom tab navigation for the main app
 * - Only accessible to authenticated users
 * - Protected by checking user authentication status
 *
 * Note: The parentheses (tabs) create a "group" in Expo Router
 * This means these screens share a common layout but don't show up in the URL
 */
export default function TabsLayout() {
  // Get user authentication state
  const { user } = useAuth();

  /**
   * Protect these routes - redirect to login if not authenticated
   * This is a security measure to prevent unauthorized access
   */
  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect to login screen
      router.replace("/login");
    }
  }, [user]);

  /**
   * If user is not authenticated, return null
   * The useEffect above will handle the redirect
   */
  if (!user) {
    return null;
  }

  return (
    /**
     * Tabs navigator from Expo Router
     * Creates a bottom tab navigation
     *
     * screenOptions: applies these options to all tab screens
     */
    <Tabs
      screenOptions={{
        // Customize tab bar appearance
        tabBarActiveTintColor: "#007AFF", // Active tab color
        tabBarInactiveTintColor: "#8E8E93", // Inactive tab color
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        // Customize header
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/**
       * Home Tab
       * Path: app/(tabs)/index.tsx → "/(tabs)/"
       */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/**
       * Habits Tab (you can create this later)
       * Path: app/(tabs)/habits.tsx → "/(tabs)/habits"
       */}
      <Tabs.Screen
        name="habits"
        options={{
          title: "Habits",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle" size={size} color={color} />
          ),
        }}
      />

      {/**
       * Profile Tab
       * Path: app/(tabs)/profile.tsx → "/(tabs)/profile"
       */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
