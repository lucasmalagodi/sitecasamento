import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Home from "../pages/Home";
import Recepcao from "../pages/Recepcao"; // Recepcao
import { Presenca } from "../pages/Presenca";
import Lista from "../pages/Lista";
import Casal from "../pages/Casal";
import AdminLogin from "../pages/AdminLogin";
import AdminConfirmacoes from "../pages/AdminConfirmacoes";
import AdminPerfil from '../pages/AdminPerfil';
import AdminUsuarios from '../pages/AdminUsuarios';
import AdminPresentes from '../pages/AdminPresentes';
// import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";
import ScrollToTop from "../components/ScrollToTop";
import Loading from "../components/Loading";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Página Home SEM Header e Footer */}
          <Route path="/" element={<Home />} />

          {/* Agrupando as páginas que precisam do Layout */}
          <Route element={<Layout />}>
            <Route path="/recepcao" element={<Recepcao />} />
            <Route path="/presenca" element={<Presenca />} />
            <Route path="/lista" element={<Lista />} />
            <Route path="/casal" element={<Casal />} />
          </Route>

          {/* Rotas administrativas */}
          <Route path="/momozilla/login" element={<AdminLogin />} />
          <Route
            path="/momozilla/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/momozilla/confirmacoes" replace />} />
                    <Route path="confirmacoes" element={<AdminConfirmacoes />} />
                    <Route path="profile" element={<AdminPerfil />} />
                    <Route path="usuarios" element={<AdminUsuarios />} />
                    <Route path="presentes" element={<AdminPresentes />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;