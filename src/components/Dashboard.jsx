import React, { useContext, useState } from 'react';
import { ProductionContext } from '../context/ProductionContext';

const Dashboard = () => {
  const { auditLogs, budgetSummary, metadata, updateBudgetLimit } = useContext(ProductionContext);
  const [logFilter, setLogFilter] = useState('ALL');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
      <div className="chart-card" style={{ padding: '16px 24px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', fontWeight: '600' }}>Overall Budget Settings</h2>
          <p style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))' }}>Configure the target cap of the film production</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'hsl(var(--text-secondary))' }}>Target Budget Cap ($):</label>
          <input 
            type="number" 
            className="form-control" 
            style={{ width: '180px', fontFamily: 'var(--font-title)', fontSize: '16px', fontWeight: '700' }}
            value={metadata.budgetLimit}
            onChange={(e) => updateBudgetLimit(e.target.value)}
          />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-cards">
        <div className="kpi-card accent">
          <div className="kpi-card-header">
            <span>Target Cap</span>
            <div className="kpi-card-icon">🎯</div>
          </div>
          <div className="kpi-card-value">{formatCurrency(metadata.budgetLimit)}</div>
          <div className="kpi-card-footer">Maximum budget ceiling</div>
        </div>

        <div className="kpi-card amber">
          <div className="kpi-card-header">
            <span>Estimated Total</span>
            <div className="kpi-card-icon">💸</div>
          </div>
          <div className="kpi-card-value">{formatCurrency(grandTotal)}</div>
          <div className="kpi-card-footer">Calculated from all modules</div>
        </div>

        <div className="kpi-card emerald">
          <div className="kpi-card-header">
            <span>Total Spent (Paid)</span>
            <div className="kpi-card-icon">✅</div>
          </div>
          <div className="kpi-card-value">{formatCurrency(totalPaid)}</div>
          <div className="kpi-card-footer">{formatPercent(percentPaid)} of estimated budget paid</div>
        </div>

        <div className="kpi-card rose">
          <div className="kpi-card-header">
            <span>Pending Payments</span>
            <div className="kpi-card-icon">⏳</div>
          </div>
          <div className="kpi-card-value">{formatCurrency(pendingPayments)}</div>
          <div className="kpi-card-footer">Remaining liabilities to vendors & cast</div>
        </div>
      </div>

      {/* Time-based Estimates KPI Grid */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>Daily Shooting Cost</span>
            <div className="kpi-card-icon">🗓️</div>
          </div>
          <div className="kpi-card-value" style={{ fontSize: '20px' }}>{formatCurrency(dailyProductionCost)}</div>
          <div className="kpi-card-footer">Est. cost per filming day</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>Weekly Shooting Cost</span>
            <div className="kpi-card-icon">📅</div>
          </div>
          <div className="kpi-card-value" style={{ fontSize: '20px' }}>{formatCurrency(weeklyProductionCost)}</div>
          <div className="kpi-card-footer">Based on 6 filming days/week</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>Monthly Shooting Cost</span>
            <div className="kpi-card-icon">💼</div>
          </div>
          <div className="kpi-card-value" style={{ fontSize: '20px' }}>{formatCurrency(monthlyProductionCost)}</div>
          <div className="kpi-card-footer">Based on 25 filming days/month</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>Avg Cost per Actor</span>
            <div className="kpi-card-icon">🎭</div>
          </div>
          <div className="kpi-card-value" style={{ fontSize: '20px' }}>{formatCurrency(costPerActor)}</div>
          <div className="kpi-card-footer">Total Actor Cost / Active Cast</div>
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

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px', width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))' }}>Variance Status</div>
              <div style={{ fontFamily: 'var(--font-title)', fontSize: '18px', fontWeight: '700', marginTop: '4px', color: budgetVariance >= 0 ? 'hsl(var(--color-emerald))' : 'hsl(var(--color-rose))' }}>
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
                        {log.budgetEffect > 0 ? `+${formatCurrency(log.budgetEffect)}` : log.budgetEffect < 0 ? `-${formatCurrency(Math.abs(log.budgetEffect))}` : '$0'}
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
