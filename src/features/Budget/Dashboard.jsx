import React, { useContext, useState } from 'react';
import { ProductionContext } from '../../context/ProductionContext';

const Dashboard = ({ onEditClick, onAddNewClick }) => {
  const { data, auditLogs, budgetSummary, metadata, updateBudgetLimit } = useContext(ProductionContext);
  const [logFilter, setLogFilter] = useState('ALL');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatPercent = (val) => {
    return `${Math.round(val || 0)}%`;
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const {
    grandTotal,
    totalPaid,
    pendingPayments,
    remainingBudget,
    budgetVariance,
    dailyProductionCost,
    weeklyProductionCost,
    monthlyProductionCost,
    costPerShootingDay,
    costPerActor,
    breakdown
  } = budgetSummary;

  // Compute percentage paid
  const percentPaid = grandTotal > 0 ? (totalPaid / grandTotal) * 100 : 0;

  // Find max breakdown total to scale bar charts
  const departments = Object.keys(breakdown || {});
  const maxCost = Math.max(...departments.map(d => breakdown[d].total), 1);

  // SVG Circular Chart calculations
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  const strokeOffset = circ - (percentPaid / 100) * circ;

  const filteredLogs = auditLogs.filter(log => {
    if (logFilter === 'ALL') return true;
    return log.actionType === logFilter;
  });

  return (
    <div className="dashboard-grid">
      {/* Target Budget Editor */}
      <div className="chart-card" style={{ 
        padding: '16px 24px', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(92, 113, 94, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        marginBottom: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '16px', fontWeight: '800', margin: 0, color: 'hsl(var(--text-primary))' }}>Overall Budget Settings</h2>
            <p style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))', margin: 0 }}>Configure the target cap of the film production</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: '700', color: 'hsl(var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Cap:</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '12px', fontWeight: '700', color: '#5c715e' }}>₹</span>
            <input 
              type="number" 
              className="form-control" 
              style={{ 
                width: '180px', 
                paddingLeft: '24px', 
                fontFamily: 'var(--font-title)', 
                fontSize: '15px', 
                fontWeight: '800', 
                borderRadius: '8px', 
                border: '1px solid var(--glass-border)', 
                background: 'rgba(255, 255, 255, 0.05)', 
                color: 'hsl(var(--text-primary))' 
              }}
              value={metadata.budgetLimit}
              onChange={(e) => updateBudgetLimit(e.target.value)}
            />
          </div>
        </div>
      </div>



      {/* Post-Production Categories Budget Planner Form */}
      <div className="chart-card">
        <div className="chart-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span>Post-Production Budget Planner</span>
            <span className="chart-card-subtitle" style={{ display: 'block', marginTop: '4px' }}>Click 'Edit Details' to update budget and vendor contact info</span>
          </div>
          {onAddNewClick && (
            <button className="btn-primary" onClick={onAddNewClick} style={{ padding: '6px 14px', fontSize: '13px' }}>
              + Add New
            </button>
          )}
        </div>
        
        <div className="table-responsive" style={{
          overflowX: 'auto',
          marginTop: '12px',
          borderRadius: '8px',
          border: '1px solid var(--glass-border)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            textAlign: 'left',
            minWidth: '700px'
          }}>
            <thead>
              <tr style={{ background: 'rgba(92, 113, 94, 0.08)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'hsl(var(--text-primary))' }}>Category</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'hsl(var(--text-primary))', width: '120px' }}>Per Day Cost</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'hsl(var(--text-primary))', width: '100px' }}>Work Days</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'hsl(var(--text-primary))', width: '120px' }}>Paid Amount</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'hsl(var(--text-primary))', width: '120px', textAlign: 'right' }}>Total Cost</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'hsl(var(--text-primary))', width: '100px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const postProdCategories = ['Picture Edit', 'Color Grading (DI)', 'Sound Design', 'Dubbing', 'Atmos Mix', 'Music/Score', 'VFX/CGI'];
                const plannerItems = (data.Finance || []).filter(item => postProdCategories.includes(item.category));
                
                if (plannerItems.length === 0) {
                  return (
                    <tr>
                      <td colSpan="6" style={{ padding: '32px 16px', textAlign: 'center', color: 'hsl(var(--text-secondary))' }}>
                        No post-production expenses added yet. Click "+ Add New" to start planning.
                      </td>
                    </tr>
                  );
                }

                return plannerItems.map(finItem => {
                  const cost = Number(finItem.perDayCost || 0) * Number(finItem.workingDays || 0);

                  return (
                    <tr key={finItem.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: 'hsl(var(--text-primary))' }}>
                        {finItem.category}
                        {finItem.itemName && (
                          <div style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))', marginTop: '2px', fontWeight: '400' }}>
                            {finItem.itemName} {finItem.email ? `• ${finItem.email}` : ''}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>{formatCurrency(finItem.perDayCost || 0)}</td>
                      <td style={{ padding: '12px 16px' }}>{finItem.workingDays || 0}</td>
                      <td style={{ padding: '12px 16px' }}>{formatCurrency(finItem.paidAmount || 0)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', fontFamily: 'var(--font-title)', color: '#5c715e' }}>
                        {formatCurrency(cost)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button 
                          className="action-btn"
                          onClick={() => {
                            if (finItem.id && onEditClick) {
                              onEditClick(finItem);
                            }
                          }}
                          style={{ padding: '6px 12px', fontSize: '11px' }}
                        >
                          ✏️ Edit Details
                        </button>
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-row">
        {/* Department breakdown horizontal chart */}
        <div className="chart-card">
          <div className="chart-card-title">
            <span>Department Cost Distribution</span>
            <span className="chart-card-subtitle">Aggregated cost per production module</span>
          </div>

          <div className="bar-chart-container">
            {departments
              .filter(d => d !== 'Documents')
              .map(dept => {
                const deptTotal = breakdown[dept]?.total || 0;
                const widthPercent = maxCost > 0 ? (deptTotal / maxCost) * 100 : 0;

                return (
                  <div key={dept} className="bar-chart-item">
                    <span className="bar-label">{dept}</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                    <span className="bar-value">{formatCurrency(deptTotal)}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Circular payment status chart */}
        <div className="chart-card">
          <div className="chart-card-title">
            <span>Financial Completion</span>
            <span className="chart-card-subtitle">Percentage of total budget paid</span>
          </div>

          <div className="circular-chart-container">
            <div className="circular-svg-wrapper">
              <svg className="circular-svg" viewBox="0 0 140 140">
                <circle className="circle-bg" cx="70" cy="70" r={radius} />
                <circle
                  className="circle-fill"
                  cx="70"
                  cy="70"
                  r={radius}
                  strokeDasharray={circ}
                  strokeDashoffset={strokeOffset}
                />
              </svg>
              <div className="circle-text">
                <div className="circle-percent">{formatPercent(percentPaid)}</div>
                <div className="circle-label">Paid</div>
              </div>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'hsl(var(--color-emerald))' }}></div>
                <span>Paid ({formatCurrency(totalPaid)})</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}></div>
                <span>Pending ({formatCurrency(pendingPayments)})</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'hsl(var(--text-muted))', marginBottom: '6px' }}>Variance Status</span>
              <div style={{
                background: budgetVariance >= 0 ? 'rgba(46, 125, 50, 0.08)' : 'rgba(211, 47, 47, 0.08)',
                border: budgetVariance >= 0 ? '1px solid rgba(46, 125, 50, 0.15)' : '1px solid rgba(211, 47, 47, 0.15)',
                color: budgetVariance >= 0 ? '#2e7d32' : '#d32f2f',
                padding: '6px 16px',
                borderRadius: '20px',
                fontFamily: 'var(--font-title)',
                fontSize: '13px',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {budgetVariance >= 0 
                  ? `Under Budget by ${formatCurrency(budgetVariance)}`
                  : `Over Budget by ${formatCurrency(Math.abs(budgetVariance))}`
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log / Financial History */}
      <div className="audit-log-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', fontWeight: '600' }}>Financial Audit History</h2>
            <p style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))' }}>Real-time updates of resource and cost modifications</p>
          </div>
          <div>
            <select
              className="filter-select"
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
            >
              <option value="ALL">All Actions</option>
              <option value="ADD">Additions</option>
              <option value="UPDATE">Updates</option>
              <option value="DELETE">Deletions</option>
            </select>
          </div>
        </div>

        <div className="audit-table-wrapper">
          {filteredLogs.length === 0 ? (
            <div className="empty-state" style={{ padding: '24px' }}>
              <p>No audit logs matching selection.</p>
            </div>
          ) : (
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Module</th>
                  <th>Resource</th>
                  <th>Description</th>
                  <th>Cost Impact</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{formatDate(log.timestamp)}</td>
                    <td style={{ fontWeight: '500' }}>{log.user.split(" (")[0]}</td>
                    <td>
                      <span className={`audit-badge ${log.actionType.toLowerCase()}`}>
                        {log.actionType}
                      </span>
                    </td>
                    <td>{log.module}</td>
                    <td style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{log.itemName}</td>
                    <td style={{ fontSize: '12px' }}>{log.changeDescription}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className={`effect-value ${log.budgetEffect > 0 ? 'positive' : log.budgetEffect < 0 ? 'negative' : 'neutral'}`}>
                        {log.budgetEffect > 0 ? `+${formatCurrency(log.budgetEffect)}` : log.budgetEffect < 0 ? `-${formatCurrency(Math.abs(log.budgetEffect))}` : '₹0'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
