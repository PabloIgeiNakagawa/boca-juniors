import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BocaHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "LA BOMBONERA",
      subtitle: "El templo del fútbol mundial",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop&crop=center",
      cta: "Conocé nuestra casa",
      link: "/club"
    },
    {
      title: "PLANTEL 2025",
      subtitle: "Los guerreros xeneizes",
      image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&h=800&fit=crop&crop=center",
      cta: "Ver plantel completo",
      link: "/plantel"
    },
    {
      title: "GLORIA ETERNA",
      subtitle: "74 títulos oficiales",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=800&fit=crop&crop=center",
      cta: "Historia del club",
      link: "/club"
    }
  ];

  const stats = [
    { number: "74", label: "Títulos Oficiales", icon: "🏆" },
    { number: "6", label: "Copas Libertadores", icon: "⭐" },
    { number: "1905", label: "Año de Fundación", icon: "📅" },
    { number: "40M", label: "Hinchas en el Mundo", icon: "👥" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-yellow-600/80" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="max-w-4xl">
                <div className="mb-6">
                  <span className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold tracking-wider animate-pulse">
                    CLUB ATLÉTICO BOCA JUNIORS
                  </span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none">
                  <span className="block bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                    BOCA
                  </span>
                  <span className="block text-blue-200">
                    JUNIORS
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to={heroSlides[currentSlide].link}
                    className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
                  >
                    {heroSlides[currentSlide].cta}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group transform transition-all duration-700 hover:scale-110 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl transition-shadow duration-300">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-blue-200 font-semibold text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.1) 3px, transparent 3px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-6">
            ¡DALE <span className="text-white">BOCA!</span>
          </h2>
          <p className="text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
            Sumate a la hinchada más pasional del mundo. Conocé todo sobre nuestro club, plantel y historia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/plantel"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Conocé el plantel
            </Link>
            <Link 
              to="/club"
              className="border-2 border-blue-900 hover:bg-blue-900 hover:text-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Historia del club
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BocaHome;