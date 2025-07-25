import { Link } from 'react-router-dom'
import { useState } from 'react'
import bocaEscudo from '../assets/escudo_boca.svg'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl border-b-4 border-yellow-400 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
              <img 
                src={bocaEscudo} 
                alt="Escudo Boca Juniors" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
                CABJ
              </span>
              <div className="text-xs text-blue-200 font-medium tracking-wider">
                Club Atlético Boca Juniors
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="group relative px-4 py-2 text-white hover:text-yellow-400 font-semibold text-lg transition-all duration-300"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/club" 
              className="group relative px-4 py-2 text-white hover:text-yellow-400 font-semibold text-lg transition-all duration-300"
            >
              Club
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/plantel" 
              className="group relative px-4 py-2 text-white hover:text-yellow-400 font-semibold text-lg transition-all duration-300"
            >
              Plantel
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 group"
          >
            <span className={`w-6 h-0.5 bg-white group-hover:bg-yellow-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white group-hover:bg-yellow-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white group-hover:bg-yellow-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-48 pb-4' : 'max-h-0'}`}>
          <div className="pt-4 space-y-2 border-t border-blue-700">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-white hover:text-yellow-400 hover:bg-blue-800/50 rounded-lg font-semibold transition-all duration-300"
            >
              Inicio
            </Link>
            <Link 
              to="/club" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-white hover:text-yellow-400 hover:bg-blue-800/50 rounded-lg font-semibold transition-all duration-300"
            >
              Club
            </Link>
            <Link 
              to="/plantel" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-white hover:text-yellow-400 hover:bg-blue-800/50 rounded-lg font-semibold transition-all duration-300"
            >
              Plantel
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </nav>
  )
}