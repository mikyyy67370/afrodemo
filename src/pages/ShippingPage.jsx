import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TruckIcon,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  GlobeEuropeAfricaIcon,
  CalendarDaysIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const ShippingPage = ({ setCurrentPage }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Zones et tarifs de livraison
  const shippingZones = [
    {
      zone: 'France Métropolitaine',
      icon: MapPinIcon,
      color: 'text-primary-gold',
      options: [
        { name: 'Standard (Colissimo)', time: '2-3 jours ouvrés', price: 'Gratuit dès 49€, sinon 4,90€' },
        { name: 'Express (24h)', time: '1 jour ouvré', price: '9,90€' },
        { name: 'Point Relais', time: '2-4 jours ouvrés', price: 'Gratuit dès 39€, sinon 3,90€' }
      ]
    },
    {
      zone: 'Corse & DOM-TOM',
      icon: GlobeEuropeAfricaIcon,
      color: 'text-accent-coral',
      options: [
        { name: 'Colissimo Outre-Mer', time: '5-7 jours ouvrés', price: '12,90€' },
        { name: 'Chronopost Express', time: '2-3 jours ouvrés', price: '24,90€' }
      ]
    },
    {
      zone: 'Europe',
      icon: GlobeEuropeAfricaIcon,
      color: 'text-accent-moss',
      options: [
        { name: 'UPS Standard', time: '3-5 jours ouvrés', price: '9,90€' },
        { name: 'DHL Express', time: '1-2 jours ouvrés', price: '19,90€' }
      ]
    }
  ];

  // Process de commande
  const orderProcess = [
    {
      step: 1,
      title: 'Commande validée',
      description: 'Confirmation immédiate par email avec numéro de suivi',
      icon: CheckCircleIcon,
      color: 'bg-primary-gold'
    },
    {
      step: 2,
      title: 'Préparation',
      description: 'Emballage soigné dans nos ateliers sous 24h',
      icon: TruckIcon,
      color: 'bg-accent-moss'
    },
    {
      step: 3,
      title: 'Expédition',
      description: 'Notification d\'expédition avec lien de suivi',
      icon: MapPinIcon,
      color: 'bg-accent-lavender'
    },
    {
      step: 4,
      title: 'Livraison',
      description: 'Réception chez vous ou en point relais',
      icon: ShieldCheckIcon,
      color: 'bg-accent-terracotta'
    }
  ];

  // Politique de retours
  const returnPolicy = [
    {
      title: 'Délai de retour',
      description: '30 jours calendaires à partir de la réception',
      icon: CalendarDaysIcon,
      valid: true
    },
    {
      title: 'État du produit',
      description: 'Non ouvert, dans son emballage d\'origine',
      icon: ShieldCheckIcon,
      valid: true
    },
    {
      title: 'Frais de retour',
      description: 'Gratuits avec étiquette prépayée fournie',
      icon: BanknotesIcon,
      valid: true
    },
    {
      title: 'Remboursement',
      description: 'Intégral sous 5-7 jours ouvrés',
      icon: CheckCircleIcon,
      valid: true
    },
    {
      title: 'Produits exclus',
      description: 'Produits personnalisés ou en promotion flash',
      icon: XCircleIcon,
      valid: false
    }
  ];

  // FAQ Livraison
  const shippingFAQ = [
    {
      question: 'Puis-je modifier l\'adresse de livraison après la commande ?',
      answer: 'Vous avez 2h après validation pour modifier votre adresse depuis votre espace client. Passé ce délai, contactez notre service client.'
    },
    {
      question: 'Que faire si je ne suis pas présent à la livraison ?',
      answer: 'Le transporteur laissera un avis de passage. Vous aurez 15 jours pour récupérer votre colis au bureau de poste le plus proche.'
    },
    {
      question: 'Puis-je suivre ma commande en temps réel ?',
      answer: 'Oui, dès l\'expédition vous recevez un lien de suivi par email et SMS pour suivre votre colis en temps réel.'
    },
    {
      question: 'Livrez-vous en Afrique ?',
      answer: 'Actuellement nous livrons uniquement en France, Europe et DOM-TOM. L\'extension vers l\'Afrique est prévue courant 2024.'
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-secondary-cream to-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <TruckIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Livraison & Retours
          </h1>
          <p className="text-body text-primary-sage max-w-2xl mx-auto">
            Découvrez nos options de livraison rapides et sécurisées, 
            ainsi que notre politique de retours flexible pour votre tranquillité.
          </p>
        </motion.div>

        {/* Zones de livraison */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-heading-xl font-bold text-primary-forest text-center mb-12">
            Nos zones de livraison
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {shippingZones.map((zone, index) => {
              const IconComponent = zone.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`w-6 h-6 ${zone.color}`} />
                    <h3 className="font-bold text-primary-forest">{zone.zone}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {zone.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="p-3 bg-secondary-cream/50 rounded-organic">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-primary-forest text-sm">
                            {option.name}
                          </h4>
                          <span className="text-xs text-primary-sage bg-white px-2 py-1 rounded-full">
                            {option.time}
                          </span>
                        </div>
                        <p className="text-primary-sage text-sm font-medium">
                          {option.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Processus de commande */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-heading-xl font-bold text-primary-forest text-center mb-12">
            Suivi de votre commande
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {orderProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-white rounded-organic-lg p-4 shadow-organic border border-primary-sage/10">
                    <h3 className="font-bold text-primary-forest mb-2">{step.title}</h3>
                    <p className="text-primary-sage text-sm">{step.description}</p>
                  </div>
                  
                  {index < orderProcess.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary-sage/20 transform translate-x-6"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Politique de retours */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-heading-xl font-bold text-primary-forest text-center mb-12">
            Politique de retours
          </h2>
          
          <div className="bg-white rounded-organic-lg p-8 shadow-organic border border-primary-sage/10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {returnPolicy.map((policy, index) => {
                const IconComponent = policy.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`p-4 rounded-organic border-2 ${
                      policy.valid
                        ? 'border-primary-gold/30 bg-primary-gold/5'
                        : 'border-accent-coral/30 bg-accent-coral/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className={`w-6 h-6 mt-1 ${
                        policy.valid ? 'text-primary-gold' : 'text-accent-coral'
                      }`} />
                      <div>
                        <h3 className="font-bold text-primary-forest mb-1">{policy.title}</h3>
                        <p className="text-primary-sage text-sm">{policy.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 p-6 bg-primary-gold/10 rounded-organic border border-primary-gold/20"
            >
              <div className="flex items-start gap-3">
                <InformationCircleIcon className="w-6 h-6 text-primary-gold mt-1" />
                <div>
                  <h3 className="font-bold text-primary-forest mb-2">Comment effectuer un retour ?</h3>
                  <ol className="text-primary-sage text-sm space-y-1">
                    <li>1. Connectez-vous à votre espace client</li>
                    <li>2. Sélectionnez la commande concernée</li>
                    <li>3. Cliquez sur "Demander un retour"</li>
                    <li>4. Imprimez l'étiquette prépayée</li>
                    <li>5. Remettez le colis à La Poste</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-heading-xl font-bold text-primary-forest text-center mb-12">
            Questions fréquentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {shippingFAQ.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
              >
                <h3 className="font-bold text-primary-forest mb-3">{faq.question}</h3>
                <p className="text-primary-sage text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Contact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-gold/10 to-accent-moss/10 rounded-organic-lg p-8 border border-primary-gold/20 max-w-2xl mx-auto">
            <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
              Une question sur votre livraison ?
            </h3>
            <p className="text-primary-sage mb-6">
              Notre équipe est disponible 7j/7 pour vous accompagner et répondre à toutes vos questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setCurrentPage('contact')}
                className="bg-primary-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-forest/90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nous contacter
              </motion.button>
              
              <motion.button
                onClick={() => setCurrentPage('faq')}
                className="bg-white text-primary-forest px-8 py-4 rounded-full font-semibold border-2 border-primary-forest hover:bg-primary-forest hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir toutes les FAQ
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPage; 