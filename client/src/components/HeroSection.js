import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, TrendingUp, Globe, Share2, Heart, Shield, Crown, Star } from 'lucide-react';
import './HeroSection.css';

// 全球No.1狗狗数据
const topDog = {
  id: 1,
  name: 'Mochi',
  age: 3,
  breed: 'Shiba Inu',
  location: 'Tokyo, Japan',
  country: 'Japan',
  score: 95.82,
  verified: true,
  champion: true,
  image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=800&fit=crop',
  ownerStory: 'Mochi是一只活泼可爱的柴犬，喜欢在公园里玩耍。她的微笑总能给人带来快乐，是我们家最宝贵的家庭成员。',
  tags: ['圣诞装扮', '射手座'] // 后续根据AI识别和生日生成
};

function HeroSection() {
  const navigate = useNavigate();

  const handleViewRankings = () => {
    navigate('/ranking/global');
  };

  const handleStartRating = () => {
    navigate('/upload');
  };

  const handleRateNow = () => {
    // 评分功能
    alert('开始评分');
  };

  const handleShare = () => {
    alert('分享功能');
  };

  const handleLike = () => {
    alert('点赞功能');
  };

  return (
    <div className="hero-section-new">
      <div className="container">
        <div className="hero-badge-top">
          <Trophy size={16} />
          每周热门 • 实时更新
        </div>

        <div className="hero-content-grid">
          {/* 左侧：介绍区 */}
          <div className="hero-left">
            <h1 className="hero-main-title">
              评分. 排名.<br />
              <span className="hero-highlight">分享最可爱的狗狗.</span>
            </h1>
            
            <p className="hero-description">
              全球排行榜，社区评分狗狗颜值，透明信号——评分、投票和动量
            </p>

            <div className="hero-actions">
              <button className="btn-primary hero-btn" onClick={handleStartRating}>
                <Star size={20} />
                开始评分
              </button>
              <button className="btn-secondary hero-btn" onClick={handleViewRankings}>
                <TrendingUp size={20} />
                查看排名
              </button>
            </div>

            {/* KPI统计网格 */}
            <div className="hero-stats">
              <div className="hero-stat-card">
                <div className="stat-content-hero">
                  <p>Dogs ranked</p>
                  <h3>128,440</h3>
                  <span className="stat-sub-hero">Across all breeds</span>
                </div>
                <div className="stat-icon-wrapper">
                  <Trophy className="stat-icon-hero" />
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="stat-content-hero">
                  <p>Ratings</p>
                  <h3>4.9M</h3>
                  <span className="stat-sub-hero">Verified anti-spam</span>
                </div>
                <div className="stat-icon-wrapper">
                  <Star className="stat-icon-hero" />
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="stat-content-hero">
                  <p>Countries</p>
                  <h3>68</h3>
                  <span className="stat-sub-hero">Global community</span>
                </div>
                <div className="stat-icon-wrapper">
                  <Globe className="stat-icon-hero" />
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：No.1展示卡片 */}
          <div className="hero-right">
            <div className="top-dog-card">
              {/* 狗狗图片 */}
              <div className="top-dog-image-wrapper">
                <img src={topDog.image} alt={topDog.name} className="top-dog-image" />
              </div>

              {/* 顶部徽章和操作按钮 */}
              <div className="top-dog-header">
                <div className="weekly-badge">
                  <Crown size={14} />
                  Weekly No.1
                </div>
                <div className="top-dog-actions">
                  <button className="icon-action-btn" onClick={handleShare}>
                    <Share2 size={20} />
                  </button>
                  <button className="icon-action-btn" onClick={handleLike}>
                    <Heart size={20} />
                  </button>
                </div>
              </div>
                
              {/* 左上角信息区域 - 直接显示文字，无容器 */}
              <div className="dog-top-info-text">
                <div className="dog-name-age-row">
                  <h2 className="dog-name">{topDog.name}</h2>
                  <span className="dog-age">{topDog.age} 岁</span>
                </div>
                <div className="dog-breed-country-row">
                  <span className="breed-value">{topDog.breed}</span>
                  <span className="separator">•</span>
                  <span className="country-value">{topDog.country}</span>
                </div>
                <div className="dog-tags-row">
                  {topDog.tags && topDog.tags.map((tag, index) => (
                    <span key={index} className="dog-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* 中间区域 - 分数和投票 */}
              <div className="dog-middle-info">
                <div className="score-votes-section">
                  <div className="community-score-area">
                    <span className="score-label">分数</span>
                    <div className="score-display">
                      <span className="score-value">{topDog.score.toFixed(2)}</span>
                      <span className="score-unit">分</span>
                    </div>
                  </div>
                  <div className="votes-area">
                    <span className="votes-label">Votes</span>
                    <span className="votes-number">18,342</span>
                  </div>
                </div>
              </div>

              {/* 底部区域 - 主人故事 */}
              <div className="dog-bottom-info">
                <div className="dog-story">
                  <h4 className="story-title">主人的话</h4>
                  <p className="story-text">{topDog.ownerStory}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
