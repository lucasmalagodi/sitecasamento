import { useState, useEffect } from 'react';
import { api } from '../config/api';
import DataGrid from '../components/DataGrid';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const adminId = Number(localStorage.getItem('adminId'));

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await api.getAdmins();
      
      // Garantindo que data seja um array
      let usuariosArray = [];
      if (Array.isArray(data)) {
        usuariosArray = data;
      } else if (data && typeof data === 'object') {
        // Se for um objeto único, converte para array
        usuariosArray = [data];
      }
      
      setUsuarios(usuariosArray);
    } catch (err) {
      setError('Erro ao carregar usuários');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      await api.register(form.name, form.email, form.password);
      setShowForm(false);
      setForm({ name: '', email: '', password: '' });
      await loadUsuarios();
    } catch (err) {
      setFormError(err.message || 'Erro ao registrar usuário');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (usuario) => {
    setStatusLoadingId(usuario.id);
    try {
      await api.updateAdminStatus(usuario.id, !usuario.active);
      await loadUsuarios();
    } catch (err) {
      setError(err.message || 'Erro ao atualizar status');
    } finally {
      setStatusLoadingId(null);
    }
  };

  const handleDeleteUser = async (usuario) => {
    setDeleteUser(usuario);
  };

  const confirmDeleteUser = async () => {
    if (!deleteUser) return;
    try {
      await api.deleteAdmin(deleteUser.id);
      setDeleteUser(null);
      await loadUsuarios();
    } catch (err) {
      setError(err.message || 'Erro ao excluir usuário');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Nome' },
    { field: 'email', headerName: 'Email' },
    { 
      field: 'active', 
      headerName: 'Status',
      renderCell: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
            row.active
              ? 'bg-green-500 text-white'
              : 'bg-rose-500 text-white'
          } ${statusLoadingId === row.id ? 'opacity-60 pointer-events-none' : ''}`}
          title="Clique para alternar o status"
          onClick={() => handleToggleStatus(row)}
        >
          {statusLoadingId === row.id ? (
            <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : null}
          {row.active ? 'Ativo' : 'Inativo'}
        </span>
      )
    },
    { 
      field: 'createdAt', 
      headerName: 'Data de Criação',
      renderCell: (row) => (
        <div className="text-sm text-gray-300">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
        </div>
      )
    },
    { 
      field: 'updatedAt', 
      headerName: 'Última Atualização',
      renderCell: (row) => (
        <div className="text-sm text-gray-300">
          {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : '-'}
        </div>
      )
    },
    {
      field: 'actions',
      headerName: '',
      renderCell: (row) => (
        row.id !== adminId && (
          <button
            className="ml-2 text-red-400 hover:text-red-700 cursor-pointer"
            title="Excluir usuário"
            onClick={() => handleDeleteUser(row)}
          >
            <span role="img" aria-label="Excluir">🗑️</span>
          </button>
        )
      )
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
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-rose-300">Usuários Administradores</h1>
          <p className="text-gray-300">Gerencie os usuários com acesso administrativo</p>
        </div>
        <button
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded shadow cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          Novo Usuário
        </button>
      </div>

      {/* Modal de Novo Usuário */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 border border-gray-700 rounded p-6 w-full max-w-md relative shadow-lg animate-fade-in">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-rose-400 text-2xl font-bold cursor-pointer"
              onClick={() => setShowForm(false)}
              disabled={formLoading}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-rose-300 mb-4">Novo Usuário</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Senha</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                  required
                />
              </div>
              {formError && <div className="text-rose-400 text-sm">{formError}</div>}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
                  onClick={() => setShowForm(false)}
                  disabled={formLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
                  disabled={formLoading}
                >
                  {formLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deleteUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-rose-900 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-rose-300">Confirmar Exclusão</h2>
              <button
                onClick={() => setDeleteUser(null)}
                className="text-gray-400 hover:text-rose-400 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir o usuário <strong className="text-rose-300">{deleteUser.name}</strong>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteUser(null)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-150 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-150 cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-rose-900 border border-rose-400 text-rose-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <DataGrid
        columns={columns}
        data={usuarios}
        defaultSort={{ column: 'name', direction: 'asc' }}
        filterField="name"
        filterPlaceholder="Filtrar por nome..."
      />
    </div>
  );
};

export default AdminUsuarios; 