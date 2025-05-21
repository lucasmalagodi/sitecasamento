import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Title from "./Title";
import Menu from "./Menu";

const Header = () => {
  const location = useLocation();

  // 🔥 Definindo os títulos e subtítulos dinâmicos por página
  const pageTitles = {
    "/recepcao": { title: "30 Agosto 2025", subtitle: "Fogão Mineiro" },
    "/presenca": { title: "Confirme aqui", subtitle: "Sua presença é essencial!" },
    "/lista": { title: "Lista de Presentes", subtitle: "" },
    "/contato": { title: "Entre em Contato", subtitle: "Fale com a gente!" },
  };

  // 🔥 Obtendo o título correto baseado na página atual
  const currentPage = pageTitles[location.pathname] || { title: "Bem-vindo!", subtitle: "Nosso site" };

  return (
    <header
      className="shadow-md bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/img-paula-e-lucas-home.png')" }}
    >
      <div className="container mx-auto h-200 text-center flex flex-col items-center p-4">
        <div className="w-full pt-10">
          <Logo />
        </div>
        <div className="flex-grow flex items-center justify-center text-center w-xs md:w-2xl px-4 mt-[3rem]">
          <Title title={currentPage.title} subtitle={currentPage.subtitle} />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;