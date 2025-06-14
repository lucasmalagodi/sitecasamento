import PropTypes from 'prop-types';
import { useState } from 'react';
import PixQrCode from './PixQrCode';
import useScrollLock from '../hooks/useScrollLock';

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://paulaelucas.site/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api');

const ModalPresente = ({ isOpen, onClose, presente, onSubmit }) => {
  const [valorFormatado, setValorFormatado] = useState('');
  const [mostrarQRCode, setMostrarQRCode] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState(null);
  const [erro, setErro] = useState(null);
  const [mostrarAgradecimento, setMostrarAgradecimento] = useState(false);

  useScrollLock(isOpen);

  if (!isOpen) return null;

  const formatarMoeda = (valor) => {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Converte para centavos
    const valorEmCentavos = apenasNumeros.padStart(3, '0');
    const reais = valorEmCentavos.slice(0, -2);
    const centavos = valorEmCentavos.slice(-2);
    
    // Formata o valor
    const valorFormatado = Number(reais).toLocaleString('pt-BR') + ',' + centavos;
    
    return valorFormatado;
  };

  const handleValorChange = (e) => {
    const valor = e.target.value;
    const valorFormatado = formatarMoeda(valor);
    setValorFormatado(valorFormatado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get('nome'),
      valor: valorFormatado,
      mensagem: formData.get('mensagem'),
      presente: presente.title
    };
    setDadosFormulario(data);
    setMostrarQRCode(true);
  };

  const handleConfirmarPagamento = async () => {
    try {
      setErro(null);
      setPagamentoConfirmado(true);

      // Converter o valor formatado para número
      const valorNumerico = parseFloat(dadosFormulario.valor.replace('.', '').replace(',', '.'));

      // Preparar os dados para enviar ao backend
      const dadosParaEnviar = {
        guestName: dadosFormulario.nome,
        giftName: dadosFormulario.presente,
        value: valorNumerico,
        message: dadosFormulario.mensagem || ''
      };

      // Enviar para o backend
      const response = await fetch(`${API_BASE_URL}/gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o presente');
      }

      // Mostrar tela de agradecimento
      setMostrarAgradecimento(true);
    } catch (error) {
      setErro(error.message);
      setPagamentoConfirmado(false);
    }
  };

  const handleFechar = () => {
    onSubmit(dadosFormulario);
    onClose();
    setMostrarQRCode(false);
    setPagamentoConfirmado(false);
    setDadosFormulario(null);
    setMostrarAgradecimento(false);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 pt-8 relative animate-fade-in shadow-2xl my-4 max-h-[90vh] overflow-y-auto">
        {/* Botão de fechar */}
        <button
          onClick={handleFechar}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!mostrarQRCode ? (
          <>
            {/* Conteúdo do Modal */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-[var(--font-bitter-rose)] text-[var(--green)] mb-2 cursor-pointer">
                Comprar presente
              </h2>
              <p className="text-gray-600 font-[var(--font-chillax-Extralight)]">
                {presente.title}
              </p>
            </div>

            {/* Imagem do Presente */}
            <div className="mb-6">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-[var(--white-100)]">
                {presente.image ? (
                  <img
                    src={presente.image}
                    alt={presente.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Imagem não disponível
                  </div>
                )}
              </div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Seu nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--green)] focus:border-transparent"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">
                  Valor do presente
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-gray-500">R$</span>
                  <input
                    type="text"
                    id="valor"
                    name="valor"
                    required
                    value={valorFormatado}
                    onChange={handleValorChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--green)] focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem (opcional)
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--green)] focus:border-transparent"
                  placeholder="Deixe uma mensagem para os noivos..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--green)] text-white py-3 rounded-lg font-medium hover:bg-[var(--green-100)] transition-colors duration-300 cursor-pointer"
              >
                Gerar QR Code
              </button>
            </form>
          </>
        ) : mostrarAgradecimento ? (
          <div className="text-center py-8">
            <div className="mb-6">
              <img
                src="https://i.gifer.com/NdR.gif"
                alt="Agradecimento"
                className="w-64 h-64 mx-auto mb-4"
              />
            </div>
            <h2 className="text-2xl font-[var(--font-bitter-rose)] text-[var(--green)] mb-4">
              Muito Obrigado!
            </h2>
            <p className="text-gray-600 mb-6">
              Agradecemos imensamente pelo seu presente e carinho.
            </p>
            <button
              onClick={handleFechar}
              className="w-full bg-[var(--green)] text-white py-3 rounded-lg font-medium hover:bg-[var(--green-100)] transition-colors duration-300 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <h2 className="text-2xl font-[var(--font-bitter-rose)] text-[var(--green)] mb-4">
              Pagamento via PIX
            </h2>
            
            {/* Componente QR Code */}
            <div className="mb-6 mt-4 flex justify-center">
              <PixQrCode
                valor={dadosFormulario.valor}
                nome={dadosFormulario.nome}
                mensagem={dadosFormulario.mensagem}
              />
            </div>

            {erro && (
              <div className="text-red-500 mb-4">
                {erro}
              </div>
            )}

            {/* Botão de Confirmação */}
            <button
              onClick={handleConfirmarPagamento}
              disabled={pagamentoConfirmado}
              className={`w-full py-3 rounded-lg font-medium transition-colors duration-300 cursor-pointer ${
                pagamentoConfirmado
                  ? 'bg-green-500 text-white'
                  : 'bg-[var(--green)] text-white hover:bg-[var(--green-100)]'
              }`}
            >
              {pagamentoConfirmado ? 'Pagamento Confirmado!' : 'Confirmar Pagamento'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ModalPresente.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  presente: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ModalPresente; 