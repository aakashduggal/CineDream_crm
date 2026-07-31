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
    switch (activeModule) {
      case 'Actors':
        return item.role;
      case 'Directors':
        return `Experience: ${item.experience} years`;
      case 'Technical Crew':
        return `${item.role} (${item.department})`;
      case 'Equipment':
        return `${item.category} &bull; Model: ${item.model}`;
      case 'Travel':
        return `${item.type} Booking (${item.bookingNumber})`;
      case 'Lodging & Boarding':
        return `${item.hotelName} &bull; Room: ${item.roomNumber || 'TBD'}`;
      case 'Costumes':
        return `For: ${item.assignedActor || 'Unassigned'}`;
      case 'Locations':
        return item.address;
      case 'Production Team':
        return item.role;
      case 'Vendors':
        return item.serviceCategory;
      case 'Vehicles':
        return `${item.model} &bull; Driver: ${item.driverName}`;
      case 'Catering':
        return item.mealType || 'Daily Meals';
      case 'Finance':
        return item.category;
      case 'Documents':
        return `${item.category} &bull; ${item.fileType} (${item.size})`;
      default:
        return '';
    }
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
          <div className="items-grid">
            {filteredItems.map(item => {
              const name = getItemName(item);
              const subtitle = getItemSubtitle(item);
              const status = getStatus(item);
              const cost = calculateItemCost(activeModule, item);
              const isSelected = selectedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className={`item-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedItemId(item.id)}
                >
                  <div className="item-card-header">
                    <div
                      className="item-avatar"
                      style={{ background: getAvatarGradient(item.id) }}
                    >
                      {getInitials(name)}
                    </div>

                    <div className="item-title-wrapper">
                      <h4 className="item-title">{name}</h4>
                      <p
                        className="item-subtitle"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                      ></p>
                    </div>
                  </div>

                  <div className="item-card-stats">
                    <div className="item-card-stat">
                      <span className="stat-label">Status</span>
                      <div>
                        <span className={`badge ${status.toLowerCase().replace(' ', '-')}`}>
                          {status}
                        </span>
                      </div>
                    </div>

                    {activeModule !== 'Documents' && (
                      <div className="item-card-stat" style={{ textAlign: 'right' }}>
                        <span className="stat-label">Financials</span>
                        <div className="stat-value">{formatCurrency(cost)}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleList;
