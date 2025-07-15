"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const vertices = useMemo(() => {
    const points = [];
    for (let i = 0; i < 2000; i++) {
      points.push(new THREE.Vector3().setFromSphericalCoords(
        1,
        Math.acos(1 - 2 * Math.random()),
        2 * Math.PI * Math.random()
      ));
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial color="hsl(var(--primary))" wireframe />
      </Sphere>
      {vertices.map((vertex, i) => (
        <Sphere key={i} position={vertex} args={[0.01, 8, 8]}>
          <meshBasicMaterial color="hsl(var(--accent))" />
        </Sphere>
      ))}
    </group>
  );
};

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-background -mt-20">
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <Globe />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight tracking-tighter"
            >
              Innovate. Integrate. <br />
              <span className="text-foreground">Elevate.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0"
            >
              We provide cutting-edge IT services that transform your vision into reality, from web development to AI-powered solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button size="lg" asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-primary/50 hover:bg-primary hover:text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/services">View Services</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
