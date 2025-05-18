import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recepcao from "../pages/Recepcao"; // Recepcao
import { Presenca } from "../pages/Presenca";
import Lista from "../pages/Lista";
// import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Página Home SEM Header e Footer */}
        <Route path="/" element={<Home />} />

        {/* Agrupando as páginas que precisam do Layout */}
        <Route element={<Layout />}>
          <Route path="/recepcao" element={<Recepcao />} />
          <Route path="/presenca" element={<Presenca />} />
          <Route path="/lista" element={<Lista />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;