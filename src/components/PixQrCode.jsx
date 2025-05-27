import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';

const PixQrCode = ({ valor, nome, mensagem }) => {
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [error, setError] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Função para calcular o CRC16
  const calculateCRC16 = (str) => {
    const polynomial = 0x1021;
    let crc = 0xFFFF;
    
    for (let i = 0; i < str.length; i++) {
      crc ^= (str.charCodeAt(i) << 8);
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = ((crc << 1) ^ polynomial) & 0xFFFF;
        } else {
          crc = (crc << 1) & 0xFFFF;
        }
      }
    }
    
    return crc.toString(16).toUpperCase().padStart(4, '0');
  };

  const copiarPix = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeValue);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const gerarQRCode = () => {
    try {
      const chavePix = '5878c158-687d-4472-a62e-2857a4165440';
      const nomeRecebedor = 'Lucas Malagodi';
      const cidade = 'SAO PAULO';
      const txid = 'CasamentoPaulaLucas';
      const valorFormatado = valor.replace(/\./g, '').replace(',', '.');
  
      // Campos TLV
      const formatTLV = (id, value) =>
        id + value.length.toString().padStart(2, '0') + value;
  
      const merchantAccountInfo = 
        formatTLV('00', 'BR.GOV.BCB.PIX') + 
        formatTLV('01', chavePix);
  
      const additionalDataField = 
        formatTLV('05', txid);
  
      // Montagem do payload (sem CRC)
      let payload =
        formatTLV('00', '01') + // Payload format indicator
        formatTLV('26', merchantAccountInfo) +
        '52040000' + // Merchant category code (default)
        '5303986' + // Moeda: 986 = BRL
        formatTLV('54', valorFormatado) +
        '5802BR' +
        formatTLV('59', nomeRecebedor) +
        formatTLV('60', cidade) +
        formatTLV('62', additionalDataField);
  
      // Adiciona campo de CRC16
      payload += '6304';
      const crc = calculateCRC16(payload);
      const payloadCompleto = payload + crc;
  
      setQrCodeValue(payloadCompleto);
      setError(false);
    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
      setError(true);
      setQrCodeValue('');
    }
  };

  // Gera o QR Code automaticamente quando o componente é montado ou o valor muda
  useEffect(() => {
    if (valor && !error) {
      gerarQRCode();
    }
  }, [valor]);

  return (
    <div className="text-center">
      {error ? (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-inner">
          <div className="w-48 h-48 mx-auto bg-red-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-red-500">
              <div className="text-4xl mb-2">⚠️</div>
              <p className="text-sm">Erro ao gerar QR Code</p>
              <button 
                onClick={() => {
                  setError(false);
                  gerarQRCode();
                }}
                className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      ) : qrCodeValue ? (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-inner">
          <div className="w-48 h-48 mx-auto p-2 bg-white">
            <QRCode
              value={qrCodeValue}
              size={192}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
              level="M"
            />
          </div>
          
          {/* Código PIX e Botão de Copiar */}
          <div className="mt-4">
            <div className="mb-2 text-sm text-gray-600">
              <p className="font-medium mb-1">Código PIX:</p>
              <div className="bg-gray-50 p-2 rounded-lg break-all text-xs">
                {qrCodeValue}
              </div>
            </div>
            <button
              onClick={copiarPix}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
            >
              {copiado ? (
                <>
                  <span className="mr-2">✓</span>
                  Copiado!
                </>
              ) : (
                <>
                  <span className="mr-2">📋</span>
                  Copiar código PIX
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-inner">
          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm">Gerando QR Code...</p>
            </div>
          </div>
        </div>
      )}

      {/* Informações do Pagamento */}
      <div className="mb-6 text-gray-600">
        <p className="mb-2 font-medium">Detalhes do Pagamento:</p>
        <p className="mb-1">Valor: R$ {valor}</p>
        <p className="mb-1">De: {nome}</p>
        {mensagem && <p className="mb-1">Mensagem: {mensagem}</p>}
      </div>

      {/* Instruções */}
      <div className="mb-6 text-gray-600">
        <p className="mb-2">1. Abra o app do seu banco</p>
        <p className="mb-2">2. Escaneie o QR Code ou cole o código PIX</p>
        <p className="mb-2">3. Após o pagamento, clique em "Confirmar pagamento"</p>
      </div>
    </div>
  );
};

PixQrCode.propTypes = {
  valor: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  mensagem: PropTypes.string
};

export default PixQrCode; 