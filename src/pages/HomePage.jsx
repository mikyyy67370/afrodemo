import React from 'react';
import HeroSectionPremium from '../components/HeroSectionPremium';
import ValuesSection from '../components/ValuesSection';
import PersonalizedSection from '../components/PersonalizedSection';
import TestimonialsSection from '../components/TestimonialsSection';

const HomePage = ({ userProfile, setCurrentPage, setSelectedProductId }) => {
  return (
    <div>
      <HeroSectionPremium userProfile={userProfile} setCurrentPage={setCurrentPage} />
      <ValuesSection setCurrentPage={setCurrentPage} />
      <PersonalizedSection userProfile={userProfile} setCurrentPage={setCurrentPage} setSelectedProductId={setSelectedProductId} />
      <TestimonialsSection userProfile={userProfile} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default HomePage; 