import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  HeartIcon,
  ShoppingBagIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const ProductCardOptimized = memo(({
  product,
  onAddToCart,
  onToggleFavorite,
  onViewProduct,
  isFavorite = false,
  index = 0,
  className = ''
}) => {
  // Validation sécurisée du produit
  const safeProduct = {
    id: product?.id || 0,
    name: product?.name || 'Produit sans nom',
    price: product?.price || '0€',
    rating: parseFloat(product?.rating) || 4.5,
    reviews: parseInt(product?.reviews) || 0,
    image: product?.image || 'placeholder.webp',
    badges: Array.isArray(product?.badges) ? product.badges : [],
    inStock: product?.inStock !== false,
    description: product?.description || '',
    subtitle: product?.subtitle || ''
  };

  // Callbacks mémorisés pour éviter les re-renders
  const handleAddToCart = useCallback(() => {
    if (onAddToCart && safeProduct.inStock) {
      onAddToCart(safeProduct);
    }
  }, [onAddToCart, safeProduct]);

  const handleToggleFavorite = useCallback(() => {
    if (onToggleFavorite) {
      onToggleFavorite(safeProduct.id);
    }
  }, [onToggleFavorite, safeProduct.id]);

  const handleViewProduct = useCallback(() => {
    if (onViewProduct) {
      onViewProduct(safeProduct.id);
    }
  }, [onViewProduct, safeProduct.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-white rounded-organic-lg shadow-organic hover:shadow-organic-lg overflow-hidden border border-primary-sage/10 ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={`/images/products/${safeProduct.image}`}
          alt={safeProduct.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/images/placeholder.webp';
          }}
        />
        
        {/* Badges */}
        {safeProduct.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {safeProduct.badges.slice(0, 2).map((badge, badgeIndex) => (
              <span 
                key={badgeIndex}
                className="text-xs font-bold px-2 py-1 rounded-full bg-primary-gold text-white"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Actions rapides */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isFavorite 
                ? 'bg-accent-coral text-white' 
                : 'bg-white text-primary-sage hover:text-accent-coral'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HeartIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            onClick={handleViewProduct}
            className="p-2 bg-white text-primary-sage hover:text-primary-gold rounded-full shadow-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <EyeIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-primary-forest group-hover:text-primary-gold transition-colors text-sm sm:text-base line-clamp-2">
            {safeProduct.name}
          </h3>
          {safeProduct.subtitle && (
            <p className="text-xs text-primary-sage mt-1">
              {safeProduct.subtitle}
            </p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, starIndex) => (
              <StarIcon
                key={starIndex}
                className={`w-3 h-3 ${
                  starIndex < Math.floor(safeProduct.rating)
                    ? 'text-primary-gold fill-current'
                    : 'text-primary-sage/30'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-primary-sage">
            {safeProduct.rating.toFixed(1)} ({safeProduct.reviews})
          </span>
        </div>

        {/* Prix et action */}
        <div className="flex items-center justify-between">
          <div className="font-bold text-primary-forest text-lg">
            {safeProduct.price}
          </div>
          
          <motion.button
            onClick={handleAddToCart}
            disabled={!safeProduct.inStock}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-all ${
              safeProduct.inStock
                ? 'bg-primary-gold text-white hover:bg-primary-gold/90 hover:shadow-glow'
                : 'bg-primary-sage/20 text-primary-sage/60 cursor-not-allowed'
            }`}
            whileHover={safeProduct.inStock ? { scale: 1.05 } : {}}
            whileTap={safeProduct.inStock ? { scale: 0.95 } : {}}
          >
            <ShoppingBagIcon className="w-4 h-4" />
            {safeProduct.inStock ? 'Ajouter' : 'Indisponible'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCardOptimized.displayName = 'ProductCardOptimized';

export default ProductCardOptimized; 