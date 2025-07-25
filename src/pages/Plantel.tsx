import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClubSquad } from '../hooks/useClubSquad';
import escudoBoca from '../assets/escudo_boca.svg';

export default function Plantel() {
  const navigate = useNavigate();
  const { squad, loading, error } = useClubSquad();
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('Todas');
  const [openImg, setOpenImg] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const posiciones = squad?.squad
    ? Array.from(new Set(squad.squad.map((p) => p.positions.first.name))).sort()
    : [];

  const filteredSquad = squad?.squad?.filter((player) => {
    const normalize = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const matchName = normalize(player.name).includes(normalize(search));
    const matchPosition =
      position === 'Todas' || player.positions.first.name === position;
    return matchName && matchPosition;
  });

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex flex-col items-center justify-center">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 flex flex-col items-center border border-white/30">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <span className="text-2xl font-bold text-white mt-6 animate-pulse">Cargando plantel...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex flex-col items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-md border border-white/30">
        <div className="bg-red-500/20 p-4 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Error al cargar plantel</h3>
        <p className="text-blue-100 text-center mb-8">{error.message}</p>
        <button
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
          onClick={() => window.location.reload()}
        >
          <span>🔄</span>
          Reintentar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center mb-6">
              <img src={escudoBoca} alt="Boca Juniors" className="w-30 h-30" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">
              <span className="block text-white">
                PLANTEL
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                PROFESIONAL
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Club Atlético Boca Juniors - Temporada actual
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        {/* Filtros */}
        <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Buscador */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-blue-200 text-xl">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Buscar jugador..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm text-lg"
                />
              </div>

              {/* Selector de posición */}
              <div className="relative">
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="appearance-none w-full lg:w-64 px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm text-lg cursor-pointer"
                >
                  <option value="Todas" className="bg-blue-900 text-white">Todas las posiciones</option>
                  {posiciones.map((pos) => (
                    <option key={pos} value={pos} className="bg-blue-900 text-white">{pos}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-blue-200">▼</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex justify-center">
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-400">{filteredSquad?.length || 0}</div>
                <div className="text-blue-200 font-medium">Jugadores</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de jugadores */}
        <div className="space-y-6">
          {filteredSquad?.length === 0 ? (
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center border border-white/30">
                <div className="text-6xl mb-6">😔</div>
                <h3 className="text-2xl font-bold text-white mb-4">No se encontraron jugadores</h3>
                <p className="text-blue-200 text-lg">Prueba con otros criterios de búsqueda</p>
              </div>
            </div>
          ) : (
            filteredSquad?.map((player, index) => (
              <div
                key={player.id}
                className={`group bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 hover:border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-3xl ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Imagen del jugador */}
                    <div className="relative group-hover:scale-105 transition-transform duration-300">
                      <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-2xl p-2">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-full h-full object-cover rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={() => setOpenImg(player.image)}
                        />
                      </div>
                      {player.captain && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-xl animate-pulse">
                          C
                        </div>
                      )}
                    </div>

                    {/* Información del jugador */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Banderas */}
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-3">
                        {player.nationalities.map((nat) => (
                          <div key={nat.id} className="relative group">
                            <img
                              src={nat.image}
                              alt={nat.name}
                              title={nat.name}
                              className="w-8 h-6 object-cover rounded border-2 border-white/30 shadow-md hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Nombre */}
                      <h2 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 mb-3">
                        {player.name}
                      </h2>

                      {/* Posición */}
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-bold">
                          {player.positions.first.shortName}
                        </span>
                        <span className="text-blue-200 font-medium">{player.positions.first.name}</span>
                      </div>
                    </div>

                    {/* Botón ver perfil */}
                    <button
                      onClick={() => navigate(`/jugador/${player.id}`)}
                      className="group-hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:shadow-xl flex items-center gap-3"
                    >
                      <span>Ver perfil</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {openImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setOpenImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <img
              src={openImg}
              alt="Vista completa"
              className="max-h-full max-w-full rounded-2xl shadow-2xl border-4 border-yellow-400"
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl transition-all duration-200 transform hover:scale-110 shadow-xl"
              onClick={() => setOpenImg(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}