import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Informations de contact
  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Téléphone',
      content: '01 23 45 67 89',
      subtitle: 'Lun-Ven 9h-18h, Sam 10h-16h',
      color: 'text-primary-gold'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      content: 'contact@terraluxe.fr',
      subtitle: 'Réponse sous 24h',
      color: 'text-accent-moss'
    },
    {
      icon: MapPinIcon,
      title: 'Adresse',
      content: '123 Avenue de la Beauté',
      subtitle: '75001 Paris, France',
      color: 'text-accent-lavender'
    },
    {
      icon: ClockIcon,
      title: 'Horaires',
      content: 'Lun-Ven: 9h-18h',
      subtitle: 'Sam: 10h-16h, Dim: Fermé',
      color: 'text-accent-terracotta'
    }
  ];

  // Types de demandes
  const subjectOptions = [
    { value: 'general', label: 'Question générale' },
    { value: 'commande', label: 'Suivi de commande' },
    { value: 'produit', label: 'Question produit' },
    { value: 'retour', label: 'Retour/Échange' },
    { value: 'conseil', label: 'Conseil beauté' },
    { value: 'partenariat', label: 'Partenariat' }
  ];

  // FAQ rapide
  const quickFAQ = [
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Livraison gratuite en 2-3 jours ouvrés pour toute commande dès 49€. Express en 24h disponible.'
    },
    {
      question: 'Puis-je retourner un produit ?',
      answer: 'Oui, retours gratuits sous 30 jours. Produits non ouverts uniquement pour des raisons d\'hygiène.'
    },
    {
      question: 'Les produits sont-ils vraiment bio ?',
      answer: 'Tous nos produits sont certifiés bio COSMOS/Ecocert avec minimum 95% d\'ingrédients naturels.'
    },
    {
      question: 'Comment utiliser le diagnostic IA ?',
      answer: 'Le diagnostic prend 5 minutes et analyse votre type de peau pour des recommandations personnalisées.'
    }
  ];

  // Gestion du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation envoi
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 3000);
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
            <ChatBubbleBottomCenterTextIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Contactez Terra Luxe
          </h1>
          <p className="text-body text-primary-sage max-w-2xl mx-auto">
            Notre équipe d'experts beauté est là pour vous accompagner. 
            Posez vos questions, demandez conseil, nous sommes à votre écoute.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-heading-lg font-bold text-primary-forest mb-8">
              Nos Coordonnées
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-organic shadow-organic border border-primary-sage/10"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-primary-sage/10`}>
                      <IconComponent className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-forest mb-1">
                        {info.title}
                      </h3>
                      <p className="text-primary-forest font-medium">
                        {info.content}
                      </p>
                      <p className="text-primary-sage text-sm">
                        {info.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Avantages service client */}
            <div className="bg-primary-gold/10 rounded-organic-lg p-6 border border-primary-gold/20">
              <h3 className="font-bold text-primary-forest mb-4 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-primary-gold" />
                Pourquoi nous choisir ?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TruckIcon className="w-5 h-5 text-accent-moss" />
                  <span className="text-primary-sage">Livraison gratuite dès 49€</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-accent-lavender" />
                  <span className="text-primary-sage">Conseils d'experts certifiés</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary-gold" />
                  <span className="text-primary-sage">Satisfaction garantie 30 jours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-organic-lg p-8 shadow-organic border border-primary-sage/10">
              <h2 className="text-heading-lg font-bold text-primary-forest mb-6">
                Écrivez-nous
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-heading-lg font-bold text-primary-forest mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-primary-sage">
                    Merci pour votre message. Notre équipe vous répondra sous 24h.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-primary-forest font-semibold mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-sage/30 rounded-organic focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-primary-forest font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-sage/30 rounded-organic focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-primary-forest font-semibold mb-2">
                      Sujet de votre demande *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary-sage/30 rounded-organic focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all"
                    >
                      {subjectOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-primary-forest font-semibold mb-2">
                      Votre message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-primary-sage/30 rounded-organic focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-primary-forest text-white py-4 rounded-organic font-semibold shadow-glow hover:bg-primary-forest/90 hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    Envoyer le message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Rapide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-accent-moss rounded-full flex items-center justify-center mx-auto mb-4">
              <QuestionMarkCircleIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-heading-xl font-bold text-primary-forest mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-primary-sage">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {quickFAQ.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-organic p-6 shadow-organic border border-primary-sage/10"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-bold text-primary-forest mb-3 flex items-start gap-2">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-primary-gold mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-primary-sage leading-relaxed ml-7">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button
              className="bg-accent-moss text-white px-8 py-3 rounded-full font-semibold hover:bg-accent-moss/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir toutes les FAQ
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 