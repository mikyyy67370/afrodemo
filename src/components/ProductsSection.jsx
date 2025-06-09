import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon,
  HeartIcon,
  ShoppingBagIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  CheckIcon,
  StarIcon,
  BeakerIcon,
  ShieldCheckIcon,
  FireIcon,
  GiftIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';

const ProductsSection = ({ userProfile, setCurrentPage, setSelectedProductId }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Utiliser le Context pour les favoris et le panier
  const { favorites, addToFavorites, removeFromFavorites, addToCart } = useShop();

  // Fonction pour toggle les favoris (compatibilité)
  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Filtres de produits avec icônes professionnelles
  const filters = [
    {
      id: 'all',
      name: 'Tous les produits',
      count: 6,
      icon: GiftIcon,
      color: 'text-primary-sage'
    },
    {
      id: 'anti-taches',
      name: 'Anti-Taches',
      count: 3,
      icon: SparklesIcon,
      color: 'text-primary-gold'
    },
    {
      id: 'nutrition',
      name: 'Nutrition Intense',
      count: 2,
      icon: BeakerIcon,
      color: 'text-accent-moss'
    },
    {
      id: 'eclat',
      name: 'Éclat Naturel',
      count: 4,
      icon: FireIcon,
      color: 'text-accent-terracotta'
    },
    {
      id: 'sensible',
      name: 'Peaux Sensibles',
      count: 2,
      icon: ShieldCheckIcon,
      color: 'text-accent-lavender'
    }
  ];

  // Gamme de produits enrichie
  const products = [
    { 
      id: 1, 
      name: "Sérum Éclaircissant Vitamine C", 
      price: "48€", 
      rating: 4.9, 
      reviews: 1847,
      image: "serum-vitc.jpg",
      subtitle: "Concentré anti-taches intensif",
      category: "serums",
      badges: ["Best-seller", "Anti-taches"],
      ingredients: ['Vitamine C 15%', 'Niacinamide', 'Acide kojique'],
      benefits: ['Réduit les taches brunes', 'Unifie le teint', 'Éclat immédiat'],
      description: "Sérum haute performance pour réduire l'hyperpigmentation et unifier le teint."
    },
    { 
      id: 2, 
      name: "Baume Karité Nutrition Intense", 
      price: "36€", 
      rating: 4.8, 
      reviews: 2156,
      image: "creme-aloe.jpg",
      subtitle: "Réparateur intensif nuit",
      category: "cremes",
      badges: ["Bio", "Réparateur"],
      ingredients: ['Karité 30%', 'Aloe Vera', 'Vitamine E'],
      benefits: ['Nutrition 24h', 'Répare', 'Apaise'],
      description: "Baume onctueux qui nourrit et répare intensément les peaux sèches et abîmées."
    },
    { 
      id: 3, 
      name: "Huile Précieuse Trio Africain", 
      price: "42€", 
      rating: 4.9, 
      reviews: 1543,
      image: "huile-argan.jpg",
      subtitle: "Trio d'huiles précieuses",
      category: "huiles",
      badges: ["Premium", "Anti-âge"],
      ingredients: ['Huile d\'Argan', 'Huile de Baobab', 'Huile de Marula'],
      benefits: ['Éclat immédiat', 'Anti-âge', 'Nourrit'],
      description: "Synergie de trois huiles précieuses d'Afrique pour une peau éclatante et revitalisée."
    },
    { 
      id: 4, 
      name: "Crème Hydratante Karité", 
      price: "25€", 
      rating: 4.8, 
      reviews: 1876,
      image: "creme-hydratante.jpg",
      subtitle: "Hydratation quotidienne",
      category: "cremes",
      badges: ["Quotidien", "Tous types"],
      ingredients: ['Karité Bio', 'Acide Hyaluronique', 'Calendula'],
      benefits: ['Hydrate 24h', 'Protège', 'Confort'],
      description: "Crème hydratante quotidienne qui protège et maintient l'hydratation de la peau."
    },
    { 
      id: 5, 
      name: "Masque Argile Bleu Purifiante", 
      price: "28€", 
      rating: 4.6, 
      reviews: 743,
      image: "masque-argile.jpg",
      subtitle: "Purification intense",
      category: "masques",
      badges: ["Détox", "Sensible"],
      ingredients: ['Argile Bleu', 'Poudre de Riz', 'Extrait de Hibiscus'],
      benefits: ['Purifie en douceur', 'Illumine', 'Affine le grain'],
      description: "Masque purifiant ultra-doux à l'argile Bleu, spécialement formulé pour les peaux sensibles."
    },
    { 
      id: 6, 
      name: "Lait Démaquillant Karité", 
      price: "24€", 
      rating: 4.9, 
      reviews: 2156,
      image: "lait-calendula.jpg",
      subtitle: "Nettoyage doux",
      category: "nettoyants",
      badges: ["Extra-Doux", "Nourrissant"],
      ingredients: ['Karité Bio', 'Calendula', 'Camomille'],
      benefits: ['Démaquille parfaitement', 'Nourrit', 'Apaise'],
      description: "Lait démaquillant onctueux qui nettoie en douceur tout en nourrissant votre peau."
    }
  ];

  // Filtrage des produits
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category.includes(activeFilter));

  // Produits recommandés
  const getRecommendations = () => {
    if (!userProfile) return products.slice(0, 3);
    
    const userConcerns = userProfile.skinConcerns || [];
    const recommendedProducts = products
      .filter(product => 
        userConcerns.some(concern => product.category.includes(concern))
      )
      .slice(0, 3);
    
    return recommendedProducts.length > 0 ? recommendedProducts : products.slice(0, 3);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-secondary-cream via-white to-secondary-linen overflow-hidden"
      aria-label="Nos produits cosmétiques bio"
    >
      {/* Background Pattern Sophistiqué */}
      <div className="absolute inset-0 opacity-30">
        <div className="bg-organic-pattern w-full h-full" />
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6">
        
        {/* En-tête Section avec micro-animations */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-primary-gold/10 rounded-full border border-primary-gold/30 mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-gold" />
            <span className="text-xs sm:text-sm font-semibold text-primary-forest">Sélection Premium</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-heading-xl font-bold text-primary-forest mb-4 sm:mb-6">
            <span className="block text-primary-gold">Spécialement Conçus pour Vous</span>
            Cosmétiques Bio d'Exception
          </h2>
          <p className="text-sm sm:text-base lg:text-body text-primary-sage max-w-2xl mx-auto leading-relaxed">
            Découvrez notre gamme exclusive enrichie en ingrédients africains premium.
          </p>
        </motion.div>

        {/* Recommandations Personnalisées */}
        {userProfile && (
          <motion.div
            className="mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-gold" />
                <h3 className="text-lg sm:text-xl lg:text-heading-lg font-bold text-primary-forest">
                  Sélection personnalisée pour {userProfile.firstName}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-primary-sage">
                Basée sur vos préoccupations : {userProfile.skinConcerns?.join(', ')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {getRecommendations().map((product, index) => (
                <motion.div
                  key={`rec-${product.id}`}
                  className="relative bg-white/80 backdrop-blur-sm rounded-organic p-3 sm:p-4 border border-white/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-square bg-secondary-linen rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={`/images/products/${product.image}`} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h4 className="font-bold text-sm sm:text-base text-primary-forest mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-primary-sage mb-2">
                    {product.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-gold font-bold text-sm sm:text-base">
                      {product.price || 0}
                    </span>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-3 h-3 text-primary-gold fill-current" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filtres responsive */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full border-2 transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-primary-forest text-white border-primary-forest shadow-glow'
                    : 'bg-white text-primary-forest border-primary-sage/30 hover:border-primary-gold hover:bg-primary-gold/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  activeFilter === filter.id ? 'text-white' : filter.color
                }`} />
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm">{filter.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeFilter === filter.id ? 'bg-white/20' : 'bg-primary-sage/20'
                    }`}>
                      {filter.count}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grille de Produits responsive */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-organic-lg shadow-organic hover:shadow-organic-lg overflow-hidden border border-primary-sage/10"
                whileHover={{ y: -8 }}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={`/images/products/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                      {product.badges.map((badge, badgeIndex) => (
                        <span 
                          key={badgeIndex}
                          className="bg-primary-gold text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-2">
                      <motion.button
                        onClick={() => toggleFavorite && toggleFavorite(product)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                          favorites && favorites.some(fav => fav.id === product.id)
                            ? 'bg-accent-coral text-white'
                            : 'bg-white/80 text-primary-sage hover:text-accent-coral'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={favorites && favorites.some(fav => fav.id === product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                      >
                        <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    </div>
                    
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex gap-2 sm:gap-3">
                        <motion.button
                          onClick={() => {
                            if (setSelectedProductId && setCurrentPage) {
                              setSelectedProductId(product.id);
                              setCurrentPage('product-detail');
                            }
                          }}
                          className="flex-1 bg-white/90 backdrop-blur-md text-primary-forest font-semibold py-2 px-3 sm:px-4 rounded-lg hover:bg-white transition-all text-xs sm:text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Voir détails</span>
                          <span className="sm:hidden">Détails</span>
                        </motion.button>
                        <motion.button
                          onClick={() => addToCart && addToCart(product)}
                          className="bg-primary-gold text-white p-2 rounded-lg hover:bg-primary-gold/90 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Ajouter au panier"
                        >
                          <ShoppingBagIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm sm:text-base text-primary-forest mb-1 group-hover:text-primary-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-primary-sage">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Ingrédients clés */}
                  <div className="mb-4">
                    <p className="text-xs text-primary-sage/80 mb-2">Ingrédients clés :</p>
                    <div className="flex flex-wrap gap-1">
                      {product.ingredients.slice(0, 2).map((ingredient, index) => (
                        <span 
                          key={index}
                          className="bg-accent-moss/10 text-accent-moss text-xs px-2 py-1 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {product.ingredients.length > 2 && (
                        <span className="text-xs text-primary-sage/60">
                          +{product.ingredients.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating & Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-primary-gold fill-current' 
                                : 'text-primary-sage/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-primary-sage">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl font-bold text-primary-gold">
                          {product.price || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bénéfices */}
                  <div className="mb-4">
                    <p className="text-xs text-primary-sage/80 mb-2">Bénéfices :</p>
                    <div className="flex flex-wrap gap-1">
                      {product.benefits.slice(0, 3).map((benefit, index) => (
                        <span 
                          key={index}
                          className="bg-primary-gold/10 text-primary-gold text-xs px-2 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => addToCart && addToCart(product)}
                    className="w-full bg-primary-forest text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-primary-forest/90 transition-all text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ajouter au panier • {product.price || 0}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={() => setCurrentPage && setCurrentPage('products')}
            className="bg-primary-gold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-organic font-semibold hover:bg-primary-gold/90 transition-all shadow-organic hover:shadow-organic-lg text-sm sm:text-base"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir toute la collection
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection; 