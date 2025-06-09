/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Primaire - "Terra Luxe"
        primary: {
          forest: '#2D5016',      // Vert profond - confiance, nature
          'forest-hover': '#1A3009',
          sage: '#7A8471',        // Vert sage - élégance, sophistication  
          'sage-hover': '#656B5C',
          gold: '#D4AF37',        // Or mat - premium, exclusivité
          'gold-hover': '#B8941F',
        },
        
        // Palette Secondaire - "Natural Canvas"
        secondary: {
          cream: '#F9F6F1',       // Crème naturelle - douceur, pureté
          stone: '#E8E3DC',       // Pierre claire - stabilité, authenticité
          linen: '#F5F2ED',       // Lin écru - naturel, respirant
          clay: '#D1C7B8',        // Argile - minéralité, soin
        },
        
        // Palette Accent - "Botanical Touch"
        accent: {
          terracotta: '#C65D07',  // Terre cuite - chaleur, vitalité
          moss: '#8FA68E',        // Mousse - fraîcheur, régénération
          lavender: '#9B8AA4',    // Lavande - sérénité, bien-être
          coral: '#FF6B6B',       // Corail - énergie, féminité
        },
        
        // États système
        success: '#4ECDC4',       // Turquoise - validation positive
        warning: '#FFE66D',       // Jaune miel - attention bienveillante
        error: '#FF6B6B',         // Corail - erreur douce
        
        // Textes
        text: {
          primary: '#1A3009',     // Texte principal
          secondary: '#2D5016',   // Texte secondaire
          muted: '#7A8471',       // Texte discret
        }
      },
      
      fontFamily: {
        'sans': ['Avenir Next', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'serif': ['Source Serif Pro', 'Georgia', 'Times New Roman', 'serif'],
      },
      
      fontSize: {
        'heading-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-lg': ['clamp(1.8rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body': ['clamp(1rem, 2vw, 1.125rem)', { lineHeight: '1.6' }],
      },
      
      animation: {
        'organic-reveal': 'organicReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      
      keyframes: {
        organicReveal: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) scale(0.95)',
            filter: 'blur(3px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0)'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        }
      },
      
      backdropBlur: {
        'xs': '2px',
      },
      
      boxShadow: {
        'organic': '0 10px 40px rgba(45, 80, 22, 0.1)',
        'organic-lg': '0 20px 60px rgba(45, 80, 22, 0.15)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      
      borderRadius: {
        'organic': '2rem',
        'organic-lg': '3rem',
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px', 
          lg: '1024px',
          xl: '1200px',
          '2xl': '1200px',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    
    // Plugin personnalisé pour les utilities cosmétiques bio
    function({ addUtilities, theme, e }) {
      const utilities = {
        '.text-gradient-primary': {
          background: `linear-gradient(135deg, ${theme('colors.primary.forest')} 0%, ${theme('colors.primary.sage')} 100%)`,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-organic-pattern': {
          'background-image': `radial-gradient(circle at 25% 25%, ${theme('colors.secondary.stone')} 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${theme('colors.secondary.cream')} 0%, transparent 50%)`,
        },
        '.glass-morphism': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.btn-primary': {
          'background': theme('colors.primary.forest'),
          'color': 'white',
          'padding': '0.75rem 2rem',
          'border-radius': theme('borderRadius.xl'),
          'font-weight': theme('fontWeight.semibold'),
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': theme('colors.primary.forest-hover'),
            'transform': 'translateY(-2px)',
            'box-shadow': theme('boxShadow.organic'),
          }
        },
        '.btn-secondary': {
          'background': 'transparent',
          'color': theme('colors.primary.forest'),
          'border': `2px solid ${theme('colors.primary.sage')}`,
          'padding': '0.75rem 2rem',
          'border-radius': theme('borderRadius.xl'),
          'font-weight': theme('fontWeight.semibold'),
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': theme('colors.primary.sage'),
            'color': 'white',
            'transform': 'translateY(-2px)',
          }
        }
      };
      
      addUtilities(utilities);
    }
  ],
} 