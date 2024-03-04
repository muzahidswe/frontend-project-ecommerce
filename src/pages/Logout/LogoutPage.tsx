import { useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     logout();
    //     navigate('/login');
    // }, [logout]);
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