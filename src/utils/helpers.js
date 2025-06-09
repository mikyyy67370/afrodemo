// Utilitaires pour éviter les valeurs NaN et undefined

export const safeNumber = (value, defaultValue = 0) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const safePrice = (price) => {
  return safeNumber(price, 0);
};

export const safeQuantity = (quantity) => {
  return safeNumber(quantity, 0);
};

export const formatPrice = (price) => {
  return `${safePrice(price)}€`;
};

export const calculateTotal = (price, quantity) => {
  return safePrice(price) * safeQuantity(quantity);
};

export const validateProduct = (product) => {
  return {
    ...product,
    price: safePrice(product.price),
    quantity: safeQuantity(product.quantity),
    rating: safeNumber(product.rating, 4.5),
    reviews: safeNumber(product.reviews, 0)
  };
}; 