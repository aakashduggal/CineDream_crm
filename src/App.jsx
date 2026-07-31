import React, { useState, useContext } from 'react';
import { ProductionProvider, ProductionContext } from './context/ProductionContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ModuleList from './components/ModuleList';
import DetailView from './components/DetailView';
import ItemForm from './components/ItemForm';
import Login from './components/Login';

function MainAppContent() {
  const { isAuthenticated, login } = useContext(ProductionContext);
  const [activeModule, setActiveModule] = useState('Finance');
  const [selectedItemId, setSelectedItemId] = useState(null);
  
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
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={login} />;
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar activeModule={activeModule} setActiveModule={handleModuleChange} />

      {/* Main Panel Viewport */}
      <div className="main-content">
        <Header />
        
        <main className="content-body">
          {activeModule === 'Finance' ? (
            <Dashboard />
          ) : (
            <div className="split-pane-wrapper">
              <ModuleList
                activeModule={activeModule}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                onAddNewClick={handleAddNewClick}
              />
              
              <DetailView
                activeModule={activeModule}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                onEditClick={handleEditClick}
              />
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
