import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DogProfile from './pages/DogProfile';
import RankingList from './pages/RankingList';
import UploadFlow from './pages/UploadFlow';
import CountryRanking from './pages/CountryRanking';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dog/:id" element={<DogProfile />} />
          <Route path="/ranking/:type" element={<RankingList />} />
          <Route path="/upload" element={<UploadFlow />} />
          <Route path="/country/:country" element={<CountryRanking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
