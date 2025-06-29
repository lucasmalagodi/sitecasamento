import { useState, useEffect } from 'react';
import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const SessionExpiredModal = ({ isVisible, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isVisible && countdown === 0) {
      onClose();
    }
  }, [isVisible, countdown, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-rose-900 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-rose-400" />
          <h2 className="text-xl font-bold text-rose-300">Sessão Expirada</h2>
        </div>
        
        <p className="text-gray-300 mb-4">
          Sua sessão expirou por inatividade. Você será redirecionado para a página de login em <span className="font-bold text-rose-400">{countdown}</span> segundos.
        </p>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors duration-150"
          >
            Fazer Login Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal; 