
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Predictions from './components/Predictions';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'predictions':
        return <Predictions />;
      default:
        return (
          <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
            <p className="text-gray-500 italic">This section is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar activeView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
