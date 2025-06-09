import React, { useState } from 'react';

const ProductImage = ({ src, alt, className = '', ...props }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    // Image de fallback avec gradient
    return (
      <div className={`bg-gradient-to-br from-primary-sage/20 to-primary-gold/20 flex items-center justify-center ${className}`} {...props}>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-primary-sage/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-primary-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs text-primary-sage font-medium">{alt || 'Produit'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-sage/10 to-primary-gold/10 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src.startsWith('/') ? src : `/images/products/${src}`}
        alt={alt}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full object-cover`}
      />
    </div>
  );
};

export default ProductImage; 