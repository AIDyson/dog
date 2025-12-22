import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import RankingSection from '../components/RankingSection';
import GallerySection from '../components/GallerySection';
import Globe3D from '../components/Globe3D';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <HeroSection />
      <RankingSection />
      <GallerySection />
      <Globe3D />
      
      <footer className="site-footer">
        <div className="container">
          <p>© 2024 PawRank. 狗狗颜值评分与排行榜平台.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

