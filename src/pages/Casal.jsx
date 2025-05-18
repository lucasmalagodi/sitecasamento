const Casal = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600">O Casal</h1>
      <p className="text-lg font-[var(--font-chillax-Extralight)] text-gray-500 mt-4 text-center max-w-lg">
        Este é um exemplo de página inicial para seu projeto. Aqui você pode adicionar conteúdo sobre o casal, imagens, seções e muito mais.
      </p>

      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Saiba mais
      </button>
    </div>
  );
};

export default Casal;