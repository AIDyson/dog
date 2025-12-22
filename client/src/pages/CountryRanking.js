import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Shield, Crown } from 'lucide-react';
import Header from '../components/Header';
import './CountryRanking.css';

const countryNames = {
  USA: '美国',
  Japan: '日本',
  UK: '英国',
  Canada: '加拿大',
  Australia: '澳大利亚',
  Germany: '德国',
  France: '法国',
  Italy: '意大利',
  Spain: '西班牙',
  Korea: '韩国',
  China: '中国'
};

const generateCountryDogs = (country, count) => {
  const breeds = ['Shiba', 'Corgi', 'Husky', 'Golden', 'Poodle', 'Beagle', 'Bulldog', 'Dachshund'];
  const cities = {
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'],
    UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
  };
  
  const countryCities = cities[country] || ['City A', 'City B', 'City C'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${country} Dog ${i + 1}`,
    breed: breeds[i % breeds.length],
    location: `${countryCities[i % countryCities.length]}, ${countryNames[country] || country}`,
    country: country,
    score: 95 - i,
    votes: 15000 - i * 400,
    localRank: i + 1,
    globalRank: (i + 1) * 2,
    momentum: (1.0 - i * 0.08).toFixed(1),
    verified: i % 3 === 0,
    champion: i % 8 === 0,
    image: `https://images.unsplash.com/photo-${1580000000000 + i * 1000000}?w=300&h=300&fit=crop`
  }));
};

function CountryRanking() {
  const { country } = useParams();
  const navigate = useNavigate();
  const dogs = generateCountryDogs(country, 30);
  const countryName = countryNames[country] || country;

  const handleDogClick = (dogId) => {
    navigate(`/dog/${dogId}`);
  };

  return (
    <div className="country-ranking-page">
      <Header />
      
      <div className="country-ranking-container">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            返回首页
          </button>

          <div className="country-ranking-header">
            <div className="country-flag">
              <MapPin size={48} />
            </div>
            <div>
              <h1>{countryName} 排名</h1>
              <p>发现来自{countryName}的可爱狗狗</p>
            </div>
          </div>

          <div className="country-stats">
            <div className="country-stat-card">
              <span className="stat-value">{dogs.length}</span>
              <span className="stat-label">已评分狗狗</span>
            </div>
            <div className="country-stat-card">
              <span className="stat-value">{dogs.reduce((acc, dog) => acc + dog.votes, 0).toLocaleString()}</span>
              <span className="stat-label">总投票数</span>
            </div>
            <div className="country-stat-card">
              <span className="stat-value">{Math.round(dogs.reduce((acc, dog) => acc + dog.score, 0) / dogs.length)}</span>
              <span className="stat-label">平均评分</span>
            </div>
          </div>

          <div className="country-ranking-list">
            {dogs.map((dog, index) => (
              <div 
                key={dog.id} 
                className="country-ranking-item"
                onClick={() => handleDogClick(dog.id)}
              >
                <div className="ranking-item-rank">
                  <span className="rank-number">#{index + 1}</span>
                  <span className="rank-label">本国</span>
                </div>

                <div className="ranking-item-image">
                  <img src={dog.image} alt={dog.name} />
                </div>

                <div className="ranking-item-info">
                  <div className="ranking-item-header">
                    <h3>{dog.name}</h3>
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
                    <span className="stat-value">{dog.votes.toLocaleString()}</span>
                    <span className="stat-label">投票</span>
                  </div>
                  <div className="stat-item">
                    <span className={`stat-value ${parseFloat(dog.momentum) > 0 ? 'positive' : 'negative'}`}>
                      {parseFloat(dog.momentum) > 0 ? '+' : ''}{dog.momentum}
                    </span>
                    <span className="stat-label">动量</span>
                  </div>
                </div>

                <div className="ranking-item-global">
                  <span className="global-rank-label">全球排名</span>
                  <span className="global-rank-value">#{dog.globalRank}</span>
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
  );
}

export default CountryRanking;

