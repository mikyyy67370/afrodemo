import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  SparklesIcon,
  ChevronDownIcon,
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Header = ({ currentProfile, onProfileChange, profiles }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);

  // Navigation principale
  const navigation = [
    { name: 'Accueil', href: '#', current: true },
    { name: 'Nouveautés', href: '#', badge: 'New' },
    { name: 'Visage', href: '#', submenu: ['Sérums', 'Crèmes', 'Masques', 'Nettoyants'] },
    { name: 'Corps', href: '#', submenu: ['Hydratants', 'Huiles', 'Gommages'] },
    { name: 'Gammes', href: '#', submenu: ['Anti-Âge', 'Hydratation', 'Éclat', 'Sensibles'] },
    { name: 'Diagnostic', href: '#', special: true },
    { name: 'À propos', href: '#' }
  ];

  // Profils pour le sélecteur
  const profileOptions = [
    {
      id: 'discovery',
      name: 'Nouvelle découverte',
      description: 'Je découvre les cosmétiques bio',
      icon: StarIcon,
      color: 'text-primary-gold'
    },
    {
      id: 'returning',
      name: 'Cliente fidèle',
      description: 'J\'ai déjà mes préférences',
      icon: HeartIcon,
      color: 'text-accent-lavender'
    },
    {
      id: 'sensitive',
      name: 'Peau sensible',
      description: 'Je cherche des produits doux',
      icon: ShieldCheckIcon,
      color: 'text-accent-moss'
    }
  ];

  const currentProfileData = profileOptions.find(p => p.id === currentProfile) || profileOptions[0];
  const CurrentIcon = currentProfileData.icon;

  return (
    <header className="relative bg-white/95 backdrop-blur-md border-b border-primary-sage/20 sticky top-0 z-50">
      <div className="container mx-auto">
        
        {/* Top Bar - Promo */}
        <div className="hidden lg:block bg-primary-forest text-white text-center py-2 text-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <SparklesIcon className="w-4 h-4" />
            <span>Livraison gratuite dès 50€ • 30 jours satisfait ou remboursé</span>
            <SparklesIcon className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4 lg:py-6">
          
          {/* Logo */}
          <motion.div
            className="flex items-center mr-6 lg:mr-8"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center overflow-hidden">
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
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-gold to-accent-moss rounded-full flex items-center justify-center hidden">
                <span className="text-white font-bold text-2xl lg:text-3xl">TF</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center mx-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => console.log(`Navigate to ${item.name}`)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    item.current
                      ? 'text-primary-gold font-semibold'
                      : item.special
                      ? 'bg-primary-gold text-white font-semibold hover:bg-primary-gold/90'
                      : 'text-primary-forest hover:text-primary-gold hover:bg-primary-gold/10'
                  }`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-accent-coral text-white text-xs px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && (
                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </button>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white rounded-organic shadow-organic-lg border border-primary-sage/20 py-2 min-w-[200px]">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem}
                          onClick={() => console.log(`Navigate to ${subItem}`)}
                          className="block w-full text-left px-4 py-2 text-primary-forest hover:bg-primary-gold/10 hover:text-primary-gold transition-colors"
                        >
                          {subItem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 ml-6 lg:ml-8">
            
            {/* Sélecteur de Profil - Discret */}
            <div className="relative hidden lg:block">
              <motion.button
                onClick={() => setIsProfileSelectorOpen(!isProfileSelectorOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-primary-gold/10 rounded-full border border-primary-gold/30 hover:bg-primary-gold/20 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-gold to-accent-moss rounded-full flex items-center justify-center">
                  <CurrentIcon className={`w-5 h-5 ${currentProfileData.color}`} />
                </div>
                <span className="text-sm font-medium text-primary-forest hidden xl:block">
                  {currentProfileData.name}
                </span>
                <ChevronDownIcon className="w-4 h-4 text-primary-gold" />
              </motion.button>

              <AnimatePresence>
                {isProfileSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-organic shadow-organic-lg border border-primary-sage/20 py-2 min-w-[280px] z-50"
                  >
                    <div className="px-4 py-2 border-b border-primary-sage/10">
                      <p className="text-xs font-semibold text-primary-gold uppercase tracking-wider">
                        Expérience Personnalisée
                      </p>
                    </div>
                    
                    {profileOptions.map((profile) => (
                      <motion.button
                        key={profile.id}
                        onClick={() => {
                          onProfileChange(profile.id);
                          setIsProfileSelectorOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-gold/10 transition-colors ${
                          currentProfile === profile.id ? 'bg-primary-gold/10' : ''
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-gold to-accent-moss rounded-full flex items-center justify-center">
                          <profile.icon className={`w-5 h-5 ${profile.color}`} />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-primary-forest">
                            {profile.name}
                          </p>
                          <p className="text-xs text-primary-sage">
                            {profile.description}
                          </p>
                        </div>
                        {currentProfile === profile.id && (
                          <SparklesIcon className="w-4 h-4 text-primary-gold ml-auto" />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search */}
            <motion.button
              className="p-2 text-primary-sage hover:text-primary-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </motion.button>

            {/* Favorites */}
            <motion.button
              className="p-2 text-primary-sage hover:text-primary-gold transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HeartIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-accent-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Account */}
            <motion.button
              className="p-2 text-primary-sage hover:text-primary-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <UserIcon className="w-6 h-6" />
            </motion.button>

            {/* Cart */}
            <motion.button
              className="p-2 text-primary-sage hover:text-primary-gold transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-primary-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-primary-sage hover:text-primary-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-primary-sage/20"
            >
              <div className="py-4 space-y-2">
                
                {/* Mobile Profile Selector */}
                <div className="px-4 py-3 bg-primary-gold/10 rounded-organic mb-4">
                  <p className="text-xs font-semibold text-primary-gold uppercase tracking-wider mb-2">
                    Votre Expérience
                  </p>
                  <div className="space-y-2">
                    {profileOptions.map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => {
                          onProfileChange(profile.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          currentProfile === profile.id 
                            ? 'bg-white text-primary-forest' 
                            : 'text-primary-sage hover:text-primary-forest'
                        }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-gold to-accent-moss rounded-full flex items-center justify-center">
                          <profile.icon className={`w-5 h-5 ${profile.color}`} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">{profile.name}</p>
                          <p className="text-xs opacity-70">{profile.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Navigation */}
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      console.log(`Navigate to ${item.name}`);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      item.current
                        ? 'bg-primary-gold/10 text-primary-gold font-semibold'
                        : item.special
                        ? 'bg-primary-gold text-white font-semibold'
                        : 'text-primary-forest hover:bg-primary-gold/10 hover:text-primary-gold'
                    }`}
                  >
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 bg-accent-coral text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 