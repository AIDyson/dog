import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './DogProfile.css';

// 模拟狗狗详细数据 - 扩展为多个照片用于滚动
const dogData = {
  1: {
    id: 1,
    name: 'Mochi',
    breed: 'Shiba Inu',
    age: 3,
    location: 'Tokyo, Japan',
    country: 'Japan',
    score: 95.36,
    votes: 18342,
    globalRank: 5,
    localRank: 6,
    momentum: 1.2,
    verified: true,
    champion: true,
    uploadDate: '2024-12-10',
    week: 'Dec 3rd Week, 2025',
    ownerStory: 'Mochi是一只活泼可爱的柴犬，喜欢在公园里玩耍。她的微笑总能给人带来快乐，是我们家最宝贵的家庭成员。每天早上她都会用温柔的叫声唤醒我们，然后期待着一天的冒险。',
    tags: ['活泼', '可爱', '凶悍'],
    // 多张照片用于滚动，每张照片有独立的上传日期、分数、排名、标签、故事
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-10',
        score: 95.36,
        globalRank: 5,
        localRank: 6,
        tags: ['活泼', '可爱', '凶悍'],
        story: 'Mochi是一只活泼可爱的柴犬，喜欢在公园里玩耍。她的微笑总能给人带来快乐，是我们家最宝贵的家庭成员。每天早上她都会用温柔的叫声唤醒我们，然后期待着一天的冒险。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-08',
        score: 93.25,
        globalRank: 7,
        localRank: 8,
        tags: ['活泼', '友善', '聪明'],
        story: '这是Mochi在公园里玩耍时的照片，她总是那么开心，喜欢和其他的狗狗一起玩耍。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1612536021360-a586f7b3e496?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-05',
        score: 91.80,
        globalRank: 10,
        localRank: 12,
        tags: ['可爱', '温柔', '活泼'],
        story: 'Mochi在家里休息的时候，总是喜欢躺在沙发上，看着窗外的风景。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-03',
        score: 89.45,
        globalRank: 15,
        localRank: 18,
        tags: ['活泼', '可爱'],
        story: '这是Mochi在海边玩耍的照片，她第一次看到大海，非常兴奋。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-01',
        score: 87.20,
        globalRank: 20,
        localRank: 25,
        tags: ['可爱', '温柔'],
        story: 'Mochi在雪地里玩耍，她非常喜欢冬天的雪，总是玩得不亦乐乎。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop', 
        uploadDate: '2024-11-28',
        score: 85.60,
        globalRank: 25,
        localRank: 30,
        tags: ['活泼', '友善'],
        story: '这是Mochi在生日派对上拍的照片，她收到了很多礼物，非常开心。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop', 
        uploadDate: '2024-11-25',
        score: 83.90,
        globalRank: 30,
        localRank: 35,
        tags: ['可爱', '活泼'],
        story: 'Mochi在花园里玩耍，她喜欢追逐蝴蝶，总是那么充满活力。'
      },
    ]
  },
  2: {
    id: 2,
    name: 'Bella',
    breed: 'Golden Retriever',
    age: 2,
    location: 'New York, USA',
    country: 'USA',
    score: 92.45,
    votes: 15234,
    globalRank: 8,
    localRank: 3,
    momentum: 0.8,
    verified: true,
    champion: false,
    uploadDate: '2024-12-08',
    week: 'Dec 2nd Week, 2025',
    ownerStory: 'Bella是一只非常友善的金毛，她喜欢和每个人交朋友。每天下午我们都会一起去公园，她总是能吸引很多小朋友的注意。',
    tags: ['友善', '活泼', '聪明'],
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-08',
        score: 92.45,
        globalRank: 8,
        localRank: 3,
        tags: ['友善', '活泼', '聪明'],
        story: 'Bella是一只非常友善的金毛，她喜欢和每个人交朋友。每天下午我们都会一起去公园，她总是能吸引很多小朋友的注意。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1612536021360-a586f7b3e496?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-06',
        score: 90.20,
        globalRank: 12,
        localRank: 5,
        tags: ['友善', '活泼'],
        story: 'Bella在公园里和其他狗狗玩耍，她总是那么友好，从不和其他狗狗发生冲突。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-04',
        score: 88.75,
        globalRank: 15,
        localRank: 8,
        tags: ['聪明', '友善'],
        story: 'Bella学会了新的技能，她非常聪明，总是能很快学会新的指令。'
      },
    ]
  },
  3: {
    id: 3,
    name: 'Max',
    breed: 'German Shepherd',
    age: 4,
    location: 'Berlin, Germany',
    country: 'Germany',
    score: 89.12,
    votes: 12456,
    globalRank: 12,
    localRank: 5,
    momentum: 0.5,
    verified: true,
    champion: false,
    uploadDate: '2024-12-05',
    week: 'Dec 1st Week, 2025',
    ownerStory: 'Max是一只忠诚勇敢的德牧，他是我们家的守护者。虽然看起来很严肃，但实际上非常温柔，特别喜欢和孩子们玩耍。',
    tags: ['忠诚', '勇敢', '温柔'],
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1612536021360-a586f7b3e496?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-05',
        score: 89.12,
        globalRank: 12,
        localRank: 5,
        tags: ['忠诚', '勇敢', '温柔'],
        story: 'Max是一只忠诚勇敢的德牧，他是我们家的守护者。虽然看起来很严肃，但实际上非常温柔，特别喜欢和孩子们玩耍。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-03',
        score: 87.50,
        globalRank: 18,
        localRank: 8,
        tags: ['忠诚', '勇敢'],
        story: 'Max在训练场上表现优异，他非常专注，总是能完美地完成各种训练任务。'
      },
      { 
        url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=600&fit=crop', 
        uploadDate: '2024-12-01',
        score: 85.80,
        globalRank: 22,
        localRank: 12,
        tags: ['温柔', '忠诚'],
        story: 'Max和孩子们在一起玩耍，他总是那么温柔，孩子们都非常喜欢他。'
      },
    ]
  }
};

function DogProfile() {
  const { id } = useParams();
  const dog = dogData[id] || dogData[1];
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // 格式化上传时间为英文简写格式（月日年）
  const formatUploadDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // 处理滚动事件，检测中间的照片
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerHeight = container.clientHeight;
    const containerRect = container.getBoundingClientRect();
    const centerY = containerRect.top + containerHeight / 2;
    
    // 计算每张图片的位置
    const images = container.querySelectorAll('.dog-photo-item');
    let newActiveIndex = 0;
    let minDistance = Infinity;
    
    images.forEach((img, index) => {
      const rect = img.getBoundingClientRect();
      const imgCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(imgCenterY - centerY);
      
      if (distance < minDistance) {
        minDistance = distance;
        newActiveIndex = index;
      }
    });
    
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
    
    // 动态更新每张照片的透明度和缩放
    images.forEach((img, index) => {
      if (index === newActiveIndex) {
        // 中间的照片：完全显示
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
        img.classList.add('active');
      } else {
        // 上下照片：低透明度
        img.style.opacity = '0.2';
        img.style.transform = 'scale(0.85)';
        img.classList.remove('active');
      }
    });
  };

  // 滚动到指定照片
  const scrollToPhoto = (index) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const photosContainer = container.querySelector('.dog-profile-photos');
    const images = container.querySelectorAll('.dog-photo-item');
    
    if (images[index] && photosContainer) {
      const targetImage = images[index];
      const containerHeight = container.clientHeight;
      const containerScrollTop = container.scrollTop;
      
      // 计算目标照片相对于 photosContainer 的位置
      const photosContainerTop = photosContainer.offsetTop;
      const targetImageTop = targetImage.offsetTop;
      const targetImageHeight = targetImage.offsetHeight;
      
      // 计算目标位置：让照片中心对齐容器中心
      const targetScrollTop = photosContainerTop + targetImageTop + (targetImageHeight / 2) - (containerHeight / 2);
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
      
      setActiveIndex(index);
    }
  };

  // 滚轮事件锁定
  const isScrollingRef = useRef(false);
  
  // 处理滚轮事件
  const handleWheel = (e) => {
    if (!scrollContainerRef.current || isScrollingRef.current) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY;
    let newIndex = activeIndex;
    
    if (delta > 0) {
      // 向下滚动：下一张
      newIndex = Math.min(activeIndex + 1, dog.images.length - 1);
    } else {
      // 向上滚动：上一张
      newIndex = Math.max(activeIndex - 1, 0);
    }
    
    if (newIndex !== activeIndex) {
      isScrollingRef.current = true;
      scrollToPhoto(newIndex);
      
      // 滚动完成后解锁
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      container.addEventListener('wheel', handleWheel, { passive: false });
      // 初始计算
      handleScroll();
      // 使用 requestAnimationFrame 优化滚动性能
      let ticking = false;
      const optimizedHandleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      container.addEventListener('scroll', optimizedHandleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('scroll', optimizedHandleScroll);
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [dog.images, activeIndex]);

  const activeDog = dog;
  // 获取当前选中照片的数据
  const currentPhoto = activeDog.images[activeIndex] || activeDog.images[0];
  const photoData = typeof currentPhoto === 'object' && currentPhoto !== null 
    ? currentPhoto 
    : { 
        url: typeof currentPhoto === 'string' ? currentPhoto : currentPhoto?.url || activeDog.images[0]?.url,
        score: activeDog.score,
        globalRank: activeDog.globalRank,
        localRank: activeDog.localRank,
        tags: activeDog.tags,
        story: activeDog.ownerStory
      };

  return (
    <div className="dog-profile-page">
      <Header />
      <div className="dog-profile-fullscreen">
        {/* 左侧大字：用户名 + 'S */}
        <div className="dog-profile-side-text dog-profile-side-text-left">
          {activeDog.name}'S
        </div>
        
        {/* 左侧品种和地区信息 */}
        <div className="dog-profile-breed-location">
          {activeDog.breed} · {activeDog.country}
        </div>
        
        {/* 右侧大字：PROFILE */}
        <div className="dog-profile-side-text dog-profile-side-text-right">
          PROFILE
        </div>
        
        <div className="dog-profile-layout">
          {/* 左侧：上传时间 */}
          <div className="dog-profile-left">
            <div className="dog-profile-date">
              {activeDog.images[activeIndex] && formatUploadDate(
                typeof activeDog.images[activeIndex] === 'string' 
                  ? activeDog.uploadDate 
                  : activeDog.images[activeIndex].uploadDate
              )}
            </div>
          </div>

          {/* 中间：可滚动照片流 */}
          <div className="dog-profile-center">
            <div 
              className="dog-profile-scroll-container"
              ref={scrollContainerRef}
            >
              <div className="dog-profile-photos">
                {activeDog.images.map((imageItem, index) => {
                  const isActive = index === activeIndex;
                  const imageUrl = typeof imageItem === 'string' ? imageItem : imageItem.url;
                  return (
                    <div
                      key={index}
                      className={`dog-photo-item ${isActive ? 'active' : ''}`}
                      onClick={() => isActive && setShowModal(true)}
                      style={{ cursor: isActive ? 'pointer' : 'default' }}
                    >
                      <img
                        src={imageUrl}
                        alt={`${activeDog.name} - Photo ${index + 1}`}
                        className="dog-photo-image"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右侧：分数、排名、标签、故事 */}
          <div className="dog-profile-right">
            <div className="dog-profile-info">
              <div className="dog-profile-score-section">
                <div className="dog-profile-score">
                  <span className="dog-profile-score-number">{(photoData.score || activeDog.score).toFixed(2)}</span>
                  <span className="dog-profile-score-label">/ 100</span>
                </div>
              </div>

              <div className="dog-profile-ranks">
                <div className="dog-profile-rank-item">
                  <span className="dog-profile-rank-label">Global Rank</span>
                  <span className="dog-profile-rank-number">NO.{photoData.globalRank || activeDog.globalRank}</span>
                </div>
                <div className="dog-profile-rank-item">
                  <span className="dog-profile-rank-label">National Rank</span>
                  <span className="dog-profile-rank-number">NO.{photoData.localRank || activeDog.localRank}</span>
                </div>
              </div>

              <div className="dog-profile-tags">
                {(photoData.tags || activeDog.tags).map((tag, index) => (
                  <span key={index} className="dog-profile-tag">{tag}</span>
                ))}
              </div>

              <div className="dog-profile-story">
                <p className="dog-profile-story-text">{photoData.story || activeDog.ownerStory}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部弹窗 */}
      {showModal && (
        <div className="dog-profile-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="dog-profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dog-profile-modal-content">
              <button 
                className="dog-profile-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="关闭"
              >
                ×
              </button>
              <div className="dog-profile-modal-body">
                <h3 className="dog-profile-modal-title">{activeDog.name}'S Photo</h3>
                <p className="dog-profile-modal-text">照片详情内容</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DogProfile;
