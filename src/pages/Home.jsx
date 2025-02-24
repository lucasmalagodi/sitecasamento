import { useState, useRef } from "react";
import Logo from "../components/Logo";
import Title from "../components/Title";
import Menu from "../components/Menu";
import Modal from "../components/Modal";

const Home = () => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔥 Modal começa fechado
  const [hasSeenModal, setHasSeenModal] = useState(false); // 🔥 O modal ainda não foi visto
  const sectionRef = useRef(null);
  const [isFlashing, setIsFlashing] = useState(false);

  
  // 🔥 Abre o modal apenas se ainda não foi visto
  const handleMenuEnter = () => {
    if (!hasSeenModal) {
      setIsModalOpen(true);
    }
  };

  // 🔥 Fecha o modal, ativa o scroll e impede que ele apareça novamente
  const handleCloseModal = () => {
    setIsFlashing(true); // Ativa o flash
    setTimeout(() => {
      setIsFlashing(false); // Remove o flash
      setIsScrollEnabled(true);
      setIsModalOpen(false);
      setHasSeenModal(true);
  
      // Rola para a Seção 1 após o flash
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 400); // Tempo do efeito de flash
  };

  return (
    <>
      {/* 🔹 TOPO DA PÁGINA COM A IMAGEM DE FUNDO */}
      <div
        className="relative w-full flex flex-col justify-between items-center min-h-screen bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/img-paula-e-lucas-home.png')" }}
      >
        {/* 🔹 LOGO NO TOPO */}
        <div className="w-full flex justify-center pt-10">
          <Logo />
        </div>

        {/* 🔹 TÍTULO NO CENTRO */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-xl px-4">
          <Title title="I See our Love" subtitle="many years before you came" />
        </div>

        {/* 🔹 MENU NO FINAL DA PÁGINA */}
        <div className="w-full flex justify-center pb-4" onMouseEnter={handleMenuEnter}>
          <Menu />
        </div>
      </div>

      {/* 🔥 MODAL - Agora só aparece ao passar o mouse no menu pela primeira vez */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      {isFlashing && <div className="flash-effect"></div>}
      {/* 🔥 SEÇÃO 1 - FORA DA DIV COM A IMAGEM DE FUNDO */}
      <div
        ref={sectionRef}
        className={`w-full max-w-2xl mx-auto mt-10 p-4 space-y-8 text-white transition-opacity duration-500 ${
          isScrollEnabled ? "block opacity-100 overflow-auto" : "hidden opacity-0 overflow-hidden"
        }`}
      >
        <div className="w-full p-6 bg-[var(--white-100)] text-black rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Seção 1</h2>
          <p>Este é um conteúdo dinâmico carregado quando chega ao final da página.</p>
        </div>
      </div>
    </>
  );
};

export default Home;