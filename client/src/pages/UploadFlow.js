import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, DollarSign, Check, Share2 } from 'lucide-react';
import Header from '../components/Header';
import './UploadFlow.css';

function UploadFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1); // 1: 上传, 2: 付费, 3: 信息填写, 4: 评分结果
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dogInfo, setDogInfo] = useState({
    name: '',
    age: '',
    story: ''
  });
  const [scoreResult, setScoreResult] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setStep(2); // 进入付费步骤
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePayment = () => {
    // 模拟支付
    setTimeout(() => {
      setStep(3); // 进入信息填写
    }, 1000);
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    // 生成随机评分
    const randomScore = Math.floor(Math.random() * (98 - 75) + 75);
    const randomGlobalRank = Math.floor(Math.random() * 1000) + 1;
    const randomLocalRank = Math.floor(Math.random() * 100) + 1;
    
    setScoreResult({
      score: randomScore,
      globalRank: randomGlobalRank,
      localRank: randomLocalRank,
      votes: 0,
      momentum: 0
    });
    
    setStep(4); // 显示评分结果
  };

  const handleShare = () => {
    alert('分享功能');
  };

  return (
    <div className="upload-flow-page">
      <Header />
      
      <div className="upload-flow-container">
        <div className="container-small">
          <button className="back-btn" onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}>
            <ArrowLeft size={20} />
            {step === 1 ? '返回首页' : '上一步'}
          </button>

          {/* 步骤 1: 上传照片 */}
          {step === 1 && (
            <div className="upload-flow-step">
              <div className="step-header">
                <h1>上传你的狗狗</h1>
                <p>开始你的排名之旅</p>
              </div>

              <div className="upload-dropzone">
                <Upload className="upload-icon" size={64} />
                <h3>选择照片上传</h3>
                <p>建议：方形照片，清晰面部，自然光线</p>
                
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="btn-primary">
                  选择照片
                </label>
              </div>
            </div>
          )}

          {/* 步骤 2: 付费 */}
          {step === 2 && uploadedImage && (
            <div className="upload-flow-step">
              <div className="step-header">
                <h1>解锁评分功能</h1>
                <p>单次上传 - 单周有效</p>
              </div>

              <div className="payment-section">
                <div className="preview-image">
                  <img src={uploadedImage} alt="Preview" />
                </div>

                <div className="payment-card">
                  <div className="payment-header">
                    <DollarSign className="payment-icon" />
                    <div>
                      <h3>标准评分</h3>
                      <p>解锁评分并参与排名</p>
                    </div>
                  </div>

                  <div className="payment-price">
                    <span className="price">$1.90</span>
                    <span className="period">/ 单次上传</span>
                  </div>

                  <ul className="payment-features">
                    <li><Check size={16} /> 获得颜值评分</li>
                    <li><Check size={16} /> 参与全球排名</li>
                    <li><Check size={16} /> 公开展示主页</li>
                    <li><Check size={16} /> 分享至社交媒体</li>
                  </ul>

                  <button className="btn-primary btn-large" onClick={handlePayment}>
                    支付 $1.90
                  </button>

                  <p className="payment-note">安全支付 · 7天内可申请退款</p>
                </div>
              </div>
            </div>
          )}

          {/* 步骤 3: 填写信息 */}
          {step === 3 && (
            <div className="upload-flow-step">
              <div className="step-header">
                <h1>填写狗狗信息</h1>
                <p>让大家更了解你的狗狗</p>
              </div>

              <form onSubmit={handleSubmitInfo} className="dog-info-form">
                <div className="form-preview">
                  <img src={uploadedImage} alt="Preview" />
                </div>

                <div className="form-group">
                  <label>狗狗名称 *</label>
                  <input
                    type="text"
                    value={dogInfo.name}
                    onChange={(e) => setDogInfo({...dogInfo, name: e.target.value})}
                    placeholder="输入狗狗的名字"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>年龄 *</label>
                  <input
                    type="number"
                    value={dogInfo.age}
                    onChange={(e) => setDogInfo({...dogInfo, age: e.target.value})}
                    placeholder="输入年龄（岁）"
                    required
                    min="0"
                    max="30"
                  />
                </div>

                <div className="form-group">
                  <label>主人的话 *</label>
                  <textarea
                    value={dogInfo.story}
                    onChange={(e) => setDogInfo({...dogInfo, story: e.target.value})}
                    placeholder="分享你和狗狗的故事..."
                    rows="5"
                    required
                  />
                  <span className="form-hint">{dogInfo.story.length} / 500 字</span>
                </div>

                <button type="submit" className="btn-primary btn-large">
                  获取评分
                </button>
              </form>
            </div>
          )}

          {/* 步骤 4: 评分结果 */}
          {step === 4 && scoreResult && (
            <div className="upload-flow-step">
              <div className="step-header">
                <h1>评分结果</h1>
                <p>恭喜！你的狗狗已加入排名</p>
              </div>

              <div className="result-section">
                <div className="result-image">
                  <img src={uploadedImage} alt={dogInfo.name} />
                </div>

                <div className="result-card">
                  <h2>{dogInfo.name}</h2>
                  
                  <div className="result-score">
                    <span className="score-number">{scoreResult.score}</span>
                    <span className="score-label">颜值评分</span>
                  </div>

                  <div className="result-stats">
                    <div className="result-stat">
                      <span className="stat-label">全球排名</span>
                      <span className="stat-value">#{scoreResult.globalRank}</span>
                    </div>
                    <div className="result-stat">
                      <span className="stat-label">本国排名</span>
                      <span className="stat-value">#{scoreResult.localRank}</span>
                    </div>
                  </div>

                  <div className="result-message">
                    <p>🎉 你的狗狗已成功加入排名！现在可以分享给朋友们了。</p>
                  </div>

                  <div className="result-actions">
                    <button className="btn-primary" onClick={handleShare}>
                      <Share2 size={20} />
                      分享海报
                    </button>
                    <button className="btn-secondary" onClick={() => navigate(`/dog/${scoreResult.globalRank}`)}>
                      查看主页
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadFlow;

