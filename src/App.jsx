import React from 'react';
import { ProductionProvider } from './context/ProductionContext';
import MainLayout from './pages/MainLayout/MainLayout';
import './styles/app.css';

function App() {
  return (
    <ProductionProvider>
      <MainLayout />
    </ProductionProvider>
  );
}

export default App;
