import React from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    Outlet,
} from "react-router-dom";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Home from "./Views/Home";
import PageNotFound from "./Views/PageNotFound";
import { AuthProvider } from "./Utils/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" Component={Home} />
                    <Route path="/login" Component={Login} />
                    <Route path="/signup" Component={Signup} />
                    <Route path="*" Component={PageNotFound} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
