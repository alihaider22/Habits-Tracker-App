import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite";
import { account } from "../lib/appwrite";

/**
 * Define the shape of our Auth Context
 * This interface describes what data and functions will be available
 * to components that use this context
 */
interface AuthContextType {
  user: Models.User<Models.Preferences> | null; // Current logged-in user or null
  loading: boolean; // Whether we're checking authentication status
  login: (email: string, password: string) => Promise<void>; // Login function
  register: (email: string, password: string, name: string) => Promise<void>; // Register function
  logout: () => Promise<void>; // Logout function
}

/**
 * Create the Auth Context
 * This will hold our authentication state and make it available throughout the app
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * This wraps your app and provides authentication state to all child components
 *
 * In Expo Router, this should be used in your root _layout.tsx file
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to store the current user (null if not logged in)
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  const router = useRouter();
  // State to track if we're currently loading the user's authentication status
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Check if user is already logged in when the app starts
   * This runs once when the component mounts
   */
  useEffect(() => {
    checkUser();
  }, []);

  /**
   * Function to check if there's an active session
   * Called when app starts to see if user is already logged in
   */
  const checkUser = async () => {
    try {
      // Try to get the current logged-in user from Appwrite
      const currentUser = await account.get();
      setUser(currentUser); // Set the user in state
    } catch (error) {
      // If there's an error, it means no user is logged in
      setUser(null);
    } finally {
      // Either way, we're done loading
      setLoading(false);
    }
  };

  /**
   * Login function
   * @param email - User's email address
   * @param password - User's password
   */
  const login = async (email: string, password: string) => {
    try {
      // Create a session with email and password
      await account.createEmailPasswordSession(email, password);

      // Get the user details after successful login
      const currentUser = await account.get();
      setUser(currentUser);

      // Navigate to the home/tabs screen after successful login
      // In Expo Router, we use router.replace to prevent going back to login
      router.replace("/(tabs)");
    } catch (error) {
      // Re-throw the error so the UI can handle it (show error message, etc.)
      throw error;
    }
  };

  /**
   * Register function
   * @param email - User's email address
   * @param password - User's password
   * @param name - User's display name
   */
  const register = async (email: string, password: string, name: string) => {
    try {
      // Create a new user account
      // 'unique()' generates a unique ID for the new user
      await account.create("unique()", email, password, name);

      // After registration, automatically log the user in
      await login(email, password);
    } catch (error) {
      // Re-throw the error so the UI can handle it
      throw error;
    }
  };

  /**
   * Logout function
   * Ends the current session and clears the user state
   */
  const logout = async () => {
    try {
      // Delete the current session on Appwrite
      await account.deleteSession("current");

      // Clear the user from state
      setUser(null);

      // Navigate to the login screen
      // Using replace to prevent going back to protected screens
      router.replace("/login");
    } catch (error) {
      // Re-throw the error so the UI can handle it
      throw error;
    }
  };

  /**
   * The value object that will be provided to all consuming components
   */
  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
  };

  // Provide the auth context to all child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the Auth Context
 * This makes it easy to access auth state and functions in any component
 *
 * Usage: const { user, login, logout } = useAuth();
 *
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // If used outside of AuthProvider, throw an error
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
