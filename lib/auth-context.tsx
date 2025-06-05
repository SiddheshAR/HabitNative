import { createContext, useContext, useEffect, useState } from "react";
import { authAPI, LoginData, RegisterData, tokenManager, User } from "../services/api";

type AuthContextType = {
  user: User | null;
  isLoadingUser: boolean;
  signUp: (userData: RegisterData) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  // Get user profile from backend
  const getUser = async () => {
    try {
      const token = await tokenManager.getToken();
      if (!token) {
        setUser(null);
        return;
      }

      const response = await authAPI.getProfile();
      if (response.success && response.data) {
        setUser(response.data.user);
      } else {
        // Token might be invalid, remove it
        await tokenManager.removeToken();
        setUser(null);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      // Remove invalid token
      await tokenManager.removeToken();
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  // Check for existing session on app start
  useEffect(() => {
    getUser();
  }, []);

  // Sign up new user
  const signUp = async (userData: RegisterData): Promise<string | null> => {
    try {
      setIsLoadingUser(true);
      const response = await authAPI.register(userData);
      
      if (response.success && response.data) {
        // Store token and set user
        await tokenManager.setToken(response.data.token);
        setUser(response.data.user);
        return null; // Success
      } else {
        return response.message || response.error || "Registration failed";
      }
    } catch (error) {
      console.error('SignUp error:', error);
      return "An error occurred during signup";
    } finally {
      setIsLoadingUser(false);
    }
  };

  // Sign in existing user
  const signIn = async (email: string, password: string): Promise<string | null> => {
    try {
      setIsLoadingUser(true);
      const loginData: LoginData = { email, password };
      const response = await authAPI.login(loginData);
      
      if (response.success && response.data) {
        // Store token and set user
        await tokenManager.setToken(response.data.token);
        setUser(response.data.user);
        return null; // Success
      } else {
        return response.message || response.error || "Login failed";
      }
    } catch (error) {
      console.error('SignIn error:', error);
      return "An error occurred during sign in";
    } finally {
      setIsLoadingUser(false);
    }
  };

  // Sign out user
  const signOut = async (): Promise<void> => {
    try {
      // Remove token from secure storage
      await tokenManager.removeToken();
      setUser(null);
    } catch (error) {
      console.error('SignOut error:', error);
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    await getUser();
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isLoadingUser, 
        signUp, 
        signIn, 
        signOut, 
        refreshUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}