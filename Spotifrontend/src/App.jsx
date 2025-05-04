import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generos from './pages/frontend/Generos';
import GeneroArtista from './pages/frontend/GeneroArtista';
import ArtistaDetalle from './pages/frontend/ArtistaDetalle';
import Layout from './pages/components/Layout';

import GeneroAdmin from './pages/admin/GenerosAdmin';
import LayoutAdmin from './pages/components/LayoutAdmin';
import ArtistaAdmin from './pages/admin/ArtistaAdmin';
import AlbumAdmin from './pages/admin/AlbumAdmin';
import CancionAdmin from './pages/admin/CancionAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Generos />
            </Layout>
          }
        />
        <Route
          path="/artistas/genero/:id"
          element={
            <Layout>
              <GeneroArtista />
            </Layout>
          }
        />
        <Route
          path="/artista/:id"
          element={
            <Layout>
              <ArtistaDetalle />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <LayoutAdmin>
              <GeneroAdmin />
            </LayoutAdmin>
          }/>
        <Route
          path="/admin/artistas"
          element={
            <LayoutAdmin>
              <ArtistaAdmin />
            </LayoutAdmin>
          }/>
        <Route
          path="/admin/albums"
          element={
            <LayoutAdmin>
              <AlbumAdmin />
            </LayoutAdmin>
          }/>
        <Route
          path="/admin/canciones"
          element={
            <LayoutAdmin>
              <CancionAdmin />
            </LayoutAdmin>
          }/>
      </Routes>
    </Router>
  );
}

export default App;