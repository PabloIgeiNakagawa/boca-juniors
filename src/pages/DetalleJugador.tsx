import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayerInfo } from '../hooks/usePlayerInfo';

export default function DetalleJugador() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openImg, setOpenImg] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex items-center justify-center">
        <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
          <span className="text-xl font-bold text-white">ID de jugador no especificado.</span>
        </div>
      </div>
    );
  }

  const { player, loading, error } = usePlayerInfo(id);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex flex-col items-center justify-center">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 flex flex-col items-center border border-white/30">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <span className="text-2xl font-bold text-white mt-6 animate-pulse">Cargando información del jugador...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex flex-col items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-md border border-white/30">
        <div className="bg-red-500/20 p-4 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Error al cargar información del jugador</h3>
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

  if (!player) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex items-center justify-center">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center border border-white/30">
        <div className="text-6xl mb-6">😔</div>
        <span className="text-2xl font-bold text-white">No se encontró información del jugador.</span>
      </div>
    </div>
  );

  const playerInfo = player.playerProfile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
      {/* Header con botón de regreso */}
      <div className="relative py-8">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3"
          >
            <span>←</span>
            Volver
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        {/* Hero Section - Información principal del jugador */}
        <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Imagen del jugador */}
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-2xl p-3">
                  <img
                    src={player.playerProfile.playerImage}
                    alt={player.playerProfile.playerFullName}
                    className="w-full h-full object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setOpenImg(player.playerProfile.playerImage)}
                  />
                </div>
              </div>

              {/* Información principal */}
              <div className="flex-1 text-center lg:text-left">
                {/* Banderas */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-4">
                  <img
                    src={player.playerProfile.countryImage}
                    alt={player.playerProfile.country}
                    title={player.playerProfile.country}
                    className="w-10 h-7 object-cover rounded border-2 border-white/30 shadow-md"
                  />
                  {player.playerProfile.secondCountryImage && (
                    <img
                      src={player.playerProfile.secondCountryImage}
                      alt={player.playerProfile.secondCountry}
                      title={player.playerProfile.secondCountry}
                      className="w-10 h-7 object-cover rounded border-2 border-white/30 shadow-md"
                    />
                  )}
                </div>

                {/* Nombre */}
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                  {player.playerProfile.playerFullName}
                </h1>

                {/* Posición y dorsal */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-6">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-bold">
                    {playerInfo.playerMainPosition}
                  </span>
                  {playerInfo.playerShirtNumber && (
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold">
                      #{playerInfo.playerShirtNumber}
                    </span>
                  )}
                </div>

                {/* Stats rápidas */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-yellow-400">{playerInfo.age}</div>
                    <div className="text-blue-200 text-sm font-medium">Años</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-yellow-400">{playerInfo.height}m</div>
                    <div className="text-blue-200 text-sm font-medium">Altura</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-yellow-400">{playerInfo.foot || 'N/A'}</div>
                    <div className="text-blue-200 text-sm font-medium">Pierna</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
              <span>📋</span>
              Información Personal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard label="Lugar de Nacimiento" value={`${playerInfo.birthplace} (${playerInfo.country})`}/>
              <InfoCard label="Fecha de Nacimiento" value={playerInfo.dateOfBirth}/>
              <InfoCard label="Edad" value={playerInfo.age}/>
              <InfoCard label="Altura" value={playerInfo.height + ' m' }/>
              <InfoCard label="Posición principal" value={playerInfo.playerMainPosition}/>
              <InfoCard label="Posiciones extras" value={`${playerInfo.playerSecondPosition} ${playerInfo.playerThirdPosition}`}/>
              <InfoCard label="Dorsal" value={playerInfo.playerShirtNumber || 'N/A'}/>
              <InfoCard label="Pierna hábil" value={playerInfo.foot || 'N/A'}/>
              <InfoCard label="Club actual" value={playerInfo.club}/>
              <InfoCard label="Contrato hasta" value={playerInfo.contractExpiryDate || 'N/A'}/>
            </div>
          </div>
        </div>

        {/* Sección Selección Nacional */}
        {playerInfo.internationalGames !== "" && (
          <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
              <div className="flex items-center gap-4 mb-8">
                <img src={playerInfo.countryImage} alt={playerInfo.country} className="w-10 h-7 rounded border-2 border-white/30" />
                <h2 className="text-3xl font-black text-white">Selección Nacional</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard label="Estado Actual" value={playerInfo.internationalTeamStatus}/>
                <InfoCard label="Partidos Internacionales" value={playerInfo.internationalGames}/>
                <InfoCard label="Goles en la selección" value={playerInfo.internationalGoals}/>
                <InfoCard label={playerInfo.internationalTeamStatus?.includes("Exjugador") ? "Dorsal utilizado" : "Dorsal"} value={playerInfo.internationalShirtNumber}/>
              </div>
            </div>
          </div>
        )}

        {/* Galería */}
        {player.heroImages && player.heroImages.length > 0 && (
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
              <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                <span>📸</span>
                Galería
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {player.heroImages.map((img: any, idx: number) => (
                  <div
                    key={img.id || idx}
                    className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gradient-to-br from-white/10 to-white/5 p-2 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2"
                    onClick={() => setOpenImg(img.URL || img.url)}
                  >
                    <img
                      src={img.URL || img.url}
                      alt={img.source || `Imagen ${idx + 1}`}
                      className="w-full h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                    />
                    {img.source && (
                      <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-white p-2 text-sm rounded-lg">
                        {img.source}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
  
  type Props = {
    label: string;
    value: string;
  };

  function InfoCard({ label, value }: Props) {
    return (
      <div className="group bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1">
        <span className="font-bold block text-blue-200 text-sm mb-1">{label}</span>
        <span className="text-lg font-medium text-white group-hover:text-yellow-400 transition-colors duration-300">{value}</span>
      </div>
    );
  }
}