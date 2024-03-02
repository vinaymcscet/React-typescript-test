import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import List from './List/List';
import { FavoritesProvider } from './Deriatives/Hooks/useFavorites';
import './App.css';

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="list" element={<List />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
