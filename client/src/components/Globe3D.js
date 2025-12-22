import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { Globe as GlobeIcon } from 'lucide-react';
import * as THREE from 'three';
import './Globe3D.css';

const countries = [
  { name: '美国', code: 'USA', position: [-100, 40, 0], dogs: 15420 },
  { name: '日本', code: 'Japan', position: [139, 35, 0], dogs: 12340 },
  { name: '英国', code: 'UK', position: [0, 51, 0], dogs: 9870 },
  { name: '加拿大', code: 'Canada', position: [-106, 56, 0], dogs: 8560 },
  { name: '澳大利亚', code: 'Australia', position: [133, -27, 0], dogs: 7890 },
  { name: '德国', code: 'Germany', position: [10, 51, 0], dogs: 6750 },
  { name: '法国', code: 'France', position: [2, 46, 0], dogs: 6230 },
  { name: '意大利', code: 'Italy', position: [12, 42, 0], dogs: 5840 },
  { name: '西班牙', code: 'Spain', position: [-4, 40, 0], dogs: 5120 },
  { name: '荷兰', code: 'Netherlands', position: [5, 52, 0], dogs: 4560 },
  { name: '瑞典', code: 'Sweden', position: [18, 62, 0], dogs: 3890 },
  { name: '韩国', code: 'Korea', position: [127, 37, 0], dogs: 8970 },
  { name: '中国', code: 'China', position: [104, 35, 0], dogs: 11230 },
  { name: '巴西', code: 'Brazil', position: [-47, -14, 0], dogs: 7450 },
  { name: '墨西哥', code: 'Mexico', position: [-102, 23, 0], dogs: 4320 },
  { name: '阿根廷', code: 'Argentina', position: [-63, -38, 0], dogs: 3210 },
  { name: '新西兰', code: 'NewZealand', position: [174, -40, 0], dogs: 2890 },
  { name: '南非', code: 'SouthAfrica', position: [24, -29, 0], dogs: 2450 },
  { name: '印度', code: 'India', position: [78, 20, 0], dogs: 5670 },
  { name: '泰国', code: 'Thailand', position: [100, 15, 0], dogs: 4120 },
];

function CountryMarker({ position, name, code, dogs, onClick, isHovered, onHover }) {
  const meshRef = useRef();
  
  const latLonToVector3 = (lat, lon, radius = 2.5) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return new THREE.Vector3(x, y, z);
  };

  const pos = latLonToVector3(position[1], position[0]);

  return (
    <group position={pos}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(code);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(code);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[isHovered ? 0.08 : 0.05, 16, 16]} />
        <meshBasicMaterial 
          color={isHovered ? '#ffed4e' : '#ffd700'} 
          toneMapped={false}
        />
      </mesh>
      {isHovered && (
        <sprite scale={[1.5, 0.5, 1]} position={[0, 0.3, 0]}>
          <spriteMaterial 
            color="#000000" 
            opacity={0.8}
            toneMapped={false}
          />
        </sprite>
      )}
    </group>
  );
}

// 创建梦幻渐变纹理（只创建一次）
const createGradientTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  // 创建水平渐变 - 模拟地球的海洋和陆地
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, '#1e3a8a'); // 深蓝
  gradient.addColorStop(0.2, '#3b82f6'); // 蓝色
  gradient.addColorStop(0.4, '#60a5fa'); // 浅蓝
  gradient.addColorStop(0.5, '#4a90e2'); // 中蓝
  gradient.addColorStop(0.6, '#7b68ee'); // 紫色
  gradient.addColorStop(0.8, '#8b5cf6'); // 淡紫
  gradient.addColorStop(1, '#6366f1'); // 靛蓝
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 添加一些随机光点模拟星星
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};

const gradientTexture = createGradientTexture();

function GlobeModel({ onCountryClick, hoveredCountry, onCountryHover }) {
  const globeRef = useRef();
  const innerGlobeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y -= 0.0005;
    }
  });

  return (
    <group ref={globeRef}>
      {/* 外层发光球体 */}
      <Sphere args={[2.55, 64, 64]}>
        <meshBasicMaterial
          color="#4a90e2"
          opacity={0.2}
          transparent={true}
        />
      </Sphere>
      
      {/* 主球体 - 梦幻渐变 */}
      <Sphere ref={innerGlobeRef} args={[2.5, 64, 64]}>
        <meshPhongMaterial
          map={gradientTexture}
          emissive="#2a4a7a"
          emissiveIntensity={0.3}
          shininess={100}
          transparent={false}
        />
      </Sphere>
      
      {/* 内层光晕 */}
      <Sphere args={[2.45, 64, 64]}>
        <meshBasicMaterial
          color="#6a8fd4"
          opacity={0.15}
          transparent={true}
        />
      </Sphere>
      
      {countries.map((country) => (
        <CountryMarker
          key={country.code}
          position={country.position}
          name={country.name}
          code={country.code}
          dogs={country.dogs}
          onClick={onCountryClick}
          isHovered={hoveredCountry === country.code}
          onHover={onCountryHover}
        />
      ))}
    </group>
  );
}

function Globe3D() {
  const navigate = useNavigate();
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const handleCountryClick = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  const hoveredCountryData = countries.find(c => c.code === hoveredCountry);

  return (
    <div className="globe-section">
      <div className="container">
        <div className="globe-header">
          <div className="globe-badge">
            <GlobeIcon size={16} />
            全球狗狗社区
          </div>
          <h2>来自世界各地的<span className="highlight">狗狗</span></h2>
          <p>探索来自全球爱狗人士的投稿</p>
        </div>

        <div className="globe-container">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} color="#6a8fd4" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#9370db" />
            <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
            <GlobeModel 
              onCountryClick={handleCountryClick}
              hoveredCountry={hoveredCountry}
              onCountryHover={setHoveredCountry}
            />
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={5}
              maxDistance={12}
              autoRotate={false}
            />
          </Canvas>

          {hoveredCountryData && (
            <div className="country-tooltip">
              <h4>{hoveredCountryData.name}</h4>
              <p>{hoveredCountryData.dogs.toLocaleString()} 只狗狗</p>
            </div>
          )}
        </div>

        <div className="globe-info">
          <p>点击任意国家查看该国排名</p>
        </div>
      </div>
    </div>
  );
}

export default Globe3D;

