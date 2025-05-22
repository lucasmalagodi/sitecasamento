import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-mobile">
        <div className="text-container">
          <Outlet /> {/* Aqui serão carregadas as páginas dentro do Layout */}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;