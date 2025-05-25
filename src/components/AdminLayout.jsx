import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../config/api';

const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName');

  const menuItems = [
    {
      name: 'Confirmações',
      path: '/admin/confirmacoes',
      icon: '📋'
    },
    {
      name: 'Meu Perfil',
      path: '/admin/profile',
      icon: '👤'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Menu Mobile */}
      <div className="lg:hidden bg-gray-800 shadow-md p-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-rose-400 hover:text-rose-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu Lateral */}
      <div className={`lg:w-64 fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out bg-gray-800 shadow-lg z-30`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-rose-400">Painel Admin</h1>
            <p className="text-sm text-gray-400">Bem-vindo, {adminName}</p>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
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
              onClick={handleLogout}
              className="w-full flex items-center p-2 text-rose-400 hover:bg-rose-900 hover:text-white rounded-lg transition-colors duration-150"
            >
              <span className="mr-3">🚪</span>
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="lg:ml-64 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 