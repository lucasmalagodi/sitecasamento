import AnimatedOnScroll from "../components/AnimatedOnScroll";
import PresenteOption from "../components/PresenteOption";

// Importa todas as imagens da pasta presentes
const images = import.meta.glob('../assets/presentes/*.{png,jpg,jpeg,webp}', { eager: true });

// Função para obter a imagem pelo nome
const getImage = (imageName) => {
  const imagePath = `../assets/presentes/${imageName}`;
  return images[imagePath]?.default || null;
};

const presentesOptions = [
  // Senhor dos Anéis
  { title: "Um anel para todos governar (Gollum incluso)", image: getImage('anel-senhor-aneis.png') },
  { title: "Tour guiado por um hobbit para visitar os locais icônicos da terra média", image: getImage('tour-hobbit.png') },
  { title: "Degustação de bebidas élficas", image: getImage('bebidas-elficas.png') },
  { title: "Workshop de culinária hobbit (com Samwise)", image: getImage('workshop-hobbit.png') },
  { title: "Cota de malha e machado anão", image: getImage('cota-malha.png') },
  { title: "Senha de 6 dígitos das portas de Durin", image: getImage('portas-durin.png') },
  { title: "Cadernos de caligrafia para aprender élfico e runas", image: getImage('cadernos-elficos.png') },
  { title: "Curso de canto élfico com Lúthien", image: getImage('curso-canto.png') },
  { title: "Cadeira fixa no conselho de Elrond", image: getImage('conselho-elrond.png') },
  { title: "Cajado para não deixar passar!!", image: getImage('cajado.png') },
  { title: "Ingresso para a festa de aniversário de Bilbo Bolseiro", image: getImage('festa-bilbo.png') },
  { title: "Um warg de estimação (já vacinado)", image: getImage('warg.png') },
  { title: "Tour guiado por Sauron no Monte da Perdição", image: getImage('monte-perdicao.png') },
  { title: "Estadia no condado (1º e 2º café da manhã incluso)", image: getImage('estadia-condado.png') },

  // Harry Potter
  { title: "Degustação de cerveja amanteigada em Hogsmead", image: getImage('cerveja-amanteigada.png') },
  { title: "Um beijo de dementador", image: getImage('dementador.png') },
  { title: "Oficina de criação de varinhas com Ollivander", image: getImage('varinhas.png') },
  { title: "Aula de poções mágina com o Professor Snape", image: getImage('pocoes.png') },
  { title: "MBA em Hogwarts", image: getImage('mba-hogwarts.png') },
  { title: "Simulação em VR de uma partida de Quadribol", image: getImage('quadribol.png') },
  { title: "Uma capa da invisibilidade", image: getImage('capa-invisibilidade.png') },
  { title: "Uma bolsa da Hermione", image: getImage('bolsa-hermione.png') },
  { title: "Viagem de carro voador", image: getImage('carro-voador.png') },
  { title: "Tour guiado por Hogwarts de vassoura", image: getImage('tour-hogwarts.png') },
  { title: "Foto autografada com Voldemort e seus comensais", image: getImage('foto-voldemort.png') },
  { title: "Uma partida de xadrez bruxo com Rony", image: getImage('xadrez-bruxo.png') },
  { title: "Tour pelo beco diagonal com Hagrid", image: getImage('beco-diagonal.png') },
  { title: "Passeio noturno em um hipogrifo", image: getImage('hipogrifo.png') },

  // Star Wars
  { title: "Simulação de treinamento Jedi com mestre Yoda", image: getImage('treinamento-jedi.png') },
  { title: "Voo intergaláctico na Millenium Falcon", image: getImage('millenium-falcon.png') },
  { title: "Luta com sabre de luz contra General Grievous", image: getImage('sabre-luz.png') },
  { title: "Corrida de podracer por Tatooine", image: getImage('podracer.png') },
  { title: "Armadura usada do Mandaloriano (não lavada)", image: getImage('armadura-mandaloriano.png') },
  { title: "Estágio com os Jawas para reconhecer as melhores sucatas", image: getImage('jawas.png') },
  { title: "Aluguel do R2D2 para faxina", image: getImage('r2d2.png') },
  { title: "Aluguel do C3PO para aprendizado de idiomas", image: getImage('c3po.png') },
  { title: "Congelamento em carbonita (melhor que botox)", image: getImage('carbonita.png') },
  { title: "Uma hora de conselhos com Palpatine", image: getImage('palpatine.png') },
  { title: "Conversa com Chewbacca", image: getImage('chewbacca.png') },
  { title: "Uma noite no tanque de Bacta com Darth Vader", image: getImage('tanque-bacta.png') },
  { title: "Ingresso para o chá de revelação da Léia", image: getImage('cha-leia.png') },
  { title: "Hospedagem na academia do Luke en Ahch-To", image: getImage('academia-luke.png') },

  // Outros
  { title: "Festão na casa da Betinha", image: getImage('festa-betina.png') },
  { title: "Aluguel de quarto em Downton Abbey (todas as refeições inclusas)", image: getImage('downton-abbey.png') },
  { title: "Workshop de confeção de poções com Geraldão", image: getImage('pocoes-geraldo.png') },
  { title: "Passeio a bordo do castelo animado", image: getImage('castelo-animado.png') },
  { title: "Passagem de ônibus no Catbus", image: getImage('catbus.png') },
  { title: "Ingresso conjunto com o Sem Face na casa de banhos", image: getImage('sem-face.png') },
  { title: "Lugar no banquete com os pais de Chihiro (podem ocorrer transformações)", image: getImage('banquete-chihiro.png') },
  { title: "Aula de crochê com Zeniba", image: getImage('croche-zeniba.png') },
  { title: "Alimente o Calcifer", image: getImage('calcifer.png') },
  { title: "Viagem de barco com Luffy no Going Merry", image: getImage('going-merry.png') },
  { title: "Lamen tamanho grande na Ichiraku Ramen", image: getImage('ichiraku-ramen.png') },
  { title: "Um dia de treinamento com o Goku", image: getImage('treino-goku.png') },
  { title: "Um pedido para Shenlong", image: getImage('shenlong.png') },
  { title: "Tour guiado pela aldeia da folha com Naruto", image: getImage('aldeia-folha.png') },
  { title: "Set completo das Cartas Clow", image: getImage('cartas-clow.png') },
  { title: "Aula completa de taijutsu com Rock Lee (abertura dos oito portões não incluso)", image: getImage('rock-lee.png') },
  { title: "Uma pílula vermelha (ou azul)", image: getImage('pilula-matrix.png') },
  { title: "Cookies do Oráculo", image: getImage('cookies-oraculo.png') },
  { title: "Uma ronda com o Batman", image: getImage('batman.png') },
  { title: "Um rolê por NY (de teia)", image: getImage('spiderman.png') },
  { title: "Vaquinha para o Peter pagar o aluguel", image: getImage('vaquinha-peter.png') },
  { title: "Vaga permanente no clube da luta", image: getImage('clube-luta.png') },
  { title: "Rolê de dragão com a Daenerys", image: getImage('daenerys.png') },
  { title: "Vaga no exército dos white walkers", image: getImage('white-walkers.png') },
  { title: "Convite para o casamento vermelho (traje Black Tie)", image: getImage('casamento-vermelho.png') },
  { title: "Um passeio nas costas de Hodor", image: getImage('hodor.png') },
  { title: "Uma partida de D&D com waffles no porão do Mike", image: getImage('dnd-mike.png') },
  { title: "Aula de química avançada com Walter White", image: getImage('walter-white.png') },
  { title: "Palestra de como ser um bom gerente com Michael Scott", image: getImage('michael-scott.png') },
  { title: "Treinamento anti-incêndio com Dwight", image: getImage('dwight.png') },
  { title: "Curso rápido de chili com carne ministrado por Kevin", image: getImage('chili-kevin.png') },
  { title: "Aula de francês com Phoebe e Joey", image: getImage('frances-friends.png') },
  { title: "Faxina feita pela Monica", image: getImage('monica.png') },
  { title: "Palestra sobre dinossauros com Dr. Ross", image: getImage('ross.png') },
  { title: "Treinamento de sobrevivência com Dwight", image: getImage('treino-dwight.png') },
  { title: "Curso de barista com Rachel", image: getImage('rachel.png') },
  { title: "Refeição para dividir em dois com Joey", image: getImage('joey.png') },
  { title: "Aula intensiva de canto e violão com Phoebe", image: getImage('phoebe.png') },
  { title: "Ingresso para show de stand-up do Chandler", image: getImage('chandler.png') },
  { title: "Um pedaço do pavê de Ação de Graças da Rachel", image: getImage('pave-rachel.png') },
  { title: "Aulas de parkour com Michael Scott e Dwight", image: getImage('parkour-office.png') },
  { title: "Receita exclusiva de gelatina do Jim", image: getImage('gelatina-jim.png') },
  { title: "Vale atestado por queimadura com grelha George Foreman", image: getImage('grelha-foreman.png') },
  { title: "Uma noite na fazenda de beterrabas do Dwight", image: getImage('fazenda-dwight.png') }
];

const Lista = () => {
  console.log('Rendering Lista component'); // Debug log

  const handleContribuir = (title) => {
    console.log(`Contribuição para: ${title}`);
  };

  return (
    <div className="w-full mx-auto bg-white">
      {/* Elemento decorativo no topo */}
      <div className="w-full h-16 bg-gradient-to-b from-[var(--white-100)] to-white"></div>
      
      {/* Título da seção */}
      <AnimatedOnScroll animation="fade-in" delay={0.2}>
        <div className="max-w-5xl mx-auto pt-12 pb-6 px-6 text-black text-center content-section">
          <h2 className="text-3xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-4">
            Lista de Presentes
          </h2>
          <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500">
            <p>Grandes heróis sempre receberam presentes icônicos: Luke recebeu o Sabre de Luz de Anakin 🔵⚔️, Harry herdou a Capa da Invisibilidade 🧥, Seiya ganhou a Armadura de Pégaso🛡️, Sakura ganhou o Cajado Estrela 🌟, e Link começou sua jornada com nada menos que a Espada Mestra 🗡️.</p>
            <p className="text-lg font-bold text-[var(--green)]"> Nós, por outro lado, estamos felizes apenas com a sua presença no evento! 💖</p>
            <p>Mas... se você sentir um desejo quase irresistível de nos presentear - assim como Gollum não resistia o Um Anel - não vamos recusar! 😆 </p>
            <p>Nossa lista de presentes é 100% online, via Pix, e o valor é o quanto seu coração sentir. Não há valor fixo, pois o que realmente importa é celebrarmos juntos!</p>
          </div>
          <div className="section-divider"></div>
        </div>
      </AnimatedOnScroll>

      {/* Opções de Presentes */}
      <div className="max-w-7xl mx-auto py-8 px-6 content-section">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-6 character-title">
            A lista de presentes está disponível abaixo. 
          </h2>
          <p>Para contribuir, basta escolher a opção que mais combina com sua vibe!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presentesOptions.map((option, index) => {
            console.log('Rendering option:', option); // Debug log
            return (
              <PresenteOption
                key={index}
                title={option.title}
                image={option.image}
                onClick={() => handleContribuir(option.title)}
              />
            );
          })}
        </div>
      </div>

      {/* Mensagem Final */}
      <div className="max-w-5xl mx-auto py-10 px-6 text-center">
        <p className="text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500">
          Seja qual for sua escolha, saiba que ficaremos imensamente gratos – e prometemos não gastar tudo em poções de cura e skins novas para o jogo da vida! 🎮💍
        </p>
      </div>
    </div>
  );
};

export default Lista; 