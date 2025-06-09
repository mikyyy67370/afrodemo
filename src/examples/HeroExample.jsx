import React from 'react';
import HeroSectionPremium from '../components/HeroSectionPremium';
import ValuesSection from '../components/ValuesSection';

// Simulation de données utilisateur pour démonstration
export const mockUserProfiles = {
  newUser: null,
  
  returningUser: {
    id: 'user_12847',
    firstName: 'Aisha',
    lastName: 'Diallo',
    email: 'aisha.diallo@email.com',
    visitCount: 8,
    skinType: 'mixte_foncee',
    skinConcerns: ['hyperpigmentation', 'secheresse', 'eclat'],
    ageRange: '30-35',
    preferences: {
      budget: 'premium',
      ingredients: ['beurre_karite', 'vitamine_c', 'niacinamide'],
      routine: 'complete'
    },
    purchaseHistory: [
      { productId: 'serum-vitc', date: '2024-11-15', rating: 5 },
      { productId: 'baume-karite', date: '2024-10-20', rating: 5 }
    ]
  },
  
  sensitiveSkin: {
    id: 'user_98765',
    firstName: 'Aminata',
    lastName: 'Kone',
    email: 'aminata.kone@email.com',
    visitCount: 3,
    skinType: 'sensible_metisse',
    skinConcerns: ['hyperpigmentation', 'taches_brunes', 'irritations'],
    ageRange: '25-30',
    preferences: {
      budget: 'moyen',
      ingredients: ['beurre_karite', 'huile_baobab', 'aloe_vera'],
      routine: 'simple'
    }
  }
};

// Simulation de recommandations IA basées sur le profil
export const mockAIRecommendations = {
  returningUser: [
    {
      id: 'serum-vitc-eclat',
      name: 'Sérum Éclaircissant Vitamine C',
      price: '48€',
      originalPrice: '55€',
      rating: 4.9,
      reviews: 2847,
      image: 'serum-vitc.jpg',
      badge: 'Anti-taches',
      matchScore: 98,
      aiReason: 'Parfait pour uniformiser votre teint et réduire l\'hyperpigmentation'
    },
    {
      id: 'baume-karite-nutrition',
      name: 'Baume Karité Nutrition Intense',
      price: '35€',
      rating: 4.8,
      reviews: 1954,
      image: 'creme-aloe.jpg',
      badge: 'Hydratation',
      matchScore: 96,
      aiReason: 'Nutrition profonde adaptée aux peaux sèches et sensibles'
    },
    {
      id: 'huile-trio-africain',
      name: 'Huile Précieuse Trio Africain',
      price: '42€',
      rating: 4.9,
      reviews: 1876,
      image: 'huile-argan.jpg',
      badge: 'Éclat',
      matchScore: 94,
      aiReason: 'Mélange de baobab, argan et marula pour un éclat naturel'
    }
  ],
  
  sensitiveSkin: [
    {
      id: 'lait-karite-doux',
      name: 'Lait Démaquillant Karité Doux',
      price: '28€',
      rating: 4.9,
      reviews: 2156,
      image: 'lait-calendula.jpg',
      badge: 'Extra-Doux',
      matchScore: 97,
      aiReason: 'Formule ultra-douce enrichie en beurre de karité'
    },
    {
      id: 'creme-unifiante',
      name: 'Crème Unifiante Anti-Taches',
      price: '38€',
      rating: 4.8,
      reviews: 1543,
      image: 'creme-aloe.jpg',
      badge: 'Uniformisant',
      matchScore: 95,
      aiReason: 'Réduit visiblement les taches et unifie le teint'
    },
    {
      id: 'serum-niacinamide-eclat',
      name: 'Sérum Niacinamide Éclat',
      price: '32€',
      rating: 4.7,
      reviews: 1287,
      image: 'serum-niacinamide.jpg',
      badge: 'Régulateur',
      matchScore: 89,
      aiReason: 'Régule la production de sébum et illumine le teint'
    }
  ]
};

// Composant d'exemple avec différents scénarios
const HeroExample = () => {
  const [currentDemo, setCurrentDemo] = React.useState('newUser');

  const demoScenarios = {
    newUser: {
      label: 'Nouveau visiteur',
      userProfile: mockUserProfiles.newUser,
      aiRecommendations: null,
      description: 'Première visite - contenu générique optimisé pour la conversion'
    },
    returningUser: {
      label: 'Cliente fidèle (Sarah)',
      userProfile: mockUserProfiles.returningUser,
      aiRecommendations: mockAIRecommendations.returningUser,
      description: 'Utilisatrice connue - personnalisation IA avancée'
    },
    sensitiveSkin: {
      label: 'Peau sensible (Emma)',
      userProfile: mockUserProfiles.sensitiveSkin,
      aiRecommendations: mockAIRecommendations.sensitiveSkin,
      description: 'Ciblage par problématique - produits spécialisés'
    }
  };

  const currentScenario = demoScenarios[currentDemo];

  return (
    <div className="min-h-screen bg-secondary-cream">
      {/* Contrôles de démonstration */}
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-md rounded-organic p-4 shadow-organic border border-primary-sage/20">
        <h3 className="text-primary-forest font-bold mb-3">Démo Personnalisation IA</h3>
        <div className="space-y-2">
          {Object.entries(demoScenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setCurrentDemo(key)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                currentDemo === key
                  ? 'bg-primary-forest text-white'
                  : 'bg-secondary-stone text-primary-forest hover:bg-primary-sage/20'
              }`}
            >
              <div className="font-medium">{scenario.label}</div>
              <div className="text-xs opacity-75">{scenario.description}</div>
            </button>
          ))}
        </div>

        {/* Indicateurs temps réel */}
        <div className="mt-4 pt-3 border-t border-primary-sage/20">
          <div className="text-xs text-primary-sage">
            <div className="flex justify-between">
              <span>Personalisation:</span>
              <span className={currentScenario.aiRecommendations ? 'text-success' : 'text-warning'}>
                {currentScenario.aiRecommendations ? 'Activée' : 'Générique'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Match Score:</span>
              <span className="text-primary-gold font-medium">
                {currentScenario.aiRecommendations 
                  ? `${Math.round(currentScenario.aiRecommendations.reduce((acc, p) => acc + p.matchScore, 0) / 3)}%`
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profil utilisateur actuel (debug) */}
      {currentScenario.userProfile && (
        <div className="fixed bottom-4 left-4 z-50 bg-white/95 backdrop-blur-md rounded-organic p-4 shadow-organic border border-primary-sage/20 max-w-xs">
          <h4 className="text-primary-forest font-bold mb-2">Profil Utilisateur</h4>
          <div className="text-xs text-primary-sage space-y-1">
            <div><strong>Nom:</strong> {currentScenario.userProfile.firstName} {currentScenario.userProfile.lastName}</div>
            <div><strong>Visites:</strong> {currentScenario.userProfile.visitCount}</div>
            <div><strong>Type peau:</strong> {currentScenario.userProfile.skinType}</div>
            <div><strong>Préoccupations:</strong> {currentScenario.userProfile.skinConcerns.join(', ')}</div>
            <div><strong>Budget:</strong> {currentScenario.userProfile.preferences.budget}</div>
          </div>
        </div>
      )}

      {/* Composant Hero avec données dynamiques */}
      <HeroSectionPremium
        userProfile={currentScenario.userProfile}
        aiRecommendations={currentScenario.aiRecommendations}
      />
      
      {/* Nouvelle Section Valeurs */}
      <ValuesSection />
      
      {/* Section de démonstration des données IA */}
      {currentScenario.aiRecommendations && (
        <section className="bg-white py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-primary-forest mb-8 text-center">
              Recommandations IA Détaillées
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {currentScenario.aiRecommendations.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-secondary-cream rounded-organic p-6 shadow-organic border border-primary-sage/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary-gold text-white px-2 py-1 rounded-full text-xs font-bold">
                      {product.matchScore}% match
                    </div>
                    <div className="bg-accent-coral text-white px-2 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </div>
                  </div>
                  
                  <div className="aspect-square bg-secondary-stone rounded-lg mb-4" />
                  
                  <h3 className="text-primary-forest font-bold mb-2">{product.name}</h3>
                  <p className="text-primary-sage text-sm mb-3">{product.aiReason}</p>
                  
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-gold font-bold text-lg">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-primary-sage/60 text-sm line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-primary-gold">★</span>
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-primary-sage/80">
                    {product.reviews.toLocaleString()} avis vérifiés
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HeroExample; 