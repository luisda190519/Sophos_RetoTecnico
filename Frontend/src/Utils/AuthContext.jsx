import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [userAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("user"));
        if (usuario !== null && Object.keys(usuario).length !== 0) {
            return setIsAuthenticated(usuario);
        }
        return setIsAuthenticated(false);
    }, []);

    // Function to log in user
    const login = (user) => {
        setIsAuthenticated(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    // Function to log out user
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    };

    // Render the authentication context provider
    return (
        <AuthContext.Provider value={{ userAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
