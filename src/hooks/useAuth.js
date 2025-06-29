import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Função para verificar se o token expirou
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Função para fazer logout
const handleLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminName');
  window.location.href = '/momozilla/login';
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token || isTokenExpired(token)) {
        if (token && isTokenExpired(token) && isAuthenticated) {
          // Mostrar modal apenas se estava autenticado antes
          setShowSessionExpiredModal(true);
        } else {
          handleLogout();
        }
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Verificar autenticação imediatamente
    checkAuth();

    // Verificar a cada 5 minutos
    const interval = setInterval(checkAuth, 5 * 60 * 1000);

    // Verificar quando a janela ganha foco
    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [navigate, isAuthenticated]);

  const logout = () => {
    handleLogout();
  };

  const handleSessionExpiredClose = () => {
    setShowSessionExpiredModal(false);
    handleLogout();
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    showSessionExpiredModal,
    handleSessionExpiredClose
  };
}; 