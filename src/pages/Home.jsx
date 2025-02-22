import Logo from "../components/Logo";
import Menu from "../components/Menu";
import Title from "../components/Title";

const Home = () => {
  return (
    <div className="mx-auto flex flex-col items-center min-h-screen bg-black bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/assets/img-paula-e-lucas-home.png')" }}
  >
    {/* Seção do LOGO - Adicionando espaçamento sem afetar o alinhamento */}
    <div className="w-full flex justify-center pt-10">
      <Logo />
    </div>

    {/* Seção do TÍTULO - Agora centralizado corretamente */}
    <div className="flex-grow flex items-center justify-center text-center max-w-xs px-4, mt-[-7rem]">
      <Title title="I See our Love" subtitle="many years before you came" />
    </div>

    {/* Seção do MENU */}
    <Menu />
  </div>
  );
};

export default Home;