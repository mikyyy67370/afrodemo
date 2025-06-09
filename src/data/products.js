// Base de données des produits
export const products = [
  { 
    id: 1, 
    name: "Sérum Éclaircissant Vitamine C", 
    price: 48, 
    rating: 4.9, 
    reviews: 1847,
    image: "serum-vitc.jpg",
    subtitle: "Concentré anti-taches intensif",
    category: "serums",
    badges: ["Best-seller", "Anti-taches"],
    ingredients: ['Vitamine C 15%', 'Niacinamide', 'Acide kojique'],
    benefits: ['Réduit les taches brunes de 85% en 8 semaines', 'Unifie le teint et révèle l\'éclat naturel', 'Prévient l\'apparition de nouvelles taches', 'Texture légère et non grasse', 'Formule hypoallergénique testée dermatologiquement'],
    description: "Sérum haute performance pour réduire l'hyperpigmentation et unifier le teint.",
    images: ["serum-vitc.jpg", "serum-vitc-2.jpg", "serum-vitc-3.jpg", "serum-vitc-texture.jpg"],
    keyIngredients: [
      { name: 'Vitamine C', percentage: '15%', benefit: 'Éclaircit les taches' },
      { name: 'Niacinamide', percentage: '5%', benefit: 'Unifie le teint' },
      { name: 'Acide Kojique', percentage: '2%', benefit: 'Prévient les taches' },
      { name: 'Aloe Vera Bio', percentage: '10%', benefit: 'Apaise et hydrate' }
    ],
    usage: [
      'Appliquer matin et/ou soir sur peau propre',
      'Masser délicatement jusqu\'à absorption complète',
      'Éviter le contour des yeux',
      'Utiliser une protection solaire en journée',
      'Résultats visibles dès 4 semaines d\'utilisation'
    ],
    composition: 'Aqua, Magnesium Ascorbyl Phosphate (Vitamine C), Niacinamide, Kojic Acid, Aloe Barbadensis Leaf Juice*, Glycerin, Hyaluronic Acid, Tocopherol (Vitamine E), Benzyl Alcohol, Dehydroacetic Acid. *Ingrédient issu de l\'agriculture biologique.',
    certifications: ['COSMOS Organic', 'Ecocert', 'Cruelty Free'],
    skinTypes: ['Tous types', 'Peaux foncées', 'Peaux métissées'],
    concerns: ['Hyperpigmentation', 'Taches brunes', 'Teint terne'],
    inStock: true
  },
  { 
    id: 2, 
    name: "Baume Karité Nutrition Intense", 
    price: 36, 
    rating: 4.8, 
    reviews: 2156,
    image: "creme-aloe.jpg",
    subtitle: "Réparateur intensif nuit",
    category: "cremes",
    badges: ["Bio", "Réparateur"],
    ingredients: ['Karité 30%', 'Aloe Vera', 'Vitamine E'],
    benefits: ['Nutrition 24h intensive', 'Répare les peaux abîmées', 'Apaise immédiatement', 'Texture onctueuse et pénétrante', 'Résistant aux agressions extérieures'],
    description: "Baume onctueux qui nourrit et répare intensément les peaux sèches et abîmées.",
    images: ["creme-aloe.jpg", "creme-aloe-2.jpg", "creme-aloe-3.jpg", "creme-aloe-texture.jpg"],
    keyIngredients: [
      { name: 'Karité Bio', percentage: '30%', benefit: 'Nourrit intensément' },
      { name: 'Aloe Vera', percentage: '15%', benefit: 'Apaise et hydrate' },
      { name: 'Vitamine E', percentage: '5%', benefit: 'Antioxydant naturel' },
      { name: 'Cera Alba', percentage: '8%', benefit: 'Protège et répare' }
    ],
    usage: [
      'Appliquer le soir sur peau propre',
      'Masser en mouvements circulaires',
      'Insister sur les zones très sèches',
      'Laisser pénétrer toute la nuit',
      'Utiliser 2-3 fois par semaine'
    ],
    composition: 'Butyrospermum Parkii (Shea) Butter*, Aloe Barbadensis Leaf Juice*, Cera Alba, Tocopherol, Calendula Officinalis Extract*, Rosmarinus Officinalis Extract*. *Ingrédient issu de l\'agriculture biologique.',
    certifications: ['COSMOS Organic', 'Ecocert', 'Fair Trade'],
    skinTypes: ['Peaux sèches', 'Peaux très sèches', 'Peaux sensibles'],
    concerns: ['Sécheresse', 'Tiraillements', 'Peaux abîmées'],
    inStock: true
  },
  { 
    id: 3, 
    name: "Huile Précieuse Trio Africain", 
    price: 42, 
    rating: 4.9, 
    reviews: 1543,
    image: "huile-argan.jpg",
    subtitle: "Trio d'huiles précieuses",
    category: "huiles",
    badges: ["Premium", "Anti-âge"],
    ingredients: ['Huile d\'Argan', 'Huile de Baobab', 'Huile de Marula'],
    benefits: ['Éclat immédiat et durable', 'Anti-âge prouvé', 'Nourrit en profondeur', 'Absorbe rapidement', 'Convient à tous types de peau'],
    description: "Synergie de trois huiles précieuses d'Afrique pour une peau éclatante et revitalisée.",
    images: ["huile-argan.jpg", "huile-argan-2.jpg", "huile-argan-3.jpg", "huile-argan-texture.jpg"],
    keyIngredients: [
      { name: 'Huile d\'Argan', percentage: '40%', benefit: 'Anti-âge et régénérant' },
      { name: 'Huile de Baobab', percentage: '35%', benefit: 'Nourrit et répare' },
      { name: 'Huile de Marula', percentage: '25%', benefit: 'Antioxydant puissant' }
    ],
    usage: [
      'Appliquer 3-4 gouttes sur le visage',
      'Masser délicatement du centre vers l\'extérieur',
      'Utiliser matin et/ou soir',
      'Peut être mélangée à votre crème',
      'Convient aussi pour les cheveux'
    ],
    composition: 'Argania Spinosa Kernel Oil*, Adansonia Digitata Seed Oil*, Sclerocarya Birrea Seed Oil*, Tocopherol. *Ingrédient issu de l\'agriculture biologique.',
    certifications: ['COSMOS Organic', 'Ecocert', 'Fair Trade'],
    skinTypes: ['Tous types', 'Peaux matures', 'Peaux sèches'],
    concerns: ['Vieillissement', 'Manque d\'éclat', 'Sécheresse'],
    inStock: true
  },
  { 
    id: 4, 
    name: "Crème Hydratante Karité", 
    price: 25, 
    rating: 4.8, 
    reviews: 1876,
    image: "creme-hydratante.jpg",
    subtitle: "Hydratation quotidienne",
    category: "cremes",
    badges: ["Quotidien", "Tous types"],
    ingredients: ['Karité Bio', 'Acide Hyaluronique', 'Calendula'],
    benefits: ['Hydrate pendant 24h', 'Protège des agressions', 'Procure confort immédiat', 'Non grasse et pénétrante', 'Base de maquillage parfaite'],
    description: "Crème hydratante quotidienne qui protège et maintient l'hydratation de la peau.",
    images: ["creme-hydratante.jpg", "creme-hydratante-2.jpg", "creme-hydratante-3.jpg", "creme-hydratante-texture.jpg"],
    keyIngredients: [
      { name: 'Karité Bio', percentage: '20%', benefit: 'Hydrate et nourrit' },
      { name: 'Acide Hyaluronique', percentage: '2%', benefit: 'Retient l\'eau' },
      { name: 'Calendula', percentage: '5%', benefit: 'Apaise et protège' },
      { name: 'Glycérine', percentage: '10%', benefit: 'Humectant naturel' }
    ],
    usage: [
      'Appliquer matin et soir',
      'Sur peau propre et sèche',
      'Masser jusqu\'à absorption',
      'Convient sous le maquillage',
      'Utilisation quotidienne recommandée'
    ],
    composition: 'Aqua, Butyrospermum Parkii (Shea) Butter*, Glycerin, Sodium Hyaluronate, Calendula Officinalis Extract*, Cetearyl Alcohol, Benzyl Alcohol, Dehydroacetic Acid. *Ingrédient issu de l\'agriculture biologique.',
    certifications: ['COSMOS Organic', 'Ecocert', 'Cruelty Free'],
    skinTypes: ['Tous types', 'Peaux sensibles', 'Peaux normales'],
    concerns: ['Déshydratation', 'Confort', 'Protection'],
    inStock: true
  },
  { 
    id: 5, 
    name: "Masque Argile Bleu Purifiante", 
    price: 28, 
    rating: 4.6, 
    reviews: 743,
    image: "masque-argile.jpg",
    subtitle: "Purification intense",
    category: "masques",
    badges: ["Détox", "Sensible"],
    ingredients: ['Argile Bleu', 'Poudre de Riz', 'Extrait de Hibiscus'],
    benefits: ['Purifie en douceur', 'Illumine le teint', 'Affine le grain de peau', 'Absorbe l\'excès de sébum', 'Respecte les peaux sensibles'],
    description: "Masque purifiant ultra-doux à l'argile Bleu, spécialement formulé pour les peaux sensibles.",
    images: ["masque-argile.jpg", "masque-argile-2.jpg", "masque-argile-3.jpg", "masque-argile-texture.jpg"],
    keyIngredients: [
      { name: 'Argile Bleu', percentage: '25%', benefit: 'Purifie et détoxifie' },
      { name: 'Poudre de Riz', percentage: '15%', benefit: 'Adoucit et illumine' },
      { name: 'Hibiscus', percentage: '10%', benefit: 'Antioxydant et lissant' },
      { name: 'Miel Sauvage', percentage: '8%', benefit: 'Antibactérien naturel' }
    ],
    usage: [
      'Appliquer sur peau propre et sèche',
      'Éviter le contour des yeux',
      'Laisser poser 10-15 minutes',
      'Rincer à l\'eau tiède',
      'Utiliser 1-2 fois par semaine'
    ],
    composition: 'Kaolin, Oryza Sativa (Rice) Powder*, Hibiscus Sabdariffa Extract*, Mel (Honey)*, Aqua, Glycerin, Xanthan Gum. *Ingrédient issu de l\'agriculture biologique.',
    certifications: ['COSMOS Organic', 'Ecocert', 'Cruelty Free'],
    skinTypes: ['Tous types', 'Peaux sensibles', 'Peaux mixtes'],
    concerns: ['Impuretés', 'Pores dilatés', 'Teint terne'],
    inStock: true
  },
  { 
    id: 6, 
    name: "Lait Démaquillant Karité", 
    price: 24, 
    rating: 4.9, 
    reviews: 2156,
    image: "lait-calendula.jpg",
    subtitle: "Nettoyage doux",
    category: "nettoyants",
    badges: ["Extra-Doux", "Nourrissant"],
    ingredients: ['Karité Bio', 'Calendula', 'Camomille'],
    benefits: ['Démaquille parfaitement', 'Nourrit pendant le nettoyage', 'Apaise et calme', 'Ne dessèche pas', 'Parfum délicat et naturel'],
    description: "Lait démaquillant onctueux qui nettoie en douceur tout en nourrissant votre peau.",
    images: ["lait-calendula.jpg", "lait-calendula-2.jpg", "lait-calendula-3.jpg", "lait-calendula-texture.jpg"],
    keyIngredients: [
      { name: 'Karité Bio', percentage: '15%', benefit: 'Nourrit et protège' },
      { name: 'Calendula', percentage: '8%', benefit: 'Apaise et cicatrise' },
      { name: 'Camomille', percentage: '5%', benefit: 'Anti-inflammatoire' },
      { name: 'Eau de Rose', percentage: '20%', benefit: 'Tonifie et parfume' }
    ],
    usage: [
      'Appliquer sur peau sèche',
      'Masser délicatement en cercles',
      'Émulsionner avec un peu d\'eau',
      'Rincer à l\'eau tiède',
      'Utiliser matin et soir'
    ],
    composition: 'Aqua, Rosa Damascena Flower Water*, Butyrospermum Parkii (Shea) Butter*, Calendula Officinalis Extract*, Chamomilla Recutita Extract*, Cetearyl Alcohol, Benzyl Alcohol. *Ingrédient issu de l\'agriculture biologique.',
    certifications: ['COSMOS Organic', 'Ecocert', 'Cruelty Free'],
    skinTypes: ['Tous types', 'Peaux sensibles', 'Peaux sèches'],
    concerns: ['Démaquillage', 'Nettoyage doux', 'Sensibilité'],
    inStock: true
  }
];

// Fonction pour récupérer un produit par son ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id)) || products[0];
};

// Fonction pour récupérer des produits par catégorie
export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

// Fonction pour récupérer des produits recommandés
export const getRecommendedProducts = (excludeId = null, limit = 3) => {
  return products
    .filter(product => product.id !== excludeId)
    .slice(0, limit);
};
