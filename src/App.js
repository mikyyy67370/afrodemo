import React from 'react';
import './index.css';
import Router from './Router';
import { ShopProvider } from './context/ShopContext';
import NotificationSystem from './components/NotificationSystem';

function App() {
  return (
    <ShopProvider>
      <div className="App">
        <Router />
        <NotificationSystem />
      </div>
    </ShopProvider>
  );
}

export default App; 