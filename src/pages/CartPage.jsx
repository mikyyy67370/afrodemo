import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ShoppingBagIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  TagIcon,
  GiftIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';
import ProductImage from '../components/ProductImage';

const CartPage = ({ setCurrentPage }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    addToFavorites, 
    addNotification,
    cartTotal 
  } = useShop();
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Calculs du panier
  const subtotal = cartTotal;
  const savings = 0; // Pas d'économies affichées par défaut
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.percentage / 100) : 0;
  const shipping = subtotal >= 49 ? 0 : 4.90;
  const total = subtotal - promoDiscount + shipping;

  // Gestion quantité avec notifications
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      const item = cart.find(item => item.id === id);
      removeFromCart(id);
      addNotification({
        type: 'warning',
        title: 'Produit retiré',
        message: `${item?.name} retiré du panier`,
        duration: 3000
      });
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    const item = cart.find(item => item.id === id);
    removeFromCart(id);
    addNotification({
      type: 'warning',
      title: 'Produit retiré',
      message: `${item?.name} retiré du panier`,
      duration: 3000
    });
  };

  const moveToWishlist = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      addToFavorites(item);
      removeFromCart(id);
      addNotification({
        type: 'success',
        title: 'Ajouté aux favoris !',
        message: `${item.name} déplacé vers vos favoris`,
        duration: 3000
      });
    }
  };

  // Code promo
  const applyPromoCode = () => {
    const promoCodes = {
      'WELCOME15': { percentage: 15, description: '15% de réduction' },
      'BEAUTY20': { percentage: 20, description: '20% de réduction' },
      'FIRST10': { percentage: 10, description: '10% de réduction première commande' }
    };
    
    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCodes[promoCode.toUpperCase()]);
      setPromoCode('');
      addNotification({
        type: 'success',
        title: 'Code promo appliqué !',
        message: promoCodes[promoCode.toUpperCase()].description,
        duration: 4000
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Code invalide',
        message: 'Ce code promo n\'existe pas',
        duration: 3000
      });
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
          <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Mon Panier ({cart.length})
          </h1>
          <p className="text-body text-primary-sage">
            Finalisez votre commande Terra Luxe
          </p>
        </motion.div>

        {cart.length === 0 ? (
          // Panier vide
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-primary-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="w-12 h-12 text-primary-sage" />
            </div>
            <h2 className="text-heading-lg font-bold text-primary-forest mb-4">
              Votre panier est vide
            </h2>
            <p className="text-primary-sage mb-8">
              Découvrez nos produits premium et ajoutez vos favoris
            </p>
            <motion.button
              onClick={() => setCurrentPage('products')}
              className="bg-primary-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-forest/90 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Voir nos produits
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Produits du panier */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-organic-lg shadow-organic border border-primary-sage/10 p-6"
              >
                <h2 className="text-heading-lg font-bold text-primary-forest mb-6">
                  Produits sélectionnés
                </h2>
                
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex gap-4 p-4 border border-primary-sage/10 rounded-organic hover:shadow-organic transition-all"
                    >
                      <div className="w-24 h-24 rounded-organic overflow-hidden flex-shrink-0">
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-primary-forest mb-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-primary-gold">
                            {item.price || 0}€
                          </span>
                          <span className="text-xs bg-accent-coral text-white px-2 py-1 rounded-full">
                            En stock
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-primary-sage/30 rounded-lg flex items-center justify-center hover:bg-primary-gold/10 transition-colors"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity || 0}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-primary-sage/30 rounded-lg flex items-center justify-center hover:bg-primary-gold/10 transition-colors"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex gap-2">
                            <motion.button
                              onClick={() => moveToWishlist(item.id)}
                              className="p-2 text-primary-sage hover:text-accent-coral transition-colors"
                              whileHover={{ scale: 1.1 }}
                              title="Ajouter aux favoris"
                            >
                              <HeartIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-primary-sage hover:text-red-500 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              title="Supprimer du panier"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-organic-lg shadow-organic border border-primary-sage/10 p-6 sticky top-24"
              >
                <h3 className="text-heading-lg font-bold text-primary-forest mb-6">
                  Résumé de commande
                </h3>
                
                {/* Code promo */}
                <div className="mb-6">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-primary-sage/30 rounded-lg focus:border-primary-gold focus:outline-none text-sm"
                    />
                    <motion.button
                      onClick={applyPromoCode}
                      className="bg-primary-gold text-white px-4 py-2 rounded-lg hover:bg-primary-gold/90 transition-all text-sm font-semibold"
                      whileHover={{ scale: 1.02 }}
                    >
                      <TagIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {appliedPromo && (
                    <div className="bg-primary-gold/10 text-primary-gold p-3 rounded-lg text-sm font-medium">
                      <GiftIcon className="w-4 h-4 inline mr-2" />
                      {appliedPromo.description} appliquée !
                    </div>
                  )}
                </div>
                
                {/* Détails prix */}
                <div className="space-y-3 mb-6 pb-6 border-b border-primary-sage/20">
                  <div className="flex justify-between">
                    <span className="text-primary-sage">Sous-total</span>
                    <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-accent-coral">
                      <span>Économies</span>
                      <span>-{savings.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-primary-gold">
                      <span>Code promo</span>
                      <span>-{promoDiscount.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-primary-sage">Livraison</span>
                    <span className={shipping === 0 ? 'text-accent-moss font-semibold' : ''}>
                      {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-xs text-primary-sage">
                      Ajoutez {Math.max(0, 49 - (subtotal || 0)).toFixed(2)}€ pour la livraison gratuite
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between text-xl font-bold text-primary-forest mb-6">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                
                {/* Bouton commande */}
                <motion.button
                  className="w-full bg-primary-forest text-white py-4 rounded-lg font-bold hover:bg-primary-forest/90 transition-all shadow-glow hover:shadow-glow-lg mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage('checkout')}
                >
                  <CreditCardIcon className="w-6 h-6 inline mr-2" />
                  Finaliser ma commande
                </motion.button>
                
                <motion.button
                  onClick={() => setCurrentPage('products')}
                  className="w-full bg-white text-primary-forest py-3 rounded-lg font-semibold border-2 border-primary-forest hover:bg-primary-forest hover:text-white transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  Continuer mes achats
                </motion.button>
                
                {/* Garanties */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-primary-sage">
                    <TruckIcon className="w-4 h-4 text-accent-moss" />
                    Livraison rapide et sécurisée
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-sage">
                    <ShieldCheckIcon className="w-4 h-4 text-accent-lavender" />
                    Paiement 100% sécurisé
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-sage">
                    <SparklesIcon className="w-4 h-4 text-primary-gold" />
                    Satisfait ou remboursé 30j
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 