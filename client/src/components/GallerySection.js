import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Crown, Sparkles, Heart, Share2 } from 'lucide-react';
import './GallerySection.css';

const freshSubmissions = [
  {
    id: 1,
    name: 'Snowy',
    breed: 'West Highland White Terrier',
    location: 'Edinburgh, UK',
    score: 96,
    votes: 19520,
    verified: true,
    champion: true,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop&q=80',
    tags: ['白色', '西高地', '冠军']
  },
  {
    id: 2,
    name: 'Biscuit',
    breed: 'Corgi',
    location: 'London, UK',
    score: 89,
    votes: 12110,
    verified: true,
    champion: false,
    image: 'https://images.unsplash.com/photo-1612536021360-a586f7b3e496?w=500&h=500&fit=crop',
    tags: ['柯基', '英国', '新上传']
  },
  {
    id: 3,
    name: 'Nova',
    breed: 'Husky',
    location: 'Vancouver, Canada',
    score: 93,
    votes: 9155,
    verified: true,
    champion: false,
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=500&h=500&fit=crop',
    tags: ['哈士奇', '加拿大', '新秀']
  },
  {
    id: 4,
    name: 'Sunny',
    breed: 'Golden',
    location: 'San Diego, USA',
    score: 86,
    votes: 13490,
    verified: false,
    champion: true,
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500&h=500&fit=crop',
    tags: ['金毛', '美国', '冠军']
  },
  {
    id: 5,
    name: 'Luna',
    breed: 'Poodle',
    location: 'Paris, France',
    score: 88,
    votes: 7220,
    verified: true,
    champion: false,
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&h=500&fit=crop',
    tags: ['贵宾犬', '法国']
  },
  {
    id: 6,
    name: 'Bean',
    breed: 'Mixed',
    location: 'Sydney, Australia',
    score: 90,
    votes: 4051,
    verified: false,
    champion: false,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&h=500&fit=crop',
    tags: ['混血', '澳大利亚', '新秀']
  }
];

function GallerySection() {
  const navigate = useNavigate();

  const handleDogClick = (dogId) => {
    navigate(`/dog/${dogId}`);
  };

  return (
    <div className="gallery-section">
      <div className="container">
        <div className="gallery-header">
          <div className="gallery-badge">
            <Sparkles size={16} />
            相册
          </div>
          <h2>最新上传</h2>
          <p>值得分享的卡片，专为分享设计</p>
          <button className="view-all-btn">
            查看全部
            <span>→</span>
          </button>
        </div>

        <div className="gallery-grid">
          {freshSubmissions.map((dog) => (
            <div 
              key={dog.id} 
              className="gallery-card"
              onClick={() => handleDogClick(dog.id)}
            >
              <div className="gallery-card-image">
                <img src={dog.image} alt={dog.name} />
                <div className="gallery-card-overlay">
                  <button className="icon-btn">
                    <Heart size={20} />
                  </button>
                  <button className="icon-btn">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="gallery-card-content">
                <div className="gallery-card-header">
                  <h3>{dog.name}</h3>
                  <div className="gallery-badges">
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

                <p className="gallery-location">{dog.breed} · {dog.location}</p>

                <div className="gallery-score-section">
                  <div className="score-info">
                    <span className="score-label">分数</span>
                    <span className="score-value">{dog.score}</span>
                  </div>
                  <div className="votes-info">
                    <span className="votes-label">投票</span>
                    <span className="votes-value">{dog.votes.toLocaleString()}</span>
                  </div>
                </div>

                <div className="gallery-tags">
                  {dog.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>

                <button className="rate-btn">
                  点击评分
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GallerySection;

