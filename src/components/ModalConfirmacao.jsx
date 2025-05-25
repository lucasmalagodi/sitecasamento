import PropTypes from "prop-types";

const ModalConfirmacao = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-4xl w-full">
        <img
          src="https://i.gifer.com/ePO.gif"
          alt="Confirmação"
          className="w-full rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-4">
          Confirmação Registrada! 🎉
        </h2>
        <p className="text-base text-gray-600 font-[var(--font-chillax-Extralight)] mb-6">
          Obrigado por confirmar sua presença! 
          <br/><br/>
          Que a Força esteja com você! ✨
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-[var(--purple)] text-white rounded-lg hover:bg-[var(--purple)]/80 transition-colors duration-300"
        >
          Continuar Explorando
        </button>
      </div>
    </div>
  );
};

ModalConfirmacao.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalConfirmacao; 