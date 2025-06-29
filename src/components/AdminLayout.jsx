import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../config/api';
import { useAuth } from '../hooks/useAuth';
import SessionExpiredModal from './SessionExpiredModal';
import { 
  ClipboardDocumentListIcon, 
  GiftIcon, 
  UserGroupIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    isLoading, 
    logout: handleLogout,
    showSessionExpiredModal,
    handleSessionExpiredClose
  } = useAuth();
  const adminName = localStorage.getItem('adminName');

  // Fecha o menu quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/momozilla/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const menuItems = [
    {
      name: 'Confirmações',
      path: '/momozilla/confirmacoes',
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />
    },
    {
      name: 'Presentes',
      path: '/momozilla/presentes',
      icon: <GiftIcon className="h-5 w-5" />
    },
    {
      name: 'Usuários',
      path: '/momozilla/usuarios',
      icon: <UserGroupIcon className="h-5 w-5" />
    },
    {
      name: 'Meu Perfil',
      path: '/momozilla/profile',
      icon: <UserCircleIcon className="h-5 w-5" />
    }
  ];

  const handleLogoutClick = () => {
    handleLogout();
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Não renderizar nada se não estiver autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Modal de Sessão Expirada */}
      <SessionExpiredModal 
        isVisible={showSessionExpiredModal}
        onClose={handleSessionExpiredClose}
      />

      {/* Botão do Menu Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-gray-800 text-rose-300 rounded-md hover:bg-gray-700 transition-colors duration-150"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay para fechar menu no mobile */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`lg:w-64 fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out bg-gray-800 shadow-lg z-30`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-700 hidden lg:block">
            <h1 className="text-xl font-bold text-rose-400">Painel Admin</h1>
            <p className="text-sm text-gray-400">Bem-vindo, {adminName}</p>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-150 font-medium ${
                      location.pathname === item.path
                        ? 'bg-rose-500 text-white shadow'
                        : 'text-gray-200 hover:bg-gray-700 hover:text-rose-300'
                    }`}
                  >
                    <span className="mr-3 text-rose-300">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center p-2 text-rose-400 hover:bg-rose-900 hover:text-white rounded-lg transition-colors duration-150"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="lg:ml-64 p-4 lg:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 