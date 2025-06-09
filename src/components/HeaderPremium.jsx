import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  StarIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const HeaderPremium = ({ userProfile, setUserProfile, currentPage, setCurrentPage, setSelectedCategory, setSelectedProductId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const profileMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  // Utiliser le Context pour panier et favoris
  const { cart, favorites, cartItemsCount, favoritesCount } = useShop();

  // Profils utilisateur avec icônes professionnelles Terra Luxe
  const userProfiles = [
    {
      id: 'discovery',
      name: 'Nouvelle Découverte',
      description: 'Première visite • Diagnostic complet',
      icon: StarIcon,
      color: 'text-primary-gold',
      bgColor: 'bg-primary-gold/10',
      borderColor: 'border-primary-gold/30'
    },
    {
      id: 'returning',
      name: 'Cliente Fidèle',
      description: 'Profil enregistré • Recommandations',
      icon: HeartIcon,
      color: 'text-accent-lavender',
      bgColor: 'bg-accent-lavender/10',
      borderColor: 'border-accent-lavender/30'
    },
    {
      id: 'sensitive',
      name: 'Peau Sensible',
      description: 'Formules douces • Hypoallergénique',
      icon: ShieldCheckIcon,
      color: 'text-accent-moss',
      bgColor: 'bg-accent-moss/10',
      borderColor: 'border-accent-moss/30'
    }
  ];

  // Navigation principale
  const navigation = [
    {
      name: 'Visage',
      items: [
        { name: 'Sérums', action: () => setCurrentPage('serums') },
        { name: 'Crèmes hydratantes', action: () => setCurrentPage('cremes') },
        { name: 'Nettoyants', action: () => setCurrentPage('nettoyants') },
        { name: 'Huiles & Soins', action: () => setCurrentPage('huiles') }
      ]
    },
    {
      name: 'Corps',
      items: [
        { name: 'Huiles corporelles', action: () => setCurrentPage('huiles') },
        { name: 'Crèmes corporelles', action: () => setCurrentPage('cremes') },
        { name: 'Masques & Gommages', action: () => setCurrentPage('masques') },
        { name: 'Tous les produits', action: () => setCurrentPage('products') }
      ]
    },
    {
      name: 'Gammes',
      items: [
        { name: 'Éclat & Anti-taches', action: () => setCurrentPage('serums') },
        { name: 'Nutrition Intense', action: () => setCurrentPage('cremes') },
        { name: 'Peaux Sensibles', action: () => setCurrentPage('nettoyants') },
        { name: 'Collection Karité', action: () => setCurrentPage('products') }
      ]
    },
    {
      name: 'Diagnostic',
      page: 'diagnostic'
    },
    {
      name: 'À Propos',
      page: 'about'
    },
    {
      name: 'Contact',
      page: 'contact'
    }
  ];

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentProfile = userProfiles.find(p => p.id === userProfile) || userProfiles[0];
  const CurrentProfileIcon = currentProfile.icon;

  return (
    <header className="relative z-50">
      {/* Barre promo */}
      <div className="bg-gradient-to-r from-accent-moss to-primary-forest text-white py-1.5 xs:py-2 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-organic-pattern opacity-10" />
        <div className="relative z-10 px-2 xs:px-4">
          <p className="text-xs xs:text-sm font-medium">
            <SparklesIcon className="inline w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            <span className="hidden xs:inline">Livraison offerte dès 49€ • Diagnostic personnalisé gratuit</span>
            <span className="xs:hidden">Livraison offerte dès 49€</span>
            <SparklesIcon className="inline w-3 h-3 xs:w-4 xs:h-4 ml-1 xs:ml-2" />
          </p>
        </div>
      </div>

      {/* Header principal */}
      <div className="bg-white/95 backdrop-blur-lg border-b border-primary-sage/20 sticky top-0 z-40">
        <div className="container mx-auto px-3 xs:px-4">
          <div className="flex items-center justify-between h-16 xs:h-18 sm:h-20">
            
            {/* Logo */}
            <motion.button
              onClick={() => setCurrentPage('home')}
              className="flex items-center mr-6 xs:mr-8 sm:mr-10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/logo.png" 
                  alt="Terrafro Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback si l'image n'existe pas
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-gold to-primary-forest rounded-organic flex items-center justify-center hidden">
                  <span className="text-white font-bold text-2xl xs:text-3xl sm:text-4xl">TF</span>
                </div>
              </div>
            </motion.button>

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.items ? (
                    <>
                      <button className="flex items-center gap-1 text-primary-forest font-semibold hover:text-primary-gold transition-colors py-2 text-sm xl:text-base px-2">
                        {item.name}
                        <ChevronDownIcon className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-organic shadow-organic border border-primary-sage/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <div className="p-4 space-y-2">
                          {item.items.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={subItem.action}
                              className="block w-full text-left px-3 py-2 text-primary-sage hover:text-primary-gold hover:bg-primary-gold/10 rounded-lg transition-colors text-sm"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <button 
                      onClick={() => item.page && setCurrentPage(item.page)}
                      className={`text-primary-forest font-semibold hover:text-primary-gold transition-colors text-sm xl:text-base px-2 ${
                        currentPage === item.page ? 'text-primary-gold' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions utilisateur */}
            <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 ml-4 xs:ml-6 sm:ml-8">
              
              {/* Sélecteur de profil discret */}
              <div className="relative" ref={profileMenuRef}>
                <motion.button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`hidden lg:flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full border-2 transition-all ${currentProfile.bgColor} ${currentProfile.borderColor} hover:shadow-organic`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CurrentProfileIcon className={`w-4 h-4 ${currentProfile.color}`} />
                  <span className="text-sm font-medium text-primary-forest">
                    {currentProfile.name.split(' ')[0]}
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''} ${currentProfile.color}`} />
                </motion.button>

                {/* Menu profils */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-organic-lg shadow-organic-lg border border-primary-sage/20 overflow-hidden"
                    >
                      <div className="p-4">
                        <p className="text-sm font-semibold text-primary-forest mb-3">
                          Personnaliser votre expérience
                        </p>
                        <div className="space-y-2">
                          {userProfiles.map((profile) => {
                            const ProfileIcon = profile.icon;
                            return (
                              <motion.button
                                key={profile.id}
                                onClick={() => {
                                  setUserProfile({ id: profile.id });
                                  setIsProfileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                                  userProfile.id === profile.id
                                    ? `${profile.bgColor} ${profile.borderColor}`
                                    : 'border-transparent hover:bg-primary-sage/10'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${profile.bgColor}`}>
                                  <ProfileIcon className={`w-5 h-5 ${profile.color}`} />
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="font-semibold text-primary-forest text-sm">
                                    {profile.name}
                                  </p>
                                  <p className="text-xs text-primary-sage">
                                    {profile.description}
                                  </p>
                                </div>
                                {userProfile.id === profile.id && (
                                  <div className="w-2 h-2 bg-primary-gold rounded-full" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recherche */}
              <div className="relative hidden md:block">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xl:w-5 xl:h-5 text-primary-sage" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 xl:pl-10 pr-4 py-2 w-48 xl:w-64 bg-secondary-cream rounded-full border border-primary-sage/30 focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all text-sm"
                />
              </div>

              {/* Favoris */}
              <motion.button
                onClick={() => setCurrentPage('favorites')}
                className="relative p-2 xs:p-3 text-primary-sage hover:text-primary-gold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`${favoritesCount} favoris`}
              >
                <HeartIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 w-4 h-4 xs:w-5 xs:h-5 bg-accent-coral text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}
              </motion.button>

              {/* Panier */}
              <motion.button
                onClick={() => setCurrentPage('cart')}
                className="relative p-2 xs:p-3 text-primary-sage hover:text-primary-gold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`${cartItemsCount} articles dans le panier`}
              >
                <ShoppingBagIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 w-4 h-4 xs:w-5 xs:h-5 bg-primary-gold text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </motion.button>

              {/* Compte utilisateur */}
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 xs:p-3 text-primary-sage hover:text-primary-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <UserIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                </motion.button>

                {/* Menu utilisateur */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-44 xs:w-48 bg-white rounded-organic shadow-organic border border-primary-sage/20"
                    >
                      <div className="p-2">
                        {[
                          { name: 'Mon compte', action: () => setCurrentPage('account') },
                          { name: 'Mes commandes', action: () => setCurrentPage('account') },
                          { name: 'Mes favoris', action: () => setCurrentPage('favorites') },
                          { name: 'Aide', action: () => setCurrentPage('faq') }
                        ].map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              item.action();
                              setIsUserMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-primary-sage hover:text-primary-gold hover:bg-primary-gold/10 rounded-lg transition-colors text-sm"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Menu mobile */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 xs:p-3 text-primary-sage hover:text-primary-gold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                ) : (
                  <Bars3Icon className="w-5 h-5 xs:w-6 xs:h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-primary-sage/20"
            >
              <div className="container mx-auto px-3 xs:px-4 py-4 xs:py-6">
                
                {/* Sélecteur de profil mobile */}
                <div className="mb-4 xs:mb-6">
                  <p className="text-sm font-semibold text-primary-forest mb-2 xs:mb-3">
                    Votre profil
                  </p>
                  <div className="grid gap-1.5 xs:gap-2">
                    {userProfiles.map((profile) => {
                      const ProfileIcon = profile.icon;
                      return (
                        <motion.button
                          key={profile.id}
                          onClick={() => {
                            setUserProfile({ id: profile.id });
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 rounded-lg border-2 transition-all ${
                            userProfile.id === profile.id
                              ? `${profile.bgColor} ${profile.borderColor}`
                              : 'border-primary-sage/20 hover:bg-primary-sage/10'
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center ${profile.bgColor}`}>
                            <ProfileIcon className={`w-3.5 h-3.5 xs:w-4 xs:h-4 ${profile.color}`} />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-primary-forest text-xs xs:text-sm">
                              {profile.name}
                            </p>
                            <p className="text-xs text-primary-sage">
                              {profile.description}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation mobile */}
                <nav className="space-y-3 xs:space-y-4">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <h3 className="font-semibold text-primary-forest mb-1.5 xs:mb-2 text-sm xs:text-base">
                        {item.name}
                      </h3>
                      {item.items ? (
                        <div className="space-y-1 ml-3 xs:ml-4">
                          {item.items.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => {
                                subItem.action();
                                setIsMenuOpen(false);
                              }}
                              className="block text-primary-sage hover:text-primary-gold transition-colors text-sm py-1"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            item.page && setCurrentPage(item.page);
                            setIsMenuOpen(false);
                          }}
                          className="block text-primary-sage hover:text-primary-gold transition-colors ml-3 xs:ml-4 text-sm py-1"
                        >
                          {item.name}
                        </button>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Recherche mobile */}
                <div className="mt-4 xs:mt-6">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-primary-sage" />
                    <input
                      type="text"
                      placeholder="Rechercher un produit..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-9 xs:pl-10 pr-4 py-2.5 xs:py-3 bg-secondary-cream rounded-lg border border-primary-sage/30 focus:border-primary-gold focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderPremium;