import { useState, useEffect } from 'react';
import { api } from '../config/api';

const AdminConfirmacoes = () => {
  const [confirmacoes, setConfirmacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedConfirmacao, setSelectedConfirmacao] = useState(null);
  const [confirmacaoParaExcluir, setConfirmacaoParaExcluir] = useState(null);

  useEffect(() => {
    loadConfirmacoes();
  }, []);

  const loadConfirmacoes = async () => {
    try {
      setLoading(true);
      const data = await api.getConfirmacoes();
      setConfirmacoes(data);
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
      await api.confirmarPresenca(id);
      await loadConfirmacoes();
    } catch (err) {
      setError('Erro ao cancelar confirmação');
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
        <h1 className="text-2xl font-bold text-rose-300">Confirmações</h1>
        <p className="text-gray-300">Gerencie as confirmações de presença</p>
      </div>

      {error && (
        <div className="bg-rose-900 border border-rose-400 text-rose-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider">
                  Celular
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider">
                  Data de Confirmação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {confirmacoes.map((confirmacao) => (
                <tr key={confirmacao.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-100">
                      {confirmacao.nome}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{confirmacao.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{confirmacao.celular}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {new Date(confirmacao.dataConfirmacao).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      confirmacao.confirmacao === 1
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {confirmacao.confirmacao === 1 ? 'Confirmado' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancelarConfirmacao(confirmacao.id)}
                        className={`p-2 rounded-full transition-colors duration-150 ${
                          confirmacao.confirmacao === 1
                            ? 'bg-rose-900 text-rose-300 hover:bg-rose-700'
                            : 'bg-gray-700 text-gray-200 hover:bg-rose-800 hover:text-white'
                        }`}
                        title={confirmacao.confirmacao === 1 ? 'Cancelar confirmação' : 'Confirmar presença'}
                      >
                        🔒
                      </button>
                      <button
                        onClick={() => handleViewDetails(confirmacao)}
                        className="p-2 rounded-full bg-gray-700 text-rose-300 hover:bg-rose-800 hover:text-white transition-colors duration-150"
                        title="Ver detalhes"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => setConfirmacaoParaExcluir(confirmacao)}
                        className="p-2 rounded-full bg-gray-700 text-red-400 hover:bg-red-900 hover:text-white transition-colors duration-150"
                        title="Excluir confirmação"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-lg w-full border border-rose-900 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-rose-300">Detalhes da Confirmação</h2>
              <button
                onClick={() => setSelectedConfirmacao(null)}
                className="text-gray-400 hover:text-rose-400"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-rose-200">Nome</label>
                <p className="mt-1 text-gray-100">{selectedConfirmacao.nome}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-200">Email</label>
                <p className="mt-1 text-gray-100">{selectedConfirmacao.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-200">Celular</label>
                <p className="mt-1 text-gray-100">{selectedConfirmacao.celular}</p>
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
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-700 text-gray-300'
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
                          <li key={index} className="text-sm text-gray-300">{nome}</li>
                        ))}
                      </ul>
                    )}
                  </p>
                </div>
              )}
              {selectedConfirmacao.mensagem && (
                <div>
                  <label className="block text-sm font-medium text-rose-200">Mensagem</label>
                  <p className="mt-1 text-sm text-gray-300">{selectedConfirmacao.mensagem}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {confirmacaoParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-rose-900 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-rose-300">Confirmar Exclusão</h2>
              <button
                onClick={() => setConfirmacaoParaExcluir(null)}
                className="text-gray-400 hover:text-rose-400"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir a confirmação de <strong className="text-rose-300">{confirmacaoParaExcluir.nome}</strong>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmacaoParaExcluir(null)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-150"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleExcluirConfirmacao(confirmacaoParaExcluir.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-150"
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