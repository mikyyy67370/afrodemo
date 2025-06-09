import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  TruckIcon,
  ShieldCheckIcon,
  BeakerIcon,
  CreditCardIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  SparklesIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const FAQPage = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

  // Catégories FAQ
  const categories = [
    { id: 'all', name: 'Toutes les questions', icon: QuestionMarkCircleIcon, color: 'text-primary-gold' },
    { id: 'produits', name: 'Produits & Ingrédients', icon: BeakerIcon, color: 'text-accent-moss' },
    { id: 'commande', name: 'Commande & Paiement', icon: CreditCardIcon, color: 'text-accent-lavender' },
    { id: 'livraison', name: 'Livraison & Retours', icon: TruckIcon, color: 'text-accent-terracotta' },
    { id: 'compte', name: 'Mon Compte', icon: HeartIcon, color: 'text-accent-coral' },
    { id: 'diagnostic', name: 'Diagnostic IA', icon: SparklesIcon, color: 'text-primary-gold' }
  ];

  // Questions fréquentes par catégorie
  const faqData = [
    // Produits & Ingrédients
    {
      category: 'produits',
      question: 'Vos produits sont-ils vraiment 100% bio ?',
      answer: 'Oui, tous nos produits Terrafro sont certifiés bio COSMOS/Ecocert avec minimum 95% d\'ingrédients d\'origine naturelle. Nous utilisons exclusivement des ingrédients premium comme le karité du Burkina Faso, l\'huile de baobab du Sénégal, et des extraits de plantes africaines certifiés bio.'
    },
    {
      category: 'produits',
      question: 'Pourquoi vos produits sont-ils spécifiquement formulés pour les peaux afro ?',
      answer: 'Les peaux afro et métissées ont des besoins spécifiques : tendance à l\'hyperpigmentation, besoin d\'hydratation intense, sensibilité particulière. Nos formules sont développées avec des dermatologues spécialisés et testées sur tous les phototypes pour garantir efficacité et sécurité.'
    },
    {
      category: 'produits',
      question: 'Puis-je utiliser vos produits si j\'ai la peau sensible ?',
      answer: 'Absolument ! Tous nos produits sont hypoallergéniques et testés dermatologiquement. Notre gamme "Peaux Sensibles" avec des ingrédients ultra-doux comme l\'argile rose et le calendula est spécialement conçue pour les peaux réactives.'
    },
    {
      category: 'produits',
      question: 'Vos produits sont-ils testés sur les animaux ?',
      answer: 'Non, jamais ! Terrafro est certifiée Cruelty Free. Nous ne testons aucun produit sur les animaux et travaillons uniquement avec des fournisseurs partageant cette éthique.'
    },
    {
      category: 'produits',
      question: 'Quels sont les principaux ingrédients de vos formules ?',
      answer: 'Nos star-ingrédients incluent : beurre de karité pur du Burkina Faso, huiles de baobab et marula, vitamine C stabilisée, niacinamide, argile rose, aloe vera bio, et des extraits de plantes africaines comme l\'hibiscus et le fenugrec.'
    },

    // Commande & Paiement
    {
      category: 'commande',
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer: 'Nous acceptons toutes les cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay et le paiement en 3x sans frais avec Klarna. Tous les paiements sont sécurisés par SSL et 3D Secure.'
    },
    {
      category: 'commande',
      question: 'Puis-je modifier ou annuler ma commande ?',
      answer: 'Vous pouvez modifier ou annuler votre commande dans les 2h suivant la validation, depuis votre espace client. Passé ce délai, contactez notre service client au 01 23 45 67 89 pour toute modification.'
    },
    {
      category: 'commande',
      question: 'Proposez-vous des coffrets cadeaux ?',
      answer: 'Oui ! Nous proposons plusieurs coffrets cadeaux premium avec emballage élégant et carte personnalisée. Parfait pour offrir une expérience beauté Terrafro complète.'
    },

    // Livraison & Retours
    {
      category: 'livraison',
      question: 'Quels sont vos délais et frais de livraison ?',
      answer: 'Livraison gratuite dès 49€ d\'achat en 2-3 jours ouvrés. Livraison express 24h à 4,90€. Nous livrons en France métropolitaine, Belgique, Suisse et Luxembourg. Suivi par SMS et email.'
    },
    {
      category: 'livraison',
      question: 'Puis-je retourner un produit qui ne me convient pas ?',
      answer: 'Oui, retours gratuits sous 30 jours. Les produits doivent être non ouverts et dans leur emballage d\'origine pour des raisons d\'hygiène. Remboursement intégral sous 5-7 jours ouvrés.'
    },
    {
      category: 'livraison',
      question: 'Que faire si mon colis est endommagé ?',
      answer: 'Contactez-nous immédiatement avec photos à l\'appui. Nous vous envoyons un nouveau produit en express gratuit et récupérons le colis endommagé. Votre satisfaction est notre priorité.'
    },

    // Mon Compte
    {
      category: 'compte',
      question: 'Comment créer mon compte Terrafro ?',
      answer: 'Créez votre compte en 2 minutes lors de votre première commande ou directement sur notre site. Bénéficiez de votre espace personnel, historique des commandes, et programme de fidélité.'
    },
    {
      category: 'compte',
      question: 'Qu\'est-ce que le programme de fidélité ?',
      answer: 'Gagnez 1 point par euro dépensé. 100 points = 5€ de réduction. Accès privilégié aux nouveautés, offres exclusives membre, et conseils beauté personnalisés de nos experts.'
    },
    {
      category: 'compte',
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Connectez-vous à votre espace client, section "Mon Profil". Vous pouvez modifier adresses, informations de paiement, préférences de communication et paramètres du diagnostic IA.'
    },

    // Diagnostic IA
    {
      category: 'diagnostic',
      question: 'Comment fonctionne votre diagnostic IA ?',
      answer: 'Notre diagnostic IA analyse 12 critères (type de peau, phototype, préoccupations, mode de vie) pour recommander les produits les plus adaptés. Algorithme développé avec des dermatologues spécialisés en peaux ethniques.'
    },
    {
      category: 'diagnostic',
      question: 'Le diagnostic est-il vraiment gratuit ?',
      answer: 'Oui, 100% gratuit et sans engagement ! Recevez vos recommandations personnalisées en 5 minutes. Vous pouvez refaire le diagnostic à tout moment si vos besoins évoluent.'
    },
    {
      category: 'diagnostic',
      question: 'Puis-je faire confiance aux recommandations IA ?',
      answer: 'Nos recommandations sont basées sur une base de données de 50 000+ profils analysés par nos dermatologues. Taux de satisfaction de 94% sur les recommandations proposées.'
    }
  ];

  // Filtrage des FAQ
  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <QuestionMarkCircleIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Trouvez rapidement les réponses à toutes vos questions sur Terrafro,
          </h1>
          <p className="text-body text-primary-sage max-w-2xl mx-auto">
            Trouvez rapidement les réponses à toutes vos questions sur Terrafro, 
            nos produits bio premium et nos services.
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-sage" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-organic border border-primary-sage/30 focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all shadow-organic"
            />
          </div>
        </motion.div>

        {/* Catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-forest text-white border-primary-forest'
                    : 'bg-white text-primary-forest border-primary-sage/30 hover:border-primary-gold hover:bg-primary-gold/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className={`w-5 h-5 ${
                  activeCategory === category.id ? 'text-white' : category.color
                }`} />
                <span className="font-semibold">{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-organic-lg shadow-organic border border-primary-sage/10 overflow-hidden"
                >
                  <motion.button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-primary-gold/5 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="font-bold text-primary-forest pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDownIcon 
                      className={`w-6 h-6 text-primary-gold transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </motion.button>
                  
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-primary-sage/10">
                          <p className="text-primary-sage leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-primary-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-8 h-8 text-primary-sage" />
                </div>
                <h3 className="text-heading-lg font-bold text-primary-forest mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-primary-sage">
                  Essayez d'autres mots-clés ou contactez notre équipe.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-gold/10 to-accent-moss/10 rounded-organic-lg p-8 border border-primary-gold/20 max-w-3xl mx-auto">
            <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-primary-sage mb-6">
              Notre équipe d'experts beauté est là pour vous aider. 
              Contactez-nous et recevez une réponse personnalisée sous 24h.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center gap-3 bg-primary-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-forest/90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                Nous contacter
              </motion.button>
              
              <motion.button
                className="inline-flex items-center gap-3 bg-white text-primary-forest px-8 py-4 rounded-full font-semibold border-2 border-primary-forest hover:bg-primary-forest hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneIcon className="w-6 h-6" />
                01 23 45 67 89
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage; 