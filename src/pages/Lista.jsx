import { useState, useMemo } from "react";
import AnimatedOnScroll from "../components/AnimatedOnScroll";
import PresenteOption from "../components/PresenteOption";
import ModalPresente from "../components/ModalPresente";

// Importa todas as imagens da pasta presentes
const images = import.meta.glob('../assets/presentes/*.{png,jpg,jpeg,webp}', { eager: true });

// Função para obter a imagem pelo nome
const getImage = (imageName) => {
  const imagePath = `../assets/presentes/${imageName}`;
  return images[imagePath]?.default || null;
};

// Organizando os presentes por categoria
const categorias = {
  senhorDosAneis: {
    titulo: "Senhor dos Anéis",
    icone: "💍",
    presentes: [
      { title: "Um anel para todos governar (Gollum incluso)", image: getImage('1.png') },
      { title: "Tour guiado para visitar locais icônicos da terra média", image: getImage('2.png') },
      { title: "Degustação de bebidas élficas", image: getImage('3.png') },
      { title: "Workshop de culinária hobbit (com Samwise)", image: getImage('4.png') },
      { title: "Cota de malha e machado anão", image: getImage('5.png') },
      { title: "Senha de 6 dígitos das portas de Durin", image: getImage('6.png') },
      { title: "Cadernos de caligrafia para aprender élfico e runas", image: getImage('7.png') },
      { title: "Curso de canto élfico com Lúthien", image: getImage('8.png') },
      { title: "Cadeira fixa no conselho de Elrond", image: getImage('9.png') },
      { title: "Cajado para não deixar passar!!", image: getImage('10.png') },
      { title: "Ingresso para a festa de aniversário de Bilbo Bolseiro", image: getImage('11.png') },
      { title: "Um warg de estimação (já vacinado)", image: getImage('12.png') },
      { title: "Tour guiado por Sauron no Monte da Perdição", image: getImage('13.png') },
      { title: "Estadia no condado (1º e 2º café da manhã incluso)", image: getImage('14.png') }
    ]
  },
  harryPotter: {
    titulo: "Harry Potter",
    icone: "⚡",
    presentes: [
      { title: "Degustação de cerveja amanteigada em Hogsmead", image: getImage('15.png') },
      { title: "Um beijo de dementador", image: getImage('16.png') },
      { title: "Oficina de criação de varinhas com Ollivander", image: getImage('17.png') },
      { title: "Aula de poções mágina com o Professor Snape", image: getImage('18.png') },
      { title: "MBA em Hogwarts", image: getImage('19.png') },
      { title: "Simulação em VR de uma partida de Quadribol", image: getImage('20.png') },
      { title: "Uma capa da invisibilidade", image: getImage('21.png') },
      { title: "Uma bolsa da Hermione", image: getImage('22.png') },
      { title: "Viagem de carro voador", image: getImage('23.png') },
      { title: "Tour guiado por Hogwarts de vassoura", image: getImage('24.png') },
      { title: "Foto autografada com Voldemort e seus comensais", image: getImage('25.png') },
      { title: "Uma partida de xadrez bruxo com Rony", image: getImage('26.png') },
      { title: "Tour pelo beco diagonal com Hagrid", image: getImage('27.png') },
      { title: "Passeio noturno em um hipogrifo", image: getImage('28.png') }
    ]
  },
  starWars: {
    titulo: "Star Wars",
    icone: "⚔️",
    presentes: [
      { title: "Simulação de treinamento Jedi com mestre Yoda", image: getImage('29.png') },
      { title: "Voo intergaláctico na Millenium Falcon", image: getImage('30.png') },
      { title: "Luta com sabre de luz contra General Grievous", image: getImage('31.png') },
      { title: "Corrida de podracer por Tatooine", image: getImage('32.png') },
      { title: "Armadura usada do Mandaloriano (não lavada)", image: getImage('33.png') },
      { title: "Estágio com os Jawas para reconhecer as melhores sucatas", image: getImage('34.png') },
      { title: "Aluguel do R2D2 para faxina", image: getImage('35.png') },
      { title: "Aluguel do C3PO para aprendizado de idiomas", image: getImage('36.png') },
      { title: "Congelamento em carbonita (melhor que botox)", image: getImage('37.png') },
      { title: "Uma hora de conselhos com Palpatine", image: getImage('38.png') },
      { title: "Conversa com Chewbacca", image: getImage('39.png') },
      { title: "Uma noite no tanque de Bacta com Darth Vader", image: getImage('40.png') },
      { title: "Ingresso para o chá de revelação da Léia", image: getImage('41.png') },
      { title: "Hospedagem na academia do Luke en Ahch-To", image: getImage('42.png') }
    ]
  },
  momo: {
    titulo: "Momo",
    icone: "🐶",
    presentes: [
      { title: "Passeio de carro com a momo", image: getImage('87.png') },
      { title: "Sessão exclusiva de latidos com a momo", image: getImage('88.png') },
      { title: "Passeio pela praça com a momo", image: getImage('89.png') },
      { title: "Coach com a momo: como superar seus medos", image: getImage('90.png') },
      { title: "Tentativa de fazer carinho na momo (mordidas podem ocorrer)", image: getImage('91.png') }
    ]
  },
  outros: {
    titulo: "Outros",
    icone: "🎮",
    presentes: [
      { title: "Festão na casa da Betinha", image: getImage('43.png') },
      { title: "Aluguel de quarto em Downton Abbey (todas as refeições inclusas)", image: getImage('44.png') },
      { title: "Workshop de confeção de poções com Geraldão", image: getImage('45.png') },
      { title: "Passeio a bordo do castelo animado", image: getImage('46.png') },
      { title: "Passagem de ônibus no Catbus", image: getImage('47.png') },
      { title: "Ingresso conjunto com o Sem Face na casa de banhos", image: getImage('48.png') },
      { title: "Jantar com os pais de Chihiro (podem ocorrer transformações)", image: getImage('49.png') },
      { title: "Aula de crochê com Zeniba", image: getImage('50.png') },
      { title: "Alimente o Calcifer", image: getImage('51.png') },
      { title: "Viagem de barco com Luffy no Going Merry", image: getImage('52.png') },
      { title: "Lamen tamanho grande na Ichiraku Ramen", image: getImage('53.png') },
      { title: "Um dia de treinamento com o Goku", image: getImage('54.png') },
      { title: "Um pedido para Shenlong", image: getImage('55.png') },
      { title: "Tour guiado pela aldeia da folha com Naruto", image: getImage('56.png') },
      { title: "Set completo das Cartas Clow", image: getImage('57.png') },
      { title: "Aula com Rock Lee (abertura dos oito portões não incluso)", image: getImage('58.png') },
      { title: "Uma pílula vermelha (ou azul)", image: getImage('59.png') },
      { title: "Cookies do Oráculo", image: getImage('60.png') },
      { title: "Uma ronda com o Batman", image: getImage('61.png') },
      { title: "Um rolê por NY (de teia)", image: getImage('62.png') },
      { title: "Vaquinha para o Peter pagar o aluguel", image: getImage('63.png') },
      { title: "Vaga permanente no clube da luta", image: getImage('64.png') },
      { title: "Rolê de dragão com a Daenerys", image: getImage('65.png') },
      { title: "Vaga no exército dos white walkers", image: getImage('66.png') },
      { title: "Convite para o casamento vermelho (traje Black Tie)", image: getImage('67.png') },
      { title: "Um passeio nas costas de Hodor", image: getImage('68.png') },
      { title: "Uma partida de D&D com waffles no porão do Mike", image: getImage('69.png') },
      { title: "Aula de química avançada com Walter White", image: getImage('70.png') },
      { title: "Palestra de como ser um bom gerente com Michael Scott", image: getImage('71.png') },
      { title: "Treinamento anti-incêndio com Dwight", image: getImage('72.png') },
      { title: "Curso rápido de chili com carne ministrado por Kevin", image: getImage('73.png') },
      { title: "Aula de francês com Phoebe e Joey", image: getImage('74.png') },
      { title: "Faxina feita pela Monica", image: getImage('75.png') },
      { title: "Palestra sobre dinossauros com Dr. Ross", image: getImage('76.png') },
      { title: "Treinamento de sobrevivência com Dwight", image: getImage('77.png') },
      { title: "Curso de barista com Rachel", image: getImage('78.png') },
      { title: "Refeição para dividir em dois com Joey", image: getImage('79.png') },
      { title: "Aula intensiva de canto e violão com Phoebe", image: getImage('80.png') },
      { title: "Ingresso para show de stand-up do Chandler", image: getImage('81.png') },
      { title: "Um pedaço do pavê de Ação de Graças da Rachel", image: getImage('82.png') },
      { title: "Aulas de parkour com Michael Scott e Dwight", image: getImage('83.png') },
      { title: "Receita exclusiva de gelatina do Jim", image: getImage('84.png') },
      { title: "Vale atestado por queimadura com grelha George Foreman", image: getImage('85.png') },
      { title: "Uma noite na fazenda de beterrabas do Dwight", image: getImage('86.png') }
    ]
  }
};

const Lista = () => {
  const [categoriaAtual, setCategoriaAtual] = useState('senhorDosAneis');
  const [modalOpen, setModalOpen] = useState(false);
  const [presenteSelecionado, setPresenteSelecionado] = useState(null);

  // Função para embaralhar array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Usando useMemo para evitar reembaralhamento desnecessário
  const presentesEmbaralhados = useMemo(() => {
    return shuffleArray(categorias[categoriaAtual].presentes);
  }, [categoriaAtual]);

  const handleContribuir = (presente) => {
    setPresenteSelecionado(presente);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPresenteSelecionado(null);
  };

  const handleSubmitContribuicao = (data) => {
    // console.log('Dados da contribuição:', data);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    handleCloseModal();
  };

  return (
    <div className="w-full mx-auto transition-opacity duration-500 bg-white pb-32">

      {/* Título da seção */}
      <AnimatedOnScroll animation="fade-in" delay={0.2}>
        <div className="max-w-5xl mx-auto pt-12 pb-6 px-6 text-black text-center content-section">
          {/* <h2 className="text-3xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-4">
            Lista de Presentes
          </h2> */}
          <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500">
            <p>Grandes heróis sempre receberam presentes icônicos: Luke recebeu o Sabre de Luz de Anakin 🔵⚔️, Harry herdou a Capa da Invisibilidade 🧥, Seiya ganhou a Armadura de Pégaso🛡️, Sakura ganhou o Cajado Estrela 🌟, e Link começou sua jornada com nada menos que a Espada Mestra 🗡️.</p>
            <p className="text-lg font-bold text-[var(--green)] animate-pulse"> Nós, por outro lado, estamos felizes apenas com a sua presença no evento! 💖</p>
            <p>Mas... se você sentir um desejo quase irresistível de nos presentear - assim como Gollum não resistia o Um Anel - não vamos recusar! 😆 </p>
            <p>Nossa lista de presentes é 100% online, via Pix, e o valor é o quanto seu coração sentir. Não há valor fixo, pois o que realmente importa é celebrarmos juntos!</p>
          </div>
          {/* <div className="section-divider"></div> */}
        </div>
      </AnimatedOnScroll>

      {/* Navegação das Categorias */}
      <div className="max-w-7xl mx-auto py-8 px-2 md:px-6">
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8 w-full pb-4">
          {Object.entries(categorias).map(([key, categoria]) => (
            <button
              key={key}
              onClick={() => setCategoriaAtual(key)}
              className={`px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap
                ${categoriaAtual === key 
                  ? 'bg-[var(--green)] text-white shadow-lg' 
                  : 'bg-[var(--white-100)] text-[var(--green)] hover:bg-[var(--green-100)]'
                }`}
            >
              <span className="mr-2">{categoria.icone}</span>
              {categoria.titulo}
            </button>
          ))}
        </div>

        {/* Título da Categoria Atual */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--green)] mb-6 character-title">
            {categorias[categoriaAtual].icone} {categorias[categoriaAtual].titulo}
          </h2>
        </div>

        {/* Grid de Presentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presentesEmbaralhados.map((presente, index) => (
            <PresenteOption
              key={index}
              title={presente.title}
              image={presente.image}
              onClick={() => handleContribuir(presente)}
            />
          ))}
        </div>
      </div>

      {/* Modal de Contribuição */}
      {presenteSelecionado && (
        <ModalPresente
          isOpen={modalOpen}
          onClose={handleCloseModal}
          presente={presenteSelecionado}
          onSubmit={handleSubmitContribuicao}
        />
      )}
    </div>
  );
};

export default Lista; 