import PropTypes from 'prop-types';

const PresenteOption = ({ title, image, onClick }) => {
  console.log('Rendering PresenteOption:', { title, image }); // Debug log

  return (
    <div className="bg-[var(--white-200)] p-6 rounded-lg border-l-4 border-[var(--green)] hover:shadow-lg transition-shadow flex flex-col h-[400px]">
      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-[var(--green-100)] bg-opacity-30">
        <div className="w-full h-full flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold">Imagem não disponível</span>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold text-[var(--green)] mb-4 line-clamp-3 min-h-[4.5rem]">{title}</h3>
      <button 
        className="w-full bg-[var(--green)] text-white py-2 rounded hover:opacity-90 transition-colors mt-auto"
        onClick={onClick}
      >
        Contribuir
      </button>
    </div>
  );
};

PresenteOption.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func
};

export default PresenteOption; 