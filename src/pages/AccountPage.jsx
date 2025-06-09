import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  UserIcon,
  CogIcon,
  ShoppingBagIcon,
  HeartIcon,
  TruckIcon,
  CreditCardIcon,
  BellIcon,
  KeyIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  StarIcon,
  GiftIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const AccountPage = ({ setCurrentPage, userProfile }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Aminata',
    lastName: 'Diallo',
    email: 'aminata.diallo@email.com',
    phone: '+33 6 12 34 56 78',
    birthDate: '15/03/1992',
    skinType: 'Mixte',
    concerns: ['Anti-taches', 'Hydratation']
  });
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Onglets du compte
  const accountTabs = [
    { id: 'profile', name: 'Mon Profil', icon: UserIcon, color: 'text-primary-gold' },
    { id: 'orders', name: 'Mes Commandes', icon: ShoppingBagIcon, color: 'text-accent-moss' },
    { id: 'favorites', name: 'Mes Favoris', icon: HeartIcon, color: 'text-accent-coral' },
    { id: 'addresses', name: 'Adresses', icon: MapPinIcon, color: 'text-accent-lavender' },
    { id: 'payment', name: 'Paiement', icon: CreditCardIcon, color: 'text-accent-terracotta' },
    { id: 'settings', name: 'Paramètres', icon: CogIcon, color: 'text-primary-sage' }
  ];

  // Commandes récentes
  const recentOrders = [
    {
      id: 'TL2024001',
      date: '15 Mars 2024',
      status: 'Livré',
      statusColor: 'text-accent-moss',
      total: 73,
      items: 3,
      products: ['Sérum Vitamine C', 'Crème Karité']
    },
    {
      id: 'TL2024002',
      date: '28 Février 2024',
      status: 'En transit',
      statusColor: 'text-primary-gold',
      total: 42,
      items: 1,
      products: ['Huile Trio Africain']
    },
    {
      id: 'TL2024003',
      date: '10 Février 2024',
      status: 'Livré',
      statusColor: 'text-accent-moss',
      total: 156,
      items: 6,
      products: ['Kit Découverte Premium']
    }
  ];

  // Stats du programme fidélité
  const loyaltyStats = {
    points: 2847,
    level: 'Gold',
    nextLevel: 'Platinum',
    pointsToNext: 653,
    totalSpent: 428,
    orderCount: 12
  };

  const renderProfileTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Informations personnelles */}
      <div className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10">
        <h3 className="text-heading-lg font-bold text-primary-forest mb-6">
          Informations personnelles
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-primary-forest mb-2">
              Prénom
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              className="w-full px-4 py-3 border border-primary-sage/30 rounded-lg focus:border-primary-gold focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary-forest mb-2">
              Nom
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              className="w-full px-4 py-3 border border-primary-sage/30 rounded-lg focus:border-primary-gold focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary-forest mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="w-full px-4 py-3 border border-primary-sage/30 rounded-lg focus:border-primary-gold focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary-forest mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-primary-sage/30 rounded-lg focus:border-primary-gold focus:outline-none"
            />
          </div>
        </div>
        
        <motion.button
          className="mt-6 bg-primary-forest text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-forest/90 transition-all"
          whileHover={{ scale: 1.02 }}
        >
          Sauvegarder les modifications
        </motion.button>
      </div>

      {/* Profil beauté */}
      <div className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10">
        <h3 className="text-heading-lg font-bold text-primary-forest mb-6">
          Mon profil beauté
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-primary-forest mb-2">
              Type de peau
            </label>
            <select className="w-full px-4 py-3 border border-primary-sage/30 rounded-lg focus:border-primary-gold focus:outline-none">
              <option>Mixte</option>
              <option>Sèche</option>
              <option>Grasse</option>
              <option>Sensible</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-primary-forest mb-2">
              Préoccupations principales
            </label>
            <div className="flex flex-wrap gap-2">
              {['Anti-taches', 'Hydratation', 'Anti-âge', 'Eclat', 'Pureté'].map(concern => (
                <button
                  key={concern}
                  className={`px-3 py-1 rounded-full text-sm border-2 transition-all ${
                    profileData.concerns.includes(concern)
                      ? 'bg-primary-gold text-white border-primary-gold'
                      : 'bg-white text-primary-forest border-primary-sage/30 hover:border-primary-gold'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={() => setCurrentPage('diagnostic')}
          className="mt-6 bg-primary-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-gold/90 transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <SparklesIcon className="w-5 h-5 inline mr-2" />
          Refaire mon diagnostic
        </motion.button>
      </div>
    </motion.div>
  );

  const renderOrdersTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {recentOrders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-primary-forest mb-1">
                Commande #{order.id}
              </h3>
              <p className="text-sm text-primary-sage">
                Passée le {order.date}
              </p>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.statusColor} bg-current/10`}>
              {order.status}
            </span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-secondary-cream/50 rounded-lg">
              <div className="font-bold text-primary-forest">{order.total}€</div>
              <div className="text-sm text-primary-sage">Total</div>
            </div>
            <div className="text-center p-3 bg-secondary-cream/50 rounded-lg">
              <div className="font-bold text-primary-forest">{order.items}</div>
              <div className="text-sm text-primary-sage">Articles</div>
            </div>
            <div className="text-center p-3 bg-secondary-cream/50 rounded-lg">
              <TruckIcon className="w-6 h-6 mx-auto text-primary-gold mb-1" />
              <div className="text-sm text-primary-sage">Livraison</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-primary-sage">
              {order.products.join(', ')}
            </div>
            
            <div className="flex gap-2">
              <motion.button
                className="text-primary-gold hover:text-primary-gold/80 text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Voir détails
              </motion.button>
              <motion.button
                className="text-primary-forest hover:text-primary-forest/80 text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Racheter
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderFavoritesTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-accent-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <HeartIcon className="w-10 h-10 text-accent-coral" />
      </div>
      <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
        Gérez vos favoris
      </h3>
      <p className="text-primary-sage mb-6">
        Accédez à votre liste complète de produits favoris
      </p>
      <motion.button
        onClick={() => setCurrentPage('favorites')}
        className="bg-accent-coral text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-coral/90 transition-all"
        whileHover={{ scale: 1.05 }}
      >
        Voir mes favoris
      </motion.button>
    </motion.div>
  );

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-secondary-cream to-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Header avec stats fidélité */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Bonjour {profileData.firstName} !
          </h1>
          
          {/* Programme fidélité */}
          <div className="bg-gradient-to-r from-primary-gold/10 to-accent-moss/10 rounded-organic-lg p-6 max-w-2xl mx-auto border border-primary-gold/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <StarIcon className="w-6 h-6 text-primary-gold fill-current" />
              <span className="font-bold text-primary-forest">
                Membre {loyaltyStats.level}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-gold">
                  {loyaltyStats.points}
                </div>
                <div className="text-sm text-primary-sage">Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-forest">
                  {loyaltyStats.orderCount}
                </div>
                <div className="text-sm text-primary-sage">Commandes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-moss">
                  {loyaltyStats.totalSpent}€
                </div>
                <div className="text-sm text-primary-sage">Dépensés</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-organic-lg shadow-organic border border-primary-sage/10 p-6">
              <h3 className="font-bold text-primary-forest mb-4">Mon compte</h3>
              
              <nav className="space-y-2">
                {accountTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                        activeTab === tab.id
                          ? 'bg-primary-gold/10 text-primary-gold border border-primary-gold/30'
                          : 'text-primary-sage hover:bg-primary-sage/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <IconComponent className={`w-5 h-5 ${
                        activeTab === tab.id ? 'text-primary-gold' : tab.color
                      }`} />
                      {tab.name}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'favorites' && renderFavoritesTab()}
            
            {/* Tabs non implémentés */}
            {['addresses', 'payment', 'settings'].includes(activeTab) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-organic-lg p-12 shadow-organic border border-primary-sage/10 text-center"
              >
                <div className="w-16 h-16 bg-primary-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CogIcon className="w-8 h-8 text-primary-sage" />
                </div>
                <h3 className="text-heading-lg font-bold text-primary-forest mb-2">
                  Section en développement
                </h3>
                <p className="text-primary-sage">
                  Cette fonctionnalité sera bientôt disponible.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 