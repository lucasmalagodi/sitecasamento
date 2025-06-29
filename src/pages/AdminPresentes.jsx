import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EnvelopeIcon, GiftIcon, UserIcon, CalendarIcon, CurrencyDollarIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline';
import { api } from '../config/api';

const AdminPresentes = () => {
  const [presentes, setPresentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalValor, setTotalValor] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [presenteToDelete, setPresenteToDelete] = useState(null);

  useEffect(() => {
    carregarPresentes();
  }, []);

  const carregarPresentes = async () => {
    try {
      setLoading(true);
      const data = await api.getPresentes();
      setPresentes(data);
      
      // Calcular o valor total
      const total = data.reduce((acc, presente) => acc + Number(presente.value), 0);
      setTotalValor(total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data) => {
    return format(new Date(data), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };

  const handleOpenModal = (message) => {
    setSelectedMessage(message || 'Nenhuma mensagem');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMessage('');
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedAndFilteredPresentes = () => {
    let filteredPresentes = [...presentes];
    
    // Aplicar filtro
    if (searchTerm) {
      filteredPresentes = filteredPresentes.filter(presente =>
        presente.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        presente.giftName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar ordenação
    if (sortConfig.key) {
      filteredPresentes.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredPresentes;
  };

  const handleDeleteClick = (presente) => {
    setPresenteToDelete(presente);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.excluirPresente(presenteToDelete.id);

      // Atualizar a lista de presentes
      setPresentes(presentes.filter(p => p.id !== presenteToDelete.id));
      
      // Recalcular o valor total
      const newTotal = presentes
        .filter(p => p.id !== presenteToDelete.id)
        .reduce((acc, presente) => acc + Number(presente.value), 0);
      setTotalValor(newTotal);

      // Fechar o modal
      setDeleteModalOpen(false);
      setPresenteToDelete(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPresenteToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-2">Erro ao carregar presentes</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
            <GiftIcon className="h-6 w-6" />
            Lista de Presentes
          </h1>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Recebido</p>
            <p className="text-2xl font-bold text-rose-400 flex items-center gap-2">
              <CurrencyDollarIcon className="h-6 w-6" />
              {formatarValor(totalValor)}
            </p>
          </div>
        </div>
      </div>

      {/* Campo de Busca */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
          placeholder="Buscar por nome do convidado ou presente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-rose-400">Mensagem</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-200 whitespace-pre-wrap">{selectedMessage}</p>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-rose-400">Confirmar Exclusão</h3>
              <button
                onClick={handleCancelDelete}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-200 mb-4">
              Tem certeza que deseja excluir o presente de {presenteToDelete?.guestName}?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-150"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors duration-150"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                  onClick={() => handleSort('guestName')}
                >
                  <div className="flex items-center gap-2">
                    Convidado
                    {sortConfig.key === 'guestName' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                  onClick={() => handleSort('giftName')}
                >
                  <div className="flex items-center gap-2">
                    Presente
                    {sortConfig.key === 'giftName' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center gap-2">
                    Valor
                    {sortConfig.key === 'value' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Mensagem
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    Data
                    {sortConfig.key === 'createdAt' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {getSortedAndFilteredPresentes().map((presente) => (
                <tr key={presente.id} className="hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-200">
                      {presente.guestName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">
                      {presente.giftName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">
                      {formatarValor(presente.value)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOpenModal(presente.message)}
                      className="text-rose-400 hover:text-rose-300 transition-colors duration-150 cursor-pointer"
                      title="Ver mensagem"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {formatarData(presente.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      
                      <button
                        onClick={() => handleDeleteClick(presente)}
                        className="text-rose-400 hover:text-rose-300 transition-colors duration-150 cursor-pointer"
                        title="Excluir presente"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getSortedAndFilteredPresentes().length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">
              {searchTerm ? 'Nenhum resultado encontrado para sua busca.' : 'Nenhum presente registrado ainda.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPresentes; 