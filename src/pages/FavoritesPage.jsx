import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HeartIcon,
  ShoppingBagIcon,
  EyeIcon,
  StarIcon,
  TrashIcon,
  SparklesIcon,
  GiftIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const FavoritesPage = ({ setCurrentPage, setSelectedProductId }) => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Sérum Éclaircissant Vitamine C",
      price: 48,
      rating: 4.9,
      reviews: 1847,
      image: "serum-vitc.jpg",
      category: 'serums',
      badges: ['Best-seller', 'Anti-taches'],
      inStock: true,
      description: "Sérum haute performance pour réduire l'hyperpigmentation et unifier le teint."
    },
    {
      id: 3,
      name: "Huile Précieuse Trio Africain",
      price: 42,
      rating: 4.9,
      reviews: 1876,
      image: "huile-argan.jpg",
      inStock: true,
      category: 'huiles',
      badge: 'Bio'
    },
    {
      id: 5,
      name: "Masque Éclat Argile Bleu",
      price: 28,
      rating: 4.8,
      reviews: 1287,
      image: "masque-argile.jpg",
      inStock: false,
      category: 'masques',
      badge: 'Bientôt disponible'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const categories = [
    { id: 'all', name: 'Tous', count: favorites.length },
    { id: 'serums', name: 'Sérums', count: favorites.filter(f => f.category === 'serums').length },
    { id: 'huiles', name: 'Huiles', count: favorites.filter(f => f.category === 'huiles').length },
    { id: 'masques', name: 'Masques', count: favorites.filter(f => f.category === 'masques').length }
  ];

  const filteredFavorites = selectedCategory === 'all' 
    ? favorites 
    : favorites.filter(item => item.category === selectedCategory);

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (product) => {
    if (product.inStock) {
      console.log('Added to cart:', product.name);
      // Logique d'ajout au panier
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-secondary-cream to-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-accent-coral rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Mes Favoris ({favorites.length})
          </h1>
          <p className="text-body text-primary-sage">
            Retrouvez tous vos produits Terra Luxe préférés
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          // Favoris vides
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-accent-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-12 h-12 text-accent-coral" />
            </div>
            <h2 className="text-heading-lg font-bold text-primary-forest mb-4">
              Aucun favori pour le moment
            </h2>
            <p className="text-primary-sage mb-8 max-w-md mx-auto">
              Explorez nos produits et ajoutez vos coups de cœur en cliquant sur l'icône cœur
            </p>
            <motion.button
              onClick={() => setCurrentPage('products')}
              className="bg-primary-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-forest/90 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Découvrir nos produits
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Filtres par catégorie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-accent-coral text-white shadow-glow'
                      : 'bg-white text-primary-forest border-2 border-primary-sage/30 hover:border-accent-coral hover:text-accent-coral'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.name} ({category.count})
                </motion.button>
              ))}
            </motion.div>

            {/* Actions rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-4 mb-12"
            >
              <motion.button
                onClick={() => {
                  const inStockItems = favorites.filter(f => f.inStock);
                  inStockItems.forEach(item => addToCart(item));
                }}
                className="bg-primary-gold text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-gold/90 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <ShoppingBagIcon className="w-5 h-5 inline mr-2" />
                Tout ajouter au panier
              </motion.button>
              
              <motion.button
                className="bg-white text-primary-forest px-6 py-3 rounded-full font-semibold border-2 border-primary-forest hover:bg-primary-forest hover:text-white transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <ShareIcon className="w-5 h-5 inline mr-2" />
                Partager ma liste
              </motion.button>
            </motion.div>

            {/* Grille de favoris */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFavorites.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group bg-white rounded-organic-lg shadow-organic hover:shadow-organic-lg overflow-hidden border border-primary-sage/10"
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={`/images/products/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-primary-gold text-white' 
                          : 'bg-primary-sage text-white'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.button
                        onClick={() => removeFromFavorites(product.id)}
                        className="w-10 h-10 bg-accent-coral text-white rounded-full flex items-center justify-center shadow-glow hover:bg-accent-coral/90 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <TrashIcon className="w-5 h-5" />
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
                        >
                          <EyeIcon className="w-4 h-4 inline mr-2" />
                          Voir détails
                        </motion.button>
                        
                        {product.inStock ? (
                          <motion.button
                            onClick={() => addToCart(product)}
                            className="bg-primary-gold text-white p-2 rounded-lg hover:bg-primary-gold/90 transition-all"
                            whileHover={{ scale: 1.02 }}
                          >
                            <ShoppingBagIcon className="w-4 h-4" />
                          </motion.button>
                        ) : (
                          <motion.button
                            className="bg-primary-sage text-white p-2 rounded-lg cursor-not-allowed opacity-60"
                          >
                            <GiftIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                    
                    {/* Overlay pour produits indisponibles */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white text-primary-forest px-4 py-2 rounded-full font-semibold text-sm">
                          Bientôt disponible
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
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

                    {/* Titre */}
                    <h3 className="font-bold text-primary-forest mb-3 group-hover:text-primary-gold transition-colors">
                      {product.name}
                    </h3>

                    {/* Prix */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary-gold">
                          {product.price || 0}€
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <HeartIcon className="w-4 h-4 text-accent-coral fill-current" />
                        <span className="text-sm text-accent-coral font-semibold">
                          Favori
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA recommandations */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <div className="bg-gradient-to-r from-accent-coral/10 to-primary-gold/10 rounded-organic-lg p-8 border border-accent-coral/20">
                <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
                  Découvrez des produits similaires
                </h3>
                <p className="text-primary-sage mb-6">
                  Notre IA vous propose des recommandations basées sur vos favoris
                </p>
                <motion.button
                  onClick={() => setCurrentPage('products')}
                  className="bg-accent-coral text-white px-8 py-4 rounded-full font-semibold shadow-glow hover:bg-accent-coral/90 hover:shadow-glow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <SparklesIcon className="w-6 h-6 inline mr-2" />
                  Voir les recommandations
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 