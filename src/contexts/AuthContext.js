import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = (userData) => {
    // Set user data in state
    console.log('userData login');
      console.log(userData);
    setUser(userData);
    // localStorage.removeItem('userInformation');
    localStorage.setItem('userInformation', JSON.stringify(userData));
    navigate('/user-account');
  };

  const logout = () => {
    // Clear user data from state
    setUser({});
    localStorage.removeItem('userInformation');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
