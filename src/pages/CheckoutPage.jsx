import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShoppingBagIcon,
  TruckIcon,
  CreditCardIcon,
  LockClosedIcon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GiftIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';
import ProductImage from '../components/ProductImage';

const CheckoutPage = ({ setCurrentPage }) => {
  const { 
    cart, 
    cartTotal, 
    addNotification,
    clearCart 
  } = useShop();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Adresse de livraison
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
    
    // Options
    deliveryOption: 'standard',
    paymentMethod: 'card',
    
    // Facturation
    sameAsDelivery: true,
    billingAddress: '',
    billingCity: '',
    billingZipCode: '',
    
    // Carte bancaire
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Options de livraison
  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Livraison Standard',
      description: '2-3 jours ouvrés',
      price: 0,
      minOrder: 49,
      icon: TruckIcon
    },
    {
      id: 'express',
      name: 'Livraison Express',
      description: '24h ouvrées',
      price: 4.90,
      icon: TruckIcon
    },
    {
      id: 'pickup',
      name: 'Point Relais',
      description: '2-4 jours ouvrés',
      price: 2.90,
      icon: BuildingOfficeIcon
    }
  ];

  // Options de paiement
  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte Bancaire',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCardIcon
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Paiement sécurisé PayPal',
      icon: LockClosedIcon
    }
  ];

  // Calculs
  const subtotal = cartTotal || 0;
  const selectedDelivery = deliveryOptions.find(option => option.id === formData.deliveryOption);
  const shippingCost = selectedDelivery?.minOrder && subtotal >= selectedDelivery.minOrder 
    ? 0 
    : selectedDelivery?.price || 0;
  const total = (subtotal || 0) + (shippingCost || 0);

  // Étapes du checkout
  const steps = [
    { id: 1, title: 'Livraison', description: 'Adresse et mode de livraison' },
    { id: 2, title: 'Paiement', description: 'Mode de paiement' },
    { id: 3, title: 'Confirmation', description: 'Vérification de la commande' }
  ];

  // Gestion du formulaire
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Supprimer l'erreur si l'utilisateur corrige
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'Prénom requis';
      if (!formData.lastName) newErrors.lastName = 'Nom requis';
      if (!formData.email) newErrors.email = 'Email requis';
      if (!formData.phone) newErrors.phone = 'Téléphone requis';
      if (!formData.address) newErrors.address = 'Adresse requise';
      if (!formData.city) newErrors.city = 'Ville requise';
      if (!formData.zipCode) newErrors.zipCode = 'Code postal requis';
    } else if (step === 2 && formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
      if (!formData.expiryDate) newErrors.expiryDate = 'Date d\'expiration requise';
      if (!formData.cvv) newErrors.cvv = 'CVV requis';
      if (!formData.cardName) newErrors.cardName = 'Nom du titulaire requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation entre étapes
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Finaliser la commande
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsProcessing(true);
    
    // Simulation du traitement
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Commande confirmée !',
        message: 'Votre commande a été passée avec succès',
        duration: 5000
      });
      
      clearCart();
      setIsProcessing(false);
      setCurrentPage('home');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingBagIcon className="w-16 h-16 text-primary-sage mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-forest mb-2">Panier vide</h2>
          <p className="text-primary-sage mb-6">Ajoutez des produits pour passer commande</p>
          <motion.button
            onClick={() => setCurrentPage('products')}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Découvrir nos produits
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white" ref={sectionRef}>
      {/* Header */}
      <div className="bg-primary-forest text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Finaliser ma commande
            </h1>
            
            {/* Indicateur d'étapes */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 mt-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep >= step.id
                        ? 'bg-primary-gold text-white'
                        : 'bg-white/20 text-white/60'
                    }`}
                    animate={{
                      scale: currentStep === step.id ? 1.1 : 1,
                      backgroundColor: currentStep >= step.id ? '#D4AF37' : 'rgba(255,255,255,0.2)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep > step.id ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </motion.div>
                  
                  <div className="ml-2 sm:ml-3 text-left hidden sm:block">
                    <div className={`text-sm font-semibold ${
                      currentStep >= step.id ? 'text-white' : 'text-white/60'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-white/60">
                      {step.description}
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <ArrowRightIcon className="w-4 h-4 text-white/40 mx-4 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-organic-lg shadow-organic border border-primary-sage/10 p-6 sm:p-8"
              >
                
                {/* Étape 1: Livraison */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-forest mb-6">
                      Informations de livraison
                    </h2>
                    
                    {/* Informations personnelles */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary-forest mb-4">
                        Informations personnelles
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-primary-sage mb-2">
                            Prénom *
                          </label>
                          <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-sage" />
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.firstName ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="Votre prénom"
                            />
                          </div>
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-primary-sage mb-2">
                            Nom *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                              errors.lastName ? 'border-red-500' : 'border-primary-sage/30'
                            }`}
                            placeholder="Votre nom"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-primary-sage mb-2">
                            Email *
                          </label>
                          <div className="relative">
                            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-sage" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.email ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="votre@email.com"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-primary-sage mb-2">
                            Téléphone *
                          </label>
                          <div className="relative">
                            <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-sage" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.phone ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="06 12 34 56 78"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Adresse de livraison */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary-forest mb-4">
                        Adresse de livraison
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-primary-sage mb-2">
                            Adresse *
                          </label>
                          <div className="relative">
                            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-sage" />
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.address ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="123 rue de la Beauté"
                            />
                          </div>
                          {errors.address && (
                            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-primary-sage mb-2">
                              Ville *
                            </label>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.city ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="Paris"
                            />
                            {errors.city && (
                              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-primary-sage mb-2">
                              Code postal *
                            </label>
                            <input
                              type="text"
                              value={formData.zipCode}
                              onChange={(e) => handleInputChange('zipCode', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.zipCode ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="75001"
                            />
                            {errors.zipCode && (
                              <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Options de livraison */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary-forest mb-4">
                        Mode de livraison
                      </h3>
                      <div className="space-y-3">
                        {deliveryOptions.map((option) => (
                          <motion.div
                            key={option.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              formData.deliveryOption === option.id
                                ? 'border-primary-gold bg-primary-gold/10'
                                : 'border-primary-sage/30 hover:border-primary-gold/50'
                            }`}
                            onClick={() => handleInputChange('deliveryOption', option.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                  formData.deliveryOption === option.id
                                    ? 'border-primary-gold bg-primary-gold'
                                    : 'border-primary-sage/30'
                                }`}>
                                  {formData.deliveryOption === option.id && (
                                    <motion.div
                                      className="w-full h-full rounded-full bg-primary-gold"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  )}
                                </div>
                                <option.icon className="w-5 h-5 text-primary-sage" />
                                <div>
                                  <div className="font-semibold text-primary-forest">
                                    {option.name}
                                  </div>
                                  <div className="text-sm text-primary-sage">
                                    {option.description}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-primary-gold">
                                  {option.minOrder && subtotal >= option.minOrder 
                                    ? 'Gratuite' 
                                    : `${option.price}€`
                                  }
                                </div>
                                {option.minOrder && subtotal < option.minOrder && (
                                  <div className="text-xs text-primary-sage">
                                    Gratuite dès {option.minOrder}€
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Étape 2: Paiement */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-forest mb-6">
                      Mode de paiement
                    </h2>
                    
                    {/* Sélection du mode de paiement */}
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <motion.div
                          key={method.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? 'border-primary-gold bg-primary-gold/10'
                              : 'border-primary-sage/30 hover:border-primary-gold/50'
                          }`}
                          onClick={() => handleInputChange('paymentMethod', method.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              formData.paymentMethod === method.id
                                ? 'border-primary-gold bg-primary-gold'
                                : 'border-primary-sage/30'
                            }`}>
                              {formData.paymentMethod === method.id && (
                                <motion.div
                                  className="w-full h-full rounded-full bg-primary-gold"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                />
                              )}
                            </div>
                            <method.icon className="w-5 h-5 text-primary-sage" />
                            <div>
                              <div className="font-semibold text-primary-forest">
                                {method.name}
                              </div>
                              <div className="text-sm text-primary-sage">
                                {method.description}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Formulaire carte bancaire */}
                    {formData.paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 pt-6 border-t border-primary-sage/20"
                      >
                        <h3 className="text-lg font-semibold text-primary-forest">
                          Informations de carte
                        </h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-primary-sage mb-2">
                            Numéro de carte *
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                              errors.cardNumber ? 'border-red-500' : 'border-primary-sage/30'
                            }`}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-primary-sage mb-2">
                              Date d'expiration *
                            </label>
                            <input
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.expiryDate ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="MM/AA"
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-primary-sage mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                                errors.cvv ? 'border-red-500' : 'border-primary-sage/30'
                              }`}
                              placeholder="123"
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-primary-sage mb-2">
                            Nom du titulaire *
                          </label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold ${
                              errors.cardName ? 'border-red-500' : 'border-primary-sage/30'
                            }`}
                            placeholder="Nom comme sur la carte"
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Sécurité */}
                    <div className="bg-accent-moss/10 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheckIcon className="w-5 h-5 text-accent-moss" />
                        <span className="font-semibold text-primary-forest">
                          Paiement 100% sécurisé
                        </span>
                      </div>
                      <p className="text-sm text-primary-sage">
                        Vos données sont protégées par un cryptage SSL. Nous ne stockons aucune information bancaire.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Étape 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-forest mb-6">
                      Confirmer votre commande
                    </h2>
                    
                    {/* Récapitulatif des informations */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-primary-forest mb-2">
                          Livraison
                        </h3>
                        <p className="text-sm text-primary-sage">
                          {formData.firstName} {formData.lastName}<br />
                          {formData.address}<br />
                          {formData.zipCode} {formData.city}<br />
                          {formData.email} • {formData.phone}
                        </p>
                        <p className="text-sm text-primary-gold font-semibold mt-2">
                          {selectedDelivery?.name} - {selectedDelivery?.description}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-primary-forest mb-2">
                          Paiement
                        </h3>
                        <p className="text-sm text-primary-sage">
                          {paymentMethods.find(m => m.id === formData.paymentMethod)?.name}
                        </p>
                        {formData.paymentMethod === 'card' && (
                          <p className="text-sm text-primary-sage">
                            **** **** **** {formData.cardNumber.slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Conditions */}
                    <div className="bg-primary-gold/10 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1"
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-primary-sage">
                          J'accepte les{' '}
                          <span className="text-primary-gold font-semibold cursor-pointer">
                            conditions générales de vente
                          </span>{' '}
                          et la{' '}
                          <span className="text-primary-gold font-semibold cursor-pointer">
                            politique de confidentialité
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Boutons de navigation */}
                <div className="flex justify-between pt-6 border-t border-primary-sage/20">
                  {currentStep > 1 ? (
                    <motion.button
                      onClick={prevStep}
                      className="flex items-center gap-2 px-6 py-3 border border-primary-sage/30 rounded-lg text-primary-sage hover:bg-primary-sage/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      Retour
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => setCurrentPage('cart')}
                      className="flex items-center gap-2 px-6 py-3 border border-primary-sage/30 rounded-lg text-primary-sage hover:bg-primary-sage/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      Retour au panier
                    </motion.button>
                  )}
                  
                  {currentStep < 3 ? (
                    <motion.button
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-primary-forest text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-forest/90 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continuer
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                        isProcessing
                          ? 'bg-primary-sage/50 text-white cursor-not-allowed'
                          : 'bg-primary-gold text-white hover:bg-primary-gold/90'
                      }`}
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Traitement...
                        </>
                      ) : (
                        <>
                          <LockClosedIcon className="w-4 h-4" />
                          Confirmer la commande
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Récapitulatif commande */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-organic-lg shadow-organic border border-primary-sage/10 p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold text-primary-forest mb-6">
                Votre commande
              </h3>
              
              {/* Produits */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-forest text-sm mb-1">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-primary-sage">
                          Qté: {item.quantity || 0}
                        </span>
                        <span className="font-bold text-primary-gold">
                          {((item.price || 0) * (item.quantity || 0))}€
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totaux */}
              <div className="space-y-3 pt-6 border-t border-primary-sage/20">
                <div className="flex justify-between">
                  <span className="text-primary-sage">Sous-total</span>
                  <span className="font-semibold">{subtotal}€</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-primary-sage">Livraison</span>
                  <span className={shippingCost === 0 ? 'text-accent-moss font-semibold' : ''}>
                    {shippingCost === 0 ? 'Gratuite' : `${shippingCost}€`}
                  </span>
                </div>
                
                <div className="flex justify-between text-xl font-bold text-primary-forest pt-3 border-t border-primary-sage/20">
                  <span>Total</span>
                  <span>{total}€</span>
                </div>
              </div>
              
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
      </div>
    </div>
  );
};

export default CheckoutPage; 