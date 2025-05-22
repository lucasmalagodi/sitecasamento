#!/bin/bash

# Atualizar o sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependências necessárias
sudo apt install -y docker.io docker-compose

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Criar diretório para o projeto
mkdir -p ~/presenca
cd ~/presenca

# Criar arquivo .env para produção
cat > .env << EOL
# MySQL
MYSQL_ROOT_PASSWORD=sua_senha_root_segura
MYSQL_USER=presenca
MYSQL_PASSWORD=sua_senha_usuario_segura

# API
PORT=3000
NODE_ENV=production
EOL

# Criar diretório para os dados do MySQL
mkdir -p mysql/init

# Copiar arquivos do projeto
# (Você precisará copiar os arquivos do projeto para a VPS)

# Iniciar os containers
docker-compose -f docker-compose.prod.yml up -d

# Verificar status dos containers
docker ps

echo "Configuração concluída! Não se esqueça de:"
echo "1. Alterar as senhas no arquivo .env"
echo "2. Configurar o firewall (sudo ufw allow 3000)"
echo "3. Configurar o nginx como proxy reverso (recomendado)" 