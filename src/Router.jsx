import React, { useState, useEffect } from 'react';
import { useShop } from './context/ShopContext';
import HeaderPremium from './components/HeaderPremium';
import FooterPremium from './components/FooterPremium';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import DiagnosticPage from './pages/DiagnosticPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShippingPage from './pages/ShippingPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import FavoritesPage from './pages/FavoritesPage';
import AccountPage from './pages/AccountPage';
import LegalPage from './pages/LegalPage';

const Router = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userProfile, setUserProfile] = useState({
    id: 'discovery',
    firstName: 'Visiteur',
    lastName: '',
    email: '',
    skinType: 'mixte',
    skinConcerns: ['hydratation', 'eclat', 'taches_brunes'],
    visitCount: 0,
    isLoggedIn: false
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Utiliser le Context pour le profil utilisateur
  const { updateUserProfile } = useShop();

  // Scroll au top lors du changement de page - Version améliorée
  useEffect(() => {
    // Scroll immédiat et forcé
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Double vérification avec un délai
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 50);
    
    // Forcer le focus sur le body pour éviter les problèmes de scroll
    document.body.focus();
  }, [currentPage]);

  // Helper pour mettre à jour le profil utilisateur avec validation
  const updateUserProfileHelper = (newProfileData) => {
    if (!newProfileData || typeof newProfileData !== 'object') return;
    
    setUserProfile(prev => ({
      ...prev,
      ...newProfileData
    }));
  };

  // Configuration des pages
  const pages = {
    home: { component: HomePage, title: 'Accueil' },
    diagnostic: { component: DiagnosticPage, title: 'Diagnostic Beauté' },
    contact: { component: ContactPage, title: 'Contact' },
    about: { component: AboutPage, title: 'À Propos' },
    faq: { component: FAQPage, title: 'FAQ' },
    products: { component: ProductListPage, title: 'Produits', props: { category: selectedCategory } },
    'product-detail': { component: ProductDetailPage, title: 'Détail Produit', props: { productId: selectedProductId } },
    shipping: { component: ShippingPage, title: 'Livraison & Retours' },
    serums: { component: ProductListPage, title: 'Sérums', props: { category: 'serums' } },
    cremes: { component: ProductListPage, title: 'Crèmes', props: { category: 'cremes' } },
    huiles: { component: ProductListPage, title: 'Huiles', props: { category: 'huiles' } },
    masques: { component: ProductListPage, title: 'Masques', props: { category: 'masques' } },
    nettoyants: { component: ProductListPage, title: 'Nettoyants', props: { category: 'nettoyants' } },
    cart: { component: CartPage, title: 'Mon Panier' },
    favorites: { component: FavoritesPage, title: 'Mes Favoris' },
    account: { component: AccountPage, title: 'Mon Compte' },
    checkout: { component: CheckoutPage, title: 'Checkout' },
    legal: { component: LegalPage, title: 'Mentions Légales' }
  };

  const currentPageConfig = pages[currentPage] || pages.home;
  const CurrentPageComponent = currentPageConfig.component;

  return (
    <div className="min-h-screen">
      <ScrollToTop trigger={currentPage} />
      
      <HeaderPremium 
        userProfile={userProfile} 
        setUserProfile={updateUserProfileHelper}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedCategory={setSelectedCategory}
        setSelectedProductId={setSelectedProductId}
      />
      
      <main>
        <CurrentPageComponent 
          userProfile={userProfile}
          setCurrentPage={setCurrentPage}
          setSelectedProductId={setSelectedProductId}
          {...(currentPageConfig.props || {})}
        />
      </main>
      
      <FooterPremium setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Router; 