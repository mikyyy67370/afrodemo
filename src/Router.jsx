import React, { useState } from 'react';
import { useShop } from './context/ShopContext';
import HeaderPremium from './components/HeaderPremium';
import FooterPremium from './components/FooterPremium';

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductId, setSelectedProductId] = useState(1);
  
  // Utiliser le Context pour le profil utilisateur
  const { userProfile, updateUserProfile } = useShop();

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
      <HeaderPremium 
        userProfile={userProfile} 
        setUserProfile={updateUserProfile}
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