import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  FireIcon, 
  GlobeAltIcon, 
  BeakerIcon,
  UsersIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const ValuesSection = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('bio');
  const [hoveredCertif, setHoveredCertif] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Données des valeurs avec métriques réelles
  const coreValues = {
    bio: {
      icon: FireIcon,
      title: "Ingrédients Africains Bio",
      subtitle: "Trésors de beauté ancestraux",
      description: "Nos formules contiennent 98,7% d'ingrédients d'origine naturelle, enrichies en beurre de karité, huile de baobab et marula. Chaque ingrédient respecte les traditions africaines de beauté.",
      metrics: [
        { label: "Beurre de karité pur", value: "100%", color: "text-accent-moss" },
        { label: "Huiles africaines", value: "15", color: "text-primary-gold" },
        { label: "Femmes productrices", value: "847", color: "text-accent-lavender" }
      ],
      visual: "/images/bio-ingredients.jpg"
    },
    environment: {
      icon: GlobeAltIcon,
      title: "Engagement Afrique",
      subtitle: "Soutien aux communautés",
      description: "Nous soutenons directement les coopératives de femmes en Afrique, avec un commerce équitable qui améliore leurs conditions de vie tout en préservant leurs savoir-faire traditionnels.",
      metrics: [
        { label: "Coopératives partenaires", value: "12", color: "text-accent-moss" },
        { label: "Femmes soutenues", value: "2,450", color: "text-primary-gold" },
        { label: "Villages aidés", value: "35", color: "text-accent-lavender" }
      ],
      visual: "/images/eco-responsibility.jpg"
    },
    quality: {
      icon: BeakerIcon,
      title: "Science & Tradition",
      subtitle: "Innovation pour peaux foncées",
      description: "Nos laboratoires combinent les rituels de beauté africains millénaires avec la science moderne, créant des formules spécialement conçues pour les peaux foncées et métissées.",
      metrics: [
        { label: "Tests sur peaux foncées", value: "100%", color: "text-accent-moss" },
        { label: "Rituels traditionnels", value: "8", color: "text-primary-gold" },
        { label: "Efficacité prouvée", value: "96%", color: "text-accent-lavender" }
      ],
      visual: "/images/laboratory.jpg"
    },
    community: {
      icon: UsersIcon,
      title: "Beauté Inclusive",
      subtitle: "Célébrer la diversité",
      description: "Nous célébrons la beauté afro dans toute sa diversité. Nos produits sont formulés pour toutes les nuances de peau, des plus claires aux plus foncées, avec des solutions adaptées à chaque besoin.",
      metrics: [
        { label: "Nuances testées", value: "50+", color: "text-accent-moss" },
        { label: "Clientes satisfaites", value: "15,600", color: "text-primary-gold" },
        { label: "Pays distribués", value: "28", color: "text-accent-lavender" }
      ],
      visual: "/images/fair-trade.jpg"
    }
  };

  // Certifications avec tooltips interactifs
  const certifications = [
    {
      id: 'cosmos',
      name: 'COSMOS Organic',
      logo: 'cosmos-logo.svg',
      description: 'Label bio le plus exigeant d\'Europe',
      details: 'Certifie que 95% des ingrédients végétaux sont issus de l\'agriculture biologique',
      color: 'bg-accent-moss'
    },
    {
      id: 'ecocert',
      name: 'Ecocert',
      logo: 'ecocert-logo.svg',
      description: 'Organisme de certification bio reconnu',
      details: 'Contrôle la qualité et l\'authenticité de nos produits bio',
      color: 'bg-primary-forest'
    },
    {
      id: 'natrue',
      name: 'NATRUE',
      logo: 'natrue-logo.svg',
      description: 'Standard international cosmétique naturel',
      details: 'Garantit l\'origine naturelle et l\'intégrité des ingrédients',
      color: 'bg-accent-lavender'
    },
    {
      id: 'cradle',
      name: 'Cradle to Cradle',
      logo: 'c2c-logo.svg',
      description: 'Économie circulaire certifiée',
      details: 'Tous nos emballages sont 100% recyclables ou compostables',
      color: 'bg-accent-terracotta'
    },
    {
      id: 'fair',
      name: 'Fair Trade',
      logo: 'fairtrade-logo.svg',
      description: 'Commerce équitable certifié',
      details: 'Prix justes et conditions équitables pour nos producteurs',
      color: 'bg-primary-gold'
    }
  ];

  // Timeline de l'histoire de la marque
  const brandStory = [
    {
      year: '2018',
      title: 'Naissance du Projet',
      description: 'Création de la marque pour répondre aux besoins spécifiques des peaux afro',
      milestone: 'Fondation'
    },
    {
      year: '2019',
      title: 'Partenariat Afrique',
      description: 'Première coopérative de karité au Burkina Faso, soutenant 150 femmes',
      milestone: 'Solidarité'
    },
    {
      year: '2021',
      title: 'IA Personnalisée',
      description: 'Algorithme spécialisé pour les tons de peau foncés et métissés',
      milestone: 'Innovation'
    },
    {
      year: '2023',
      title: 'Recherche Dédiée',
      description: 'Laboratoire spécialisé dans les problématiques de pigmentation',
      milestone: 'Expertise'
    },
    {
      year: '2024',
      title: 'Prix de l\'Inclusion',
      description: 'Reconnaissance internationale pour notre engagement en faveur de la diversité',
      milestone: 'Reconnaissance'
    }
  ];

  const currentValue = coreValues[activeTab];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-secondary-cream to-white overflow-hidden"
      aria-label="Nos valeurs et engagements bio"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="bg-organic-pattern w-full h-full" />
      </div>

      <div className="container mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-primary-gold/10 px-6 py-3 rounded-full mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <SparklesIcon className="w-5 h-5 text-primary-gold" />
            <span className="text-primary-forest font-semibold">Nos Valeurs Authentiques</span>
          </motion.div>
          
          <h2 className="text-heading-2xl font-bold text-primary-forest mb-6 leading-tight">
            La Beauté Afro au Naturel
            <span className="block text-primary-gold">Révélez Votre Éclat Authentique</span>
          </h2>
          
          <p className="text-body text-primary-sage max-w-3xl mx-auto leading-relaxed">
            Depuis 2018, nous créons des cosmétiques bio d'exception en célébrant la beauté 
            afro et en respectant les traditions ancestrales. Découvrez nos formules enrichies 
            en ingrédients africains pour une peau éclatante et nourrie en profondeur.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="glass-morphism rounded-organic p-2 shadow-organic">
            <div className="flex gap-2">
              {Object.entries(coreValues).map(([key, value]) => {
                const IconComponent = value.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-organic-sm transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-primary-forest text-white shadow-glow'
                        : 'text-primary-sage hover:bg-primary-sage/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium hidden sm:block">{value.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content Principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Contenu Textuel */}
          <motion.div
            className="space-y-8"
            style={{ y, opacity }}
          >
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                {React.createElement(currentValue.icon, {
                  className: "w-12 h-12 text-primary-gold"
                })}
                <div>
                  <h3 className="text-heading-lg font-bold text-primary-forest">
                    {currentValue.title}
                  </h3>
                  <p className="text-primary-sage font-medium">
                    {currentValue.subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-body text-primary-sage leading-relaxed mb-8">
                {currentValue.description}
              </p>
              
              {/* Métriques */}
              <div className="grid grid-cols-3 gap-6">
                {currentValue.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 bg-white/60 rounded-organic shadow-organic-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-primary-sage font-medium">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Visuel Dynamique */}
          <motion.div
            className="relative"
            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          >
            <motion.div
              key={activeTab}
              className="relative w-full h-[500px] rounded-organic-lg overflow-hidden shadow-organic-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-secondary-stone to-secondary-linen flex items-center justify-center overflow-hidden">
                <img src={currentValue.visual} alt={currentValue.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary-forest/5"></div>
              </div>
              
              {/* Overlay avec effet glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Badge flottant */}
              <motion.div
                className="absolute top-6 right-6 bg-primary-gold/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring" }}
              >
                {currentValue.title}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Section Certifications */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
              Certifications & Labels de Qualité
            </h3>
            <p className="text-primary-sage max-w-2xl mx-auto">
              Nos engagements sont reconnus par les organismes les plus exigeants
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((certif, index) => (
              <motion.div
                key={certif.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onMouseEnter={() => setHoveredCertif(certif.id)}
                onMouseLeave={() => setHoveredCertif(null)}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                <div className={`w-24 h-24 ${certif.color} rounded-full flex items-center justify-center shadow-organic group-hover:shadow-organic-lg transition-all duration-300`}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-forest">
                      {certif.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
                
                {/* Tooltip */}
                {hoveredCertif === certif.id && (
                  <motion.div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 bg-white rounded-organic p-4 shadow-organic-lg border border-primary-sage/20 z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <h4 className="font-bold text-primary-forest mb-2">{certif.name}</h4>
                    <p className="text-sm text-primary-sage mb-2">{certif.description}</p>
                    <p className="text-xs text-primary-sage/70">{certif.details}</p>
                    
                    {/* Flèche */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Histoire de la Marque */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
              Notre Histoire Bio
            </h3>
            <p className="text-primary-sage max-w-2xl mx-auto">
              6 années d'innovation et d'engagement pour une beauté plus responsable
            </p>
          </div>
          
          <div className="relative">
            {/* Ligne centrale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-gold via-accent-moss to-primary-gold rounded-full" />
            
            <div className="space-y-12">
              {brandStory.map((story, index) => (
                <motion.div
                  key={story.year}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.15 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="glass-morphism rounded-organic p-6 shadow-organic max-w-md ml-auto">
                      <div className="text-primary-gold font-bold text-lg mb-2">
                        {story.year}
                      </div>
                      <h4 className="text-primary-forest font-bold text-xl mb-3">
                        {story.title}
                      </h4>
                      <p className="text-primary-sage leading-relaxed">
                        {story.description}
                      </p>
                      <div className="inline-block mt-3 px-3 py-1 bg-accent-moss/20 text-accent-moss text-sm font-medium rounded-full">
                        {story.milestone}
                      </div>
                    </div>
                  </div>
                  
                  {/* Point sur la timeline */}
                  <motion.div
                    className="relative z-10 w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center shadow-glow"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full" />
                  </motion.div>
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="glass-morphism rounded-organic p-8 shadow-organic-lg max-w-3xl mx-auto">
            <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
              Prêt(e) à Découvrir nos Produits ?
            </h3>
            <p className="text-primary-sage mb-6">
              Explorez notre gamme de cosmétiques bio premium, créée avec passion 
              et certifiée par les labels les plus exigeants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setCurrentPage && setCurrentPage('products')}
                className="btn-primary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos Produits
              </motion.button>
              
              <motion.button
                onClick={() => setCurrentPage && setCurrentPage('about')}
                className="btn-secondary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Notre Manifeste Bio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection; 