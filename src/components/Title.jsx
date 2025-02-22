import PropTypes from "prop-types";
const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h2 className="text-[var(--purple)] text-6xl md:text-7xl font-bitter-rose">
        {title}
      </h2>
      <h1 className="text-[var(--white-100)] text-3xl md:text-6xl leading-1 font-bold leading-tight relative">
        {subtitle}
      </h1>
    </div>
  );
};

// Definindo a validação das props
Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};


export default Title;