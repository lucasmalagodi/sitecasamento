import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <img
          src="../assets/para-para-para.png" // Substitua pelo caminho real da sua imagem
          alt="Informação"
          className="w-full rounded-md"
        />
        <h2 className="text-lg font-bold mt-4 text-black">Olá Convidado especial</h2>
        <p className="text-sm text-gray-600 mt-2">
          Em um mundo onde duas almas se encontram… Em uma jornada repleta de emoção, comida boa e música incrível… Você está prestes a viver um evento único. 
          <br/>
          <br/>
          Está pronto?
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-[var(--green)] text-white rounded-lg hover:bg-[var(--green-100)] transition"
        >
          Sim Capitão!!!
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;