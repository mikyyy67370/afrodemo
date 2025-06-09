import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheckIcon, ScaleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const LegalPage = ({ setCurrentPage }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-secondary-cream to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <ScaleIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Mentions Légales
          </h1>
          <p className="text-body text-primary-sage">
            Informations légales et conditions d'utilisation
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          
          {/* Éditeur du site */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <DocumentTextIcon className="w-6 h-6 text-primary-gold" />
              <h2 className="text-heading-lg font-bold text-primary-forest">
                Éditeur du site
              </h2>
            </div>
            <div className="space-y-3 text-primary-sage">
              <p><strong>Raison sociale :</strong> Terrafro SARL</p>
              <p><strong>Adresse :</strong> 123 Avenue des Cosmétiques Bio, 75008 Paris</p>
              <p><strong>Téléphone :</strong> +33 1 42 86 75 30</p>
              <p><strong>Email :</strong> contact@terraluxe.fr</p>
              <p><strong>SIRET :</strong> 123 456 789 00012</p>
              <p><strong>TVA intracommunautaire :</strong> FR12 123456789</p>
            </div>
          </motion.div>

          {/* Hébergement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-accent-moss" />
              <h2 className="text-heading-lg font-bold text-primary-forest">
                Hébergement
              </h2>
            </div>
            <div className="space-y-3 text-primary-sage">
              <p><strong>Hébergeur :</strong> OVH SAS</p>
              <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix</p>
              <p><strong>Téléphone :</strong> +33 9 72 10 10 07</p>
            </div>
          </motion.div>

          {/* Propriété intellectuelle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
          >
            <h2 className="text-heading-lg font-bold text-primary-forest mb-4">
              Propriété intellectuelle
            </h2>
            <div className="space-y-4 text-primary-sage">
              <p>
                Le contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) 
                est la propriété exclusive de Terrafro, à l'exception des marques, logos ou contenus 
                appartenant à d'autres sociétés partenaires.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication 
                de ces différents éléments est strictement interdite sans l'accord exprès par écrit de Terrafro.
              </p>
            </div>
          </motion.div>

          {/* Données personnelles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
          >
            <h2 className="text-heading-lg font-bold text-primary-forest mb-4">
              Protection des données personnelles
            </h2>
            <div className="space-y-4 text-primary-sage">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données.
              </p>
              <p>
                Pour exercer ces droits ou pour toute question sur le traitement de vos données, 
                vous pouvez nous contacter à l'adresse : rgpd@terraluxe.fr
              </p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              onClick={() => setCurrentPage('contact')}
              className="bg-primary-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-forest/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nous contacter
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage; 