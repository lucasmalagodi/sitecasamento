import PropTypes from "prop-types";
const Logo = ({ positivo }) => {
  return (
    <div className={`text-3xl ${positivo ? "text-[var(--green)]" : "text-[var(--white-100)]"}`}>
      Paula & Lucas
    </div>
  );
};

// Definindo a validação das props
Logo.propTypes = {
  positivo: PropTypes.bool.isRequired, // Garantindo que 'positivo' seja um booleano obrigatório
};


export default Logo;