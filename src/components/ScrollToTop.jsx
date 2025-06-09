import { useEffect } from 'react';

const ScrollToTop = ({ trigger }) => {
  useEffect(() => {
    // Scroll instantané au top
    window.scrollTo(0, 0);
    
    // Assurez-vous que le body n'a pas de position anormale
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Fallback avec un léger délai pour les cas complexes
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 10);
  }, [trigger]);

  return null;
};

export default ScrollToTop; 