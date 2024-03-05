import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../contexts/AuthContext";

const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
          try {
            await logout();
            navigate('/login'); // Redirect to home page after logout
          } catch (error) {
            console.error('Logout error:', error);
          }
        };
        handleLogout();
      }, [logout, navigate]);
}

export default LogoutPage;