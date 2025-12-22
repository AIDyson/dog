import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, MapPin, Shield, Crown, Sparkles, ChevronRight, Upload, Image as ImageIcon } from 'lucide-react';
import './RankingSection.css';

// 模拟数据 - 每个排行榜只显示前6名（百分制分数，两位小数）
const mockDogs = {
  weekly: [
    { id: 1, name: 'Mochi', breed: 'Shiba', location: 'Tokyo, Japan', country: 'Japan', score: 95.82, votes: 18342, globalRank: 1, localRank: 1, verified: true, champion: true, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop' },
    { id: 2, name: 'Nova', breed: 'Husky', location: 'Vancouver, Canada', country: 'Canada', score: 93.68, votes: 9155, globalRank: 2, localRank: 1, verified: true, champion: false, isNew: true, image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=300&h=300&fit=crop' },
    { id: 3, name: 'Bean', breed: 'Mixed', location: 'Sydney, Australia', country: 'Australia', score: 90.52, votes: 4051, globalRank: 3, localRank: 1, verified: false, champion: false, isNew: true, image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop' },
    { id: 4, name: 'Biscuit', breed: 'Corgi', location: 'London, UK', country: 'UK', score: 89.74, votes: 12110, globalRank: 4, localRank: 1, verified: true, champion: false, image: 'https://images.unsplash.com/photo-1612536021360-a586f7b3e496?w=300&h=300&fit=crop' },
    { id: 5, name: 'Luna', breed: 'Poodle', location: 'Paris, France', country: 'France', score: 88.58, votes: 7220, globalRank: 5, localRank: 1, verified: true, champion: false, image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300&h=300&fit=crop' },
    { id: 6, name: 'Sunny', breed: 'Golden', location: 'San Diego, USA', country: 'USA', score: 86.61, votes: 13490, globalRank: 6, localRank: 1, verified: false, champion: true, image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300&h=300&fit=crop' },
  ],
  global: [
    { id: 1, name: 'Mochi', breed: 'Shiba', location: 'Tokyo, Japan', score: 95.82, votes: 18342, globalRank: 1, localRank: 1, country: 'Japan', verified: true, champion: true, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop' },
    { id: 2, name: 'Nova', breed: 'Husky', location: 'Vancouver, Canada', score: 93.68, votes: 9155, globalRank: 2, localRank: 1, country: 'Canada', verified: true, champion: false, image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=300&h=300&fit=crop' },
    { id: 3, name: 'Bean', breed: 'Mixed', location: 'Sydney, Australia', score: 90.52, votes: 4051, globalRank: 3, localRank: 1, country: 'Australia', verified: false, champion: false, image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop' },
    { id: 4, name: 'Biscuit', breed: 'Corgi', location: 'London, UK', score: 89.74, votes: 12110, globalRank: 4, localRank: 1, country: 'UK', verified: true, champion: false, image: 'https://images.unsplash.com/photo-1612536021360-a586f7b3e496?w=300&h=300&fit=crop' },
    { id: 5, name: 'Luna', breed: 'Poodle', location: 'Paris, France', score: 88.58, votes: 7220, globalRank: 5, localRank: 1, country: 'France', verified: true, champion: false, image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300&h=300&fit=crop' },
    { id: 6, name: 'Sunny', breed: 'Golden', location: 'San Diego, USA', score: 86.61, votes: 13490, globalRank: 6, localRank: 1, country: 'USA', verified: false, champion: true, image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300&h=300&fit=crop' },
  ],
  local: [
    { id: 1, name: 'Mochi', breed: 'Shiba', location: 'Tokyo, Japan', country: 'Japan', score: 95.82, votes: 18342, globalRank: 1, localRank: 1, verified: true, champion: true, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop' },
    { id: 7, name: 'Hana', breed: 'Akita', location: 'Osaka, Japan', country: 'Japan', score: 87.45, votes: 5230, globalRank: 12, localRank: 2, verified: true, champion: false, image: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=300&h=300&fit=crop' },
    { id: 8, name: 'Kuro', breed: 'Shiba', location: 'Kyoto, Japan', country: 'Japan', score: 85.38, votes: 4890, globalRank: 18, localRank: 3, verified: false, champion: false, image: 'https://images.unsplash.com/photo-1600804931749-2da4ce26c869?w=300&h=300&fit=crop' },
    { id: 9, name: 'Sakura', breed: 'Pomeranian', location: 'Tokyo, Japan', country: 'Japan', score: 84.32, votes: 4120, globalRank: 22, localRank: 4, verified: true, champion: false, image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop' },
    { id: 10, name: 'Yuki', breed: 'Shiba', location: 'Hokkaido, Japan', country: 'Japan', score: 83.28, votes: 3890, globalRank: 28, localRank: 5, verified: false, champion: false, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop' },
    { id: 11, name: 'Taro', breed: 'Akita', location: 'Tokyo, Japan', country: 'Japan', score: 82.25, votes: 3650, globalRank: 35, localRank: 6, verified: true, champion: false, image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop' },
  ]
};

function RankingSection() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  
  const currentDogs = mockDogs[activeTab].slice(0, 6); // 只显示前6名
  
  const handleDogClick = (dogId) => {
    navigate(`/dog/${dogId}`);
  };
  
  const handleViewDetails = () => {
    navigate(`/ranking/${activeTab}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleUpload = (file) => {
    navigate('/upload', { state: { file } });
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'weekly': return '本周TOP';
      case 'global': return '全球排行榜';
      case 'local': return '本国排行榜';
      default: return '本周TOP';
    }
  };
  
  return (
    <div className="ranking-section">
      <div className="container">
        <div className="ranking-header">
          <div className="ranking-title-section">
            <h2 className="ranking-main-title">Leaderboards that feel fair</h2>
            <p className="ranking-subtitle">
              Rankings consider rating quality, vote confidence, and recent momentum—so new dogs can climb.
            </p>
          </div>
        </div>

        <div className="ranking-tabs">
          <button 
            className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            <Flame size={16} />
            本周TOP
          </button>
          <button 
            className={`tab ${activeTab === 'global' ? 'active' : ''}`}
            onClick={() => setActiveTab('global')}
          >
            <Trophy size={16} />
            全球排行榜
          </button>
          <button 
            className={`tab ${activeTab === 'local' ? 'active' : ''}`}
            onClick={() => setActiveTab('local')}
          >
            <MapPin size={16} />
            本国排行榜
          </button>
        </div>

        <div className="ranking-content-wrapper">
          <div className="ranking-content">
            <div className="ranking-section-header">
              <div className="ranking-header-left">
                <h3 className="ranking-section-title">{getTabTitle()}</h3>
                <span className="ranking-count">Showing {currentDogs.length} dogs</span>
              </div>
            </div>
            
            <button className="view-details-btn" onClick={handleViewDetails}>
              查看详情
              <ChevronRight size={18} />
            </button>

            <div className="ranking-list">
              {currentDogs.map((dog, index) => (
                <div 
                  key={dog.id} 
                  className="ranking-item"
                  onClick={() => handleDogClick(dog.id)}
                >
                  <div className="ranking-item-rank">
                    <span className="rank-number">NO.{index + 1}</span>
                  </div>

                  <div className="ranking-item-image">
                    <img src={dog.image} alt={dog.name} />
                  </div>

                  <div className="ranking-item-info">
                    <h3 className="ranking-item-name">
                      {dog.name}
                      {index === 0 && <Crown className="rank-crown rank-crown-gold" size={18} />}
                      {index === 1 && <Crown className="rank-crown rank-crown-silver" size={18} />}
                      {index === 2 && <Crown className="rank-crown rank-crown-bronze" size={18} />}
                    </h3>
                    <div className="ranking-item-badges">
                      {[dog.isNew && 'new', dog.verified && 'verified', dog.champion && 'champion']
                        .filter(Boolean)
                        .slice(0, 3)
                        .map((badgeType) => {
                          if (badgeType === 'verified') {
                            return (
                              <span key="verified" className="badge badge-verified">
                                <Shield size={10} />
                                Verified
                              </span>
                            );
                          }
                          if (badgeType === 'champion') {
                            return (
                              <span key="champion" className="badge badge-champion">
                                <Crown size={10} />
                                Champion
                              </span>
                            );
                          }
                          if (badgeType === 'new') {
                            return (
                              <span key="new" className="badge badge-new">
                                <Sparkles size={10} />
                                New
                              </span>
                            );
                          }
                          return null;
                        })}
                    </div>
                    <p className="ranking-item-country">{dog.country || dog.location.split(', ').pop() || 'Unknown'}</p>
                  </div>

                  <div className="ranking-item-stats">
                    <div className="stat-item">
                      <span className="stat-value">{dog.score.toFixed(2)}</span>
                      <span className="stat-label">分数</span>
                    </div>
                  </div>

                  <div className="ranking-item-ranks">
                    {activeTab === 'weekly' && (
                      <>
                        <span className="rank-tag">全球NO.{dog.globalRank}</span>
                        <span className="rank-tag">本国NO.{dog.localRank}</span>
                      </>
                    )}
                    {activeTab === 'global' && (
                      <span className="rank-tag">{dog.country || 'Japan'}NO.{dog.localRank}</span>
                    )}
                    {activeTab === 'local' && (
                      <span className="rank-tag">全球NO.{dog.globalRank}</span>
                    )}
                  </div>

                  <button 
                    className="ranking-item-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDogClick(dog.id);
                    }}
                  >
                    <svg className="button-elem" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ color: 'inherit' }}>
                      <path d="M7 3L14 10L7 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'currentColor' }}/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧区域 */}
          <div className="ranking-right-column">
            {/* 评分规则卡片 */}
            <div className="rating-integrity-card">
              <div className="integrity-header">
                <div>
                  <p className="integrity-label">Rating integrity</p>
                  <h3 className="integrity-title">Confidence scoring</h3>
                </div>
                <div className="integrity-icon">
                  <Shield size={32} fill="#ffd700" color="#ffd700" />
                </div>
              </div>

              <p className="integrity-description">
                We weigh ratings by vote volume and recent activity, with basic anti-spam protections.
              </p>

              <div className="integrity-boxes">
                <div className="integrity-box">
                  <h4 className="box-title">Weighting</h4>
                  <p className="box-value">Score + Votes + Trend</p>
                  <p className="box-hint">Balanced for fairness</p>
                </div>

                <div className="integrity-box">
                  <h4 className="box-title">Protections</h4>
                  <p className="box-value">Rate limits</p>
                  <p className="box-hint">Suspicious patterns</p>
                </div>
              </div>

              <div className="integrity-footer">
                <p className="footer-text">Want deeper rules? Publish a short explainer page.</p>
                <button className="learn-button">
                  Learn
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* 上传框 */}
            <div className="upload-card">
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <div 
                className="upload-card-hover"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <Upload className="upload-card-icon" size={48} />
                <div className="upload-card-content">
                  <h3 className="upload-card-title">上传你的狗狗</h3>
                  <p className="upload-card-description">
                    在30秒内创建主页，分享你的狗狗卡片并参与排名。点击继续上传，或点击下方按钮上传。<br />
                    建议：方向照片，清晰面部，自然光线
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingSection;
