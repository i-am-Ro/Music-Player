import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  username: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const createMockToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  return btoa(JSON.stringify(payload));
};

const validateToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token));

    if (payload.exp < Date.now()) {
      return null;
    }

    return {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

const mockUsers = [
  { id: "1", username: "admin", password: "admin123", role: "admin" as const },
  { id: "2", username: "user", password: "user123", role: "user" as const },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("music_app_token");
    if (token) {
      const validatedUser = validateToken(token);
      if (validatedUser) {
        setUser(validatedUser);
      } else {
        localStorage.removeItem("music_app_token");
      }
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const mockUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (mockUser) {
      const user = {
        id: mockUser.id,
        username: mockUser.username,
        role: mockUser.role,
      };

      const token = createMockToken(user);
      localStorage.setItem("music_app_token", token);
      setUser(user);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("music_app_token");
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
