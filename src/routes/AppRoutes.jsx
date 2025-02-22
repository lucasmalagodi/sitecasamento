import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Casal from "../pages/Casal";
import Contato from "../pages/Contato";
// import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Página Home SEM Header e Footer */}
        <Route path="/" element={<Home />} />

        {/* Agrupando as páginas que precisam do Layout */}
        <Route element={<Layout />}>
          <Route path="/casal" element={<Casal />} />
          <Route path="/contato" element={<Contato />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;