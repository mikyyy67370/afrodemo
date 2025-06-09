// Utilitaires de sécurité pour éviter les valeurs undefined

export const safeValue = (value, defaultValue = '') => {
  return value !== undefined && value !== null ? value : defaultValue;
};

export const safeNumber = (value, defaultValue = 0) => {
  const parsed = parseFloat(value);
  return !isNaN(parsed) ? parsed : defaultValue;
};

export const safeArray = (value, defaultValue = []) => {
  return Array.isArray(value) ? value : defaultValue;
};

export const safeObject = (value, defaultValue = {}) => {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : defaultValue;
};

export const safeString = (value, defaultValue = '') => {
  return typeof value === 'string' ? value : String(value || defaultValue);
};

// Validation sécurisée pour produits
export const validateProduct = (product) => {
  if (!product || typeof product !== 'object') {
    return null;
  }

  return {
    id: safeNumber(product.id, 0),
    name: safeString(product.name, 'Produit sans nom'),
    price: safeNumber(product.price, 0),
    rating: safeNumber(product.rating, 4.5),
    reviews: safeNumber(product.reviews, 0),
    image: safeString(product.image, 'placeholder.webp'),
    category: safeString(product.category, 'general'),
    skinTypes: safeArray(product.skinTypes, ['tous']),
    concerns: safeArray(product.concerns, []),
    ingredients: safeArray(product.ingredients, []),
    badges: safeArray(product.badges, []),
    inStock: Boolean(product.inStock !== false),
    featured: Boolean(product.featured),
    description: safeString(product.description, ''),
    subtitle: safeString(product.subtitle, '')
  };
};

// Validation pour liste de produits
export const validateProductList = (products) => {
  if (!Array.isArray(products)) return [];
  
  return products
    .map(validateProduct)
    .filter(product => product !== null);
};

// Filtrage sécurisé
export const safeFilter = (array, filterFn) => {
  if (!Array.isArray(array)) return [];
  if (typeof filterFn !== 'function') return array;
  
  try {
    return array.filter(filterFn);
  } catch (error) {
    console.warn('Erreur lors du filtrage:', error);
    return array;
  }
};

// Tri sécurisé
export const safeSort = (array, sortFn) => {
  if (!Array.isArray(array)) return [];
  
  try {
    return [...array].sort(sortFn);
  } catch (error) {
    console.warn('Erreur lors du tri:', error);
    return array;
  }
};

// Gestion sécurisée des props
export const safeProps = (props, defaultProps = {}) => {
  return {
    ...defaultProps,
    ...safeObject(props)
  };
};

// Vérification d'égalité profonde pour React.memo
export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return obj1 === obj2;
  
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object') return obj1 === obj2;
  
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deepEqual(item, obj2[index]));
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => deepEqual(obj1[key], obj2[key]));
};

// HOC pour mémorisation intelligente
export const withSafeMemo = (Component) => {
  return React.memo(Component, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
  });
};

// Debounce pour les recherches
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle pour les événements de scroll
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 