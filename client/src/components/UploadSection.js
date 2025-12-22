import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon } from 'lucide-react';
import './UploadSection.css';

function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

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
    // 跳转到上传流程页面
    navigate('/upload', { state: { file } });
  };

  return (
    <div className="upload-section">
      <div className="container">
        <div className="upload-content">
          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-icon-wrapper">
              <ImageIcon className="upload-icon" size={64} />
            </div>
            <h3>上传你的狗狗</h3>
            <p>将照片拖拽到此处，或点击下方按钮上传</p>
            <p className="upload-tip">建议：方形照片，清晰面部，自然光线</p>
            
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input" className="btn-primary upload-btn">
              <Upload size={20} />
              选择照片上传
            </label>
            
            <div className="upload-info">
              <p>在30秒内创建主页，分享你的狗狗卡片并攀登排名</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadSection;

