import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types d'actions
const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// État initial sécurisé
const initialState = {
  cart: [],
  favorites: [],
  userProfile: {
    id: 'discovery',
    firstName: '',
    lastName: '',
    email: '',
    skinType: '',
    skinConcerns: [],
    visitCount: 0,
    isLoggedIn: false
  },
  notifications: []
};

// Utilitaires de validation
const validateCartItem = (item) => {
  if (!item || typeof item !== 'object') return null;
  
  return {
    id: item.id || '',
    name: item.name || 'Produit sans nom',
    price: parseFloat(item.price) || 0,
    image: item.image || '/images/placeholder.webp',
    quantity: parseInt(item.quantity) || 1,
    category: item.category || 'general',
    brand: item.brand || 'Terrafro'
  };
};

const validateUserProfile = (profile) => {
  if (!profile || typeof profile !== 'object') return initialState.userProfile;
  
  return {
    id: profile.id || 'discovery',
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    email: profile.email || '',
    skinType: profile.skinType || '',
    skinConcerns: Array.isArray(profile.skinConcerns) ? profile.skinConcerns : [],
    visitCount: parseInt(profile.visitCount) || 0,
    isLoggedIn: Boolean(profile.isLoggedIn)
  };
};

// Reducer amélioré
const shopReducer = (state, action) => {
  // Validation de l'état
  if (!state) state = initialState;
  
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const validatedItem = validateCartItem(action.payload);
      if (!validatedItem) return state;
      
      const existingItem = (state.cart || []).find(item => item.id === validatedItem.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: (state.cart || []).map(item =>
            item.id === validatedItem.id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        cart: [...(state.cart || []), { ...validatedItem, quantity: 1 }]
      };
    }

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: (state.cart || []).filter(item => item && item.id !== action.payload)
      };

    case actionTypes.UPDATE_QUANTITY: {
      const quantity = parseInt(action.payload.quantity) || 0;
      if (quantity <= 0) {
        return {
          ...state,
          cart: (state.cart || []).filter(item => item && item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        cart: (state.cart || []).map(item =>
          item && item.id === action.payload.id
            ? { ...item, quantity }
            : item
        )
      };
    }

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case actionTypes.ADD_TO_FAVORITES: {
      const validatedItem = validateCartItem(action.payload);
      if (!validatedItem) return state;
      
      const existingFavorite = (state.favorites || []).find(item => item.id === validatedItem.id);
      
      if (existingFavorite) {
        return state; // Déjà en favoris
      }
      
      return {
        ...state,
        favorites: [...(state.favorites || []), validatedItem]
      };
    }

    case actionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: (state.favorites || []).filter(item => item && item.id !== action.payload)
      };

    case actionTypes.UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: validateUserProfile({ ...state.userProfile, ...action.payload })
      };

    case actionTypes.ADD_NOTIFICATION: {
      const notification = {
        id: Date.now() + Math.random(),
        type: action.payload.type || 'info',
        title: action.payload.title || '',
        message: action.payload.message || '',
        duration: action.payload.duration || 4000
      };
      
      return {
        ...state,
        notifications: [...(state.notifications || []), notification]
      };
    }

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: (state.notifications || []).filter(notification => 
          notification && notification.id !== action.payload
        )
      };

    default:
      return state;
  }
};

// Context
const ShopContext = createContext();

// Provider
export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('terra-luxe-cart');
    const savedFavorites = localStorage.getItem('terra-luxe-favorites');
    const savedProfile = localStorage.getItem('terra-luxe-profile');

    if (savedCart) {
      const cart = JSON.parse(savedCart);
      cart.forEach(item => {
        dispatch({ type: actionTypes.ADD_TO_CART, payload: item });
      });
    }

    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      favorites.forEach(item => {
        dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: item });
      });
    }

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      dispatch({ type: actionTypes.UPDATE_USER_PROFILE, payload: profile });
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('terra-luxe-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('terra-luxe-favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem('terra-luxe-profile', JSON.stringify(state.userProfile));
  }, [state.userProfile]);

  // Actions
  const addToCart = (product) => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
    
    // Ajouter notification
    addNotification({
      type: 'success',
      title: 'Produit ajouté !',
      message: `${product.name} a été ajouté à votre panier`,
      duration: 3000
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({ type: actionTypes.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: actionTypes.CLEAR_CART });
  };

  const addToFavorites = (product) => {
    dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: product });
    
    // Ajouter notification
    addNotification({
      type: 'success',
      title: 'Favoris mis à jour !',
      message: `${product.name} ajouté à vos favoris`,
      duration: 3000
    });
  };

  const removeFromFavorites = (productId) => {
    dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: productId });
  };

  const updateUserProfile = (profileData) => {
    dispatch({ type: actionTypes.UPDATE_USER_PROFILE, payload: profileData });
  };

  const addNotification = (notification) => {
    dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification });
    
    // Auto-remove après duration
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(notification.id || Date.now());
      }, notification.duration);
    }
  };

  const removeNotification = (notificationId) => {
    dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: notificationId });
  };

  // Getters utiles
  const cartItemsCount = state.cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const cartTotal = state.cart.reduce((total, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return total + (price * quantity);
  }, 0);
  const favoritesCount = state.favorites.length;

  const value = {
    // État
    cart: state.cart,
    favorites: state.favorites,
    userProfile: state.userProfile,
    notifications: state.notifications,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    updateUserProfile,
    addNotification,
    removeNotification,
    
    // Getters
    cartItemsCount,
    cartTotal,
    favoritesCount
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

// Hook personnalisé
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export default ShopContext; 