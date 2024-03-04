import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = () => {
    const { user } = useAuth();

    // Check if the user is authenticated
    const isAuthenticated = !!user;

    return (
        <Route
            element={isAuthenticated ? '' : <Navigate to="/login" />}
        />
    );
}
export default PrivateRoute;
