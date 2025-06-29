import { Navigate } from 'react-router-dom';

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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const isAuthenticated = token && !isTokenExpired(token);

  if (!isAuthenticated) {
    // Limpa o localStorage se o token expirou
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminName');
    }
    return <Navigate to="/momozilla/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 