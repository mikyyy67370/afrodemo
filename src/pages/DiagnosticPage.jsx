import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BeakerIcon,
  CameraIcon,
  SunIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';

const DiagnosticPage = () => {
  const { addToCart, addNotification } = useShop();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Questions du diagnostic personnalisé
  const diagnosticQuestions = [
    {
      id: 'skinType',
      title: 'Quel est votre type de peau ?',
      subtitle: 'Cette information nous aide à personnaliser vos recommandations',
      type: 'single',
      options: [
        { value: 'normale', label: 'Normale', desc: 'Ni trop grasse, ni trop sèche' },
        { value: 'seche', label: 'Sèche', desc: 'Tiraillements, desquamation' },
        { value: 'grasse', label: 'Grasse', desc: 'Brillances, pores dilatés' },
        { value: 'mixte', label: 'Mixte', desc: 'Zone T grasse, joues sèches' },
        { value: 'sensible', label: 'Sensible', desc: 'Réactions, rougeurs, inconfort' }
      ]
    },
    {
      id: 'skinTone',
      title: 'Quelle est votre carnation ?',
      subtitle: 'Pour des recommandations adaptées à votre phototype',
      type: 'single',
      options: [
        { value: 'claire', label: 'Peau claire', desc: 'Phototype I-II' },
        { value: 'metisse', label: 'Peau métissée', desc: 'Phototype III-IV' },
        { value: 'foncee', label: 'Peau foncée', desc: 'Phototype V' },
        { value: 'tres-foncee', label: 'Peau très foncée', desc: 'Phototype VI' }
      ]
    },
    {
      id: 'concerns',
      title: 'Quelles sont vos préoccupations principales ?',
      subtitle: 'Sélectionnez toutes les réponses qui vous correspondent',
      type: 'multiple',
      options: [
        { value: 'hyperpigmentation', label: 'Taches brunes / Hyperpigmentation', icon: SparklesIcon },
        { value: 'secheresse', label: 'Sécheresse / Déshydratation', icon: SunIcon },
        { value: 'eclat', label: 'Manque d\'éclat / Teint terne', icon: BeakerIcon },
        { value: 'rides', label: 'Rides / Signes de l\'âge', icon: ExclamationTriangleIcon },
        { value: 'acne', label: 'Acné / Imperfections', icon: CameraIcon },
        { value: 'sensibilite', label: 'Sensibilité / Irritations', icon: HeartIcon }
      ]
    },
    {
      id: 'routine',
      title: 'Quelle est votre routine actuelle ?',
      subtitle: 'Pour adapter nos recommandations à vos habitudes',
      type: 'single',
      options: [
        { value: 'minimale', label: 'Minimale', desc: 'Nettoyage + hydratation' },
        { value: 'basique', label: 'Basique', desc: '3-4 produits matin/soir' },
        { value: 'complete', label: 'Complète', desc: '5+ produits, sérums, masques' },
        { value: 'inexistante', label: 'Inexistante', desc: 'Pas de routine établie' }
      ]
    },
    {
      id: 'budget',
      title: 'Quel est votre budget mensuel beauté ?',
      subtitle: 'Pour vous proposer des produits adaptés',
      type: 'single',
      options: [
        { value: 'economique', label: 'Économique', desc: 'Moins de 50€/mois' },
        { value: 'moderé', label: 'Modéré', desc: '50-100€/mois' },
        { value: 'premium', label: 'Premium', desc: '100-200€/mois' },
        { value: 'luxe', label: 'Luxe', desc: 'Plus de 200€/mois' }
      ]
    }
  ];

  // Gestion des réponses
  const handleResponse = (questionId, value, isMultiple = false) => {
    setResponses(prev => {
      if (isMultiple) {
        const currentValues = prev[questionId] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [questionId]: newValues };
      }
      return { ...prev, [questionId]: value };
    });
  };

  // Navigation
  const nextStep = () => {
    if (currentStep < diagnosticQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Calcul des résultats
  const calculateResults = () => {
    const { skinType, skinTone, concerns = [], routine, budget } = responses;
    
    // Recommandations basées sur les réponses
    const recommendations = {
      products: [],
      routine: [],
      tips: []
    };

    // Produits recommandés selon les préoccupations
    if (concerns.includes('hyperpigmentation')) {
      recommendations.products.push({
        name: 'Sérum Éclaircissant Vitamine C',
        price: 48,
        match: 95,
        reason: 'Idéal pour réduire les taches brunes'
      });
    }

    if (concerns.includes('secheresse') || skinType === 'seche') {
      recommendations.products.push({
        name: 'Baume Karité Nutrition Extrême',
        price: 35,
        match: 92,
        reason: 'Nutrition intense pour peaux sèches'
      });
    }

    if (concerns.includes('eclat')) {
      recommendations.products.push({
        name: 'Huile Précieuse Trio Africain',
        price: 42,
        match: 88,
        reason: 'Révèle l\'éclat naturel immédiatement'
      });
    }

    return recommendations;
  };

  const currentQuestion = diagnosticQuestions[currentStep];
  const progress = ((currentStep + 1) / diagnosticQuestions.length) * 100;
  const canProceed = responses[currentQuestion?.id];

  // Résultats simulés du diagnostic (normalement calculés par IA)
  const diagnosticResults = [
    {
      name: 'Sérum Éclaircissant Vitamine C',
      image: 'serum-vitc.jpg',
      reason: 'Cible spécifiquement vos préoccupations principales'
    },
    {
      name: 'Baume Karité Nutrition Intense',
      image: 'creme-aloe.jpg',
      reason: 'Hydratation optimale pour votre type de peau'
    },
    {
      name: 'Huile Précieuse Trio Africain',
      image: 'huile-argan.jpg',
      reason: 'Révèle l\'éclat naturel immédiatement'
    }
  ];

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
              Votre Diagnostic Terra Luxe
            </h1>
            <p className="text-body text-primary-sage">
              Routine personnalisée pour révéler votre beauté naturelle
            </p>
          </motion.div>

          {/* Résultats */}
          <div className="grid md:grid-cols-2 gap-8">
            {results.products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-primary-gold font-bold">{product.match}%</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-forest">{product.name}</h3>
                    <p className="text-primary-gold font-semibold">{product.price || 0}€</p>
                  </div>
                </div>
                <p className="text-primary-sage mb-4">{product.reason}</p>
                <motion.button
                  onClick={() => {
                    // Créer un objet produit à partir des résultats
                    const productToAdd = {
                      id: product.name.toLowerCase().replace(/ /g, '-'),
                      name: product.name,
                      price: product.price,
                      image: `serum-vitc.jpg`, // Image par défaut, vous pouvez l'ajuster
                      quantity: 1
                    };
                    
                    addToCart(productToAdd);
                    addNotification({
                      type: 'success',
                      title: 'Produit ajouté !',
                      message: `${product.name} ajouté au panier`,
                      duration: 3000
                    });
                  }}
                  className="w-full bg-primary-forest text-white py-3 rounded-full font-semibold hover:bg-primary-forest/90 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  Ajouter au panier
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentStep(0);
                setResponses({});
              }}
              className="bg-white text-primary-forest px-8 py-3 rounded-full border-2 border-primary-forest hover:bg-primary-forest hover:text-white transition-all"
            >
              Refaire le diagnostic
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <BeakerIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-heading-2xl font-bold text-primary-forest mb-4">
            Diagnostic Beauté
          </h1>
          <p className="text-body text-primary-sage">
            Découvrez en 5 minutes la routine beauté parfaite pour votre peau
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-primary-sage">
              Question {currentStep + 1} sur {diagnosticQuestions.length}
            </span>
            <span className="text-sm font-semibold text-primary-forest">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-primary-sage/20 rounded-full h-2">
            <motion.div
              className="bg-primary-gold h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-organic-lg p-8 shadow-organic border border-primary-sage/10 mb-8"
          >
            <h2 className="text-heading-lg font-bold text-primary-forest mb-4">
              {currentQuestion.title}
            </h2>
            <p className="text-primary-sage mb-8">
              {currentQuestion.subtitle}
            </p>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.type === 'multiple'
                  ? (responses[currentQuestion.id] || []).includes(option.value)
                  : responses[currentQuestion.id] === option.value;
                const IconComponent = option.icon;

                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleResponse(currentQuestion.id, option.value, currentQuestion.type === 'multiple')}
                    className={`w-full p-4 rounded-organic border-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary-gold bg-primary-gold/10'
                        : 'border-primary-sage/30 hover:border-primary-gold/50 hover:bg-primary-gold/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      {IconComponent && (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-primary-gold' : 'bg-primary-sage/20'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            isSelected ? 'text-white' : 'text-primary-sage'
                          }`} />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className={`font-semibold ${
                          isSelected ? 'text-primary-forest' : 'text-primary-sage'
                        }`}>
                          {option.label}
                        </p>
                        {option.desc && (
                          <p className="text-sm text-primary-sage/80 mt-1">
                            {option.desc}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <CheckCircleIcon className="w-6 h-6 text-primary-gold" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all ${
              currentStep === 0
                ? 'border-primary-sage/30 text-primary-sage/50 cursor-not-allowed'
                : 'border-primary-forest text-primary-forest hover:bg-primary-forest hover:text-white'
            }`}
            whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
            whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Précédent
          </motion.button>

          <motion.button
            onClick={nextStep}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${
              canProceed
                ? 'bg-primary-forest text-white hover:bg-primary-forest/90 shadow-glow'
                : 'bg-primary-sage/30 text-primary-sage/50 cursor-not-allowed'
            }`}
            whileHover={canProceed ? { scale: 1.05 } : {}}
            whileTap={canProceed ? { scale: 0.95 } : {}}
          >
            {currentStep === diagnosticQuestions.length - 1 ? 'Voir mes résultats' : 'Suivant'}
            <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPage; 