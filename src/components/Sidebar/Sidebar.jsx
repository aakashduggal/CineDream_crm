import React, { useContext } from 'react';
import { ProductionContext } from '../../context/ProductionContext';

const MODULES = [
  { id: 'Dashboard', label: 'Dashboard' },
  { id: 'Finance', label: 'Post Production' },
  { id: 'Actors', label: 'Actors' },
  { id: 'HOD', label: 'HOD' },
  { id: 'Technical Crew', label: 'Technical Crew' },
  { id: 'Equipment', label: 'Equipment' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Vendors', label: 'Vendors' },
  { id: 'Documents', label: 'Documents' }
];

const Sidebar = ({ activeModule, setActiveModule, isSidebarOpen, setIsSidebarOpen }) => {
  const { data, metadata, logout } = useContext(ProductionContext);

  const getItemCount = (moduleId) => {
    return (data[moduleId] || []).length;
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <h1 className="sidebar-logo">
          <span>🎬</span> CINEDREAM<span>CRM</span>
        </h1>
        <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} title="Close Menu">
          ✕
        </button>
      </div>

      <ul className="sidebar-menu">
        {MODULES.map(mod => {
          const count = getItemCount(mod.id);
          const isActive = activeModule === mod.id;
          return (
            <li
              key={mod.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveModule(mod.id)}
            >
              <div className="sidebar-item-label">
                <span>{mod.label}</span>
              </div>
              {count > 0 && mod.id !== 'Finance' && (
                <span className="sidebar-count">{count}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <div className="sidebar-profile-avatar">
            {metadata.currentUser ? metadata.currentUser.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?'}
          </div>
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">{metadata.currentUser ? metadata.currentUser.split(' (')[0] : 'Guest'}</div>
            <div className="sidebar-profile-role">{metadata.currentUser ? metadata.currentUser.split('(')[1]?.replace(')', '') : 'Visitor'}</div>
          </div>
          <button className="logout-btn-icon" onClick={logout} title="Sign Out">
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
