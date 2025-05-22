import PropTypes from "prop-types";
const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center w-full">
      <h2 className="text-[var(--purple)] text-4xl md:text-6xl lg:text-7xl font-bitter-rose px-4">
        {title}
      </h2>
      <h1 className="text-[var(--white-100)] text-2xl md:text-4xl lg:text-6xl font-bold leading-tight relative px-4">
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