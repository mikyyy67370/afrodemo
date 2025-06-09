import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  StarIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  CheckCircleIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  FireIcon,
  BeakerIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ArrowPathIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';

const TestimonialsSection = ({ userProfile, setCurrentPage }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Témoignages authentiques de clientes afro
  const testimonials = [
    {
      id: 1,
      name: "Fatou Diop",
      age: 28,
      location: "Paris",
      skinType: "Peau mixte à tendance grasse",
      concern: "Hyperpigmentation",
      products: ["Sérum Vitamine C", "Crème SPF30"],
      rating: 5,
      title: "Ma peau a retrouvé son éclat naturel !",
      text: "Après 3 mois d'utilisation du sérum vitamine C Terrafro, mes taches brunes ont considérablement diminué. Enfin un produit qui comprend vraiment les besoins des peaux noires ! Je recommande vivement.",
      beforeAfter: {
        before: "testimonial-fatou-before.jpg",
        after: "testimonial-fatou-after.jpg"
      },
      results: ["85% réduction des taches", "Teint plus uniforme", "Peau plus lumineuse"],
      verified: true,
      date: "Il y a 2 semaines",
      category: "hyperpigmentation",
      featured: true
    },
    {
      id: 2,
      name: "Aminata Keita",
      age: 35,
      location: "Lyon",
      skinType: "Peau très sèche",
      concern: "Sécheresse extrême",
      products: ["Baume Karité", "Huile Trio Africain"],
      rating: 5,
      title: "Une transformation incroyable pour ma peau sèche",
      text: "Le baume au karité de Terrafro a sauvé ma peau ! Après des années à chercher le bon produit, j'ai enfin trouvé une formule qui nourrit vraiment en profondeur. Ma peau est douce comme jamais.",
      beforeAfter: {
        before: "testimonial-aminata-before.jpg",
        after: "testimonial-aminata-after.jpg"
      },
      results: ["Hydratation 24h", "Fini les tiraillements", "Peau veloutée"],
      verified: true,
      date: "Il y a 1 mois",
      category: "nutrition",
      featured: true
    },
    {
      id: 3,
      name: "Aicha Bamba",
      age: 25,
      location: "Marseille",
      skinType: "Peau sensible",
      concern: "Irritations et rougeurs",
      products: ["Lait Karité", "Masque Argile Rose"],
      rating: 5,
      title: "Enfin des produits adaptés à ma peau sensible",
      text: "En tant que personne à la peau très sensible, j'avais peur d'essayer de nouveaux produits. Terrafro a été une révélation ! Aucune irritation, que du bonheur. Le lait démaquillant est si doux.",
      beforeAfter: {
        before: "testimonial-aicha-before.jpg",
        after: "testimonial-aicha-after.jpg"
      },
      results: ["Zéro irritation", "Peau apaisée", "Confort retrouvé"],
      verified: true,
      date: "Il y a 3 semaines",
      category: "sensible"
    },
    {
      id: 4,
      name: "Khadija Sy",
      age: 42,
      location: "Toulouse",
      skinType: "Peau mature",
      concern: "Perte d'éclat et fermeté",
      products: ["Huile Trio Africain", "Sérum Vitamine C"],
      rating: 5,
      title: "Ma peau a retrouvé sa jeunesse",
      text: "À 42 ans, je pensais que ma peau avait perdu son éclat pour toujours. L'huile Trio Africain de Terrafro m'a prouvé le contraire. Ma peau est plus ferme, plus lumineuse. Je me sens belle !",
      beforeAfter: {
        before: "testimonial-khadija-before.jpg",
        after: "testimonial-khadija-after.jpg"
      },
      results: ["Peau plus ferme", "Éclat retrouvé", "Rides atténuées"],
      verified: true,
      date: "Il y a 6 semaines",
      category: "eclat"
    },
    {
      id: 5,
      name: "Mariam Traore",
      age: 30,
      location: "Bordeaux",
      skinType: "Peau acnéique",
      concern: "Acné et cicatrices",
      products: ["Masque Argile Rose", "Sérum Vitamine C"],
      rating: 4,
      title: "Mes cicatrices d'acné s'estompent",
      text: "Après des années de lutte contre l'acné, Terrafro m'aide enfin à retrouver confiance. Le masque à l'argile rose purifie sans agresser, et mes cicatrices s'estompent progressivement.",
      beforeAfter: {
        before: "testimonial-mariam-before.jpg",
        after: "testimonial-mariam-after.jpg"
      },
      results: ["Moins d'imperfections", "Cicatrices atténuées", "Peau purifiée"],
      verified: true,
      date: "Il y a 2 mois",
      category: "hyperpigmentation"
    },
    {
      id: 6,
      name: "Safiatou Diouf",
      age: 26,
      location: "Nantes",
      skinType: "Peau normale",
      concern: "Maintien de l'éclat",
      products: ["Routine complète Terrafro"],
      rating: 5,
      title: "Une routine parfaite pour entretenir ma peau",
      text: "J'ai adopté toute la gamme Terrafro et ma peau n'a jamais été aussi belle ! C'est un investissement, mais ça vaut vraiment le coup. Mes amies me demandent toujours quel est mon secret.",
      beforeAfter: {
        before: "testimonial-safiatou-before.jpg",
        after: "testimonial-safiatou-after.jpg"
      },
      results: ["Peau éclatante", "Texture affinée", "Confiance en soi"],
      verified: true,
      date: "Il y a 1 semaine",
      category: "eclat",
      featured: true
    }
  ];

  // Catégories de témoignages avec icônes professionnelles
  const categories = [
    { 
      id: 'all', 
      name: 'Tous les avis', 
      count: testimonials.length, 
      icon: ChatBubbleBottomCenterTextIcon,
      color: 'text-primary-sage'
    },
    { 
      id: 'hyperpigmentation', 
      name: 'Anti-taches', 
      count: 2, 
      icon: SparklesIcon,
      color: 'text-primary-gold'
    },
    { 
      id: 'nutrition', 
      name: 'Nutrition', 
      count: 1, 
      icon: BeakerIcon,
      color: 'text-accent-moss'
    },
    { 
      id: 'sensible', 
      name: 'Peaux sensibles', 
      count: 1, 
      icon: ShieldCheckIcon,
      color: 'text-accent-lavender'
    },
    { 
      id: 'eclat', 
      name: 'Éclat', 
      count: 2, 
      icon: FireIcon,
      color: 'text-accent-terracotta'
    }
  ];

  // Statistiques globales avec icônes Terrafro
  const stats = [
    { 
      value: '4.9', 
      label: 'Note moyenne', 
      icon: StarIcon,
      color: 'text-primary-gold'
    },
    { 
      value: '15,247', 
      label: 'Avis vérifiés', 
      icon: CheckCircleIcon,
      color: 'text-accent-moss'
    },
    { 
      value: '97%', 
      label: 'Recommandent', 
      icon: HandThumbUpIcon,
      color: 'text-accent-lavender'
    },
    { 
      value: '89%', 
      label: 'Rachètent', 
      icon: ArrowPathIcon,
      color: 'text-accent-terracotta'
    }
  ];

  // Filtrage des témoignages
  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  // Navigation du carrousel
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      (prev + 1) % filteredTestimonials.length
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  // Auto-play du carrousel
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [filteredTestimonials.length]);

  // Reset active testimonial when changing category
  useEffect(() => {
    setActiveTestimonial(0);
  }, [selectedCategory]);

  const currentTestimonial = filteredTestimonials[activeTestimonial];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-secondary-cream to-white overflow-hidden"
      aria-label="Témoignages de nos clientes"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="bg-organic-pattern w-full h-full" />
      </div>

      <div className="container mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-primary-gold/10 px-6 py-3 rounded-full mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <HeartIcon className="w-5 h-5 text-primary-gold" />
            <span className="text-primary-forest font-semibold">Témoignages Authentiques</span>
          </motion.div>
          
          <h2 className="text-heading-2xl font-bold text-primary-forest mb-6 leading-tight">
            Elles Ont Retrouvé Confiance
            <span className="block text-primary-gold">Grâce à Terrafro</span>
          </h2>
          
          <p className="text-body text-primary-sage max-w-3xl mx-auto leading-relaxed">
            Découvrez les transformations remarquables de nos clientes. Des résultats 
            visibles, des témoignages sincères, une confiance retrouvée. Rejoignez 
            notre communauté de femmes qui célèbrent leur beauté naturelle.
          </p>
        </motion.div>

        {/* Statistiques avec icônes professionnelles */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-organic shadow-organic border border-primary-sage/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center">
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-forest mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-sage font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filtres par catégorie avec icônes élégantes */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-forest text-white border-primary-forest shadow-glow'
                    : 'bg-white text-primary-forest border-primary-sage/30 hover:border-primary-gold hover:bg-primary-gold/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className={`w-5 h-5 ${
                  selectedCategory === category.id ? 'text-white' : category.color
                }`} />
                <span className="font-semibold">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id ? 'bg-white/20' : 'bg-primary-sage/20'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Carrousel de témoignages principal */}
        <motion.div
          className="relative max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {currentTestimonial && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${activeTestimonial}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Photo Avant/Après */}
                <div className="relative">
                  <div className="relative bg-white rounded-organic-lg p-6 shadow-organic-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="relative">
                        <div className="aspect-square bg-secondary-stone rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary-sage/20 to-accent-moss/20 flex items-center justify-center">
                            <span className="text-primary-sage text-sm font-medium">Avant</span>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 bg-white/90 text-primary-forest text-xs font-bold px-2 py-1 rounded-full">
                          Avant
                        </div>
                      </div>
                      <div className="relative">
                        <div className="aspect-square bg-secondary-stone rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary-gold/20 to-accent-lavender/20 flex items-center justify-center">
                            <span className="text-primary-gold text-sm font-medium">Après</span>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 bg-primary-gold text-white text-xs font-bold px-2 py-1 rounded-full">
                          Après
                        </div>
                      </div>
                    </div>
                    
                    {/* Résultats */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary-forest mb-2">
                        Résultats obtenus :
                      </p>
                      {currentTestimonial.results.map((result, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-primary-gold" />
                          <span className="text-sm text-primary-sage">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Témoignage */}
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-6 h-6 ${
                            i < currentTestimonial.rating
                              ? 'text-primary-gold fill-current'
                              : 'text-primary-sage/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-primary-sage">
                      {currentTestimonial.rating}/5
                    </span>
                  </div>

                  {/* Titre du témoignage */}
                  <h3 className="text-heading-lg font-bold text-primary-forest">
                    {currentTestimonial.title}
                  </h3>

                  {/* Texte du témoignage */}
                  <blockquote className="text-body text-primary-sage leading-relaxed italic border-l-4 border-primary-gold pl-6">
                    "{currentTestimonial.text}"
                  </blockquote>

                  {/* Informations cliente */}
                  <div className="flex items-center gap-4 p-4 bg-primary-gold/10 rounded-organic">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <UserCircleIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-primary-forest">
                          {currentTestimonial.name}
                        </h4>
                        {currentTestimonial.verified && (
                          <CheckCircleIcon className="w-4 h-4 text-primary-gold" />
                        )}
                      </div>
                      <p className="text-sm text-primary-sage">
                        {currentTestimonial.age} ans • {currentTestimonial.location}
                      </p>
                      <p className="text-xs text-primary-sage/80">
                        {currentTestimonial.skinType} • {currentTestimonial.date}
                      </p>
                    </div>
                  </div>

                  {/* Produits utilisés */}
                  <div>
                    <p className="text-sm font-semibold text-primary-forest mb-2">
                      Produits utilisés :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentTestimonial.products.map((product, index) => (
                        <span
                          key={index}
                          className="bg-accent-moss/10 text-accent-moss text-sm px-3 py-1 rounded-full"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Navigation du carrousel */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-organic flex items-center justify-center text-primary-sage hover:text-primary-gold hover:shadow-organic-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </motion.button>

            {/* Indicateurs */}
            <div className="flex gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial
                      ? 'bg-primary-gold'
                      : 'bg-primary-sage/30 hover:bg-primary-sage/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-organic flex items-center justify-center text-primary-sage hover:text-primary-gold hover:shadow-organic-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Grille de témoignages secondaires */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {testimonials.slice(1, 4).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10 hover:shadow-organic-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-primary-gold fill-current'
                          : 'text-primary-sage/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-primary-sage">
                  {testimonial.rating}/5
                </span>
              </div>

              {/* Titre */}
              <h4 className="font-bold text-primary-forest mb-3">
                {testimonial.title}
              </h4>

              {/* Extrait du témoignage */}
              <p className="text-sm text-primary-sage leading-relaxed mb-4">
                "{testimonial.text.substring(0, 120)}..."
              </p>

              {/* Info cliente */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary-forest text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-primary-sage">
                    {testimonial.location} • {testimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-gradient-to-r from-primary-gold/10 to-accent-moss/10 rounded-organic-lg p-8 border border-primary-gold/20">
            <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
              Prête à rejoindre nos clientes satisfaites ?
            </h3>
            <p className="text-primary-sage mb-6 max-w-2xl mx-auto">
              Commencez votre transformation dès aujourd'hui avec notre diagnostic 
              personnalisé gratuit et découvrez les produits parfaits pour votre peau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setCurrentPage && setCurrentPage('diagnostic')}
                className="inline-flex items-center gap-3 bg-primary-forest text-white px-8 py-4 rounded-full font-semibold shadow-glow hover:shadow-glow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SparklesIcon className="w-6 h-6" />
                Diagnostic gratuit
              </motion.button>
              <motion.button
                onClick={() => setCurrentPage && setCurrentPage('contact')}
                className="inline-flex items-center gap-3 bg-white text-primary-forest px-8 py-4 rounded-full font-semibold border-2 border-primary-forest hover:bg-primary-forest hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                Laisser un avis
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;