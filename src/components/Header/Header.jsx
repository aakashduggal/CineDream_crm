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
          <p>
            <span className="project-status"></span>
            <span>In Production &bull; {metadata.genre} &bull; Dir: {metadata.director}</span>
          </p>
        </div>
      </div>

      <div className="header-summary">
        <div className="header-metric">
          <span>Target Cap</span>
          <p>{formatCurrency(metadata.budgetLimit)}</p>
        </div>
        <div className="header-metric highlight">
          <span>Est. Cost</span>
          <p>{formatCurrency(budgetSummary.grandTotal)}</p>
        </div>
        <div className="header-metric">
          <span>Remaining</span>
          <p style={{ color: budgetSummary.remainingBudget < 0 ? 'hsl(var(--color-rose))' : 'hsl(var(--color-emerald))' }}>
            {formatCurrency(budgetSummary.remainingBudget)}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
