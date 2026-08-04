import React, { useContext, useMemo } from 'react';
import { ProductionContext } from '../../context/ProductionContext';

const DetailedBudget = () => {
  const { detailedBudget, updateDetailedBudgetItem } = useContext(ProductionContext);

  const formatCurrency = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return val; // For "PACKAGE" strings
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(num);
  };

  const handleEdit = (section, id, field, value) => {
    updateDetailedBudgetItem(section, id, field, value);
  };

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => {
      const val = parseFloat(item.total);
      return acc + (isNaN(val) ? 0 : val);
    }, 0);
  };

  const totalProduction = useMemo(() => calculateTotal(detailedBudget.production), [detailedBudget.production]);
  const totalPostProduction = useMemo(() => calculateTotal(detailedBudget.postProduction), [detailedBudget.postProduction]);
  const subTotal = totalProduction + totalPostProduction;
  const contingency = subTotal * 0.10;
  const grandTotal = subTotal + contingency;

  // Render Table row
  const renderRow = (section, item, idx) => (
    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '12px 16px', width: '50px', color: '#666' }}>{idx + 1}.</td>
      <td style={{ padding: '12px 16px', fontWeight: '500', width: '40%' }}>{item.name}</td>
      <td style={{ padding: '8px 16px', width: '20%' }}>
        <input 
          type="text" 
          value={item.cost} 
          onChange={(e) => handleEdit(section, item.id, 'cost', e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'right', outline: 'none' }}
        />
      </td>
      <td style={{ padding: '8px 16px', width: '15%' }}>
        <input 
          type="text" 
          value={item.days} 
          onChange={(e) => handleEdit(section, item.id, 'days', e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center', outline: 'none' }}
        />
      </td>
      <td style={{ padding: '8px 16px', width: '20%' }}>
        <input 
          type="text" 
          value={item.total} 
          onChange={(e) => handleEdit(section, item.id, 'total', e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'right', fontWeight: '600', color: '#15803d', background: '#f0fdf4', outline: 'none' }}
        />
      </td>
    </tr>
  );

  return (
    <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.05)', maxWidth: '100%', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: '#1f2937' }}>Detailed Production Budget</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        background: '#fcfcfc',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #eee',
        marginBottom: '32px'
      }}>
        <div><div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Production House</div><div style={{ fontSize: '14px', fontWeight: '600' }}>CineDreams Productions Private Limited</div></div>
        <div><div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Producer</div><div style={{ fontSize: '14px', fontWeight: '600' }}>MR. JAYANTH SINHA</div></div>
        <div><div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project Title</div><div style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>Maikhana Express</div></div>
        <div><div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Director</div><div style={{ fontSize: '14px', fontWeight: '600' }}>MR. JAYANTH SINHA</div></div>
        <div><div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shooting Dates</div><div style={{ fontSize: '14px', fontWeight: '600' }}>2026-08-15 to 2026-08-20</div></div>
        <div><div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shoot Days</div><div style={{ fontSize: '14px', fontWeight: '600' }}>30–35 Days</div></div>
        <div><div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Locations</div><div style={{ fontSize: '14px', fontWeight: '600' }}>DELHI NCR</div></div>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#be185d', color: 'white' }}>
            <th colSpan="2" style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>PRODUCTION EXPENSES</th>
            <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>PER DAY COST</th>
            <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600' }}>TOTAL DAYS</th>
            <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>TOTAL COST</th>
          </tr>
        </thead>
        <tbody>
          {detailedBudget.production.map((item, idx) => renderRow('production', item, idx))}
          <tr style={{ background: '#f3f4f6', fontWeight: '700' }}>
            <td colSpan="4" style={{ padding: '16px', textAlign: 'right' }}>Total Production</td>
            <td style={{ padding: '16px', textAlign: 'right', color: '#111827', fontSize: '16px' }}>{formatCurrency(totalProduction)}</td>
          </tr>
        </tbody>
        
        <thead>
          <tr style={{ background: '#7e22ce', color: 'white' }}>
            <th colSpan="5" style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>POST-PRODUCTION EXPENSES</th>
          </tr>
        </thead>
        <tbody>
          {detailedBudget.postProduction.map((item, idx) => renderRow('postProduction', item, idx))}
          <tr style={{ background: '#f3f4f6', fontWeight: '700' }}>
            <td colSpan="4" style={{ padding: '16px', textAlign: 'right' }}>Total Post Production</td>
            <td style={{ padding: '16px', textAlign: 'right', color: '#111827', fontSize: '16px' }}>{formatCurrency(totalPostProduction)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr style={{ background: '#fff', borderTop: '2px solid #cbd5e1' }}>
            <td colSpan="4" style={{ padding: '16px', textAlign: 'right', fontWeight: '700' }}>TOTAL</td>
            <td style={{ padding: '16px', textAlign: 'right', fontWeight: '700', fontSize: '16px' }}>{formatCurrency(subTotal)}</td>
          </tr>
          <tr style={{ background: '#fff' }}>
            <td colSpan="4" style={{ padding: '16px', textAlign: 'right', fontWeight: '700' }}>10% CONTINGENCY</td>
            <td style={{ padding: '16px', textAlign: 'right', fontWeight: '700', fontSize: '16px' }}>{formatCurrency(contingency)}</td>
          </tr>
          <tr style={{ background: '#1e293b', color: 'white' }}>
            <td colSpan="4" style={{ padding: '20px 16px', textAlign: 'left', fontWeight: '800', fontSize: '18px' }}>GRAND TOTAL</td>
            <td style={{ padding: '20px 16px', textAlign: 'right', fontWeight: '800', fontSize: '20px', color: '#4ade80' }}>{formatCurrency(grandTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DetailedBudget;
