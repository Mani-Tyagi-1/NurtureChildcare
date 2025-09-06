// src/context/UserContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../API/axiosInstance';

interface Admin {
  email: string;
  superadmin: boolean;
}

interface UserContextType {
  admin: Admin | null;
  loading: boolean;
  refreshAdmin: () => void;
  logout: () => void;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
}

const UserContext = createContext<UserContextType>({
  admin: null,
  loading: true,
  refreshAdmin: () => {},
  logout: () => {},
  setAdmin: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmin = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      setAdmin(res.data);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

   // ✅ Call this after login to update role instantly
  const refreshAdmin = () => {
    setLoading(true);
    fetchAdmin();
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setAdmin(null);
  };

  return (
    <UserContext.Provider value={{ admin, loading, refreshAdmin, logout, setAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
