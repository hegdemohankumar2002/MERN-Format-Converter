import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  login: (newToken: string, user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  // On mount, sync token and user from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      console.log("AuthContext: storedToken:", storedToken ? "exists" : "null");
      console.log("AuthContext: storedUser:", storedUser ? "exists" : "null");
      
      if (storedToken && storedToken !== "null" && storedToken !== "undefined") {
        setToken(storedToken);
      }
      
      if (storedUser && storedUser !== "null" && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (parseError) {
          console.error("Error parsing stored user:", parseError);
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
    }
  }, []);

  const login = (newToken: string, user: { id: string; name: string; email: string }) => {
    console.log("AuthContext login called with token:", newToken ? "exists" : "null");
    console.log("AuthContext login called with user:", user);
    setToken(newToken);
    setUser(user);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("AuthContext: Token stored in localStorage:", localStorage.getItem("token") ? "exists" : "null");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
