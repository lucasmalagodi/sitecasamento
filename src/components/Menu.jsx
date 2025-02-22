import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineGift } from "react-icons/ai";
import { BiDrink } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";

const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileMenu /> : <DesktopMenu />;
};

// 🟢 MENU MOBILE
const MobileMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4">
      <div className="bg-[var(--white-100)] shadow-lg rounded-xl w-11/12 max-w-md flex justify-around items-center p-4">
        <MenuItem icon={<AiOutlineHome size={24} />} text="Olá" link="/" />
        <MenuItem icon={<BiDrink size={24} />} text="Recepção" link="/recepcao" />

        {/* Ícone Central */}
        <Link to="/casal" className="flex items-center justify-center bg-[var(--green)] w-16 h-16 rounded-full text-white shadow-md">
          <FaHeart size={28} />
        </Link>

        <MenuItem icon={<AiOutlineCalendar size={24} />} text="Presença" link="/presenca" />
        <MenuItem icon={<AiOutlineGift size={24} />} text="Lista" link="/lista" />
      </div>
    </div>
  );
};

// 🖥️ MENU DESKTOP
const DesktopMenu = () => {
  return (
    <nav className="rounded-xl max-w-md flex justify-center p-4 bg-[var(--white-100)] shadow-md">
      <ul className="flex space-x-8">
        <MenuItem text="Olá" link="/" />
        <MenuItem text="Recepção" link="/recepcao" />
        <MenuItem text="Presença" link="/presenca" />
        <MenuItem text="Lista" link="/lista" />
      </ul>
    </nav>
  );
};

// 🔹 ITEM DO MENU COM HOVER E ACTIVE
const MenuItem = ({ icon, text, link }) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <Link
      to={link}
      className={`flex flex-col items-center text-[var(--green)] transition-colors duration-200 px-3 py-2 rounded-lg
        ${
          isActive
            ? "md:bg-[var(--green-100)] md:text-white" // Fundo ativo só no Desktop
            : "md:hover:bg-[var(--green-100)] md:hover:text-white" // Hover só no Desktop
        }`}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </Link>
  );
};

// Validação das props
MenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Menu;