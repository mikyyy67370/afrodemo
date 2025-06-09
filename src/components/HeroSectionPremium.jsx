import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, SparklesIcon, HeartIcon, ShieldCheckIcon, StarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const HeroSectionPremium = ({ userProfile, setCurrentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true);

  // Utiliser le contexte pour les actions panier et favoris
  const { addToCart, addToFavorites } = useShop();

  // Personnalisation basée sur le profil utilisateur
  const personalizedContent = {
    newUser: {
      headline: "Révélez l'éclat naturel de votre peau afro",
      subheadline: "Cosmétiques bio premium avec beurre de karité et huiles africaines, conçus pour nourrir intensément votre peau",
      cta: "Diagnostic beauté personnalisé",
      ctaSecondary: "Découvrir notre gamme",
      visual: "/videos/hero-discovery.mp4",
      videoType: "discovery",
      badge: "Expertise Peau Afro"
    },
    returningUser: {
      headline: `Content de vous revoir ${userProfile?.firstName || ''} !`,
      subheadline: "Vos produits favoris pour une peau éclatante vous attendent, sélectionnés par nos experts beauté",
      cta: "Mes recommandations",
      ctaSecondary: "Renouveler ma routine",
      visual: "/videos/hero-returning.mp4",
      videoType: "returning",
      badge: "Routine Personnalisée"
    },
    skinConcern: {
      headline: "Solutions expertes anti-taches et hyperpigmentation",
      subheadline: "Routine illuminatrice certifiée dermatologique, testée sur peaux foncées et métissées",
      cta: "Ma routine anti-taches",
      ctaSecondary: "Consultation gratuite",
      visual: "/videos/hero-sensitive.mp4",
      videoType: "sensitive",
      badge: "Anti-Hyperpigmentation"
    }
  };

  // Détermination du contenu personnalisé
  const getPersonalizedContent = () => {
    if (!userProfile) return personalizedContent.newUser;
    if (userProfile.skinConcerns?.includes('hyperpigmentation') || userProfile.skinConcerns?.includes('taches')) return personalizedContent.skinConcern;
    if (userProfile.visitCount > 1) return personalizedContent.returningUser;
    return personalizedContent.newUser;
  };

  const content = getPersonalizedContent();

  // Animation de parallaxe subtile avec effet de depth
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  // Carrousel automatique des bénéfices avec progression
  const benefits = [
    { 
      icon: SparklesIcon, 
      text: "Riche en beurre de karité", 
      color: "text-accent-moss",
      description: "Nutrition intense pour peaux afro"
    },
    { 
      icon: HeartIcon, 
      text: "Anti-hyperpigmentation", 
      color: "text-accent-lavender",
      description: "Testé sur peaux foncées et métissées"
    },
    { 
      icon: ShieldCheckIcon, 
      text: "Huiles africaines bio", 
      color: "text-accent-terracotta",
      description: "Baobab, argan et marula certifiés"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefits.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [benefits.length]);



  return (
    <section 
      className="relative min-h-screen bg-gradient-to-br from-secondary-cream via-secondary-linen to-secondary-stone overflow-hidden"
      onMouseMove={handleMouseMove}
      role="banner"
      aria-label="Page d'accueil principale cosmétiques bio"
    >
      {/* Background Pattern Organique Avancé */}
      <div className="absolute inset-0 opacity-3">
        <div className="bg-organic-pattern w-full h-full" />
      </div>

      {/* Particules flottantes avec physics */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#7A8471' : i % 3 === 1 ? '#8FA68E' : '#D4AF37',
            }}
            animate={{
              y: [0, -40 - Math.random() * 20, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-8 sm:py-12 lg:py-16">
          
          {/* Colonne Gauche - Contenu Principal */}
          <motion.div
            className="space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Badge personnalisé avec glow effect */}
            {userProfile && (
              <motion.div
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-primary-gold/10 rounded-full border border-primary-gold/30 backdrop-blur-sm text-center mx-auto lg:mx-0"
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.3)" }}
              >
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-gold animate-pulse-soft" />
                <span className="text-xs sm:text-sm font-semibold text-primary-forest">
                  {content.badge}
                </span>
              </motion.div>
            )}

            {/* Titre Principal responsive */}
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-heading-xl font-bold text-primary-forest leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                {content.headline.split(' ').map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className="inline-block mr-2 sm:mr-4"
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.6 + wordIndex * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base lg:text-body text-primary-sage max-w-2xl leading-relaxed font-serif mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                {content.subheadline}
              </motion.p>
            </div>

            {/* Bénéfices Rotatifs responsive */}
            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <div className="flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    className="flex items-center gap-3 sm:gap-4 text-center lg:text-left"
                    initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    transition={{ duration: 0.6 }}
                  >
                    {React.createElement(benefits[currentSlide].icon, {
                      className: `w-6 h-6 sm:w-8 sm:h-8 ${benefits[currentSlide].color} flex-shrink-0`
                    })}
                    <div>
                      <h3 className="text-primary-forest font-semibold text-base sm:text-lg">
                        {benefits[currentSlide].text}
                      </h3>
                      <p className="text-primary-sage text-xs sm:text-sm">
                        {benefits[currentSlide].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress indicators */}
              <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
                {benefits.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`relative h-1 rounded-full transition-all duration-500 ${
                      index === currentSlide ? 'w-8 sm:w-12 bg-primary-gold' : 'w-3 sm:w-4 bg-primary-sage/30'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.1 }}
                    aria-label={`Voir le bénéfice ${index + 1}`}
                  >
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 bg-primary-gold rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* CTAs responsive */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <motion.button
                onClick={() => setCurrentPage && setCurrentPage('diagnostic')}
                className="group relative btn-primary overflow-hidden shadow-organic hover:shadow-organic-lg text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                aria-label={content.cta}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-gold via-accent-terracotta to-primary-gold"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                
                <span className="relative z-10 flex items-center gap-2 sm:gap-3 justify-center">
                  {content.cta}
                  <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-2" />
                </span>
              </motion.button>

              <motion.button
                onClick={() => setCurrentPage && setCurrentPage('products')}
                className="btn-secondary text-sm sm:text-base lg:text-lg hover:shadow-organic px-6 sm:px-8 py-3 sm:py-4"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {content.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Social Proof mobile-friendly */}
            <motion.div
              className="space-y-3 sm:space-y-4 pt-6 sm:pt-8 border-t border-primary-sage/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
            >
              {/* Avatars et rating */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent-terracotta to-accent-moss border-2 border-white shadow-organic"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 3 + i * 0.1 }}
                        style={{
                          background: `linear-gradient(${45 + i * 45}deg, #8FA68E, #D4AF37)`
                        }}
                      />
                    ))}
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-gold/20 border-2 border-white flex items-center justify-center text-primary-gold font-bold text-xs sm:text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 3.5 }}
                    >
                      +
                    </motion.div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-primary-forest font-bold text-sm sm:text-lg">12,847+ clientes satisfaites</p>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="text-primary-gold text-sm sm:text-lg"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3.5 + i * 0.1 }}
                          >
                            ★
                          </motion.span>
                        ))}
                      </div>
                      <span className="text-primary-sage font-medium text-sm">4.9/5</span>
                      <span className="text-primary-sage/70 text-xs sm:text-sm">(2,156 avis)</span>
                    </div>
                  </div>
                </div>

                {/* Stats responsive */}
                <div className="flex gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-lg sm:text-2xl font-bold text-primary-forest">24h</p>
                    <p className="text-xs text-primary-sage">Livraison express</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-2xl font-bold text-primary-forest">30j</p>
                    <p className="text-xs text-primary-sage">Satisfait ou remboursé</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne Droite - Visuel Principal responsive */}
          <motion.div
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
            }}
          >
            {/* Vidéo Hero responsive */}
            <div className="relative rounded-organic-lg overflow-hidden shadow-organic-lg">
              <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[650px] relative group">
                <video
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onLoadStart={() => console.log(`Loading ${content.videoType} video`)}
                >
                  <source src={content.visual} type="video/mp4" />
                  <img src={`/images/hero-${content.videoType}.jpg`} alt={content.badge} className="w-full h-full object-cover" />
                </video>
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary-forest/10 via-transparent to-accent-gold/5"></div>
                
                {/* Contrôles vidéo responsive */}
                <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 flex gap-2 sm:gap-3">
                  <motion.button
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <div className="w-3 h-3 sm:w-5 sm:h-5 text-white">
                      {isMuted ? '🔇' : '🔊'}
                    </div>
                  </motion.button>
                </div>
                
                {/* Indicateur de personnalisation responsive */}
                <motion.div
                  className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-primary-sage/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {content.videoType === 'discovery' && (
                      <>
                        <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-gold" />
                        <span className="text-primary-forest font-medium text-xs sm:text-sm">Découverte</span>
                      </>
                    )}
                    {content.videoType === 'returning' && (
                      <>
                        <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-accent-lavender" />
                        <span className="text-primary-forest font-medium text-xs sm:text-sm">Personnalisé</span>
                      </>
                    )}
                    {content.videoType === 'sensitive' && (
                      <>
                        <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-accent-moss" />
                        <span className="text-primary-forest font-medium text-xs sm:text-sm">Sensible</span>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionPremium; 