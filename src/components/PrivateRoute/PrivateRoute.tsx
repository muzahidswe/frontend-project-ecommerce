import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = () => {
    const { user } = useAuth();

    const isAuthenticated = !!user;

    const storedUser = localStorage.getItem('userInformation');
    console.log('storedUser');
    console.log(storedUser);

    return (
        <Route
            element={isAuthenticated ? '' : <Navigate to="/login" />}
        />
    );
}
export default PrivateRoute;
