import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Contactos from './pages/Contactos'
import NuevoContacto from './pages/NuevoContacto'
import EditarContacto from './pages/EditarContacto'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Contactos />}
        />

        <Route
          path="/nuevo"
          element={<NuevoContacto />}
        />

        <Route
          path="/editar/:id"
          element={<EditarContacto />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App