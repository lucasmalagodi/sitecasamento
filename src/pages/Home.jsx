import { useState, useRef } from "react";
import Logo from "../components/Logo";
import Title from "../components/Title";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import AnimatedOnScroll from "../components/AnimatedOnScroll";

// import PaulaLucasPont from "../assets/home/paulaLucasPont.png";

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
      
      {/* 🔥 CONTEÚDO PRINCIPAL - Após o modal */}
      <div
        ref={sectionRef}
        className={`w-full mx-auto transition-opacity duration-500 bg-white ${
          isScrollEnabled ? "block opacity-100 overflow-auto" : "hidden opacity-0 overflow-hidden"
        } pb-32`}
      >
        {/* Elemento decorativo no topo */}
        <div className="w-full h-16 bg-gradient-to-b from-[var(--white-100)] to-white"></div>
        
        {/* Boas-vindas */}
        <AnimatedOnScroll animation="fade-in" delay={0.2}>
          <div className="max-w-5xl mx-auto pt-12 pb-6 text-black text-center content-section">
            <h2 className="text-3xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-4 shine">
              Olá!
            </h2>
            <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-gray-500">
              <p>Seja bem-vindo à Plataforma 9¾ oficial do casamento de Paula e Lucas! 🏰✨</p>
              <p>Como você já deve imaginar, esse não é um portal de casamento muito tradicional... e é exatamente assim que a gente gosta. 😏</p>
              <p>Quem se aventurar a atravessar essa parede (seja correndo 🏃‍♂️ ou andando 🚶‍♀️) certamente está movido por dois grandes sentimentos: amor e curiosidade. 💖 Amor pelo casal e curiosidade para saber como essa dupla nerd decidiu juntar os controles de videogame 🎮 e chegou até este momento épico de suas vidas.</p>
              <p>Mas antes de mergulhar nesse mundo mágico, conheça um pouco dos protagonistas dessa história que estarão em missão juntos até depois do final de One Piece 🏴‍☠️ e da Ordem Jedi cair… de novo. 🌌⚔️</p>
            </div>
            <div className="section-divider"></div>
          </div>
        </AnimatedOnScroll>

        {/* Seção Paula */}
        <div className="max-w-5xl mx-auto py-8 px-6 content-section">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <AnimatedOnScroll animation="slide-in-left" delay={0.3}>
              <div className="w-full md:w-5/5 order-2 md:order-1">
                <div className="p-4 md:p-6 md:pr-8">
                  <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-6 character-title">
                    Paula através do scanner Saiyajin de Lucas 🔍👩‍🎤
                  </h2>
                  <div className="space-y-5 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500">
                    <p>Se houvesse um torneio multiversal para determinar a heroína mais versátil, Paula certamente estaria entre as finalistas – e com um inventário cheio de poções, listas organizadas e um plano estratégico para cada batalha. <span className="italic">Persistente como uma treinadora Pokémon, astuta como uma Gryffindor e destemida como uma Witcher</span>, ela encara desafios com a serenidade de quem sabe que no final, tudo vai dar certo (ou que sempre há um plano B).</p>
                    <p>Paula é Player 2, mas só porque deixa Lucas achar que está no controle – quando, na verdade, é ela quem já calculou os próximos três movimentos. Sua ficha de habilidades inclui:</p>
                    <ul className="list-none space-y-3 pl-4 mt-4">
                      <li className="flex items-start">
                        <span className="text-[var(--purple)] mr-2 text-xl">⭐</span> 
                        <span>Habilidade máxima em <strong className="text-[var(--purple)]">organização estratégica</strong> (suas listas de planejamento rivalizam qualquer grimório mágico 📜)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--purple)] mr-2 text-xl">⭐</span> 
                        <span><strong className="text-[var(--purple)]">Capacidade inata</strong> de convencer Lucas a experimentar coisas novas sem que ele perceba que era ideia dela</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--purple)] mr-2 text-xl">⭐</span> 
                        <span>Mestre na arte de escolher os <strong className="text-[var(--purple)]">melhores filmes e séries</strong> para maratonar</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--purple)] mr-2 text-xl">⭐</span> 
                        <span><strong className="text-[var(--purple)]">Sobrevivente oficial</strong> de reformas, mudanças e aventuras com Momozilla 🐕‍🔥</span>
                      </li>
                    </ul>
                    <p className="mt-6">Com inteligência afiada, criatividade sem limites e um coração tão grande quanto o Horizonte de Eventos do Mass Effect, Paula é a verdadeira protagonista secreta dessa saga – e, como diria o sábio Gandalf, <span className="font-semibold italic">"nem mesmo o mais sábio pode prever todos os desfechos, mas alguns são simplesmente destinados a acontecer."</span> ✨</p>
                  </div>
                </div>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll animation="fade-in" delay={0.5}>
              <div className="w-full  order-1 md:order-2 flex justify-center md:justify-end mb-6 md:mb-0">
                <div className="w-64 h-64 md:w-72 md:h-72 bg-[var(--white-100)] rounded-full border-4 border-[var(--purple)] overflow-hidden shadow-xl profile-image-hover float-animation" style={{ backgroundImage: "url('/assets/profile/paula-profile.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {/* Placeholder para foto da Paula */}
                  {/* Se não existir a imagem real, mostrar um placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-center bg-[var(--green-100)] bg-opacity-50">
                    <span className="font-bold text-white">Foto da Paula</span>
                  </div>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </div>

        {/* Seção Lucas */}
        <div className="max-w-5xl mx-auto py-8 px-6 content-section">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <AnimatedOnScroll animation="fade-in" delay={0.7}>
              <div className="w-full  flex justify-center md:justify-start mb-6 md:mb-0">
                <div className="w-64 h-64 md:w-72 md:h-72 bg-[var(--white-100)] rounded-full border-4 border-[var(--green)] overflow-hidden shadow-xl profile-image-hover float-animation-reverse" style={{ backgroundImage: "url('/assets/profile/lucas-profile.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {/* Placeholder para foto do Lucas */}
                  {/* Se não existir a imagem real, mostrar um placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-center bg-[var(--green-100)] bg-opacity-50">
                    <span className="font-bold text-white">Foto do Lucas</span>
                  </div>
                </div>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll animation="slide-in-right" delay={0.9}>
              <div className="w-full ">
                <div className="p-4 md:p-6 md:pl-8">
                  <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-6 character-title">
                    Lucas através do scanner Saiyajin de Paula 🔍🦸‍♂️
                  </h2>
                  <div className="space-y-5 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500">
                    <p>Se o poder de luta de Lucas fosse medido por um scouter Saiyajin, ele provavelmente explodiria o aparelho de tão multifuncional que é (ou talvez de tão atrapalhado 🤭). <span className="italic">Analítico como um detetive de anime, dedicado como um Cavaleiro de Bronze e teimoso como um hobbit em missão</span>, Lucas é aquele tipo de pessoa que não desiste de um desafio – seja vencer uma boss fight complicada ou descobrir qual é o melhor café para o dia. ☕</p>
                    <p>Lucas é o tipo de Player 1 que, quando coloca um objetivo na cabeça, segue até o fim, nem que precise grindar XP por horas a fio. Fiel ao seu código de honra Jedi, sempre tenta resolver tudo da forma mais justa (mesmo quando seria mais fácil usar um feitiço estilo Avada Kedavra nos problemas do dia a dia). Entre suas habilidades principais estão:</p>
                    <ul className="list-none space-y-3 pl-4 mt-4">
                      <li className="flex items-start">
                        <span className="text-[var(--green)] mr-2 text-xl">⭐</span> 
                        <span><strong className="text-[var(--green)]">Capacidade</strong> de tomar café a qualquer hora do dia sem sofrer debuffs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--green)] mr-2 text-xl">⭐</span> 
                        <span><strong className="text-[var(--green)]">Especialização em tecnologia</strong>, com habilidade passiva de resolver bugs por intuição</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--green)] mr-2 text-xl">⭐</span> 
                        <span><strong className="text-[var(--green)]">Protetor oficial</strong> da doguinha Momozilla 🐶, enfrentando ataques de lambidas com destreza</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--green)] mr-2 text-xl">⭐</span> 
                        <span><strong className="text-[var(--green)]">Habilidade rara</strong> de dormir menos de 6 horas e ainda funcionar no dia seguinte (às vezes)</span>
                      </li>
                    </ul>
                    <p className="mt-6">Apesar de ser um protagonista que só percebe o óbvio depois de 200 episódios (vide o tempo que levou para perceber que queria ficar com a Paula 🙄), seu coração de ouro e lealdade nível <span className="font-semibold italic">Samwise Gamgee</span> o tornam o companheiro ideal para qualquer aventura.</p>
                  </div>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </div>

        {/* Seção de conclusão */}
        <AnimatedOnScroll animation="fade-in" delay={1.2}>
          <div className="max-w-5xl mx-auto py-10 px-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-6 shine">
                <p>Juntos, eles formam uma party imbatível, prontos para embarcar na maior aventura de todas: o casamento! 🎮💍✨</p>
              </h2>
              <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 mb-8 rounded-lg overflow-hidden shadow-xl">
                <div className="w-full h-full bg-[var(--green-100)] bg-opacity-30 flex items-center justify-center couple-float" style={{ backgroundImage: "url('/assets/profile/casal-profile.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {/* Aqui pode colocar uma imagem do casal juntos */}
                  <img src="/assets/home/paulaLucasPonte.png" alt="Foto do Casal" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow max-w-3xl mx-auto text-gray-500">
                <p>Agora que você conhece os protagonistas, prepare-se para explorar esse portal feito exclusivamente para você, convidado especial. Interaja com o menu para saber de todas as informações que precisa para fazer parte da nossa quest e divirta-se!</p>
                <p className="italic mt-8 text-[var(--green)] font-semibold bounce">E lembrem-se: "Que a Força esteja com você"</p>
              </div>
            </div>
          </div>
        </AnimatedOnScroll>
      </div>
    </>
  );
};

export default Home;