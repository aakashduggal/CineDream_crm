import React, { useContext, useState } from 'react';
import { ProductionContext, calculateItemCost } from '../context/ProductionContext';

const ModuleList = ({ activeModule, selectedItemId, setSelectedItemId, onAddNewClick }) => {
  const { data } = useContext(ProductionContext);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const items = data[activeModule] || [];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Helper to extract name/title for display
  const getItemName = (item) => {
    return item.name || item.title || item.itemName || item.personName || item.catererName || `ID: ${item.id}`;
  };

  const getItemSubtitle = (item) => {
    let sub = '';
    switch (activeModule) {
      case 'Actors':
        sub = item.role;
        break;
      case 'Directors':
        sub = `Experience: ${item.experience} years`;
        break;
      case 'HOD':
        sub = `${item.role} (${item.department})`;
        break;
      case 'Technical Crew':
        sub = `${item.role} (${item.department})`;
        break;
      case 'Equipment':
        sub = `${item.category} &bull; Model: ${item.model}`;
        break;
      case 'Travel':
        sub = item.travel;
        break;
      case 'Lodging & Boarding':
        sub = `${item.hotelName} &bull; Room: ${item.roomNumber || 'TBD'}`;
        break;
      case 'Costumes':
        sub = `For: ${item.assignedActor || 'Unassigned'}`;
        break;
      case 'Locations':
        sub = item.address;
        break;
      case 'Production Team':
        sub = item.role;
        break;
      case 'Vendors':
        sub = item.equipments;
        break;
      case 'Vehicles':
        sub = `${item.model} &bull; Driver: ${item.driverName}`;
        break;
      case 'Catering':
        sub = item.mealType || 'Daily Meals';
        break;
      case 'Finance':
        sub = item.category;
        break;
      case 'Documents':
        sub = `${item.category} &bull; ${item.fileType} (${item.size})`;
        break;
      default:
        sub = '';
    }
    return sub || '';
  };

  const getStatus = (item) => {
    return item.status || 'Active';
  };

  // Unique list of statuses in current module for filtering
  const statuses = Array.from(new Set(items.map(item => getStatus(item))));

  // Filter items
  const filteredItems = items.filter(item => {
    const name = getItemName(item).toLowerCase();
    const sub = getItemSubtitle(item).toLowerCase();
    const status = getStatus(item);

    const matchesSearch = name.includes(search.toLowerCase()) || sub.includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Initials generator for avatars
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Gradient color based on id hash
  const getAvatarGradient = (id) => {
    const gradients = [
      'linear-gradient(135deg, #3B82F6, #1D4ED8)', // blue
      'linear-gradient(135deg, #10B981, #047857)', // green
      'linear-gradient(135deg, #F59E0B, #B45309)', // amber
      'linear-gradient(135deg, #8B5CF6, #5D33F8)', // indigo
      'linear-gradient(135deg, #EC4899, #BE185D)', // pink
      'linear-gradient(135deg, #6B7280, #374151)'  // gray
    ];
    let sum = 0;
    if (id) {
      for (let i = 0; i < id.length; i++) {
        sum += id.charCodeAt(i);
      }
    }
    return gradients[sum % gradients.length];
  };

  const getTableColumns = () => {
    switch (activeModule) {
      case 'Actors':
        return [
          { label: 'Cast ID', key: 'castId' },
          { label: 'Name', key: 'name' },
          { label: 'Role', key: 'role' },
          { label: 'Character', key: 'characterName' },
          { label: 'Email ID', key: 'email' },
          { label: 'Phone Number', key: 'phone' },
          { label: 'Per Day Cost', key: 'perDayFee', isCurrency: true },
          { label: 'Working Days', key: 'daysScheduled' }
        ];
      case 'HOD':
      case 'Technical Crew':
        return [
          { label: 'Crew ID', key: 'crewId' },
          { label: 'Name', key: 'name' },
          { label: 'Role', key: 'role' },
          { label: 'Department', key: 'department' },
          { label: 'Email ID', key: 'email' },
          { label: 'Phone Number', key: 'phone' },
          { label: 'Working Days', key: 'daysScheduled' },
          { label: 'Daily Rate', key: 'price', isCurrency: true }
        ];
      case 'Travel':
        return [
          { label: 'Travel ID', key: 'travelId' },
          { label: 'Passenger/Group Name', key: 'name' },
          { label: 'Travel Details', key: 'travel' },
          { label: 'Lodging & Boarding', key: 'lodgingAndBoarding' },
          { label: 'Costumes', key: 'costumes' },
          { label: 'Catering', key: 'catering' },
          { label: 'Vehicles', key: 'vehicles' },
          { label: 'Total Price', key: 'price', isCurrency: true }
        ];
      case 'Vendors':
        return [
          { label: 'Vendor ID', key: 'vendorId' },
          { label: 'Name', key: 'name' },
          { label: 'Equipments', key: 'equipments' },
          { label: 'Email ID', key: 'email' },
          { label: 'Contact Number', key: 'contact' },
          { label: 'Price', key: 'price', isCurrency: true }
        ];
      case 'Finance':
        return [
          { label: 'Finance ID', key: 'financeId' },
          { label: 'Expense Name', key: 'itemName' },
          { label: 'Category', key: 'category' },
          { label: 'Email ID', key: 'email' },
          { label: 'Phone Number', key: 'phone' },
          { label: 'Per Day Cost', key: 'perDayCost', isCurrency: true },
          { label: 'Working Days', key: 'workingDays' },
          { label: 'Total Cost', key: 'total', isCostCalc: true }
        ];
      case 'Equipment':
        return [
          { label: 'Equipment ID', key: 'equipmentId' },
          { label: 'Name', key: 'name' },
          { label: 'Category', key: 'category' },
          { label: 'Model', key: 'model' },
          { label: 'Rental Cost/Day', key: 'rentalCostPerDay', isCurrency: true },
          { label: 'Days Rented', key: 'daysRented' },
          { label: 'Supplier', key: 'supplier' }
        ];
      case 'Documents':
        return [
          { label: 'Document ID', key: 'documentId' },
          { label: 'Title', key: 'title' },
          { label: 'Category', key: 'category' },
          { label: 'File Type', key: 'fileType' },
          { label: 'Upload Date', key: 'uploadDate' },
          { label: 'Signees', key: 'signees' },
          { label: 'Status', key: 'status' }
        ];
      default:
        return [
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' }
        ];
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div className="module-controls">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${activeModule}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {statuses.length > 0 && (
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              {statuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          )}

          <button className="action-btn" onClick={onAddNewClick}>
            <span>➕</span> Add New
          </button>
        </div>
      </div>

      <div className="list-panel">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">📂</span>
            <h3 className="empty-state-title">No items found</h3>
            <p className="empty-state-text">
              Try adjusting your search query, selecting another status filter, or add a new record.
            </p>
          </div>
        ) : (
          <div className="table-responsive" style={{
            overflowX: 'auto',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)'
          }}>
            <table className="module-data-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              textAlign: 'left'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid var(--glass-border)',
                  background: 'rgba(92, 113, 94, 0.12)'
                }}>
                  {getTableColumns().map((col, idx) => (
                    <th key={idx} style={{
                      padding: '12px 16px',
                      fontWeight: '800',
                      color: 'hsl(var(--text-primary))',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(92, 113, 94, 0.18)' : 'transparent',
                        transition: 'var(--transition-smooth)'
                      }}
                      className="table-row-hover"
                    >
                      {getTableColumns().map((col, idx) => {
                        let val = item[col.key];
                        if (col.isCostCalc) {
                          val = calculateItemCost(activeModule, item);
                        }
                        return (
                          <td key={idx} style={{
                            padding: '12px 16px',
                            color: isSelected ? '#5c715e' : 'hsl(var(--text-secondary))',
                            fontWeight: col.isCostCalc || col.isCurrency || col.key === 'name' || col.key === 'itemName' ? '700' : 'normal'
                          }}>
                            {col.isCurrency || col.isCostCalc ? (
                              typeof val === 'number' ? formatCurrency(val) : val
                            ) : (
                              val || 'N/A'
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleList;
