import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

/**
 * Register Screen Component
 * Path: app/register.tsx → "/register"
 *
 * Purpose: Allows new users to create an account
 */
export default function RegisterScreen() {
  // Get the register function from our Auth Context
  const { register } = useAuth();

  // Local state for form inputs
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handle register button press
   * Validates inputs and attempts to create a new account
   */
  const handleRegister = async () => {
    // Validate all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Validate name length
    if (name.trim().length < 2) {
      Alert.alert("Error", "Name must be at least 2 characters long");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Validate password length (Appwrite requires minimum 8 characters)
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Attempt to register using the context function
      await register(email, password, name);
      // If successful, the user will be automatically logged in
      // and navigation will happen through the AuthContext
      Alert.alert("Success", "Account created successfully!");
    } catch (error: any) {
      // If registration fails, show error message
      let errorMessage = "An error occurred during registration";

      // Handle common Appwrite errors
      if (error.message) {
        if (error.message.includes("user already exists")) {
          errorMessage = "An account with this email already exists";
        } else if (error.message.includes("Invalid email")) {
          errorMessage = "Please enter a valid email address";
        } else if (error.message.includes("password")) {
          errorMessage = "Password does not meet requirements";
        } else {
          errorMessage = error.message;
        }
      }

      Alert.alert("Registration Failed", errorMessage);
    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };

  return (
    // KeyboardAvoidingView ensures the keyboard doesn't cover inputs
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* Title */}
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoCapitalize="words" // Capitalize first letter of each word
            editable={!loading}
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password (min. 8 characters)"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          {/* Confirm Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />

          {/* Password Requirements Text */}
          <Text style={styles.helperText}>
            Password must be at least 8 characters long
          </Text>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * Styles for the Register Screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  helperText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
    marginTop: -10,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
