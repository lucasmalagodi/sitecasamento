-- Criar o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS paulaelucas_mysql;

-- Criar o usuário e conceder permissões
CREATE USER IF NOT EXISTS 'onzip'@'%' IDENTIFIED BY '1q2w3e4r';
GRANT ALL PRIVILEGES ON paulaelucas_mysql.* TO 'onzip'@'%';
FLUSH PRIVILEGES;

-- Usar o banco de dados
USE paulaelucas_mysql;

-- Criar a tabela de presenças
CREATE TABLE IF NOT EXISTS presencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    confirmacao ENUM('sim', 'nao') NOT NULL,
    acompanhantes INT DEFAULT 0,
    nomesAcompanhantes TEXT,
    mensagem TEXT,
    dataConfirmacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 