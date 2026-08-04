import React, { useContext } from 'react';
import { ProductionContext } from '../../context/ProductionContext';

const Header = ({ onMenuClick }) => {
  const { metadata, budgetSummary } = useContext(ProductionContext);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button className="menu-toggle-btn" onClick={onMenuClick} title="Open Menu">
          ☰
        </button>
        <div className="header-project">
          <h1>{metadata.projectName}</h1>
        </div>
      </div>


    </header>
  );
};

export default Header;
