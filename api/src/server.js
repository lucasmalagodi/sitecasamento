const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');

const presencaRoutes = require('./routes/presencaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});
app.use(limiter);

// Rotas
app.use('/api/presenca', presencaRoutes);
app.use('/api/admin', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API!' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 3000) : 3001;

// Iniciar servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
}); 