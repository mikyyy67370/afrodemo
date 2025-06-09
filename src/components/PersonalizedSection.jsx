import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  SparklesIcon,
  HeartIcon,
  ShoppingBagIcon,
  EyeIcon,
  StarIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

const PersonalizedSection = ({ userProfile, setCurrentPage, setSelectedProductId }) => {
  const [favorites, setFavorites] = useState([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Utiliser le Context pour les favoris et le panier
  const { addToCart, addToFavorites, removeFromFavorites } = useShop();

  // Gestion des favoris
  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === product.id);
      if (isFavorite) {
        removeFromFavorites(product.id);
        return prev.filter(fav => fav.id !== product.id);
      } else {
        addToFavorites(product);
        return [...prev, product];
      }
    });
  };

  // Produits recommandés personnalisés
  const getPersonalizedRecommendations = () => {
    if (!userProfile) return products; // Retourner tous les produits
    
    const userConcerns = userProfile.skinConcerns || [];
    
    // Mapping des préoccupations utilisateur vers les préoccupations produits
    const concernsMapping = {
      'hydratation': ['Déshydratation', 'Sécheresse', 'Tiraillements'],
      'eclat': ['Manque d\'éclat', 'Teint terne', 'Vieillissement'],
      'taches_brunes': ['Hyperpigmentation', 'Taches brunes'],
      'anti_age': ['Vieillissement', 'Anti-âge'],
      'sensibilite': ['Sensibilité', 'Peaux sensibles'],
      'purete': ['Impuretés', 'Pores dilatés'],
      'nettoyage': ['Démaquillage', 'Nettoyage doux']
    };
    
    const recommendedProducts = products.filter(product => {
      // Vérifier si les préoccupations du produit correspondent aux préoccupations de l'utilisateur
      return userConcerns.some(userConcern => {
        const mappedConcerns = concernsMapping[userConcern] || [];
        return product.concerns?.some(productConcern => 
          mappedConcerns.some(mapped => 
            productConcern.toLowerCase().includes(mapped.toLowerCase()) ||
            mapped.toLowerCase().includes(productConcern.toLowerCase())
          )
        );
      });
    });
    
    // Retourner tous les produits recommandés ou tous les produits s'il n'y a pas de correspondance
    return recommendedProducts.length > 0 ? recommendedProducts : products;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-secondary-cream via-white to-secondary-linen overflow-hidden"
      aria-label="Nos recommandations personnalisées"
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
            <span className="block text-primary-gold">Collection Complète</span>
            Cosmétiques Bio d'Exception
          </h2>
          <p className="text-sm sm:text-base lg:text-body text-primary-sage max-w-2xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de {products.length} produits exclusifs enrichis en ingrédients africains premium.
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {getPersonalizedRecommendations().map((product, index) => (
                <motion.div
                  key={`rec-${product.id}`}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-organic p-3 sm:p-4 border border-white/50 hover:bg-white transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative aspect-square bg-secondary-linen rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={`/images/products/${product.image}`} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Actions au survol */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                      <div className="absolute top-2 right-2">
                        <motion.button
                          onClick={() => toggleFavorite(product)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                            favorites.some(fav => fav.id === product.id)
                              ? 'bg-accent-coral text-white'
                              : 'bg-white/80 text-primary-sage hover:text-accent-coral'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title={favorites.some(fav => fav.id === product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                          <HeartIcon className="w-3 h-3" />
                        </motion.button>
                      </div>
                      
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => {
                              if (setSelectedProductId && setCurrentPage) {
                                setSelectedProductId(product.id);
                                setCurrentPage('product-detail');
                              }
                            }}
                            className="flex-1 bg-white/90 backdrop-blur-md text-primary-forest font-semibold py-1.5 px-2 rounded-lg hover:bg-white transition-all text-xs"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <EyeIcon className="w-3 h-3 inline mr-1" />
                            <span>Détails</span>
                          </motion.button>
                          <motion.button
                            onClick={() => addToCart(product)}
                            className="bg-primary-gold text-white px-2 py-1.5 rounded-lg hover:bg-primary-gold/90 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Ajouter au panier"
                          >
                            <ShoppingBagIcon className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-sm sm:text-base text-primary-forest mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-primary-sage mb-2">
                    {product.subtitle}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary-gold font-bold text-sm sm:text-base">
                      {product.price || 0}€
                    </span>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-3 h-3 text-primary-gold fill-current" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>
                  
                  {/* Boutons d'action toujours visibles */}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => {
                        if (setSelectedProductId && setCurrentPage) {
                          setSelectedProductId(product.id);
                          setCurrentPage('product-detail');
                        }
                      }}
                      className="flex-1 bg-primary-forest/10 text-primary-forest font-semibold py-2 px-3 rounded-lg hover:bg-primary-forest hover:text-white transition-all text-xs"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Voir détails
                    </motion.button>
                    <motion.button
                      onClick={() => addToCart(product)}
                      className="bg-primary-gold text-white px-4 py-2 rounded-lg hover:bg-primary-gold/90 transition-all text-xs font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Ajouter au panier"
                    >
                      Ajouter au panier
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PersonalizedSection;
