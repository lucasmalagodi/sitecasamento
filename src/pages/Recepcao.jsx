import { useRef, Suspense, lazy } from "react";
import AnimatedOnScroll from "../components/AnimatedOnScroll";
import Loading from "../components/Loading";

// Importa todas as imagens da pasta trajes
const images = import.meta.glob('../assets/trajes/*.{png,jpg,jpeg,webp}', { eager: true });
// Importa a imagem do Fogão Mineiro
import fogaomineiroImg from '../assets/recepcao/fogaomineiro.png';

// Função para obter a imagem pelo nome
const getImage = (path, imageName) => {
  const imagePath = `../assets/${path}/${imageName}`;
  return images[imagePath]?.default || null;
};

const referenciasTrajes = [
  {
    img: getImage("trajes", "hobbit.png"),
    alt: "Hobbit",
    texto: "Algo no estilo Hobbit que vai para a festa de aniversário de Bilbo Bolseiro? Um look confortável e rústico, mas elegante! 🍂"
  },
  {
    img: getImage("trajes", "lannister.png"),
    alt: "Lannister",
    texto: "Um Lannister sempre paga suas dívidas... e veste ouro e vermelho. 🦁🔥"
  },
  {
    img: getImage("trajes", "matrix.png"),
    alt: "Matrix",
    texto: "Inspiração Matrix? Um look monocromático e estiloso, com óculos de sol pode funcionar. 🕶️"
  },
  {
    img: getImage("trajes", "tony-stark.png"),
    alt: "Tony Stark",
    texto: "Casual geek no estilo Tony Stark: um blazer descolado, porque classe e conforto andam juntos! 🕶️"
  },
  {
    img: getImage("trajes", "naruto.png"),
    alt: "Naruto",
    texto: "Naruto vibes? Um laranja discreto pode ser a escolha ousada do dia. 🍜"
  },
  {
    img: getImage("trajes", "jogos-vorazes.png"),
    alt: "Jogos Vorazes",
    texto: "Se quiser chegar no espírito Jogos Vorazes, uma roupa revolucionária com penteado estonteante nunca decepciona. 🔥🏹"
  },
  {
    img: getImage("trajes", "the-office.png"),
    alt: "The Office",
    texto: "The Office style? Um terno ou vestido social despretensioso e confortável! 📄"
  },
  {
    img: getImage("trajes", "stranger-things.png"),
    alt: "Stranger Things",
    texto: "Stranger Things? Um visual retrô anos 80 com jaquetas coloridas ou camisas estampadas cairia bem. 🚲⚡"
  },
  {
    img: getImage("trajes", "peaky-blinders.png"),
    alt: "Peaky Blinders",
    texto: "Peaky Blinders? Suspensórios, coletes e boinas para os senhores, vestidos vintage para as damas. 🍷"
  },
  {
    img: getImage("trajes", "ruptura.png"),
    alt: "Ruptura",
    texto: "Se Ruptura te chama mais a atenção, traga um ar misterioso e corporativo com um look formal minimalista e monocromático. 🏢💼"
  }
];

const Recepcao = () => {
  const sectionRef = useRef(null);

  return (
    <div className="min-h-screen bg-white">
      {/* 🔥 CONTEÚDO PRINCIPAL */}
      <div
        ref={sectionRef}
        className="w-full mx-auto transition-opacity duration-500 bg-white pb-32"
      >
        {/* Título da seção */}
        <Suspense fallback={<Loading />}>
          <AnimatedOnScroll animation="fade-in" delay={0.1}>
            <div className="max-w-5xl mx-auto pt-12 px-6 text-black text-center content-section">
              <h2 className="text-3xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-4 shine">
                A cerimônia e a recepção: Restaurante Fogão Mineiro
              </h2>
              <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500">
                <p>Agora que você já sabe tudo sobre os protagonistas, vamos falar sobre o palco dessa grande celebração! E não, não será em um castelo medieval ou numa taverna de RPG (embora a gente adorasse essa ideia), mas sim em um restaurante icônico em Sousas. Inaugurado em 2004, o espaço é uma verdadeira joia da culinária brasileira, oferecendo pratos que fariam até um Hobbit pedir repeteco! 🍛</p>
              </div>
            </div>
          </AnimatedOnScroll>
        </Suspense>

        {/* Detalhes do evento */}
        <Suspense fallback={<Loading />}>
          <AnimatedOnScroll animation="slide-in-right" delay={0.2}>
            <div className="max-w-5xl mx-auto py-8 px-6 content-section mt-6">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-6 character-title text-center">
                  O Casamento 💍
                </h2>
              </div>
              <div className="flex flex-col items-center gap-8">
                {/* Imagem agora fica em cima */}
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-3xl h-64 md:h-80 rounded-lg overflow-hidden shadow-xl relative">
                    <img 
                      src={fogaomineiroImg} 
                      alt="Fogão Mineiro" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Texto agora fica embaixo */}
                <div className="w-full">
                  <div className="p-4 md:p-6">
                    <div className="space-y-4 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500">
                      <p>O casamento acontecerá no espaço do restaurante, e o serviço será buffet à vontade, com um cardápio digno de um banquete real. Entre as delícias servidas, destacam-se:</p>
                      <ul className="list-none space-y-3 pl-4 mt-4">
                        <li className="flex items-start">
                          <span className="text-[var(--purple)] mr-2 text-xl">🥩</span> 
                          <span>Tutu especial (picanha, tutu de feijão, couve refogada, ovos fritos, linguiça caseira, torresmo, vinagrete, banana à milanesa e arroz)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[var(--purple)] mr-2 text-xl">🍲</span> 
                          <span>Escondidinho, camarão e mandioca frita para agradar todos os paladares</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[var(--purple)] mr-2 text-xl">🐟</span> 
                          <span>Opções de peixes, saladas e grelhados para os aventureiros gastronômicos</span>
                        </li>
                      </ul>
                      <p className="mt-4">Agora vem aquele detalhe importante: <strong className="text-[var(--purple)] uppercase">cada convidado pagará seu buffet</strong>.</p>
                      <div className="bg-[var(--white-200)] p-4 rounded-lg mt-4 border-l-4 border-[var(--purple)]">
                        <p className="font-semibold">💵 Valor: R$ 99,50 por pessoa (bebidas à parte) | Crianças de 7 a 12 anos: R$ 49,75 e crianças com 6 anos ou menos não pagam</p>
                      </div>
                      <p className="text-xl">Sim, amigos, é tipo um evento em MMO: você entra, paga sua entrada e aproveita o loot gastronômico à vontade! 🍽️</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedOnScroll>
        </Suspense>

        {/* Data, Horário e Local */}
        <Suspense fallback={<Loading />}>
          <AnimatedOnScroll animation="fade-in" delay={0.3}>
            <div className="max-w-5xl mx-auto py-8 px-6 p-[30px] bg-[var(--white-100)] rounded-lg shadow-inner mx-8 mt-10">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-6 character-title text-center">
                  O grande dia e horário ⏳
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500 text-center">
                <p>Anote na sua agenda, grave um lembrete no celular e avise ao seu eu do futuro:</p>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-2 mt-6 px-2">
                  <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 border-t-4 border-[var(--purple)] flex flex-col justify-between">
                    <div>
                      <span className="text-3xl mb-2 block">🗓️</span>
                      <h3 className="text-xl font-bold text-[var(--green)] mb-2">Data</h3>
                    </div>
                    <p>30 de agosto de 2025</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 border-t-4 border-[var(--green)] flex flex-col justify-between">
                    <div>
                      <span className="text-3xl mb-2 block">⏰</span>
                      <h3 className="text-xl font-bold text-[var(--green)] mb-2">Horário</h3>
                    </div>
                    <p>Das 11hrs até às 16hrs</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 border-t-4 border-[var(--purple)] flex flex-col justify-between">
                    <div>
                      <span className="text-3xl mb-2 block">📍</span>
                      <h3 className="text-xl font-bold text-[var(--green)] mb-2">Local</h3>
                    </div>
                    <p>Espaço reservado do restaurante</p>
                  </div>
                </div>
                <p className="mt-6 font-semibold text-xl text-[var(--green-100)]">E aqui vai um alerta importante: não seja o vacilão que se atrasa! ⏳ <br /> A única pessoa que tem direito a chegar depois da hora marcada é a noiva – e acredite, ela vai usar esse direito! 😆</p>
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md inline-block mx-2">
                  <h3 className="text-xl font-bold text-[var(--purple)] mb-2">Endereço:</h3>
                  <p>R. Cel Alfredo Augusto do Nascimento, 1052 - Sousas, Campinas - SP, 13106-001</p>
                  <div className="mt-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.948631750189!2d-46.957917599999995!3d-22.878355899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8d03ff4425c43%3A0xdb21366a383d68eb!2sRestaurante%20Fog%C3%A3o%20Mineiro!5e0!3m2!1spt-BR!2sbr!4v1747583952431!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="300"
                      style={{border: 0}}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedOnScroll>
        </Suspense>

        {/* Traje */}
        <Suspense fallback={<Loading />}>
          <AnimatedOnScroll animation="slide-in-left" delay={0.2}>
            <div className="max-w-5xl mx-auto py-10 px-6 content-section mt-10">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-6 character-title text-center">
                  Traje 👔👗
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500">
                <p className="text-center">Sabemos que escolher um outfit digno de um evento épico pode ser uma tarefa difícil, então vamos facilitar:</p>
                
                <div className="bg-[var(--white-200)] p-6 rounded-lg mt-6 border-l-4 border-[var(--green)]">
                  <h3 className="text-xl font-bold text-[var(--green)] mb-4">🟢 Regras básicas:</h3>
                  <p>Escolha algo fresco, arrumado, mas nada chique demais. Pense em um look confortável para que possa aproveitar o buffet como um hobbit, pois não estamos indo para um baile da realeza de Bridgerton.</p>
                </div>
                
                <div className="bg-[var(--white-200)] p-6 rounded-lg mt-4 border-l-4 border-[var(--purple)]">
                  <h3 className="text-xl font-bold text-[var(--green)] mb-4">🟡 Regra de ouro:</h3>
                  <p>Apenas a noiva usa branco! Então, qualquer outra cor está liberada.</p>
                </div>
                
                <div className="mt-8 w-full">
                  <h3 className="text-xl font-bold text-[var(--green)] mb-4 text-center">🎭 Referências memoráveis para inspirar seu traje:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
                    {referenciasTrajes.map((ref, idx) => (
                      <AnimatedOnScroll key={idx} animation="fade-in" delay={0.2 + (idx * 0.1)}>
                        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center w-full">
                          <div className="w-full h-[250px] sm:h-[300px] relative bg-[var(--white-100)] rounded-lg overflow-hidden mb-2">
                            {ref.img ? (
                              <img 
                                src={ref.img} 
                                alt={ref.alt} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center text-center p-4">
                                      <span class="text-[var(--purple)] font-semibold">${ref.alt}</span>
                                    </div>
                                  `;
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-center p-4">
                                <span className="text-[var(--purple)] font-semibold">{ref.alt}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-center w-full">{ref.texto}</p>
                        </div>
                      </AnimatedOnScroll>
                    ))}
                  </div>
                </div>
                
                <p className="text-center mt-8 text-[var(--purple)] font-semibold">Solte sua criatividade e venha vestido para celebrar, mas sem sofrer como uma heroína de algum romance de Jane Austen! 🎉</p>
              </div>
            </div>
          </AnimatedOnScroll>
        </Suspense>

        {/* Conclusão */}
        <Suspense fallback={<Loading />}>
          <AnimatedOnScroll animation="fade-in" delay={0.4}>
            <div className="max-w-5xl mx-auto py-10 px-6 text-center">
              <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500 max-w-3xl mx-auto">
                <p>Então preparem-se para essa comemoração com comida farta, drinks para todos os gostos e, claro, muito amor! 💖</p>
                <p className="italic mt-8 text-[var(--green)] font-semibold bounce">Nos vemos no grande dia!</p>
              </div>
            </div>
          </AnimatedOnScroll>
        </Suspense>
      </div>
    </div>
  );
};

export default Recepcao;
