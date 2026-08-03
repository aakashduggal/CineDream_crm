import React from 'react';

const BudgetTopsheet = () => {
  const formatCurrencyValue = (val) => {
    if (typeof val === 'string') return val;
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const productionExpenses = [
    { no: '1.', name: 'Camera & Equipment (Sony Venice)', perDay: 35000, days: 5, total: 175000 },
    { no: '2.', name: 'Lights & Equipment (Dolly Panther, Drone)', perDay: 40000, days: 5, total: 200000 },
    { no: '3.', name: 'DOP & Staff', perDay: 'PACKAGE', days: 'PACKAGE', total: 100000 },
    { no: '4.', name: 'Cast (4)', perDay: 'PACKAGE', days: 'PACKAGE', total: 400000 },
    { no: '5.', name: 'Local Transportation & Food', perDay: 'PACKAGE', days: 5, total: 100000 },
    { no: '6.', name: 'Travelling cost to Delhi (8000 per Person)', perDay: 'PACKAGE', days: 'PACKAGE', total: 200000 },
    { no: '7.', name: 'Hotels (10 Rooms x 3000)', perDay: 30000, days: 6, total: 180000 },
    { no: '8.', name: 'Production Manager & Production Staff (3)', perDay: 'PACKAGE', days: 'PACKAGE', total: 35000 },
    { no: '9.', name: 'Extra Talent (15)', perDay: 500, days: 2, total: 15000 },
    { no: '10.', name: 'Art Director & Team', perDay: 5000, days: 4, total: 20000 },
    { no: '11.', name: 'Sound', perDay: 2000, days: 4, total: 8000 },
    { no: '12.', name: 'Makeup & Hair', perDay: 2500, days: 4, total: 10000 },
    { no: '13. (EXTRA)', name: 'Locations (+ Electricity)', perDay: 50000, days: 4, total: 200000 },
    { no: '14.', name: 'Property', perDay: 'PACKAGE', days: 'PACKAGE', total: 200000 }, // Wait, in photo 2: 14 is Property -> PACKAGE | PACKAGE | 20,000.00! Let's check, it is 20,000.00 (twenty thousand)
    { no: '15.', name: 'Wardrobe Co-ordinator & Costumes', perDay: 'PACKAGE', days: 'PACKAGE', total: 25000 },
    { no: '16.', name: 'Director & Direction Team (3)', perDay: 'PACKAGE', days: 'PACKAGE', total: 70000 }
  ];

  // Adjusting item 14 total to match picture: 20,000.00
  productionExpenses[13].total = 20000; // Index 13 is no. 14 'Property'

  const postProductionExpenses = [
    { no: '1.', name: 'Film Editing', perDay: 'PACKAGE', days: 'PACKAGE', total: 15000 },
    { no: '2.', name: 'Music & Post Production Sound (Foley)', perDay: 'PACKAGE', days: 'PACKAGE', total: 12000 },
    { no: '3.', name: 'Animation & DI', perDay: 'PACKAGE', days: 'PACKAGE', total: 15000 },
    { no: '4.', name: 'Visual Effects', perDay: 'PACKAGE', days: 'PACKAGE', total: 15000 }
  ];

  const totalProduction = 1758000;
  const totalPostProduction = 57000;
  const totalBoth = totalProduction + totalPostProduction; // 18,15,000
  const contingency = 181500;
  const grandTotal = 1996500;

  return (
    <div className="topsheet-container" style={{
      background: 'white',
      color: '#333',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1000px',
      margin: '0 auto',
      overflowX: 'auto'
    }}>
      {/* Topsheet Header Bar */}
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '16px 20px',
        fontWeight: 'bold',
        fontSize: '20px',
        letterSpacing: '0.5px',
        fontFamily: 'monospace',
        marginBottom: '20px',
        borderRadius: '4px 4px 0 0'
      }}>
        BUDGET TOPSHEET
      </div>

      {/* Meta Specs Grid Block */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        border: '1px solid #ddd',
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        fontSize: '13px',
        lineHeight: '1.8',
        marginBottom: '20px',
        borderRadius: '4px'
      }}>
        <div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Production House</span><span></span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Project Title</span><span>YEH DIL BEWAJAH (PROMO TEASER)</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Shooting Dates</span><span></span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '150px' }}>Shoot Days</span><span>4+1(Extra) Days</span></div>
        </div>
        <div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Producer</span><span>MR. JAYANTH SINHA</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Director</span><span>MR. MANAN PRATAP SINGH</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Production Manager</span><span>MR. MANOJ KUMAR</span></div>
          <div style={{ display: 'flex' }}><span style={{ fontWeight: 'bold', width: '180px' }}>Locations</span><span>DELHI NCR</span></div>
        </div>
      </div>

      {/* Production Expenses Table */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '24px',
        fontSize: '12px',
        textAlign: 'left',
        border: '1px solid #333'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#bc2e5c', color: 'white', fontWeight: 'bold' }}>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '40px' }}></th>
            <th style={{ padding: '8px 12px', border: '1px solid #333' }}>PRODUCTION EXPENSES</th>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}>PER DAY COST</th>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}>TOTAL DAYS</th>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '220px', textAlign: 'right' }}>TOTAL COST</th>
          </tr>
        </thead>
        <tbody>
          {productionExpenses.map((exp, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#fcfcfc' }}>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center', fontWeight: 'bold' }}>{exp.no}</td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', fontWeight: '500' }}>{exp.name}</td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>
                {typeof exp.perDay === 'number' ? formatCurrencyValue(exp.perDay).split('.')[0] : exp.perDay}
              </td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>{exp.days}</td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'right', fontWeight: 'bold' }}>
                <span style={{ float: 'left', fontWeight: 'normal', color: '#666' }}>₹</span>
                {formatCurrencyValue(exp.total)}
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#eef2f7', fontWeight: 'bold' }}>
            <td style={{ padding: '8px 12px', border: '1px solid #333' }}></td>
            <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'center' }} colSpan={3}>Total Production</td>
            <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'right', fontSize: '13px' }}>
              <span style={{ float: 'left', color: '#666' }}>₹</span>
              {formatCurrencyValue(totalProduction)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Post Production Expenses Table */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        fontSize: '12px',
        textAlign: 'left',
        border: '1px solid #333'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#5e2ca5', color: 'white', fontWeight: 'bold' }}>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '40px' }}></th>
            <th style={{ padding: '8px 12px', border: '1px solid #333' }}>POST-PRODUCTION EXPENSES</th>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}></th>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '120px', textAlign: 'center' }}></th>
            <th style={{ padding: '8px 12px', border: '1px solid #333', width: '220px', textAlign: 'right' }}></th>
          </tr>
        </thead>
        <tbody>
          {postProductionExpenses.map((exp, index) => (
            <tr key={index} style={{ backgroundColor: 'white' }}>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center', fontWeight: 'bold' }}>{exp.no}</td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', fontWeight: '500' }}>{exp.name}</td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>{exp.perDay}</td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'center' }}>{exp.days}</td>
              <td style={{ padding: '6px 12px', border: '1px solid #333', textAlign: 'right', fontWeight: 'bold' }}>
                <span style={{ float: 'left', fontWeight: 'normal', color: '#666' }}>₹</span>
                {formatCurrencyValue(exp.total)}
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#eef2f7', fontWeight: 'bold' }}>
            <td style={{ padding: '8px 12px', border: '1px solid #333' }}></td>
            <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'center' }} colSpan={3}>Total Post Production</td>
            <td style={{ padding: '8px 12px', border: '1px solid #333', textAlign: 'right', fontSize: '13px' }}>
              <span style={{ float: 'left', color: '#666' }}>₹</span>
              {formatCurrencyValue(totalPostProduction)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Summary Totals Block */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '12px'
      }}>
        <div style={{ width: '400px', border: '1px solid #333', borderTop: 'none' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
            <span style={{ flex: 1, padding: '6px 12px', fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>TOTAL</span>
            <span style={{ width: '220px', padding: '6px 12px', fontWeight: 'bold', textAlign: 'right', borderLeft: '1px solid #333' }}>
              <span style={{ float: 'left', fontWeight: 'normal', color: '#666' }}>₹</span>
              {formatCurrencyValue(totalBoth)}
            </span>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
            <span style={{ flex: 1, padding: '6px 12px', fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>10% CONTINGENCY</span>
            <span style={{ width: '220px', padding: '6px 12px', fontWeight: 'bold', textAlign: 'right', borderLeft: '1px solid #333' }}>
              <span style={{ float: 'left', fontWeight: 'normal', color: '#666' }}>₹</span>
              {formatCurrencyValue(contingency)}
            </span>
          </div>
          <div style={{ display: 'flex', backgroundColor: '#2c3e50', color: 'white' }}>
            <span style={{ flex: 1, padding: '8px 12px', fontWeight: 'bold', textAlign: 'right' }}>GRAND TOTAL</span>
            <span style={{ width: '220px', padding: '8px 12px', fontWeight: 'bold', textAlign: 'right', borderLeft: '1px solid #333', fontSize: '14px' }}>
              <span style={{ float: 'left', fontWeight: 'normal', color: 'rgba(255,255,255,0.7)' }}>₹</span>
              {formatCurrencyValue(grandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTopsheet;
