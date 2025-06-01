import { useState, useEffect } from 'react';
import { api } from '../config/api';
import DataGrid from '../components/DataGrid';
import { UserGroupIcon, EyeIcon, TrashIcon, LockClosedIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const AdminConfirmacoes = () => {
  const [confirmacoes, setConfirmacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedConfirmacao, setSelectedConfirmacao] = useState(null);
  const [confirmacaoParaExcluir, setConfirmacaoParaExcluir] = useState(null);
  const [totalConfirmados, setTotalConfirmados] = useState(0);
  const [totalCancelados, setTotalCancelados] = useState(0);

  useEffect(() => {
    loadConfirmacoes();
  }, []);

  const loadConfirmacoes = async () => {
    try {
      setLoading(true);
      const data = await api.getConfirmacoes();
      const dadosOrdenados = data.sort((a, b) => 
        new Date(b.dataConfirmacao) - new Date(a.dataConfirmacao)
      );
      setConfirmacoes(dadosOrdenados);

      // Calcular totais incluindo acompanhantes
      const confirmados = data.reduce((total, c) => {
        if (c.confirmacao === 1) {
          return total + 1 + (c.acompanhantes || 0);
        }
        return total;
      }, 0);

      const cancelados = data.reduce((total, c) => {
        if (c.confirmacao === 0) {
          return total + 1 + (c.acompanhantes || 0);
        }
        return total;
      }, 0);

      setTotalConfirmados(confirmados);
      setTotalCancelados(cancelados);
    } catch (err) {
      setError('Erro ao carregar confirmações');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (confirmacao) => {
    setSelectedConfirmacao(confirmacao);
  };

  const handleCancelarConfirmacao = async (id) => {
    try {
      const confirmacao = confirmacoes.find(c => c.id === id);
      const novoStatus = confirmacao.confirmacao === 1 ? 0 : 1;
      await api.confirmarPresenca(id, novoStatus);
      await loadConfirmacoes();
    } catch (err) {
      setError('Erro ao alterar confirmação');
    }
  };

  const handleExcluirConfirmacao = async (id) => {
    try {
      await api.excluirConfirmacao(id);
      await loadConfirmacoes();
      setConfirmacaoParaExcluir(null);
    } catch (err) {
      setError('Erro ao excluir confirmação');
    }
  };

  const handleAction = (type, row) => {
    switch (type) {
      case 'view':
        handleViewDetails(row);
        break;
      case 'toggle':
        handleCancelarConfirmacao(row.id);
        break;
      case 'delete':
        setConfirmacaoParaExcluir(row);
        break;
      default:
        break;
    }
  };

  const columns = [
    { field: 'nome', headerName: 'Nome' },
    { field: 'email', headerName: 'Email' },
    { field: 'celular', headerName: 'Celular' },
    { 
      field: 'dataConfirmacao', 
      headerName: 'Data de Confirmação',
      renderCell: (row) => (
        <div className="text-sm text-gray-300">
          {new Date(row.dataConfirmacao).toLocaleDateString()}
        </div>
      )
    },
    {
      field: 'confirmacao',
      headerName: 'Status',
      renderCell: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.confirmacao === 1
            ? 'bg-green-500 text-white'
            : 'bg-rose-500 text-white'
        }`}>
          {row.confirmacao === 1 ? 'Confirmado' : 'Cancelado'}
        </span>
      )
    }
  ];

  const actions = [
    {
      type: 'toggle',
      icon: <LockClosedIcon className="h-5 w-5" />,
      title: 'Alterar status',
      className: (row) => `p-2 rounded-full transition-colors duration-150 ${
        row.confirmacao === 1
          ? 'bg-rose-500 text-white hover:bg-rose-600 cursor-pointer'
          : 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
      }`
    },
    {
      type: 'view',
      icon: <EyeIcon className="h-5 w-5" />,
      title: 'Ver detalhes',
      className: 'p-2 rounded-full bg-gray-700 text-rose-300 hover:bg-rose-800 hover:text-white transition-colors duration-150 cursor-pointer'
    },
    {
      type: 'delete',
      icon: <TrashIcon className="h-5 w-5" />,
      title: 'Excluir confirmação',
      className: 'p-2 rounded-full bg-gray-700 text-red-400 hover:bg-red-900 hover:text-white transition-colors duration-150 cursor-pointer'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-rose-300 flex items-center gap-2">
          <UserGroupIcon className="h-6 w-6" />
          Confirmações
        </h1>
        <p className="text-gray-300">Gerencie as confirmações de presença</p>
      </div>

      {/* Contadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Total Confirmados</p>
              <p className="text-2xl font-bold text-green-400 flex items-center gap-2">
                <CheckCircleIcon className="h-6 w-6" />
                {totalConfirmados}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Total Cancelados</p>
              <p className="text-2xl font-bold text-rose-400 flex items-center gap-2">
                <XCircleIcon className="h-6 w-6" />
                {totalCancelados}
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-900 border border-rose-400 text-rose-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <DataGrid
          columns={columns}
          data={confirmacoes}
          onAction={handleAction}
          actions={actions}
          defaultSort={{ column: 'dataConfirmacao', direction: 'desc' }}
          filterField="nome"
          filterPlaceholder="Filtrar por nome..."
        />
      </div>

      {/* Modal de Detalhes */}
      {selectedConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-4 sm:p-6 max-w-lg w-full border border-rose-900 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-rose-300">Detalhes da Confirmação</h2>
              <button
                onClick={() => setSelectedConfirmacao(null)}
                className="text-gray-400 hover:text-rose-400 cursor-pointer"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-rose-200">Nome</label>
                <p className="mt-1 text-gray-100 break-words">{selectedConfirmacao.nome}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-200">Email</label>
                <p className="mt-1 text-gray-100 break-words">{selectedConfirmacao.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-200">Celular</label>
                <p className="mt-1 text-gray-100 break-words">{selectedConfirmacao.celular}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-200">Data de Confirmação</label>
                <p className="mt-1 text-gray-100">
                  {new Date(selectedConfirmacao.dataConfirmacao).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-200">Status</label>
                <p className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedConfirmacao.confirmacao === 1
                      ? 'bg-green-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}>
                    {selectedConfirmacao.confirmacao === 1 ? 'Confirmado' : 'Cancelado'}
                  </span>
                </p>
              </div>
              {selectedConfirmacao.acompanhantes > 0 && (
                <div>
                  <label className="block text-sm font-medium text-rose-200">Acompanhantes</label>
                  <p className="mt-1 text-gray-100">
                    {selectedConfirmacao.acompanhantes} pessoa(s)
                    {selectedConfirmacao.nomesAcompanhantes.length > 0 && (
                      <ul className="mt-2 list-disc list-inside">
                        {selectedConfirmacao.nomesAcompanhantes.map((nome, index) => (
                          <li key={index} className="text-sm text-gray-300 break-words">{nome}</li>
                        ))}
                      </ul>
                    )}
                  </p>
                </div>
              )}
              {selectedConfirmacao.mensagem && (
                <div>
                  <label className="block text-sm font-medium text-rose-200">Mensagem</label>
                  <p className="mt-1 text-sm text-gray-300 break-words">{selectedConfirmacao.mensagem}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {confirmacaoParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-4 sm:p-6 max-w-md w-full border border-rose-900 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-rose-300">Confirmar Exclusão</h2>
              <button
                onClick={() => setConfirmacaoParaExcluir(null)}
                className="text-gray-400 hover:text-rose-400 cursor-pointer"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-6 break-words">
              Tem certeza que deseja excluir a confirmação de <strong className="text-rose-300">{confirmacaoParaExcluir.nome}</strong>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setConfirmacaoParaExcluir(null)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-150 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleExcluirConfirmacao(confirmacaoParaExcluir.id)}
                className="w-full sm:w-auto px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors duration-150 cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConfirmacoes; 