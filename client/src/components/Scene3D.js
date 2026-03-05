import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

const AnimatedSphere = ({ color, position, size = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

const Scene3D = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        {isDark && <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />}
        
        <AnimatedSphere
          color={isDark ? '#1C82AD' : '#ffc8dd'}
          position={[-3, 1, -2]}
          size={1.2}
        />
        <AnimatedSphere
          color={isDark ? '#03C988' : '#a2d2ff'}
          position={[3, -1, -3]}
          size={0.8}
        />
        <AnimatedSphere
          color={isDark ? '#13005A' : '#cdb4db'}
          position={[0, 2, -4]}
          size={0.6}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
