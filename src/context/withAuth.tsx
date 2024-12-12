// test?
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { routes } from "../routes/routes";

const withAuth = (Component: React.ComponentType) => {
    return (props: any) => {
        const { isAuthenticated } = useAuth();
        if (!isAuthenticated) {
            return <Navigate to={routes.Login} />;
        }
        return <Component {...props} />;
    };
};

export default withAuth;