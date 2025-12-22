import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Image } from 'lucide-react';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-content">
          {/* 左侧：两条横线和MENU */}
          <div className="header-left">
            <button className="menu-button">
              <div className="menu-lines">
                <span className="menu-line"></span>
                <span className="menu-line"></span>
              </div>
              <span className="menu-text">MENU</span>
            </button>
          </div>
          
          {/* 中间：网站logo */}
          <div className="header-center">
            <Link to="/" className="logo">
              <Trophy className="logo-icon" />
              <div className="logo-text">
                <h1>PawRank</h1>
              </div>
            </Link>
          </div>
          
          {/* 右侧：评分标准和上传狗狗 */}
          <div className="header-right">
            <button className="btn-rating-standard">
              评分标准
            </button>
            <Link to="/upload" className="btn-upload-dog">
              上传狗狗
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

