// test?
import { User } from "@/types/user.type";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: () => void;
    logout: () => void;
    fetchCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const authService = new AuthService();

    const login = () => {
        fetchCurrentUser();
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const fetchCurrentUser = async () => {
        try {
            const currentUser = await authService.currentUser();
            setUser(currentUser);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error fetching current user:", error);
            logout();
        }
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            fetchCurrentUser();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};