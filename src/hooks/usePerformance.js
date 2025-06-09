import { useMemo, useCallback, useRef, useEffect, useState } from 'react';

// Hook pour validation sécurisée des données
export const useSafeData = (data, defaultValue = {}) => {
  return useMemo(() => {
    if (!data || typeof data !== 'object') return defaultValue;
    
    // Valider récursivement les propriétés
    const validateObject = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(item => validateObject(item));
      }
      
      if (obj && typeof obj === 'object') {
        const validated = {};
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          if (value !== undefined && value !== null) {
            validated[key] = validateObject(value);
          }
        });
        return validated;
      }
      
      return obj;
    };
    
    return validateObject(data);
  }, [data, defaultValue]);
};

// Hook pour débouncer les recherches
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook pour mémoriser les filtres
export const useFilteredData = (data, filters, sortFn) => {
  return useMemo(() => {
    if (!Array.isArray(data)) return [];
    
    let filtered = data.filter(item => {
      if (!item || typeof item !== 'object') return false;
      
      // Vérifier chaque filtre
      for (const [key, value] of Object.entries(filters || {})) {
        if (!value || (Array.isArray(value) && value.length === 0)) continue;
        
        const itemValue = item[key];
        
        if (Array.isArray(value)) {
          // Filtre multiple
          if (Array.isArray(itemValue)) {
            if (!value.some(v => itemValue.includes(v))) return false;
          } else {
            if (!value.includes(itemValue)) return false;
          }
        } else {
          // Filtre simple
          if (itemValue !== value) return false;
        }
      }
      
      return true;
    });
    
    // Appliquer le tri si fourni
    if (sortFn && typeof sortFn === 'function') {
      filtered = filtered.sort(sortFn);
    }
    
    return filtered;
  }, [data, filters, sortFn]);
};

// Hook pour gérer les favoris avec callbacks mémorisés
export const useFavorites = (initialFavorites = []) => {
  const [favorites, setFavorites] = useState(new Set(initialFavorites));
  
  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);
  
  const isFavorite = useCallback((id) => {
    return favorites.has(id);
  }, [favorites]);
  
  const favoritesArray = useMemo(() => {
    return Array.from(favorites);
  }, [favorites]);
  
  return { favorites: favoritesArray, toggleFavorite, isFavorite };
};

// Hook pour intersection observer optimisé
export const useOptimizedInView = (options = {}) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          // Se déconnecter après la première intersection pour économiser les performances
          if (options.once !== false) {
            observer.disconnect();
          }
        } else if (!entry.isIntersecting && options.once === false) {
          setInView(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [inView, options]);
  
  return [ref, inView];
};

// Hook pour gérer les erreurs d'images
export const useImageError = (src, fallback = '/images/placeholder.webp') => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  
  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback);
    }
  }, [fallback, hasError]);
  
  const handleLoad = useCallback(() => {
    setHasError(false);
  }, []);
  
  return { imageSrc, handleError, handleLoad, hasError };
}; 