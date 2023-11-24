import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { getAuthConfig, removeToken } from 'util/token';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const validateToken = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/valid`, getAuthConfig());
      setIsAuthenticated(true);
    } catch (error) {
      removeToken();
      setIsAuthenticated(false);
      console.error("Token expired, signing out.");
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
