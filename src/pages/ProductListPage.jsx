import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  HeartIcon,
  ShoppingBagIcon,
  EyeIcon,
  StarIcon,
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  BeakerIcon,
  ShieldCheckIcon,
  FireIcon,
  GiftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';

const ProductListPage = ({ category = 'all', userProfile, setCurrentPage, setSelectedProductId }) => {
  const { addToCart, addNotification, addToFavorites, removeFromFavorites, favorites } = useShop();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedFilters, setSelectedFilters] = useState({
    skinType: [],
    concern: [],
    priceRange: '',
    ingredients: []
  });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [showFilters, setShowFilters] = useState(false);

  // Configuration des catégories avec validation
  const categoryConfig = useMemo(() => ({
    all: { title: 'Tous nos Produits', subtitle: 'Découvrez toute notre gamme premium' },
    serums: { title: 'Sérums Éclaircissants', subtitle: 'Traitements concentrés anti-taches' },
    cremes: { title: 'Crèmes Hydratantes', subtitle: 'Nutrition et confort quotidien' },
    huiles: { title: 'Huiles Précieuses', subtitle: 'Élixirs de beauté ancestraux' },
    masques: { title: 'Masques Purifiants', subtitle: 'Soins intensifs hebdomadaires' },
    nettoyants: { title: 'Nettoyants Doux', subtitle: 'Purification respectueuse' }
  }), []);

  // Produits avec validation sécurisée
  const allProducts = useMemo(() => [
    {
      id: 1,
      name: "Sérum Éclaircissant Vitamine C+",
      price: 48,
      rating: 4.9,
      reviews: 1847,
      image: "serum-vitc.jpg",
      category: 'serums',
      skinTypes: ['tous', 'grasse', 'mixte'],
      concerns: ['anti-taches', 'eclat'],
      ingredients: ['vitamine-c', 'niacinamide'],
      badges: ['Best-seller', 'Anti-taches'],
      inStock: true,
      featured: true,
      description: "Sérum haute performance pour réduire l'hyperpigmentation"
    },
    {
      id: 2,
      name: "Huile Précieuse Trio Africain",
      price: 42,
      rating: 4.9,
      reviews: 1876,
      image: "huile-argan.jpg",
      category: 'huiles',
      skinTypes: ['seche', 'sensible', 'mature'],
      concerns: ['hydratation', 'anti-age'],
      ingredients: ['argan', 'baobab', 'karite'],
      badges: ['Bio', 'Artisanal'],
      inStock: true,
      featured: true,
      description: "Mélange d'huiles précieuses africaines"
    },
    {
      id: 3,
      name: "Crème Hydratante Karité Supreme",
      price: 35,
      rating: 4.8,
      reviews: 1234,
      image: "creme-hydratante.jpg",
      category: 'cremes',
      skinTypes: ['tous', 'seche'],
      concerns: ['hydratation'],
      ingredients: ['karite', 'aloe'],
      badges: ['Quotidien'],
      inStock: true,
      featured: false,
      description: "Hydratation 24h avec karité pur"
    },
    {
      id: 4,
      name: "Masque Éclat Argile Rose",
      price: 28,
      rating: 4.7,
      reviews: 892,
      image: "masque-argile.jpg",
      category: 'masques',
      skinTypes: ['sensible', 'terne'],
      concerns: ['eclat', 'purete'],
      ingredients: ['argile-rose'],
      badges: ['Sensible'],
      inStock: true,
      featured: false,
      description: "Purification douce pour éclat immédiat"
    },
    {
      id: 5,
      name: "Gel Nettoyant Hibiscus",
      price: 24,
      rating: 4.6,
      reviews: 657,
      image: "gel-hibiscus.jpg",
      category: 'nettoyants',
      skinTypes: ['grasse', 'mixte'],
      concerns: ['purete'],
      ingredients: ['hibiscus'],
      badges: ['Doux'],
      inStock: true,
      featured: false,
      description: "Nettoyage en douceur avec hibiscus"
    },
    {
      id: 6,
      name: "Sérum Niacinamide 10%",
      price: 32,
      rating: 4.8,
      reviews: 1456,
      image: "serum-niacinamide.jpg",
      category: 'serums',
      skinTypes: ['grasse', 'mixte'],
      concerns: ['purete', 'anti-taches'],
      ingredients: ['niacinamide'],
      badges: ['Concentré'],
      inStock: true,
      featured: false,
      description: "Traitement ciblé pores et imperfections"
    }
  ], []);

  // Options de filtres sécurisées
  const filterOptions = useMemo(() => ({
    skinType: [
      { value: 'tous', label: 'Tous types' },
      { value: 'seche', label: 'Peau sèche' },
      { value: 'grasse', label: 'Peau grasse' },
      { value: 'mixte', label: 'Peau mixte' },
      { value: 'sensible', label: 'Peau sensible' },
      { value: 'mature', label: 'Peau mature' }
    ],
    concern: [
      { value: 'anti-taches', label: 'Anti-taches', icon: SparklesIcon },
      { value: 'hydratation', label: 'Hydratation', icon: BeakerIcon },
      { value: 'eclat', label: 'Éclat', icon: FireIcon },
      { value: 'anti-age', label: 'Anti-âge', icon: ShieldCheckIcon },
      { value: 'purete', label: 'Pureté', icon: GiftIcon }
    ],
    priceRange: [
      { value: '0-30', label: 'Moins de 30€' },
      { value: '30-50', label: '30€ - 50€' },
      { value: '50-80', label: '50€ - 80€' },
      { value: '80+', label: 'Plus de 80€' }
    ],
    ingredients: [
      { value: 'karite', label: 'Karité' },
      { value: 'vitamine-c', label: 'Vitamine C' },
      { value: 'niacinamide', label: 'Niacinamide' },
      { value: 'argan', label: 'Huile d\'Argan' },
      { value: 'baobab', label: 'Huile de Baobab' },
      { value: 'aloe', label: 'Aloe Vera' }
    ]
  }), []);

  // Fonction de filtrage optimisée avec validation
  const getFilteredProducts = useCallback(() => {
    if (!Array.isArray(allProducts)) return [];

    let filtered = [...allProducts];

    // Filtre par catégorie
    if (category && category !== 'all') {
      filtered = filtered.filter(product => 
        product && product.category === category
      );
    }

    // Filtres avancés avec protection
    Object.entries(selectedFilters).forEach(([filterType, filterValue]) => {
      if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return;

      filtered = filtered.filter(product => {
        if (!product) return false;

        switch (filterType) {
          case 'skinType':
            return Array.isArray(product.skinTypes) && 
                   Array.isArray(filterValue) &&
                   filterValue.some(type => product.skinTypes.includes(type));
          
          case 'concern':
            return Array.isArray(product.concerns) && 
                   Array.isArray(filterValue) &&
                   filterValue.some(concern => product.concerns.includes(concern));
          
          case 'priceRange':
            if (typeof filterValue !== 'string') return true;
            const [min, max] = filterValue.split('-');
            const price = parseFloat(product.price) || 0;
            const minPrice = parseFloat(min) || 0;
            const maxPrice = max === '+' ? Infinity : parseFloat(max) || Infinity;
            return price >= minPrice && price <= maxPrice;
          
          case 'ingredients':
            return Array.isArray(product.ingredients) && 
                   Array.isArray(filterValue) &&
                   filterValue.some(ingredient => product.ingredients.includes(ingredient));
          
          default:
            return true;
        }
      });
    });

    // Tri sécurisé
    filtered.sort((a, b) => {
      if (!a || !b) return 0;

      switch (sortBy) {
        case 'price-asc':
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case 'price-desc':
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case 'rating':
          return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        case 'newest':
          return (b.id || 0) - (a.id || 0);
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    return filtered;
  }, [allProducts, category, selectedFilters, sortBy]);

  // Produits filtrés mémorisés
  const filteredProducts = useMemo(() => getFilteredProducts(), [getFilteredProducts]);

  // Catégorie actuelle sécurisée
  const currentCategory = useMemo(() => 
    categoryConfig[category] || categoryConfig.all
  , [category, categoryConfig]);

  // Gestion des filtres optimisée
  const toggleFilter = useCallback((filterType, value) => {
    setSelectedFilters(prev => {
      const currentValue = prev[filterType] || [];
      
      if (filterType === 'priceRange') {
        return {
          ...prev,
          [filterType]: currentValue === value ? '' : value
        };
      }
      
      if (Array.isArray(currentValue)) {
        const newValue = currentValue.includes(value)
          ? currentValue.filter(v => v !== value)
          : [...currentValue, value];
        
        return {
          ...prev,
          [filterType]: newValue
        };
      }
      
      return prev;
    });
  }, []);

  // Gestion favoris optimisée
  const handleToggleFavorite = useCallback((productId) => {
    const product = allProducts.find(p => p && p.id === productId);
    if (!product) return;

    const isFavorite = favorites && favorites.some(fav => fav && fav.id === productId);
    
    if (isFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  }, [allProducts, favorites, addToFavorites, removeFromFavorites]);

  // Gestion panier optimisée
  const handleAddToCart = useCallback((product) => {
    if (product && product.inStock && addToCart) {
      addToCart(product);
    }
  }, [addToCart]);

  // Vérifier si produit est en favoris
  const isFavorite = useCallback((productId) => {
    return favorites && favorites.some(fav => fav && fav.id === productId);
  }, [favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white">
      {/* Header Premium Section */}
      <div className="relative bg-gradient-to-br from-primary-forest via-primary-forest to-primary-sage overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary-gold rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-10 w-32 h-32 bg-secondary-cream rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-20 w-24 h-24 bg-primary-gold rounded-full blur-xl"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-2 h-2 bg-primary-gold rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-8 w-1 h-1 bg-secondary-cream rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-primary-gold rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-16 right-16 w-1 h-1 bg-secondary-cream rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto px-3 xs:px-4 sm:px-6 py-8 xs:py-12 sm:py-16 lg:py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge Premium */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary-gold/20 backdrop-blur-sm border border-primary-gold/30 rounded-full px-4 py-2 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-primary-gold rounded-full animate-pulse"></div>
              <span className="text-primary-gold font-semibold text-xs xs:text-sm">COLLECTION PREMIUM</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1
              className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 xs:mb-4 sm:mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-secondary-cream to-primary-gold bg-clip-text text-transparent">
                Cosmétiques Bio
              </span>
              <br />
              <span className="text-primary-gold">Premium</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="text-sm xs:text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-4 xs:mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {filteredProducts.length} produits exclusifs formulés avec des ingrédients bio d'exception
              <br className="hidden sm:block" />
              <span className="text-primary-gold font-medium">pour révéler la beauté naturelle de votre peau</span>
            </motion.p>
            
            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 xs:gap-6 sm:gap-8 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-gold">98%</div>
                <div className="text-xs xs:text-sm">Ingrédients naturels</div>
              </div>
              <div className="text-center">
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-gold">100%</div>
                <div className="text-xs xs:text-sm">Bio certifié</div>
              </div>
              <div className="text-center">
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-gold">4.8★</div>
                <div className="text-xs xs:text-sm">Note moyenne</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-secondary-cream to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-6 xs:py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-4 xs:gap-6 lg:gap-8">
          
          {/* Filtres Mobile & Desktop */}
          <motion.div
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Toggle Filtres Mobile */}
            <div className="lg:hidden mb-3 xs:mb-4">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between p-3 xs:p-3.5 bg-white rounded-lg border border-primary-sage/20"
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-semibold text-primary-forest text-sm xs:text-base">Filtres</span>
                <ChevronDownIcon className={`w-4 h-4 xs:w-5 xs:h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>

            {/* Panneau de Filtres */}
            <div className={`space-y-3 xs:space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              
              {/* Catégories */}
              <div className="bg-white p-3 xs:p-4 sm:p-6 rounded-lg border border-primary-sage/20">
                <h3 className="font-bold text-primary-forest mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-sm sm:text-base">Catégories</h3>
                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                  {Object.entries(categoryConfig).map(([id, category]) => (
                    <motion.button
                      key={id}
                      onClick={() => {
                        setSelectedFilters({
                          skinType: [],
                          concern: [],
                          priceRange: '',
                          ingredients: []
                        });
                        toggleFilter('category', id);
                      }}
                      className={`w-full text-left p-2 xs:p-2.5 sm:p-3 rounded-lg transition-all text-xs xs:text-xs sm:text-sm ${
                        category === currentCategory
                          ? 'bg-primary-gold/10 text-primary-gold font-semibold'
                          : 'hover:bg-primary-sage/10 text-primary-sage'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.title}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div className="bg-white p-3 xs:p-4 sm:p-6 rounded-lg border border-primary-sage/20">
                <h3 className="font-bold text-primary-forest mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-sm sm:text-base">Prix</h3>
                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                  {filterOptions.priceRange.map(option => (
                    <motion.button
                      key={option.value}
                      onClick={() => toggleFilter('priceRange', option.value)}
                      className={`w-full text-left p-2 xs:p-2.5 sm:p-3 rounded-lg transition-all text-xs xs:text-xs sm:text-sm ${
                        selectedFilters.priceRange === option.value
                          ? 'bg-primary-gold/10 text-primary-gold font-semibold'
                          : 'hover:bg-primary-sage/10 text-primary-sage'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Ingrédients */}
              <div className="bg-white p-3 xs:p-4 sm:p-6 rounded-lg border border-primary-sage/20">
                <h3 className="font-bold text-primary-forest mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-sm sm:text-base">Ingrédients clés</h3>
                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                  {filterOptions.ingredients.map(option => (
                    <motion.button
                      key={option.value}
                      onClick={() => toggleFilter('ingredients', option.value)}
                      className={`w-full text-left p-2 xs:p-2.5 sm:p-3 rounded-lg transition-all text-xs xs:text-xs sm:text-sm ${
                        selectedFilters.ingredients.includes(option.value)
                          ? 'bg-primary-gold/10 text-primary-gold font-semibold'
                          : 'hover:bg-primary-sage/10 text-primary-sage'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3">
                        <div className={`w-3.5 h-3.5 xs:w-4 xs:h-4 rounded border-2 flex items-center justify-center ${
                          selectedFilters.ingredients.includes(option.value)
                            ? 'bg-primary-gold border-primary-gold'
                            : 'border-primary-sage/30'
                        }`}>
                          {selectedFilters.ingredients.includes(option.value) && (
                            <CheckIcon className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-white" />
                          )}
                        </div>
                        <span>{option.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Reset Filtres */}
              <motion.button
                onClick={() => {
                  setSelectedFilters({
                    skinType: [],
                    concern: [],
                    priceRange: '',
                    ingredients: []
                  });
                  setViewMode('grid');
                }}
                className="w-full bg-primary-sage/10 text-primary-sage py-2.5 xs:py-3 px-3 xs:px-4 rounded-lg font-semibold hover:bg-primary-sage/20 transition-all text-xs xs:text-xs sm:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Réinitialiser les filtres
              </motion.button>
            </div>
          </motion.div>

          {/* Contenu Principal */}
          <div className="flex-1">
            
            {/* Barre de Tri et Résultats */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <p className="text-primary-forest font-semibold text-sm sm:text-base">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </p>
                <p className="text-xs sm:text-sm text-primary-sage">
                  {Object.entries(selectedFilters)
                    .filter(([key, value]) => value.length > 0)
                    .map(([key, value]) => {
                      if (key === 'category') {
                        return categoryConfig[value[0]].title;
                      } else if (key === 'priceRange') {
                        const [min, max] = value.split('-');
                        return `Prix: ${min === '0' ? 'Moins de 30€' : min} - ${max === '+' ? 'Plus de 80€' : max}`;
                      } else if (key === 'ingredients') {
                        return value.map(ingredient => filterOptions.ingredients.find(i => i.value === ingredient).label).join(', ');
                      } else {
                        return filterOptions[key].find(option => option.value === value)?.label || value;
                      }
                    })
                    .join(', ')
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <span className="text-primary-sage text-xs sm:text-sm whitespace-nowrap">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none bg-white border border-primary-sage/20 rounded-lg px-3 sm:px-4 py-2 text-primary-forest text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  <option value="popularity">Popularité</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                  <option value="newest">Nouveautés</option>
                </select>
              </div>
            </motion.div>

            {/* Grille de Produits Responsive */}
            <motion.div
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6"
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-lg overflow-hidden shadow-organic hover:shadow-organic-lg border border-primary-sage/10"
                    whileHover={{ y: -5 }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={`/images/products/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-1.5 xs:top-2 sm:top-3 left-1.5 xs:left-2 sm:left-3 flex flex-col gap-1 xs:gap-1 sm:gap-2">
                        {product.badges.map((badge, badgeIndex) => (
                          <span 
                            key={badgeIndex}
                            className="bg-primary-gold text-white text-xs font-bold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* Actions Hover - Masqué sur mobile */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex">
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-2">
                          <motion.button
                            onClick={() => handleToggleFavorite(product.id)}
                            className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                              isFavorite(product.id)
                                ? 'bg-accent-coral text-white'
                                : 'bg-white/80 text-primary-sage hover:text-accent-coral'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <HeartIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                          </motion.button>
                        </div>
                        
                        <div className="absolute bottom-1.5 xs:bottom-2 sm:bottom-3 left-1.5 xs:left-2 sm:left-3 right-1.5 xs:right-2 sm:right-3 flex gap-1.5 xs:gap-2">
                          <motion.button
                            onClick={() => {
                              if (setSelectedProductId && setCurrentPage) {
                                setSelectedProductId(product.id);
                                setCurrentPage('product-detail');
                              }
                            }}
                            className="flex-1 bg-white/90 backdrop-blur-md text-primary-forest font-semibold py-1.5 xs:py-2 px-2 xs:px-3 rounded-lg hover:bg-white transition-all text-xs"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <EyeIcon className="w-3 h-3 inline mr-1" />
                            Détails
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              handleAddToCart(product);
                              addNotification({
                                type: 'success',
                                title: 'Produit ajouté !',
                                message: `${product.name} ajouté au panier`,
                                duration: 3000
                              });
                            }}
                            className="bg-primary-gold text-white p-1.5 xs:p-2 rounded-lg hover:bg-primary-gold/90 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ShoppingBagIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-2.5 xs:p-3 sm:p-4">
                      <div className="mb-2 xs:mb-3">
                        <h3 className="font-bold text-primary-forest mb-1 group-hover:text-primary-gold transition-colors text-sm xs:text-sm sm:text-base line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs xs:text-xs sm:text-sm text-primary-sage line-clamp-2">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Rating & Price */}
                      <div className="flex items-center justify-between mb-2 xs:mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              className={`w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-primary-gold fill-current' 
                                  : 'text-primary-sage/30'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-primary-sage ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-sm xs:text-base sm:text-lg font-bold text-primary-gold">
                            {product.price || 0}€
                          </span>
                        </div>
                      </div>

                      {/* Bénéfices */}
                      <div className="mb-2 xs:mb-3">
                        <div className="flex flex-wrap gap-1">
                          {product.benefits.slice(0, 2).map((benefit, index) => (
                            <span 
                              key={index}
                              className="bg-primary-gold/10 text-primary-gold text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions Mobile */}
                      <div className="flex gap-1.5 xs:gap-2 sm:hidden">
                        <motion.button
                          onClick={() => handleToggleFavorite(product.id)}
                          className={`p-1.5 xs:p-2 rounded-lg transition-all ${
                            isFavorite(product.id)
                              ? 'bg-accent-coral text-white'
                              : 'bg-primary-sage/10 text-primary-sage'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <HeartIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            if (setSelectedProductId && setCurrentPage) {
                              setSelectedProductId(product.id);
                              setCurrentPage('product-detail');
                            }
                          }}
                          className="flex-1 bg-primary-sage/10 text-primary-sage py-1.5 xs:py-2 px-2 xs:px-3 rounded-lg font-semibold transition-all text-xs"
                          whileTap={{ scale: 0.98 }}
                        >
                          Voir détails
                        </motion.button>
                      </div>

                      {/* Bouton Ajout Panier */}
                      <motion.button
                        onClick={() => {
                          handleAddToCart(product);
                          addNotification({
                            type: 'success',
                            title: 'Produit ajouté !',
                            message: `${product.name} ajouté au panier`,
                            duration: 3000
                          });
                        }}
                        className="w-full bg-primary-forest text-white py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 rounded-lg font-semibold hover:bg-primary-forest/90 transition-all mt-2 xs:mt-3 text-xs xs:text-xs sm:text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="hidden xs:inline sm:hidden">Ajouter • {product.price || 0}€</span>
                        <span className="xs:hidden sm:inline">Ajouter au panier • {product.price || 0}€</span>
                        <span className="xs:hidden">+ {product.price || 0}€</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Message si aucun produit */}
            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-12 sm:py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-sage" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-forest mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-sm sm:text-base text-primary-sage mb-4">
                  Essayez de modifier vos filtres pour voir plus de produits
                </p>
                <motion.button
                  onClick={() => {
                    setSelectedFilters({
                      skinType: [],
                      concern: [],
                      priceRange: '',
                      ingredients: []
                    });
                    setViewMode('grid');
                  }}
                  className="bg-primary-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-gold/90 transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Réinitialiser les filtres
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage; 