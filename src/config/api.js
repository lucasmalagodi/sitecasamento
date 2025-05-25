const API_URL = import.meta.env.PROD 
  ? 'https://paulaelucas.site/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api');

export const api = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao fazer login');
    }

    return await response.json();
  },

  async getProfile() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/admin/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar perfil');
    }

    return await response.json();
  },

  async updateProfile(profileData) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao atualizar perfil');
    }

    return await response.json();
  },

  async register(name, email, password) {
    const response = await fetch(`${API_URL}/admin/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao registrar');
    }

    return await response.json();
  },

  // Métodos para confirmações
  async getConfirmacoes() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/presenca`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar confirmações');
    }

    return (await response.json()).data;
  },

  async confirmarPresenca(id, confirmacao) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/presenca/${id}/confirmar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ confirmacao: confirmacao ? 1 : 0 }),
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao confirmar presença');
    }

    return await response.json();
  },

  async excluirConfirmacao(id) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/presenca/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao excluir confirmação');
    }

    return await response.json();
  },

  async getConfirmacaoDetalhes(id) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/presenca/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar detalhes da confirmação');
    }

    return (await response.json()).data;
  },

  async getAdmins() {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/admin/admins`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar usuários administradores');
    }

    // Verificando se data.data existe, se não, retorna o próprio data
    const result = (await response.json()).data || await response.json();
    return result;
  },

  async updateAdminStatus(id, active) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }
    const response = await fetch(`${API_URL}/admin/admins/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ active }),
    });
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao atualizar status do usuário');
    }
    return await response.json();
  },

  async deleteAdmin(id) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }
    const response = await fetch(`${API_URL}/admin/admins/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao excluir usuário');
    }
    return await response.json();
  },
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminName');
  window.location.href = '/admin/login';
}; 