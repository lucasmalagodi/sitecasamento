import { useState, useEffect } from 'react';
import { api } from '../config/api';
import { UserCircleIcon, KeyIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const AdminPerfil = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      setLoading(true);
      const data = await api.getProfile();
      setNome(data.name);
      setEmail(data.email);
      localStorage.setItem('adminName', data.name);
    } catch (err) {
      setError('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (novaSenha && novaSenha !== confirmarNovaSenha) {
      setError('Nova senha e confirmação não coincidem.');
      return;
    }
    try {
      setLoading(true);
      await api.updateProfile({
        nome,
        email,
        senhaAtual,
        novaSenha: novaSenha || undefined,
      });
      setSuccess('Perfil atualizado com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarNovaSenha('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold text-rose-300 mb-6 flex items-center gap-2">
        <UserCircleIcon className="h-6 w-6" />
        Meu Perfil
      </h1>
      {error && (
        <div className="bg-rose-900 border border-rose-400 text-rose-200 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <XCircleIcon className="h-5 w-5" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-900 border border-emerald-400 text-emerald-200 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5" />
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-rose-200">Nome</label>
          <input
            type="text"
            className="mt-1 block w-full h-13 px-4 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:border-rose-400 focus:ring-rose-400"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-200">Email</label>
          <input
            type="email"
            className="mt-1 block w-full h-13 px-4 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:border-rose-400 focus:ring-rose-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-200">Senha atual</label>
          <input
            type="password"
            className="mt-1 block w-full h-13 px-4 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:border-rose-400 focus:ring-rose-400"
            value={senhaAtual}
            onChange={e => setSenhaAtual(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-200">Nova senha</label>
          <input
            type="password"
            className="mt-1 block w-full h-13 px-4 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:border-rose-400 focus:ring-rose-400"
            value={novaSenha}
            onChange={e => setNovaSenha(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-200">Confirmar nova senha</label>
          <input
            type="password"
            className="mt-1 block w-full h-13 px-4 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:border-rose-400 focus:ring-rose-400"
            value={confirmarNovaSenha}
            onChange={e => setConfirmarNovaSenha(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-md transition-colors duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <KeyIcon className="h-5 w-5" />
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
};

export default AdminPerfil; 