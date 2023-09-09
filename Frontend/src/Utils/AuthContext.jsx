import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [userAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("user"));
        if (usuario !== null && Object.keys(usuario).length !== 0) {
            return setIsAuthenticated(usuario);
        }
        return setIsAuthenticated(false);
    }, []);

    const login = (user) => {
        setIsAuthenticated(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ userAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
