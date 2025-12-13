import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import "react-native-url-polyfill/auto"; // Required for Appwrite to work properly

/**
 * Root Layout Component
 * This is the entry point of your Expo Router app
 *
 * In Expo Router:
 * - _layout.tsx files define the layout structure
 * - This root layout wraps the entire app
 * - We wrap everything with AuthProvider to make auth available everywhere
 */
export default function RootLayout() {
  return (
    /**
     * AuthProvider wraps the entire app
     * This makes authentication state and functions available to all screens
     */
    <AuthProvider>
      {/**
       * Stack navigator from Expo Router
       * Provides navigation structure for the app
       *
       * screenOptions: applies these options to all screens in the stack
       */}
      <Stack
        screenOptions={{
          headerShown: true, // Hide headers by default (we'll customize per screen)
        }}
      >
        {/**
         * Define screens in your app
         *
         * Expo Router automatically creates routes based on your file structure:
         * - app/index.tsx → "/"
         * - app/login.tsx → "/login"
         * - app/register.tsx → "/register"
         * - app/(tabs)/_layout.tsx → "/(tabs)" (group with layout)
         */}

        {/* Login screen - accessible at /login */}
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        {/* Register screen - accessible at /register */}
        <Stack.Screen
          name="register"
          options={{
            title: "Create Account",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* Tabs group - accessible at /(tabs) */}
        {/* This will be your main app after login */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
