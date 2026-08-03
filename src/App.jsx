import React, { useState, useContext } from 'react';
import { ProductionProvider, ProductionContext } from './context/ProductionContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BudgetTopsheet from './components/BudgetTopsheet';
import ModuleList from './components/ModuleList';
import DetailView from './components/DetailView';
import ItemForm from './components/ItemForm';
import Login from './components/Login';

function MainAppContent() {
  const { isAuthenticated, login } = useContext(ProductionContext);
  const [activeModule, setActiveModule] = useState('Finance');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [financeSubTab, setFinanceSubTab] = useState('dashboard'); // 'dashboard' or 'ledger'
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleAddNewClick = () => {
    setItemToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setIsFormOpen(true);
  };

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    setSelectedItemId(null); // Reset detail selection
    if (moduleId === 'Finance') {
      setFinanceSubTab('dashboard');
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={login} />;
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={(mod) => {
          handleModuleChange(mod);
          setIsSidebarOpen(false);
        }}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Sidebar Overlay Backdrop for Mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay-backdrop" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Main Panel Viewport */}
      <div className="main-content">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="content-body">
          {activeModule === 'Finance' && (
            <div className="finance-tabs-container" style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: 'rgba(92, 113, 94, 0.05)', padding: '6px', borderRadius: '12px', width: 'fit-content', border: '1px solid var(--glass-border)' }}>
              <button 
                onClick={() => { setFinanceSubTab('dashboard'); setSelectedItemId(null); }}
                style={{
                  background: financeSubTab === 'dashboard' ? '#5c715e' : 'transparent',
                  color: financeSubTab === 'dashboard' ? 'white' : 'hsl(var(--text-secondary))',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                Cost Dashboard
              </button>
              <button 
                onClick={() => { setFinanceSubTab('ledger'); setSelectedItemId(null); }}
                style={{
                  background: financeSubTab === 'ledger' ? '#5c715e' : 'transparent',
                  color: financeSubTab === 'ledger' ? 'white' : 'hsl(var(--text-secondary))',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                Expenses Ledger
              </button>
            </div>
          )}

          {activeModule === 'Finance' && financeSubTab === 'dashboard' ? (
            <Dashboard />
          ) : activeModule === 'Dashboard' ? (
            <BudgetTopsheet />
          ) : (
            <div className="single-pane-wrapper">
              {selectedItemId ? (
                <DetailView
                  activeModule={activeModule}
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  onEditClick={handleEditClick}
                />
              ) : (
                <ModuleList
                  activeModule={activeModule}
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  onAddNewClick={handleAddNewClick}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Dynamic Item Create / Edit Modal */}
      {isFormOpen && (
        <ItemForm
          activeModule={activeModule}
          itemToEdit={itemToEdit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ProductionProvider>
      <MainAppContent />
    </ProductionProvider>
  );
}

export default App;
