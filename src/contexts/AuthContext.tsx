import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "admin" | "user";

export interface User {
  id: string;
  username: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const base64Encode = (obj: object) => btoa(JSON.stringify(obj));
const base64Decode = (str: string) => JSON.parse(atob(str));

const createMockToken = (user: User): string => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };

  const encodedHeader = base64Encode(header);
  const encodedPayload = base64Encode(payload);
  const fakeSignature = btoa("secret" + encodedHeader + encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
};

const validateToken = (token: string): User | null => {
  try {
    const [encodedHeader, encodedPayload] = token.split(".");
    if (!encodedHeader || !encodedPayload) return null;

    const payload = base64Decode(encodedPayload);

    if (payload.exp * 1000 < Date.now()) return null;

    return { id: payload.id, username: payload.username, role: payload.role };
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
      if (validatedUser) setUser(validatedUser);
      else localStorage.removeItem("music_app_token");
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const mockUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (!mockUser) return false;

    const user = {
      id: mockUser.id,
      username: mockUser.username,
      role: mockUser.role,
    };
    const token = createMockToken(user);
    localStorage.setItem("music_app_token", token);
    setUser(user);
    return true;
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

// ---------------- Hook ----------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
