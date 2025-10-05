import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Home() {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'),
      bumpMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'),
      bumpScale: 0.05,
      specularMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'),
      specular: new THREE.Color('grey')
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create background planets
    const planets = [];
    const planetConfigs = [
      { size: 0.4, distance: 8, speed: 0.001, color: 0xff6b6b, x: -3, y: 2 },
      { size: 0.6, distance: 10, speed: 0.0008, color: 0xffd93d, x: 4, y: -2 },
      { size: 0.3, distance: 12, speed: 0.0012, color: 0x6bcf7f, x: -5, y: -3 },
      { size: 0.5, distance: 9, speed: 0.0009, color: 0x4d96ff, x: 3, y: 3 }
    ];

    planetConfigs.forEach(config => {
      const planetGeometry = new THREE.SphereGeometry(config.size, 32, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({ 
        color: config.color,
        emissive: config.color,
        emissiveIntensity: 0.2
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.set(config.x, config.y, -config.distance);
      planet.userData = { ...config, angle: Math.random() * Math.PI * 2 };
      scene.add(planet);
      planets.push(planet);
    });

    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Custom mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity.x = deltaY * 0.005;
      rotationVelocity.y = deltaX * 0.005;

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.01;
      camera.position.z = Math.max(3, Math.min(10, camera.position.z));
    };

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;

      rotationVelocity.x = deltaY * 0.005;
      rotationVelocity.y = deltaX * 0.005;

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });
    renderer.domElement.addEventListener('touchstart', handleTouchStart);
    renderer.domElement.addEventListener('touchmove', handleTouchMove);
    renderer.domElement.addEventListener('touchend', handleTouchEnd);

    setIsLoading(false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply rotation velocity to Earth
      earth.rotation.x += rotationVelocity.x;
      earth.rotation.y += rotationVelocity.y;

      // Add damping to rotation
      rotationVelocity.x *= 0.95;
      rotationVelocity.y *= 0.95;

      // Continuous slow rotation when not dragging
      if (!isDragging) {
        earth.rotation.y += 0.001;
      }

      // Animate background planets
      planets.forEach(planet => {
        planet.userData.angle += planet.userData.speed;
        planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance * 0.5;
        planet.position.z = -planet.userData.distance + Math.sin(planet.userData.angle) * 2;
        planet.rotation.y += 0.005;
      });

      // Slowly rotate stars
      stars.rotation.y += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.domElement.removeEventListener('touchmove', handleTouchMove);
      renderer.domElement.removeEventListener('touchend', handleTouchEnd);
      
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      earthGeometry.dispose();
      earthMaterial.dispose();
      planets.forEach(planet => {
        planet.geometry.dispose();
        planet.material.dispose();
      });
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1d3a] to-[#0a0e27]">
      <div ref={mountRef} className="w-full h-full" />
      
      {isLoading && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center bg-[#0a0e27]"
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg font-light">Loading Earth View...</p>
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
      >
        <h1 className="text-5xl md:text-7xl font-thin text-white mb-4 tracking-wider">
          EARTH FROM SPACE
        </h1>
        <p className="text-lg md:text-xl text-cyan-400 font-light tracking-wide">
          Interactive View • NASA Cupola Observatory
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-white/60 text-sm">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>Drag to rotate • Scroll to zoom</span>
        </div>
      </motion.div>
    </div>
  );
}