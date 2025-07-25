import { useState, useEffect } from 'react';
import escudoBocaImg from '../assets/escudo_boca.svg';
import { useClubInfo } from '../hooks/useClubInfo';
import { useClubProfile } from '../hooks/useClubProfile';
import copaLibertadoresImg from '../assets/Copa_Libertadores.webp';
import copaSudamericanaImg from '../assets/Copa_Sudamericana.webp';
import copaIntercontinentalImg from '../assets/Copa_Intercontinental.webp';
import recopaSudamericanaImg from '../assets/Recopa_Sudamericana.webp';
import primeraDivisionImg from '../assets/Primera_Division.webp';
import copaArgentinaImg from '../assets/Copa_Argentina.webp';
import copaLigaProfesionalImg from '../assets/Copa_Liga_Profesional.webp';
import supercopaArgentinaImg from '../assets/Supercopa_Argentina.webp';

const trophyImages: Record<string, string> = {
  'Copa Libertadores': copaLibertadoresImg,
  'Copa Sudamericana': copaSudamericanaImg,
  'Copa Intercontinental': copaIntercontinentalImg,
  'Recopa Sudamericana': recopaSudamericanaImg,
  'Primera División Argentina': primeraDivisionImg,
  'Copa Argentina': copaArgentinaImg,
  'Copa de la Liga Profesional': copaLigaProfesionalImg,
  'Supercopa Argentina': supercopaArgentinaImg,
};

function getTrophyKey(rawName: string): string {
  return rawName
    .replace(/^Campe[oó]n( del| de la| de los| de las)? /, '')
    .replace(/^Ganador( del| de la| de los| de las)? /, '')
    .trim();
}

export default function ClubPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { club: clubInfo, loading: loadingInfo, error: errorInfo } = useClubInfo();
  const { club: clubProfile, loading: loadingProfile, error: errorProfile } = useClubProfile();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loadingInfo || loadingProfile) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex flex-col items-center justify-center">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 flex flex-col items-center border border-white/30">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <span className="text-2xl font-bold text-white mt-6 animate-pulse">Cargando información del club...</span>
      </div>
    </div>
  );

  if (errorInfo || errorProfile) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 flex flex-col items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-md border border-white/30">
        <div className="bg-red-500/20 p-4 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Error al cargar</h3>
        <p className="text-blue-100 text-center mb-8">{errorInfo?.message} {errorProfile?.message}</p>
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
            <div className="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full text-sm font-bold tracking-wider mb-6 animate-pulse">
              CLUB ATLÉTICO BOCA JUNIORS
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                NUESTRO
              </span>
              <span className="block text-blue-200">
                CLUB
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Conocé la historia, los títulos y toda la información del club más grande de Argentina
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20 space-y-12">
        {/* Club Info */}
        <section className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4">
              <span className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full"></span>
              INFORMACIÓN DEL CLUB
            </h2>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mb-12">
              <div className="group">
                <div className="w-48 h-48 bg-gradient-to-br from-white/30 to-white/20 rounded-full p-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <img
                    src={escudoBocaImg}
                    alt={clubInfo?.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">{clubProfile?.mainFacts.fullName}</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <img
                        src={clubInfo?.countryImage}
                        alt={clubInfo?.countrynameEN}
                        className="w-8 h-6 object-cover rounded border-2 border-white/30"
                      />
                      <div>
                        <span className="text-blue-200 text-sm">País</span>
                        <p className="text-white font-semibold">{clubInfo?.countrynameEN}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-blue-200 text-sm">Liga</span>
                      <p className="text-white font-semibold">{clubInfo?.leagueName}</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-blue-200 text-sm">Entrenador</span>
                      <p className="text-white font-semibold">{clubInfo?.coachName}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-blue-200 text-sm">Valor de Mercado</span>
                      <p className="text-white font-semibold">
                        {clubInfo?.marketValue} {clubInfo?.marketValueNumeral} {clubInfo?.marketValueCurrency}
                      </p>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-blue-200 text-sm">Fundación</span>
                      <p className="text-white font-semibold">{clubProfile?.mainFacts.founding}</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-blue-200 text-sm">Ciudad</span>
                      <p className="text-white font-semibold">{clubProfile?.mainFacts.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Section */}
            <div className="mt-12">
              <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-4">
                <span className="w-1 h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full"></span>
                LA BOMBONERA
              </h3>
              
              <div className="relative group overflow-hidden rounded-2xl">
                <img
                  src={clubProfile?.stadium.image}
                  alt={clubProfile?.stadium.name}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{clubProfile?.stadium.name}</h4>
                  <p className="text-blue-200">El templo del fútbol mundial</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-xl p-4 border border-yellow-400/30">
                  <span className="text-yellow-400 text-sm font-medium">Capacidad</span>
                  <p className="text-white font-bold text-lg">{clubProfile?.stadium.totalCapacity}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-xl p-4 border border-yellow-400/30">
                  <span className="text-yellow-400 text-sm font-medium">Ciudad</span>
                  <p className="text-white font-bold text-lg">{clubProfile?.stadium.city}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-xl p-4 border border-yellow-400/30">
                  <span className="text-yellow-400 text-sm font-medium">Dirección</span>
                  <p className="text-white font-bold text-lg">{clubProfile?.stadium.street}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Títulos Section */}
        <section className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4">
              <span className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full"></span>
              TÍTULOS
            </h2>
            
            <div className="grid gap-6">
              {clubProfile?.successes.map((t, index) => {
                const trophyKey = getTrophyKey(t.name);
                const trophyImg = trophyImages[trophyKey];

                return (
                  <div
                    key={t.id}
                    className={`group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300">
                          <img
                            src={trophyImg}
                            alt={t.name}
                            className="w-full h-full object-contain drop-shadow-lg"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {t.number}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {trophyKey}
                        </h4>
                        <p className="text-blue-200 text-lg mb-2">
                          {t.number} título{parseInt(t.number) > 1 ? 's' : ''}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {t.additionalData.seasonIds.map((season, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-800/50 text-blue-100 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {season}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}