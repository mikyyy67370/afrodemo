import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';

const NotificationSystem = () => {
  const { notifications, removeNotification } = useShop();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-accent-moss" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-primary-gold" />;
      case 'error':
        return <XCircleIcon className="w-6 h-6 text-accent-coral" />;
      default:
        return <InformationCircleIcon className="w-6 h-6 text-accent-lavender" />;
    }
  };

  const getColorClasses = (type) => {
    switch (type) {
      case 'success':
        return 'bg-accent-moss/10 border-accent-moss/20 text-primary-forest';
      case 'warning':
        return 'bg-primary-gold/10 border-primary-gold/20 text-primary-forest';
      case 'error':
        return 'bg-accent-coral/10 border-accent-coral/20 text-primary-forest';
      default:
        return 'bg-accent-lavender/10 border-accent-lavender/20 text-primary-forest';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 400, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`p-4 rounded-organic border-2 shadow-organic backdrop-blur-sm ${getColorClasses(notification.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold mb-1">
                  {notification.title}
                </h4>
                {notification.message && (
                  <p className="text-xs opacity-80">
                    {notification.message}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <XMarkIcon className="w-4 h-4 opacity-60 hover:opacity-100" />
              </button>
            </div>
            
            {/* Barre de progression pour auto-dismiss */}
            {notification.duration && (
              <motion.div
                className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-full bg-current opacity-40"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ 
                    duration: notification.duration / 1000, 
                    ease: "linear" 
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem; 