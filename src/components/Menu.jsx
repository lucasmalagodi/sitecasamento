import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineGift } from "react-icons/ai";
import { BiDrink } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";

const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      setIsScrolled(scrollPosition > headerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isMobile ? <MobileMenu isScrolled={isScrolled} /> : <DesktopMenu isScrolled={isScrolled} menuRef={menuRef} />;
};

// 🟢 MENU MOBILE
const MobileMenu = ({ isScrolled }) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 flex justify-center pb-4 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="bg-[var(--white-100)] shadow-lg rounded-xl w-11/12 max-w-md flex justify-around items-center px-1 py-5">
        <MenuItem icon={<AiOutlineHome size={24} />} text="Olá" link="/" />
        <MenuItem icon={<BiDrink size={24} />} text="Recepção" link="/" />

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
const DesktopMenu = ({ isScrolled, menuRef }) => {
  return (
    <nav 
      ref={menuRef}
      className={`transition-all duration-300 ${
        isScrolled 
          ? 'fixed top-0 left-1/2 transform -translate-x-1/2 z-50' 
          : 'relative'
      }`}
    >
      <div className="rounded-full max-w-xl flex justify-center p-4 bg-[var(--white-100)] shadow-md">
        <ul className="flex space-x-8">
          <MenuItem text="Olá" link="/" />
          <MenuItem text="Recepção" link="/recepcao" />
          <MenuItem text="Presença" link="/presenca" />
          <MenuItem text="Lista" link="/lista" />
        </ul>
      </div>
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
      className={`flex flex-col items-center text-[var(--green)] transition-colors duration-200 px-3 py-2 rounded-full
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
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Menu;