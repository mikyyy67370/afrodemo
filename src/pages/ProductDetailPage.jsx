import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  StarIcon,
  HeartIcon,
  ShoppingBagIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  BeakerIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusIcon,
  MinusIcon,
  MagnifyingGlassIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';

const ProductDetailPage = ({ productId = 1, userProfile, setCurrentPage, setSelectedProductId }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  // Données produit détaillées (simulées)
  const product = {
    id: productId,
    name: "Sérum Éclaircissant Vitamine C",
    price: 48,
    rating: 4.9,
    reviews: 1847,
    image: "serum-vitc.jpg",
    category: 'Sérums',
    badges: ['Best-seller', 'Anti-taches'],
    description: "Sérum haute performance pour réduire l'hyperpigmentation et unifier le teint.",
    subtitle: "Concentré anti-taches intensif 30ml",
    inStock: true,
    images: [
      "serum-vitc.jpg",
      "serum-vitc-2.jpg",
      "serum-vitc-3.jpg",
      "serum-vitc-texture.jpg"
    ],
    keyIngredients: [
      { name: 'Vitamine C', percentage: '15%', benefit: 'Éclaircit les taches' },
      { name: 'Niacinamide', percentage: '5%', benefit: 'Unifie le teint' },
      { name: 'Acide Kojique', percentage: '2%', benefit: 'Prévient les taches' },
      { name: 'Aloe Vera Bio', percentage: '10%', benefit: 'Apaise et hydrate' }
    ],
    benefits: [
      'Réduit les taches brunes de 85% en 8 semaines',
      'Unifie le teint et révèle l\'éclat naturel',
      'Prévient l\'apparition de nouvelles taches',
      'Texture légère et non grasse',
      'Formule hypoallergénique testée dermatologiquement'
    ],
    usage: [
      'Appliquer matin et/ou soir sur peau propre',
      'Masser délicatement jusqu\'à absorption complète',
      'Éviter le contour des yeux',
      'Utiliser une protection solaire en journée',
      'Résultats visibles dès 4 semaines d\'utilisation'
    ],
    composition: 'Aqua, Magnesium Ascorbyl Phosphate (Vitamine C), Niacinamide, Kojic Acid, Aloe Barbadensis Leaf Juice*, Glycerin, Hyaluronic Acid, Tocopherol (Vitamine E), Benzyl Alcohol, Dehydroacetic Acid. *Ingrédient issu de l\'agriculture biologique.',
    certifications: ['COSMOS Organic', 'Ecocert', 'Cruelty Free'],
    skinTypes: ['Tous types', 'Peaux foncées', 'Peaux métissées'],
    concerns: ['Hyperpigmentation', 'Taches brunes', 'Teint terne']
  };

  // Avis clients
  const reviews = [
    {
      id: 1,
      name: 'Aminata K.',
      rating: 5,
      date: 'Il y a 2 semaines',
      verified: true,
      title: 'Résultats visibles rapidement !',
      text: 'Mes taches brunes s\'estompent vraiment après 6 semaines d\'utilisation. La texture est parfaite, pas grasse du tout. Je recommande vivement !',
      helpful: 24
    },
    {
      id: 2,
      name: 'Fatou M.',
      rating: 5,
      date: 'Il y a 1 mois',
      verified: true,
      title: 'Enfin un sérum qui fonctionne',
      text: 'J\'ai testé beaucoup de produits mais celui-ci est le seul qui donne de vrais résultats sur ma peau. Mon teint est plus uniforme.',
      helpful: 18
    },
    {
      id: 3,
      name: 'Khadija B.',
      rating: 4,
      date: 'Il y a 3 semaines',
      verified: true,
      title: 'Très satisfaite',
      text: 'Bon produit, j\'ai vu une amélioration. La seule chose c\'est que ça prend du temps mais c\'est normal pour ce type de traitement.',
      helpful: 12
    }
  ];

  // Produits recommandés
  const recommendedProducts = [
    {
      id: 2,
      name: "Crème Hydratante Karité",
      price: 25,
      image: "creme-hydratante.jpg",
      rating: 4.8
    },
    {
      id: 3,
      name: "Huile Précieuse Trio Africain",
      price: 42,
      image: "huile-argan.jpg",
      rating: 4.9
    },
    {
      id: 6,
      name: "Lait Démaquillant Karité",
      price: 24,
      image: "lait-calendula.jpg",
      rating: 4.9
    }
  ];

  const tabs = [
    { id: 'description', label: 'Description', icon: BeakerIcon },
    { id: 'usage', label: 'Utilisation', icon: SparklesIcon },
    { id: 'ingredients', label: 'Ingrédients', icon: CheckCircleIcon },
    { id: 'reviews', label: `Avis (${reviews.length})`, icon: ChatBubbleBottomCenterTextIcon }
  ];

  const addToCart = () => {
    // Logique d'ajout au panier
    console.log(`Ajouté au panier: ${product.name} x${quantity}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white">
      
      {/* Breadcrumb responsive */}
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-6">
        <nav className="text-xs sm:text-sm text-primary-sage">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 xs:gap-2"
          >
            <button
              onClick={() => setCurrentPage && setCurrentPage('home')}
              className="hover:text-primary-gold transition-colors"
            >
              Accueil
            </button>
            <ChevronRightIcon className="w-3 h-3 xs:w-4 xs:h-4" />
            <button
              onClick={() => setCurrentPage && setCurrentPage('products')}
              className="hover:text-primary-gold transition-colors"
            >
              Produits
            </button>
            <ChevronRightIcon className="w-3 h-3 xs:w-4 xs:h-4" />
            <span className="text-primary-forest font-medium truncate">{product.name}</span>
          </motion.div>
        </nav>
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 pb-6 xs:pb-8 sm:pb-12 lg:pb-16">
        
        {/* Layout principal responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12 mb-8 xs:mb-12 sm:mb-16 lg:mb-20">
          
          {/* Galerie d'images responsive */}
          <motion.div
            className="space-y-3 xs:space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Image principale */}
            <div className="relative aspect-square bg-secondary-linen rounded-lg sm:rounded-organic overflow-hidden group">
              <motion.img
                key={selectedImage}
                src={`/images/products/${product.images[selectedImage]}`}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Indicateur de zoom */}
              <motion.div
                className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 bg-white/80 backdrop-blur-sm p-1.5 xs:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hidden sm:block"
                whileHover={{ scale: 1.1 }}
              >
                <MagnifyingGlassIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-primary-forest" />
              </motion.div>

              {/* Badges produit */}
              <div className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 flex flex-col gap-1 xs:gap-1.5 sm:gap-2">
                {product.badges.map((badge, index) => (
                  <span 
                    key={index}
                    className="bg-primary-gold text-white text-xs font-bold px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Miniatures responsive */}
            <div className="grid grid-cols-4 xs:grid-cols-4 sm:grid-cols-5 gap-1.5 xs:gap-2 sm:gap-3">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md xs:rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary-gold' : 'border-transparent hover:border-primary-sage/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={`/images/products/${image}`} 
                    alt={`${product.name} vue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Informations produit responsive */}
          <motion.div
            className="space-y-4 xs:space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Header produit */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3 xs:mb-4">
                <span className="text-xs sm:text-sm text-primary-gold font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="text-xs bg-accent-moss/10 text-accent-moss px-2 py-0.5 xs:py-1 rounded-full whitespace-nowrap">
                    En stock
                  </span>
                ) : (
                  <span className="text-xs bg-accent-coral/10 text-accent-coral px-2 py-0.5 xs:py-1 rounded-full whitespace-nowrap">
                    Rupture
                  </span>
                )}
              </div>
              
              <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-primary-forest mb-2 xs:mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm xs:text-sm sm:text-base text-primary-sage mb-3 xs:mb-4 sm:mb-6 leading-relaxed">
                {product.subtitle}
              </p>

              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-primary-gold fill-current'
                            : 'text-primary-sage/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-primary-sage text-xs xs:text-sm sm:text-base">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>
              </div>
            </div>

            {/* Prix et actions */}
            <div className="border-t border-b border-primary-sage/20 py-3 xs:py-4 sm:py-6">
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 mb-3 xs:mb-4 sm:mb-6">
                <div className="flex items-center gap-2 xs:gap-3">
                  <span className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary-gold">
                    {product.price || 0}€
                  </span>
                </div>
                
                <div className="text-xs xs:text-xs sm:text-sm text-accent-moss font-semibold">
                  Livraison gratuite dès 49€
                </div>
              </div>

              {/* Actions principales responsive */}
              <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4">
                <motion.button
                  onClick={() => addToCart && addToCart(product)}
                  className="flex-1 bg-primary-forest text-white py-3 xs:py-3.5 sm:py-4 px-4 xs:px-6 sm:px-8 rounded-lg font-semibold hover:bg-primary-forest/90 transition-all text-sm xs:text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!product.inStock}
                >
                  <ShoppingBagIcon className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 inline mr-2" />
                  {product.inStock ? 'Ajouter au panier' : 'Produit épuisé'}
                </motion.button>
                
                <motion.button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="xs:w-full sm:w-auto bg-primary-gold/10 text-primary-gold py-3 xs:py-3.5 sm:py-4 px-4 xs:px-6 sm:px-6 rounded-lg font-semibold hover:bg-primary-gold/20 transition-all text-sm xs:text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HeartIcon className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 inline mr-2" />
                  <span className="xs:inline sm:hidden">Favoris</span>
                  <span className="hidden sm:inline">Ajouter aux favoris</span>
                </motion.button>
              </div>
            </div>

            {/* Avantages produit responsive */}
            <div className="space-y-3 xs:space-y-3 sm:space-y-4">
              <h3 className="font-bold text-primary-forest text-sm xs:text-sm sm:text-base">Pourquoi ce produit ?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                {product.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 xs:gap-2 sm:gap-3 p-2.5 xs:p-3 sm:p-4 bg-accent-moss/10 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CheckCircleIcon className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-accent-moss flex-shrink-0" />
                    <span className="text-xs xs:text-xs sm:text-sm text-primary-forest font-medium leading-relaxed">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ingrédients responsifs */}
            <div className="space-y-3 xs:space-y-3 sm:space-y-4">
              <h3 className="font-bold text-primary-forest text-sm xs:text-sm sm:text-base">Ingrédients clés</h3>
              <div className="flex flex-wrap gap-1.5 xs:gap-2">
                {product.keyIngredients.map((ingredient, index) => (
                  <span 
                    key={index}
                    className="bg-primary-gold/10 text-primary-gold px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1 sm:py-2 rounded-full text-xs xs:text-xs sm:text-sm font-medium whitespace-nowrap"
                  >
                    {ingredient.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs responsive */}
        <motion.div
          className="mb-6 xs:mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Navigation tabs responsive */}
          <div className="border-b border-primary-sage/20 mb-4 xs:mb-6 sm:mb-8">
            <div className="flex space-x-0 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-4 text-xs xs:text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-gold text-primary-gold'
                      : 'border-transparent text-primary-sage hover:text-primary-forest'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenu des tabs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'description' && (
                <div className="prose prose-sm sm:prose max-w-none text-primary-sage">
                  <p className="text-sm sm:text-base leading-relaxed">{product.description}</p>
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold text-primary-forest mb-2 text-sm sm:text-base">Texture</h4>
                      <p className="text-xs sm:text-sm">Crème légère et non grasse</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-forest mb-2 text-sm sm:text-base">Application</h4>
                      <p className="text-xs sm:text-sm">Matin et soir sur peau propre</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {product.keyIngredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        className="p-4 sm:p-6 bg-white rounded-lg border border-primary-sage/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h4 className="font-bold text-primary-forest mb-2 text-sm sm:text-base">
                          {ingredient.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-primary-sage mb-2">
                          {ingredient.percentage}
                        </p>
                        <p className="text-xs sm:text-sm text-primary-sage">
                          {ingredient.benefit}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {product.usage.map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex gap-3 sm:gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-gold text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary-forest mb-1 sm:mb-2 text-sm sm:text-base">
                            {step}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="text-3xl sm:text-4xl font-bold text-primary-gold mb-2">
                      {product.rating}/5
                    </div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            i < Math.floor(product.rating)
                              ? 'text-primary-gold fill-current'
                              : 'text-primary-sage/30'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-primary-sage">
                      Basé sur {product.reviews} avis clients
                    </p>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={index}
                        className="p-4 sm:p-6 bg-white rounded-lg border border-primary-sage/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-gold rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs sm:text-sm">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-semibold text-primary-forest text-sm sm:text-base">
                              {review.name}
                            </span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  i < review.rating
                                    ? 'text-primary-gold fill-current'
                                    : 'text-primary-sage/30'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-primary-sage">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-primary-sage">
                          {review.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Produits recommandés responsive */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-forest mb-3 sm:mb-4">
              Produits recommandés
            </h2>
            <p className="text-sm sm:text-base text-primary-sage">
              D'autres produits qui pourraient vous plaire
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recommendedProducts.map((recProduct, index) => (
              <motion.div
                key={recProduct.id}
                className="group bg-white rounded-lg overflow-hidden shadow-organic hover:shadow-organic-lg border border-primary-sage/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={`/images/products/${recProduct.image}`}
                    alt={recProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <motion.button
                        onClick={() => {
                          if (setSelectedProductId && setCurrentPage) {
                            setSelectedProductId(recProduct.id);
                            setCurrentPage('product-detail');
                          }
                        }}
                        className="w-full bg-white/90 backdrop-blur-md text-primary-forest font-semibold py-2 px-3 sm:px-4 rounded-lg hover:bg-white transition-all text-xs sm:text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Voir détails</span>
                        <span className="sm:hidden">Détails</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-primary-forest mb-1 group-hover:text-primary-gold transition-colors text-sm sm:text-base line-clamp-2">
                    {recProduct.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < Math.floor(recProduct.rating) 
                              ? 'text-primary-gold fill-current' 
                              : 'text-primary-sage/30'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-primary-sage ml-1">
                        {recProduct.rating}
                      </span>
                    </div>
                    
                    <span className="text-base sm:text-lg font-bold text-primary-gold">
                      {recProduct.price || 0}€
                    </span>
                  </div>

                  <motion.button
                    onClick={() => addToCart && addToCart(recProduct)}
                    className="w-full bg-primary-forest text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-primary-forest/90 transition-all mt-3 text-xs sm:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="hidden sm:inline">Ajouter au panier • {recProduct.price || 0}€</span>
                    <span className="sm:hidden">Ajouter • {recProduct.price || 0}€</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 