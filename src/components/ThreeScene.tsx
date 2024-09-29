"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { BufferAttribute } from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    let mouseX = 0;
    let mouseY = 0;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure high DPI rendering
    renderer.setClearColor(0x000000, 0); // Transparent background

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Particle system variables
    const SEPARATION = 80;
    const AMOUNTX = 100;
    const AMOUNTY = 100;

    let particles = new THREE.BufferGeometry();
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3); // Store positions
    const scales = new Float32Array(numParticles); // Store scales

    let i = 0,
      j = 0;

    // Set the initial position and scale of each particle
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (SEPARATION * AMOUNTX) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - (SEPARATION * AMOUNTY) / 2; // z

        scales[j] = 1;

        i += 3;
        j++;
      }
    }

    particles.setAttribute("position", new BufferAttribute(positions, 3));
    particles.setAttribute("scale", new BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x00ffff) }, // Cyan-colored particles
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (300.0 / -mvPosition.z); // Dynamic scaling based on distance
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard; // Circle-shaped particles
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    // Lighting for enhanced visual effect
    const light = new THREE.PointLight(0xffffff, 2, 1000);
    light.position.set(0, 500, 500);
    scene.add(light);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Animate the particles with a ripple effect
    let count = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const positions = particles.attributes.position.array as Float32Array;
      const scales = particles.attributes.scale.array as Float32Array;

      let i = 0,
        j = 0;

      // Apply a wave effect to the particle positions
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + count) * 0.3) * 100 +
            Math.sin((iy + count) * 0.5) * 100;

          scales[j] =
            (Math.sin((ix + count) * 0.3) + 1) * 10 +
            (Math.sin((iy + count) * 0.5) + 1) * 10;

          i += 3;
          j++;
        }
      }

      particles.attributes.position.needsUpdate = true;
      particles.attributes.scale.needsUpdate = true;

      // Camera follows the mouse
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Render the scene
      renderer.render(scene, camera);

      count += 0.05; // Slower wave movement for a smooth effect
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={mountRef} className="three-container"></div>;
}
