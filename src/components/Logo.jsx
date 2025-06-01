import PropTypes from "prop-types";
const Logo = ({ positivo }) => {
  return (
    <div className={`text-3xl ${positivo ? "text-[var(--green)]" : "text-[var(--white-100)]"}`}>
      <img 
        src={positivo ? "/assets/L-e-P.png" : "/assets/L-e-P-Negativo.png"} 
        alt="Logo Lucas e Paula"
        className="h-[80px] md:h-[100px] mx-auto"
      />
    </div>
  );
};

// Definindo a validação das props
Logo.propTypes = {
  positivo: PropTypes.bool.isRequired, // Garantindo que 'positivo' seja um booleano obrigatório
};


export default Logo;