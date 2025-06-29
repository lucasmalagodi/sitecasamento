const API_URL = import.meta.env.PROD 
  ? 'https://paulaelucas.site/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api');

// Função para verificar se o token expirou
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Função para fazer logout e redirecionar
const handleLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminName');
  window.location.href = '/momozilla/login';
};

// Função para fazer requisições com tratamento de erro 401
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('adminToken');
  
  // Verifica se o token existe e não expirou
  if (!token || isTokenExpired(token)) {
    handleLogout();
    throw new Error('Token expirado ou inválido');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Se receber 401, faz logout automaticamente
  if (response.status === 401) {
    handleLogout();
    throw new Error('Sessão expirada. Por favor, faça login novamente.');
  }

  return response;
};

export const api = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/momozilla/login`, {
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
    const response = await makeAuthenticatedRequest(`${API_URL}/momozilla/profile`);
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar perfil');
    }

    return await response.json();
  },

  async updateProfile(profileData) {
    const response = await makeAuthenticatedRequest(`${API_URL}/momozilla/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao atualizar perfil');
    }

    return await response.json();
  },

  async register(name, email, password) {
    const response = await fetch(`${API_URL}/momozilla/register`, {
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
    const response = await makeAuthenticatedRequest(`${API_URL}/presenca`);
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar confirmações');
    }

    return (await response.json()).data;
  },

  async confirmarPresenca(id, confirmacao) {
    const response = await makeAuthenticatedRequest(`${API_URL}/presenca/${id}/confirmar`, {
      method: 'PUT',
      body: JSON.stringify({ confirmacao }),
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao confirmar presença');
    }

    return await response.json();
  },

  async excluirConfirmacao(id) {
    const response = await makeAuthenticatedRequest(`${API_URL}/presenca/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao excluir confirmação');
    }

    return await response.json();
  },

  async getConfirmacaoDetalhes(id) {
    const response = await makeAuthenticatedRequest(`${API_URL}/presenca/${id}`);
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar detalhes da confirmação');
    }

    return (await response.json()).data;
  },

  async atualizarConfirmacao(id, dados) {
    const response = await makeAuthenticatedRequest(`${API_URL}/presenca/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao atualizar confirmação');
    }

    return await response.json();
  },

  async getAdmins() {
    const response = await makeAuthenticatedRequest(`${API_URL}/momozilla/admins`);
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar usuários administradores');
    }

    const data = await response.json();
    return data.data || data;
  },

  async updateAdminStatus(id, active) {
    const response = await makeAuthenticatedRequest(`${API_URL}/momozilla/admins/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ active }),
    });
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao atualizar status do usuário');
    }
    return await response.json();
  },

  async deleteAdmin(id) {
    const response = await makeAuthenticatedRequest(`${API_URL}/momozilla/admins/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao excluir usuário');
    }
    return await response.json();
  },

  // Métodos para presentes
  async getPresentes() {
    const response = await makeAuthenticatedRequest(`${API_URL}/gifts`);
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao buscar presentes');
    }

    return await response.json();
  },

  async excluirPresente(id) {
    const response = await makeAuthenticatedRequest(`${API_URL}/gifts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(await response.json().then(data => data.error) || 'Erro ao excluir presente');
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
  window.location.href = '/momozilla/login';
}; 