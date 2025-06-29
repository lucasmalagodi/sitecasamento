# Sistema de Sessão do Admin

## Funcionalidades Implementadas

### 1. Verificação Automática de Token
- O sistema verifica automaticamente se o token JWT expirou
- Verificação a cada 5 minutos
- Verificação quando a janela ganha foco
- Verificação antes de cada requisição à API

### 2. Redirecionamento Automático
- Quando o token expira, o usuário é automaticamente redirecionado para `/momozilla/login`
- Limpeza automática do localStorage (adminToken e adminName)

### 3. Modal de Sessão Expirada
- Modal informativo quando a sessão expira
- Countdown de 5 segundos antes do redirecionamento
- Opção de fazer login imediatamente

### 4. Interceptor de Requisições
- Todas as requisições à API passam pelo interceptor
- Detecção automática de erros 401 (não autorizado)
- Logout automático em caso de token inválido

## Arquivos Modificados

### Frontend
- `src/config/api.js` - Interceptor de requisições e verificação de token
- `src/components/ProtectedRoute.jsx` - Verificação de token nas rotas protegidas
- `src/components/AdminLayout.jsx` - Hook de autenticação e modal de sessão
- `src/hooks/useAuth.js` - Hook personalizado para gerenciar autenticação
- `src/components/SessionExpiredModal.jsx` - Modal de sessão expirada
- `src/pages/AdminPresentes.jsx` - Atualizado para usar API configurada

### Backend
- `api/src/routes/giftRoutes.js` - Adicionada autenticação nas rotas de presentes

## Como Funciona

### 1. Login
```javascript
// Quando o usuário faz login
const data = await api.login(email, password);
localStorage.setItem('adminToken', data.token);
localStorage.setItem('adminName', data.admin.name);
```

### 2. Verificação de Token
```javascript
// Função que verifica se o token expirou
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
```

### 3. Interceptor de Requisições
```javascript
// Todas as requisições passam por esta função
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
```

### 4. Hook de Autenticação
```javascript
// Hook que gerencia o estado de autenticação
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);

  // Verifica autenticação periodicamente
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token || isTokenExpired(token)) {
        if (token && isTokenExpired(token) && isAuthenticated) {
          setShowSessionExpiredModal(true);
        } else {
          handleLogout();
        }
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    isLoading,
    logout,
    showSessionExpiredModal,
    handleSessionExpiredClose
  };
};
```

## Teste da Funcionalidade

Para testar se a funcionalidade está funcionando:

1. Faça login no admin
2. Abra o console do navegador
3. Execute o script `test-session.js` para verificar o status do token
4. Aguarde 24 horas ou modifique o token para simular expiração
5. Verifique se o redirecionamento acontece automaticamente

## Configuração do Token

O token JWT é configurado para expirar em 24 horas no backend:

```javascript
// api/src/middlewares/auth.js
const generateToken = (admin) => {
  return jwt.sign({ id: admin.id }, JWT_SECRET, {
    expiresIn: '24h' // 24 horas
  });
};
```

## Benefícios

1. **Segurança**: Usuários não ficam logados indefinidamente
2. **UX**: Feedback claro quando a sessão expira
3. **Automatização**: Não requer ação manual do usuário
4. **Consistência**: Todas as requisições são verificadas
5. **Performance**: Verificação eficiente sem impacto na performance 