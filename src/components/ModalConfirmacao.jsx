import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ModalConfirmacao = ({ isOpen, onClose, resposta }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleListaClick = () => {
    navigate('/lista');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-4xl w-full">
        <img
          src={resposta === "1"
            ? "https://i.gifer.com/ePO.gif"
            : "https://i.gifer.com/jR.gif"}
          alt="Confirmação"
          className="w-full rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-4">
          {resposta === "1" 
            ? "Confirmação Registrada! 🎉"
            : "Que pena! 😢"}
        </h2>
        <p className="text-base text-gray-600 font-[var(--font-chillax-Extralight)] mb-6">
          {resposta === "1" 
            ? "Obrigado por confirmar sua presença! \n\n Que a Força esteja com você! ✨"
            : "Esperamos que você mude de ideia! \n\n A Força ainda está com você! ✨"}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[var(--purple)] text-white rounded-lg hover:bg-[var(--purple)]/80 transition-colors duration-300 cursor-pointer"
          >
            Continuar Explorando
          </button>
          {resposta === "0" && (
            <button
              onClick={handleListaClick}
              className="px-8 py-3 bg-[var(--purple)] text-white rounded-lg hover:bg-[var(--purple)]/80 transition-colors duration-300 cursor-pointer"
            >
              Ver Lista de Presentes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ModalConfirmacao.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resposta: PropTypes.oneOf(["0", "1"]).isRequired,
};

export default ModalConfirmacao; 