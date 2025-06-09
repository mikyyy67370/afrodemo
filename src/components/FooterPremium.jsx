import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChevronRightIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  ChatBubbleBottomCenterTextIcon,
  BeakerIcon,
  CheckBadgeIcon,
  HandRaisedIcon,
  FaceSmileIcon,
  CameraIcon,
  VideoCameraIcon,
  DevicePhoneMobileIcon,
  TvIcon,
  PaintBrushIcon,
  GiftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const FooterPremium = ({ setCurrentPage }) => {
  const [emailNewsletter, setEmailNewsletter] = useState('');
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  // Navigation footer
  const footerSections = [
    {
      title: "Nos Produits",
      links: [
        { name: "Sérums Éclaircissants", action: () => setCurrentPage('serums') },
        { name: "Crèmes Hydratantes", action: () => setCurrentPage('cremes') },
        { name: "Huiles Précieuses", action: () => setCurrentPage('huiles') },
        { name: "Masques Purifiants", action: () => setCurrentPage('masques') },
        { name: "Laits Démaquillants", action: () => setCurrentPage('nettoyants') },
        { name: "Tous nos produits", action: () => setCurrentPage('products') }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Diagnostic IA Gratuit", action: () => setCurrentPage('diagnostic') },
        { name: "Mon Compte", action: () => setCurrentPage('account') },
        { name: "Mon Panier", action: () => setCurrentPage('cart') },
        { name: "Mes Favoris", action: () => setCurrentPage('favorites') },
        { name: "Suivi de Commande", action: () => setCurrentPage('account') },
        { name: "Programme Fidélité", action: () => setCurrentPage('account') }
      ]
    },
    {
      title: "Aide & Support",
      links: [
        { name: "Questions Fréquentes", action: () => setCurrentPage('faq') },
        { name: "Livraison & Retours", action: () => setCurrentPage('shipping') },
        { name: "Contact", action: () => setCurrentPage('contact') },
        { name: "Guide des Tailles", action: () => setCurrentPage('about') },
        { name: "Suivi de Commande", action: () => setCurrentPage('account') },
        { name: "Avis Clients", action: () => setCurrentPage('about') }
      ]
    },
    {
      title: "Terra Luxe",
      links: [
        { name: "À Propos", action: () => setCurrentPage('about') },
        { name: "Notre Histoire", action: () => setCurrentPage('about') },
        { name: "Nos Valeurs Bio", action: () => setCurrentPage('about') },
        { name: "Contact", action: () => setCurrentPage('contact') },
        { name: "Carrières", action: () => setCurrentPage('about') },
        { name: "Partenaires", action: () => setCurrentPage('about') }
      ]
    }
  ];

  // Certifications et labels avec icônes Terra Luxe
  const certifications = [
    { 
      name: "COSMOS Organic", 
      icon: SparklesIcon, 
      color: "text-accent-moss" 
    },
    { 
      name: "Ecocert", 
      icon: CheckBadgeIcon, 
      color: "text-primary-gold" 
    },
    { 
      name: "NATRUE", 
      icon: BeakerIcon, 
      color: "text-accent-lavender" 
    },
    { 
      name: "Fair Trade", 
      icon: HandRaisedIcon, 
      color: "text-accent-terracotta" 
    },
    { 
      name: "Cruelty Free", 
      icon: FaceSmileIcon, 
      color: "text-accent-coral" 
    }
  ];

  // Réseaux sociaux avec icônes professionnelles
  const socialLinks = [
    { 
      name: "Instagram", 
      href: "#", 
      icon: CameraIcon, 
      followers: "45K",
      color: "text-accent-coral"
    },
    { 
      name: "Facebook", 
      href: "#", 
      icon: GlobeAltIcon, 
      followers: "32K",
      color: "text-accent-lavender"
    },
    { 
      name: "TikTok", 
      href: "#", 
      icon: DevicePhoneMobileIcon, 
      followers: "28K",
      color: "text-primary-gold"
    },
    { 
      name: "YouTube", 
      href: "#", 
      icon: TvIcon, 
      followers: "15K",
      color: "text-accent-terracotta"
    },
    { 
      name: "Pinterest", 
      href: "#", 
      icon: PaintBrushIcon, 
      followers: "12K",
      color: "text-accent-moss"
    }
  ];

  // Gestion newsletter
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailNewsletter) {
      setIsNewsletterSubmitted(true);
      setTimeout(() => {
        setIsNewsletterSubmitted(false);
        setEmailNewsletter('');
      }, 3000);
    }
  };

  const companyInfo = {
    name: "Terrafro",
    tagline: "Cosmétiques Bio Premium",
    description: "Des soins authentiques inspirés des traditions africaines, formulés avec les meilleurs ingrédients bio pour révéler votre beauté naturelle.",
    founded: "2021",
    headquarters: "Dakar, Sénégal",
    mission: "Révéler la beauté naturelle de chaque femme à travers des cosmétiques bio d'exception, respectueux de la peau et de l'environnement."
  };

  const brandInfo = {
    title: "Terrafro",
    description: "Des cosmétiques bio premium conçus spécialement pour sublimer la beauté des peaux afro et métissées.",
    values: [
      "Formules 100% naturelles",
      "Ingrédients bio certifiés", 
      "Respect de l'environnement",
      "Commerce équitable"
    ]
  };

  return (
    <footer className="relative bg-gradient-to-br from-primary-forest via-primary-sage to-accent-moss text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="bg-organic-pattern w-full h-full" />
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Section principale */}
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
            
            {/* Logo et présentation */}
            <div className="sm:col-span-2 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-gold to-accent-moss rounded-organic flex items-center justify-center">
                    <span className="text-white font-bold text-lg sm:text-xl">TL</span>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-2xl font-bold">Terrafro</h4>
                    <p className="text-white/80 text-xs sm:text-sm">Cosmétiques Bio Premium</p>
                  </div>
                </div>

                <p className="text-white/80 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {companyInfo.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-gold" />
                    <span className="text-xs sm:text-sm">+33 1 42 86 97 52</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-gold" />
                    <span className="text-xs sm:text-sm">contact@terraluxe.fr</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-gold" />
                    <span className="text-xs sm:text-sm">75008 Paris, France</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation rapide */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h5 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Navigation</h5>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    { name: 'Accueil', page: 'home' },
                    { name: 'Produits', page: 'products' },
                    { name: 'Diagnostic', page: 'diagnostic' },
                    { name: 'À propos', page: 'about' },
                    { name: 'Contact', page: 'contact' }
                  ].map((link) => (
                    <li key={link.name}>
                      <motion.button
                        onClick={() => setCurrentPage && setCurrentPage(link.page)}
                        className="text-white/80 hover:text-primary-gold transition-colors text-xs sm:text-sm block"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Catégories */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h5 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Catégories</h5>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    'Sérums',
                    'Crèmes visage',
                    'Huiles',
                    'Nettoyants',
                    'Masques'
                  ].map((category) => (
                    <li key={category}>
                      <motion.button
                        onClick={() => {
                          if (setCurrentPage) {
                            setCurrentPage('products');
                          }
                        }}
                        className="text-white/80 hover:text-primary-gold transition-colors text-xs sm:text-sm block"
                        whileHover={{ x: 5 }}
                      >
                        {category}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Support */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h5 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Support</h5>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    { name: 'FAQ', page: 'faq' },
                    { name: 'Livraison', page: 'shipping' },
                    { name: 'Retours', page: 'returns' },
                    { name: 'Garantie', page: 'warranty' },
                    { name: 'Aide', page: 'help' }
                  ].map((link) => (
                    <li key={link.name}>
                      <motion.button
                        onClick={() => setCurrentPage && setCurrentPage(link.page)}
                        className="text-white/80 hover:text-primary-gold transition-colors text-xs sm:text-sm block"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Newsletter responsive */}
            <div className="sm:col-span-2 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h5 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Newsletter</h5>
                <p className="text-white/80 mb-3 sm:mb-4 text-xs sm:text-sm">
                  Recevez nos conseils beauté et nos offres exclusives
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={emailNewsletter}
                      onChange={(e) => setEmailNewsletter(e.target.value)}
                      placeholder="Votre e-mail"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-gold text-xs sm:text-sm"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full bg-primary-gold text-primary-forest py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-primary-gold/90 transition-all text-xs sm:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    S'abonner
                  </motion.button>
                </form>

                {isNewsletterSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-2 sm:p-3 bg-accent-moss/20 rounded-lg border border-accent-moss/30"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-accent-moss" />
                      <span className="text-accent-moss text-xs sm:text-sm font-medium">
                        Inscription réussie !
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Section sociale et certifications */}
        <div className="border-t border-white/20">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Réseaux sociaux */}
              <motion.div
                className="flex items-center gap-3 sm:gap-4 order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-white/80 text-xs sm:text-sm mr-2 sm:mr-3">Suivez-nous :</span>
                
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-gold hover:text-primary-forest transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Suivre sur ${social.name}`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Certifications responsive */}
              <motion.div
                className="flex items-center gap-3 sm:gap-4 order-1 lg:order-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-white/80 text-xs sm:text-sm mr-2 sm:mr-3">Certifications :</span>
                
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 sm:py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <cert.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-gold" />
                    <span className="text-xs font-medium">{cert.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer légal responsive */}
        <div className="border-t border-white/20 bg-black/20">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Copyright */}
              <motion.div
                className="text-center lg:text-left order-2 lg:order-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-white/80 text-xs sm:text-sm">
                  © {new Date().getFullYear()} Terrafro. Tous droits réservés.
                </p>
                <p className="text-white/60 text-xs mt-1">
                  {companyInfo.mission}
                </p>
              </motion.div>

              {/* Liens légaux responsive */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 order-1 lg:order-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {[
                  'Mentions légales',
                  'CGV',
                  'Politique de confidentialité',
                  'Cookies'
                ].map((link, index) => (
                  <motion.button
                    key={link}
                    onClick={() => setCurrentPage && setCurrentPage('legal')}
                    className="text-white/80 hover:text-primary-gold transition-colors text-xs sm:text-sm"
                    whileHover={{ y: -1 }}
                  >
                    {link}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPremium; 