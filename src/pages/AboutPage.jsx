import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SparklesIcon,
  HeartIcon,
  GlobeAltIcon,
  BeakerIcon,
  ShieldCheckIcon,
  HandRaisedIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Timeline de l'entreprise
  const timeline = [
    {
      year: '2018',
      title: 'Création de Terrafro',
      description: 'Fondation de la marque avec une mission : créer des cosmétiques bio premium pour les peaux afro et métissées.',
      icon: SparklesIcon,
      color: 'text-primary-gold'
    },
    {
      year: '2019',
      title: 'Partenariats Africains',
      description: 'Établissement de partenariats équitables avec des coopératives de femmes au Burkina Faso et Ghana.',
      icon: HandRaisedIcon,
      color: 'text-accent-moss'
    },
    {
      year: '2020',
      title: 'Certification Bio',
      description: 'Obtention des certifications COSMOS Organic et Ecocert pour toute notre gamme.',
      icon: CheckBadgeIcon,
      color: 'text-accent-lavender'
    },
    {
      year: '2021',
      title: 'Laboratoire R&D',
      description: 'Ouverture de notre laboratoire de recherche spécialisé dans les ingrédients africains.',
      icon: BeakerIcon,
      color: 'text-accent-terracotta'
    },
    {
      year: '2022',
      title: 'IA & Personnalisation',
      description: 'Lancement du premier diagnostic IA dédié aux besoins spécifiques des peaux foncées.',
      icon: SparklesIcon,
      color: 'text-primary-gold'
    },
    {
      year: '2023',
      title: 'Expansion Européenne',
      description: 'Extension dans 8 pays européens avec plus de 50 000 clientes satisfaites.',
      icon: GlobeAltIcon,
      color: 'text-accent-moss'
    },
    {
      year: '2024',
      title: 'Innovation Continue',
      description: 'Lancement de nouvelles formules révolutionnaires et engagement carbone neutre.',
      icon: TrophyIcon,
      color: 'text-primary-gold'
    }
  ];

  // Valeurs de l'entreprise
  const values = [
    {
      icon: HeartIcon,
      title: 'Inclusivité',
      description: 'Nous célébrons la diversité des beautés afro et métissées avec des produits spécialement formulés.',
      color: 'text-accent-coral'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Qualité Premium',
      description: 'Seuls les ingrédients les plus purs et efficaces composent nos formulations certifiées bio.',
      color: 'text-accent-lavender'
    },
    {
      icon: GlobeAltIcon,
      title: 'Commerce Équitable',
      description: 'Nous soutenons les communautés africaines par des partenariats durables et justes.',
      color: 'text-accent-moss'
    },
    {
      icon: BeakerIcon,
      title: 'Innovation Scientifique',
      description: 'Notre R&D développe des solutions brevetées adaptées aux spécificités des peaux foncées.',
      color: 'text-accent-terracotta'
    }
  ];

  // Équipe dirigeante
  const team = [
    {
      name: 'Dr. Aminata DIALLO',
      role: 'Fondatrice & CEO',
      expertise: 'Dermatologue spécialisée peaux ethniques',
      description: 'Pionnière de la cosmétique inclusive, 15 ans d\'expérience en dermatologie.',
      image: 'team-aminata.jpg'
    },
    {
      name: 'Marie LAURENT',
      role: 'Directrice R&D',
      expertise: 'Biochimiste cosmétique',
      description: 'Experte en ingrédients naturels africains, 12 ans chez L\'Oréal.',
      image: 'team-marie.jpg'
    },
    {
      name: 'Fatou KONE',
      role: 'Responsable Sourcing',
      expertise: 'Commerce équitable Afrique',
      description: 'Coordinatrice des partenariats avec 15 coopératives africaines.',
      image: 'team-fatou.jpg'
    }
  ];

  // Statistiques
  const stats = [
    {
      number: '50K+',
      label: 'Clientes satisfaites',
      icon: UserGroupIcon,
      color: 'text-primary-gold'
    },
    {
      number: '97%',
      label: 'Ingrédients naturels',
      icon: SparklesIcon,
      color: 'text-accent-moss'
    },
    {
      number: '15',
      label: 'Coopératives partenaires',
      icon: HandRaisedIcon,
      color: 'text-accent-lavender'
    },
    {
      number: '4.9/5',
      label: 'Note moyenne',
      icon: TrophyIcon,
      color: 'text-accent-terracotta'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white">
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-forest/90 to-accent-moss/90" />
        <div className="absolute inset-0 bg-organic-pattern opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <HeartIcon className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-heading-2xl font-bold mb-6 leading-tight">
              Terrafro : Révéler la Beauté
              <span className="block text-primary-gold">Naturelle de Chaque Femme</span>
            </h1>
            
            <p className="text-xl leading-relaxed mb-8 text-white/90">
              Née de la passion de célébrer la diversité des beautés afro et métissées, 
              Terrafro transforme la cosmétique bio en créant des produits d'exception 
              spécialement formulés pour révéler votre éclat naturel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-primary-gold text-primary-forest px-8 py-4 rounded-full font-semibold hover:bg-primary-gold/90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Notre Histoire
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-forest transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nos Valeurs
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-heading-xl font-bold text-primary-forest mb-6">
              Notre Mission
            </h2>
            <p className="text-body text-primary-sage leading-relaxed mb-8">
              Terrafro s'engage à révolutionner l'industrie cosmétique en créant des produits 
              bio premium qui répondent aux besoins spécifiques des peaux afro et métissées. 
              Nous combinons tradition africaine, innovation scientifique et commerce équitable 
              pour offrir une beauté authentique et responsable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-primary-gold/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-organic">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-primary-forest mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary-sage font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={sectionRef} className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-heading-xl font-bold text-primary-forest mb-6">
              Notre Parcours
            </h2>
            <p className="text-body text-primary-sage max-w-2xl mx-auto">
              Découvrez les étapes clés qui ont façonné Terrafro et notre engagement 
              constant envers l'excellence et l'innovation dans la beauté naturelle.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-gold/30 hidden lg:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-12 gap-6`}
                  >
                    <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                      <div className="bg-white rounded-organic-lg p-6 shadow-organic border border-primary-sage/10">
                        <div className="text-2xl font-bold text-primary-gold mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-heading-lg font-bold text-primary-forest mb-3">
                          {item.title}
                        </h3>
                        <p className="text-primary-sage leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 lg:w-16 w-12">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-gold rounded-full flex items-center justify-center shadow-glow">
                        <IconComponent className={`w-8 h-8 lg:w-10 lg:h-10 text-white`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 lg:block hidden" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 bg-gradient-to-b from-primary-forest/5 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-heading-xl font-bold text-primary-forest mb-6">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-body text-primary-sage max-w-2xl mx-auto">
              Ces principes guident chacune de nos décisions et actions chez Terrafro.
              Ils sont le fondement de notre engagement envers nos clientes et notre planète.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                  whileHover={{ y: -10 }}
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-organic">
                    <IconComponent className={`w-10 h-10 ${value.color}`} />
                  </div>
                  <h3 className="text-heading-lg font-bold text-primary-forest mb-4">
                    {value.title}
                  </h3>
                  <p className="text-primary-sage leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-heading-xl font-bold text-primary-forest mb-6">
              Notre Équipe d'Expertes
            </h2>
            <p className="text-body text-primary-sage max-w-2xl mx-auto">
              Rencontrez les femmes passionnées qui donnent vie à la vision Terrafro.
              Leur expertise et leur dévouement font de chaque produit une œuvre d'exception.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-organic-lg overflow-hidden shadow-organic border border-primary-sage/10"
                whileHover={{ y: -10 }}
              >
                <div className="aspect-square bg-gradient-to-br from-primary-gold/20 to-accent-moss/20 flex items-center justify-center">
                  <div className="text-6xl text-primary-gold font-bold">
                    {member.name.split(' ')[0].charAt(0)}{member.name.split(' ')[1]?.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-primary-forest mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-gold font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-primary-sage text-sm mb-3">
                    {member.expertise}
                  </p>
                  <p className="text-primary-sage text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-forest to-accent-moss">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white max-w-3xl mx-auto"
          >
            <h2 className="text-heading-xl font-bold mb-6">
              Rejoignez la Révolution Terrafro
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Découvrez dès aujourd'hui comment nos produits bio premium 
              peuvent transformer votre routine beauté et révéler votre éclat naturel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-primary-gold text-primary-forest px-8 py-4 rounded-full font-semibold hover:bg-primary-gold/90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Diagnostic Gratuit
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-forest transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos Produits
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 