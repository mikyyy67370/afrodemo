import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, SparklesIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = ({ userProfile, aiRecommendations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Personnalisation IA basée sur le profil utilisateur
  const personalizedContent = {
    newUser: {
      headline: "Découvrez la beauté naturelle qui vous ressemble",
      subheadline: "Cosmétiques bio premium, formulés avec 98% d'ingrédients naturels",
      cta: "Commencer mon diagnostic beauté",
      visual: "hero-discovery.webp"
    },
    returningUser: {
      headline: `Bon retour ${userProfile?.firstName || 'chez vous'} !`,
      subheadline: "Vos nouveaux favoris vous attendent",
      cta: "Voir mes recommandations",
      visual: "hero-returning.webp"
    },
    skinConcern: {
      headline: "Solutions expertes pour peaux sensibles",
      subheadline: "Routine apaisante certifiée dermatologique",
      cta: "Découvrir ma routine",
      visual: "hero-sensitive.webp"
    }
  };

  // Détermination du contenu personnalisé via IA
  const getPersonalizedContent = () => {
    if (!userProfile) return personalizedContent.newUser;
    if (userProfile.skinConcerns?.includes('sensitive')) return personalizedContent.skinConcern;
    if (userProfile.visitCount > 1) return personalizedContent.returningUser;
    return personalizedContent.newUser;
  };

  const content = getPersonalizedContent();

  // Animation de parallaxe subtile
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    setMousePosition({ x, y });
  };

  // Carrousel automatique des bénéfices
  const benefits = [
    { icon: SparklesIcon, text: "98% ingrédients naturels", color: "text-emerald-600" },
    { icon: HeartIcon, text: "Testé dermatologiquement", color: "text-purple-600" },
    { icon: ShieldCheckIcon, text: "Certification COSMOS", color: "text-orange-600" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Produits recommandés par IA (top 3)
  const featuredProducts = aiRecommendations?.slice(0, 3) || [
    { id: 1, name: "Sérum Vitamine C Bio", price: "45€", rating: 4.8, image: "serum-vitc.webp" },
    { id: 2, name: "Crème Hydratante Aloe", price: "32€", rating: 4.9, image: "creme-aloe.webp" },
    { id: 3, name: "Huile Précieuse Argan", price: "28€", rating: 4.7, image: "huile-argan.webp" }
  ];

  return (
    <section 
      className="relative min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 overflow-hidden"
      onMouseMove={handleMouseMove}
      role="banner"
      aria-label="Page d'accueil principale"
    >
      {/* Background Pattern Organique */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="organic-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M100,0 Q150,50 100,100 Q50,150 100,200 Q150,150 200,100 Q150,50 100,0 Z" 
                    fill="currentColor" className="text-green-700" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#organic-pattern)"/>
        </svg>
      </div>

      {/* Particules flottantes animées */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-600 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-12">
          
          {/* Colonne Gauche - Contenu Principal */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge personnalisé IA */}
            {userProfile && (
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SparklesIcon className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-green-800">
                  Sélection personnalisée pour vous
                </span>
              </motion.div>
            )}

            {/* Titre Principal avec Animation */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-900 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {content.headline.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.7 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-green-700 max-w-2xl leading-relaxed font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {content.subheadline}
              </motion.p>
            </div>

            {/* Bénéfices Rotatifs */}
            <motion.div
              className="flex items-center gap-6 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {React.createElement(benefits[currentSlide].icon, {
                    className: `w-6 h-6 ${benefits[currentSlide].color}`
                  })}
                  <span className="text-green-900 font-medium">
                    {benefits[currentSlide].text}
                  </span>
                </motion.div>
              </AnimatePresence>
              
              {/* Indicateurs */}
              <div className="flex gap-2">
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-yellow-600 scale-125' 
                        : 'bg-green-600/30 hover:bg-green-600/50'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Voir le bénéfice ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTA Principal */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-green-800 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-800/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={content.cta}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                
                <span className="relative z-10 flex items-center gap-2">
                  {content.cta}
                  <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>

              <motion.button
                className="px-8 py-4 border-2 border-green-600 text-green-900 rounded-xl font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explorer le catalogue
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex items-center gap-6 pt-6 border-t border-green-600/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-2 border-white"
                  />
                ))}
                <div className="w-10 h-10 rounded-full bg-yellow-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                  +
                </div>
              </div>
              <div>
                <p className="text-green-900 font-semibold">12,847+ clientes satisfaites</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-600">★</span>
                  ))}
                  <span className="text-green-700 ml-1">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne Droite - Visuel Principal */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
            }}
          >
            {/* Image Hero Principale */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="w-full h-[600px] bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <span className="text-green-600 text-xl font-medium">Image Hero {content.visual}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Produits Recommandés IA */}
            <motion.div
              className="absolute -bottom-6 -left-6 right-6 grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.7 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                  }}
                >
                  <div className="aspect-square bg-stone-100 rounded-lg mb-2" />
                  <h4 className="font-semibold text-xs text-green-900 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-yellow-600 font-bold text-sm">
                      {product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-600">★</span>
                      <span className="text-xs text-green-700">{product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Badge IA */}
            {aiRecommendations && (
              <motion.div
                className="absolute top-4 right-4 bg-yellow-600/90 backdrop-blur-md text-white px-3 py-2 rounded-full text-sm font-semibold"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, type: "spring" }}
              >
                <SparklesIcon className="w-4 h-4 inline mr-1" />
                Sélection IA
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-green-600 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 