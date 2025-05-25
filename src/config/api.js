const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao fazer login');
    }

    return data;
  },

  async getProfile() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/api/admin/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao buscar perfil');
    }

    return data;
  },

  async updateProfile(profileData) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/api/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao atualizar perfil');
    }

    return data;
  },

  async register(name, email, password) {
    const response = await fetch(`${API_URL}/api/admin/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao registrar');
    }

    return data;
  },

  // Métodos para confirmações
  async getConfirmacoes() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/api/presenca`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao buscar confirmações');
    }

    return data.data;
  },

  async confirmarPresenca(id) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/api/presenca/${id}/confirmar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao confirmar presença');
    }

    return data;
  },

  async excluirConfirmacao(id) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/api/presenca/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao excluir confirmação');
    }

    return data;
  },

  async getConfirmacaoDetalhes(id) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Não autorizado');
    }

    const response = await fetch(`${API_URL}/api/presenca/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao buscar detalhes da confirmação');
    }

    return data.data;
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