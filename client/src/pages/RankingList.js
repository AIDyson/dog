import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Trophy, MapPin, Shield, Crown, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import './RankingList.css';

// 扩展的模拟数据
const generateDogs = (count, type) => {
  const breeds = ['Shiba', 'Corgi', 'Husky', 'Golden', 'Poodle', 'Beagle', 'Bulldog', 'Dachshund'];
  const locations = ['Tokyo', 'London', 'Paris', 'New York', 'Sydney', 'Berlin', 'Toronto', 'Seoul'];
  const countries = ['Japan', 'UK', 'France', 'USA', 'Australia', 'Germany', 'Canada', 'Korea'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Dog ${i + 1}`,
    breed: breeds[i % breeds.length],
    location: `${locations[i % locations.length]}, ${countries[i % countries.length]}`,
    country: countries[i % countries.length],
    score: 95 - Math.floor(i / 2),
    votes: 18000 - i * 500,
    momentum: (1.2 - i * 0.1).toFixed(1),
    verified: i % 3 === 0,
    champion: i % 10 === 0,
    globalRank: i + 1,
    localRank: Math.floor(i / 3) + 1,
    image: `https://images.unsplash.com/photo-${1580000000000 + i * 1000000}?w=300&h=300&fit=crop`
  }));
};

function RankingList() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(type || 'weekly');
  
  const dogs = generateDogs(50, activeTab);

  const getTitle = () => {
    switch (activeTab) {
      case 'weekly': return '本周热门排名';
      case 'global': return '全球排名';
      case 'local': return '本国排名 - 日本';
      default: return '排名列表';
    }
  };

  const handleDogClick = (dogId) => {
    navigate(`/dog/${dogId}`);
  };

  return (
    <div className="ranking-list-page">
      <Header />
      
      <div className="ranking-list-container">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            返回首页
          </button>

          <div className="ranking-list-header">
            <div>
              <h1>{getTitle()}</h1>
              <p>公平排名，基于评分质量、投票信心和最近动量</p>
            </div>

            <div className="ranking-tabs-horizontal">
              <button 
                className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
                onClick={() => setActiveTab('weekly')}
              >
                <Sparkles size={18} />
                本周热门
              </button>
              <button 
                className={`tab ${activeTab === 'global' ? 'active' : ''}`}
                onClick={() => setActiveTab('global')}
              >
                <Trophy size={18} />
                全球排名
              </button>
              <button 
                className={`tab ${activeTab === 'local' ? 'active' : ''}`}
                onClick={() => setActiveTab('local')}
              >
                <MapPin size={18} />
                本国排名
              </button>
            </div>
          </div>

          <div className="ranking-list-content">
            <div className="ranking-list-info">
              <p>显示 {dogs.length} 只狗狗</p>
            </div>

            <div className="ranking-items">
              {dogs.map((dog, index) => (
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
                    <div className="ranking-item-header">
                      <h3>
                        {dog.name}
                        {index === 0 && <Crown className="rank-crown rank-crown-gold" size={18} />}
                        {index === 1 && <Crown className="rank-crown rank-crown-silver" size={18} />}
                        {index === 2 && <Crown className="rank-crown rank-crown-bronze" size={18} />}
                      </h3>
                      <div className="ranking-item-badges">
                        {dog.verified && (
                          <span className="badge badge-verified">
                            <Shield size={10} />
                            已认证
                          </span>
                        )}
                        {dog.champion && (
                          <span className="badge badge-champion">
                            <Crown size={10} />
                            冠军
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="ranking-item-location">{dog.breed} · {dog.location}</p>
                  </div>

                  <div className="ranking-item-stats">
                    <div className="stat-item">
                      <span className="stat-value">{dog.score}</span>
                      <span className="stat-label">分数</span>
                    </div>
                    <div className="stat-item">
                      <span className={`stat-value ${parseFloat(dog.momentum) > 0 ? 'positive' : 'negative'}`}>
                        {parseFloat(dog.momentum) > 0 ? '+' : ''}{dog.momentum}
                      </span>
                      <span className="stat-label">动量</span>
                    </div>
                  </div>

                  <div className="ranking-item-ranks">
                    {activeTab === 'weekly' && (
                      <>
                        <span className="rank-tag">本国NO.{dog.localRank}</span>
                        <span className="rank-tag">全球NO.{dog.globalRank}</span>
                      </>
                    )}
                    {activeTab === 'local' && (
                      <span className="rank-tag">全球NO.{dog.globalRank}</span>
                    )}
                    {activeTab === 'global' && (
                      <span className="rank-tag">{dog.country}NO.{dog.localRank}</span>
                    )}
                  </div>

                  <button className="ranking-item-action">
                    查看详情
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingList;

