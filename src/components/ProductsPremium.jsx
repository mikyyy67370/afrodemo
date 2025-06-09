import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  StarIcon,
  HeartIcon,
  ShoppingBagIcon,
  SparklesIcon,
  BeakerIcon,
  FireIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';

const ProductsPremium = ({ userProfile, setCurrentPage, setSelectedProductId }) => {
  const { addToCart, addNotification } = useShop();
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Filtres avec icônes professionnelles
  const filters = [
    { id: 'all', name: 'Tous nos produits', icon: SparklesIcon, color: 'text-primary-gold' },
    { id: 'anti-taches', name: 'Anti-Taches', icon: SparklesIcon, color: 'text-accent-moss' },
    { id: 'nutrition', name: 'Nutrition Intense', icon: BeakerIcon, color: 'text-accent-lavender' },
    { id: 'eclat', name: 'Éclat Naturel', icon: FireIcon, color: 'text-accent-terracotta' },
    { id: 'sensible', name: 'Peaux Sensibles', icon: ShieldCheckIcon, color: 'text-accent-coral' }
  ];

  // Produits avec ingrédients africains
  const products = [
    {
      id: 1,
      name: "Sérum Éclaircissant Vitamine C",
      subtitle: "Concentré anti-taches intensif",
      price: 48,
      rating: 4.9,
      reviews: 2847,
      image: "serum-vitc.jpg",
      category: 'anti-taches',
      badges: ['Bestseller', 'Anti-taches'],
      keyIngredient: "Vitamine C 15% + Niacinamide",
      aiScore: 98,
      description: "Notre sérum le plus puissant pour réduire l'hyperpigmentation et révéler un teint uniforme."
    },
    {
      id: 2,
      name: "Baume Karité Nutrition Extrême",
      subtitle: "Réparateur intensif nuit",
      price: 36,
      rating: 4.8,
      reviews: 1954,
      image: "creme-aloe.jpg",
      category: 'nutrition',
      badges: ['100% Karité', 'Réparateur'],
      keyIngredient: "Karité Brut + Huile de Baobab",
      aiScore: 96,
      description: "Baume onctueux au karité brut du Burkina Faso pour une nutrition intense des peaux très sèches."
    },
    {
      id: 3,
      name: "Huile Précieuse Trio Africain",
      subtitle: "Élixir de beauté ancestral",
      price: 42,
      rating: 4.9,
      reviews: 1876,
      image: "huile-argan.jpg",
      category: 'eclat',
      badges: ['Éclat', 'Bio'],
      keyIngredient: "Argan + Baobab + Marula",
      aiScore: 94,
      description: "Synergie de trois huiles précieuses d'Afrique pour un éclat naturel incomparable."
    },
    {
      id: 4,
      name: "Crème Hydratante Karité",
      subtitle: "Hydratation quotidienne intense",
      price: 26,
      rating: 4.8,
      reviews: 1876,
      image: "creme-hydratante.jpg",
      category: 'nutrition',
      badges: ['Hydratant', 'Quotidien'],
      keyIngredient: "Karité + Aloe Vera Bio",
      aiScore: 92,
      description: "Crème hydratante onctueuse au karité pour un confort quotidien optimal."
    },
    {
      id: 5,
      name: "Masque Éclat Argile Bleu",
      subtitle: "Purification douce et illumination",
      price: 28,
      rating: 4.8,
      reviews: 1287,
      image: "masque-argile.jpg",
      category: 'eclat',
      badges: ['Argile Bleu', 'Illuminant'],
      keyIngredient: "Argile Bleu + Hibiscus",
      aiScore: 89,
      description: "Masque purifiant ultra-doux à l'argile bleu du Maroc et extraits d'hibiscus."
    },
    {
      id: 6,
      name: "Lait Démaquillant Karité",
      subtitle: "Nettoyage doux et nutrition",
      price: 24,
      rating: 4.9,
      reviews: 2156,
      image: "lait-calendula.jpg",
      category: 'sensible',
      badges: ['Extra-Doux', 'Nourrissant'],
      keyIngredient: "Karité + Calendula Bio",
      aiScore: 93,
      description: "Lait démaquillant onctueux qui nettoie en douceur sans agresser les peaux sensibles."
    }
  ];

  // Filtrage des produits
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-secondary-cream">
      <div className="container mx-auto px-4">
        
        {/* En-tête avec IA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-primary-gold/10 text-primary-gold px-6 py-3 rounded-full mb-6 border border-primary-gold/20">
            <SparklesIcon className="w-6 h-6" />
            <span className="font-semibold">Recommandations IA personnalisées</span>
          </div>
          
          <h2 className="text-heading-2xl font-bold text-primary-forest mb-6">
            Nos Produits Premium
          </h2>
          <p className="text-body text-primary-sage max-w-3xl mx-auto">
            Découvrez notre gamme exclusive de cosmétiques bio formulés avec les meilleurs 
            ingrédients africains pour sublimer votre beauté naturelle.
          </p>
        </motion.div>

        {/* Filtres intelligents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary-forest text-white border-primary-forest shadow-glow'
                    : 'bg-white text-primary-forest border-primary-sage/30 hover:border-primary-gold hover:bg-primary-gold/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className={`w-5 h-5 ${
                  activeFilter === filter.id ? 'text-white' : filter.color
                }`} />
                <span className="font-semibold">{filter.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grille de produits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group bg-white rounded-organic-lg shadow-organic hover:shadow-organic-lg overflow-hidden border border-primary-sage/10"
              whileHover={{ y: -8 }}
            >
              {/* Image avec overlay */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={`/images/products/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badges.map((badge, badgeIndex) => (
                    <motion.span
                      key={badgeIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + badgeIndex * 0.1 }}
                      className="bg-primary-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
                
                {/* Bouton favori */}
                <div className="absolute top-4 right-4">
                  <motion.button
                    onClick={() => toggleFavorite(product.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                      favorites.has(product.id)
                        ? 'bg-accent-coral text-white shadow-glow'
                        : 'bg-white/80 text-primary-sage hover:text-accent-coral hover:bg-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HeartIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Actions au survol */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => {
                        if (setSelectedProductId && setCurrentPage) {
                          setSelectedProductId(product.id);
                          setCurrentPage('product-detail');
                        }
                      }}
                      className="flex-1 bg-white/90 backdrop-blur-md text-primary-forest font-semibold py-2 px-4 rounded-lg hover:bg-white transition-all text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <EyeIcon className="w-4 h-4 inline mr-2" />
                      Voir détails
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        addToCart(product);
                        addNotification({
                          type: 'success',
                          title: 'Produit ajouté !',
                          message: `${product.name} ajouté au panier`,
                          duration: 3000
                        });
                      }}
                      className="bg-primary-forest text-white p-2 rounded-organic hover:bg-primary-forest/90 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingBagIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                {/* Rating et match IA */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-primary-gold fill-current'
                              : 'text-primary-sage/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-primary-sage">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  {userProfile && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="bg-primary-gold/10 text-primary-gold text-xs font-bold px-2 py-1 rounded-full border border-primary-gold/30"
                    >
                      {product.aiScore}% match
                    </motion.div>
                  )}
                </div>

                {/* Titre et description */}
                <h3 className="font-bold text-primary-forest mb-2 group-hover:text-primary-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-primary-sage text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Ingrédient clé */}
                <div className="flex items-center gap-2 mb-4 p-2 bg-secondary-cream/50 rounded-organic">
                  <BeakerIcon className="w-4 h-4 text-accent-moss" />
                  <span className="text-xs font-medium text-primary-forest">
                    {product.keyIngredient}
                  </span>
                </div>

                {/* Prix et actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary-gold">
                      {product.price || 0}€
                    </span>
                  </div>
                  
                  <motion.button
                    className="bg-primary-forest text-white p-2 rounded-organic hover:bg-primary-forest/90 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-gold/10 to-accent-moss/10 rounded-organic-lg p-8 border border-primary-gold/20">
            <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
              Découvrez votre routine idéale
            </h3>
            <p className="text-primary-sage mb-6 max-w-2xl mx-auto">
              Notre diagnostic IA analyse vos besoins spécifiques pour vous recommander 
              les produits parfaitement adaptés à votre peau.
            </p>
            <motion.button
              onClick={() => setCurrentPage('diagnostic')}
              className="bg-primary-forest text-white px-8 py-4 rounded-full font-semibold shadow-glow hover:bg-primary-forest/90 hover:shadow-glow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SparklesIcon className="w-6 h-6 inline mr-2" />
              Faire mon diagnostic gratuit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsPremium; 