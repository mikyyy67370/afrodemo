import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, SparklesIcon, HeartIcon, ShieldCheckIcon, PlayIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSectionPremium = ({ userProfile, aiRecommendations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Personnalisation IA basée sur le profil utilisateur
  const personalizedContent = {
    newUser: {
      headline: "Découvrez la beauté naturelle qui vous ressemble",
      subheadline: "Cosmétiques bio premium, formulés avec 98% d'ingrédients naturels certifiés",
      cta: "Commencer mon diagnostic beauté",
      ctaSecondary: "Explorer le catalogue",
      visual: "hero-discovery.webp",
      badge: "Nouveau client"
    },
    returningUser: {
      headline: `Bon retour ${userProfile?.firstName || 'chez vous'} !`,
      subheadline: "Vos nouveaux favoris vous attendent, sélectionnés par notre IA",
      cta: "Voir mes recommandations",
      ctaSecondary: "Continuer mes achats",
      visual: "hero-returning.webp",
      badge: "Sélection personnalisée"
    },
    skinConcern: {
      headline: "Solutions expertes pour peaux sensibles",
      subheadline: "Routine apaisante certifiée dermatologique, testée cliniquement",
      cta: "Découvrir ma routine",
      ctaSecondary: "Diagnostic gratuit",
      visual: "hero-sensitive.webp",
      badge: "Expertise dermatologique"
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
      text: "98% ingrédients naturels", 
      color: "text-accent-moss",
      description: "Formules certifiées COSMOS Organic"
    },
    { 
      icon: HeartIcon, 
      text: "Testé dermatologiquement", 
      color: "text-accent-lavender",
      description: "Validation clinique sur peaux sensibles"
    },
    { 
      icon: ShieldCheckIcon, 
      text: "Certification COSMOS", 
      color: "text-accent-terracotta",
      description: "Label bio le plus exigeant d'Europe"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefits.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Produits recommandés par IA avec scores
  const featuredProducts = aiRecommendations?.slice(0, 3) || [
    { 
      id: 1, 
      name: "Sérum Vitamine C Bio", 
      price: "45€", 
      originalPrice: "52€",
      rating: 4.8, 
      reviews: 1247,
      image: "serum-vitc.webp",
      badge: "Bestseller",
      matchScore: 95
    },
    { 
      id: 2, 
      name: "Crème Hydratante Aloe", 
      price: "32€", 
      rating: 4.9, 
      reviews: 896,
      image: "creme-aloe.webp",
      badge: "Nouveauté",
      matchScore: 87
    },
    { 
      id: 3, 
      name: "Huile Précieuse Argan", 
      price: "28€", 
      rating: 4.7, 
      reviews: 2156,
      image: "huile-argan.webp",
      badge: "Éco-premium",
      matchScore: 92
    }
  ];

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

      <div className="relative z-10 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-16">
          
          {/* Colonne Gauche - Contenu Principal */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Badge personnalisé IA avec glow effect */}
            {userProfile && (
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary-gold/10 rounded-full border border-primary-gold/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.3)" }}
              >
                <SparklesIcon className="w-5 h-5 text-primary-gold animate-pulse-soft" />
                <span className="text-sm font-semibold text-primary-forest">
                  {content.badge}
                </span>
              </motion.div>
            )}

            {/* Titre Principal avec effet de reveal lettre par lettre */}
            <div className="space-y-6">
              <motion.h1
                className="text-heading-xl font-bold text-primary-forest leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                {content.headline.split(' ').map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className="inline-block mr-4"
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
                className="text-body text-primary-sage max-w-2xl leading-relaxed font-serif"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                {content.subheadline}
              </motion.p>
            </div>

            {/* Bénéfices Rotatifs avec progression bar */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <div className="flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    transition={{ duration: 0.6 }}
                  >
                    {React.createElement(benefits[currentSlide].icon, {
                      className: `w-8 h-8 ${benefits[currentSlide].color}`
                    })}
                    <div>
                      <h3 className="text-primary-forest font-semibold text-lg">
                        {benefits[currentSlide].text}
                      </h3>
                      <p className="text-primary-sage text-sm">
                        {benefits[currentSlide].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress indicators avec animation */}
              <div className="flex gap-3">
                {benefits.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`relative h-1 rounded-full transition-all duration-500 ${
                      index === currentSlide ? 'w-12 bg-primary-gold' : 'w-4 bg-primary-sage/30'
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

            {/* CTAs avec micro-interactions avancées */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <motion.button
                className="group relative btn-primary overflow-hidden shadow-organic hover:shadow-organic-lg"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                aria-label={content.cta}
              >
                {/* Effet de wave au hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-gold via-accent-terracotta to-primary-gold"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  {content.cta}
                  <ChevronRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </span>
              </motion.button>

              <motion.button
                className="btn-secondary text-lg hover:shadow-organic"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {content.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Social Proof Enrichi */}
            <motion.div
              className="space-y-4 pt-8 border-t border-primary-sage/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
            >
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-sage to-accent-moss border-3 border-white shadow-lg"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 2.8 + i * 0.1, type: "spring" }}
                      />
                    ))}
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary-gold border-3 border-white flex items-center justify-center text-white font-bold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 3.3, type: "spring", stiffness: 200 }}
                    >
                      +
                    </motion.div>
                  </div>
                  
                  <div>
                    <p className="text-primary-forest font-bold text-lg">12,847+ clientes satisfaites</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="text-primary-gold text-lg"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3.5 + i * 0.1 }}
                          >
                            ★
                          </motion.span>
                        ))}
                      </div>
                      <span className="text-primary-sage font-medium">4.9/5</span>
                      <span className="text-primary-sage/70 text-sm">(2,156 avis)</span>
                    </div>
                  </div>
                </div>

                {/* Stats en temps réel */}
                <div className="hidden lg:flex gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-forest">24h</p>
                    <p className="text-xs text-primary-sage">Livraison express</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-forest">30j</p>
                    <p className="text-xs text-primary-sage">Satisfait ou remboursé</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne Droite - Visuel Principal + Produits IA */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px, 0)`
            }}
          >
            {/* Image Hero Principale avec overlay interactif */}
            <div className="relative rounded-organic-lg overflow-hidden shadow-organic-lg">
              <div className="w-full h-[650px] bg-gradient-to-br from-secondary-stone to-secondary-cream flex items-center justify-center relative group">
                <span className="text-primary-sage text-xl font-medium">{content.visual}</span>
                
                {/* Play button pour vidéo de présentation */}
                <motion.button
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                    <PlayIcon className="w-8 h-8 text-primary-forest ml-1" />
                  </div>
                </motion.button>
              </div>
              
              {/* Overlay gradient sophistiqué */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Produits Recommandés IA - Cards Premium */}
            <motion.div
              className="absolute -bottom-8 -left-8 right-8 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 1 }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="glass-morphism rounded-organic p-4 shadow-organic hover:shadow-organic-lg border border-white/30"
                  initial={{ opacity: 0, y: 30, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: 3 + index * 0.15, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Badge produit */}
                  <div className="absolute -top-2 -right-2 bg-accent-coral text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.badge}
                  </div>
                  
                  {/* Score de matching IA */}
                  <div className="absolute top-2 left-2 bg-primary-gold/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.matchScore}% match
                  </div>

                  <div className="aspect-square bg-secondary-linen rounded-lg mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-moss/20 to-accent-lavender/20" />
                  </div>
                  
                  <h4 className="font-bold text-sm text-primary-forest truncate mb-2">
                    {product.name}
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-primary-gold font-bold text-lg">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-primary-sage/60 text-sm line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-primary-gold">★</span>
                        <span className="text-xs font-medium text-primary-forest">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-primary-sage/80">
                      {product.reviews} avis
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Badge IA flottant avec animation */}
            {aiRecommendations && (
              <motion.div
                className="absolute top-6 right-6 bg-primary-gold/95 backdrop-blur-md text-white px-4 py-3 rounded-full text-sm font-bold shadow-glow"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 3.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <SparklesIcon className="w-5 h-5 inline mr-2" />
                IA Personnalisée
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator avec animation fluide */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-primary-sage text-sm font-medium">Découvrir</span>
          <motion.div
            className="w-8 h-14 border-2 border-primary-sage rounded-full flex justify-center p-2"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1.5 h-4 bg-primary-sage rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSectionPremium;