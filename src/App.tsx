import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ClubInfo from './pages/ClubInfo'
import Plantel from './pages/Plantel'
import DetalleJugador from './pages/DetalleJugador'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-900 dark:from-blue-950 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plantel" element={<Plantel />} />
        <Route path="/club" element={<ClubInfo />} />
        <Route path="/jugador/:id" element={<DetalleJugador />} />
      </Routes>
    </div>
  );
}
