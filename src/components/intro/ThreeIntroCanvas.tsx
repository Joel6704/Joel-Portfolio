import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeIntroCanvasProps {
  isTransitioning?: boolean;
}

export const ThreeIntroCanvas: React.FC<ThreeIntroCanvasProps> = ({
  isTransitioning = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.045);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Fallback if WebGL fails
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig (Deep Navy, Electric Blue, Cobalt, Purple)
    const ambientLight = new THREE.AmbientLight(0x08102a, 1.4);
    scene.add(ambientLight);

    // Cyan Key Light
    const cyanLight = new THREE.PointLight(0x00e5ff, 6.0, 30);
    cyanLight.position.set(-6, 3.5, 4);
    scene.add(cyanLight);

    // Vibrant Purple Fill Light
    const purpleLight = new THREE.PointLight(0x9333ea, 5.5, 30);
    purpleLight.position.set(6, -3, 3);
    scene.add(purpleLight);

    // Deep Cobalt Rim Light
    const cobaltLight = new THREE.PointLight(0x0066ff, 4.0, 25);
    cobaltLight.position.set(0, 6, -4);
    scene.add(cobaltLight);

    // Interactive Mouse Cursor 3D Spotlight
    const cursorLight = new THREE.PointLight(0x00e5ff, 3.5, 18);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 3. Materials
    // Metallic Ring Material (Dark Navy with Electric Blue Emissive)
    const metallicRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1638,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x002266,
      emissiveIntensity: 0.35,
    });

    // Glass-like Translucent Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a1435,
      emissive: 0x001133,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 1.6,
      transparent: true,
      opacity: 0.85,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Wireframe Glow Material
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.45,
    });

    const purpleWireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4,
    });

    // 4. Nested Metallic Orbital Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.035, 24, 100), metallicRingMaterial);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    ringGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.045, 24, 100), metallicRingMaterial);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.y = Math.PI * 0.45;
    ringGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.03, 24, 100), metallicRingMaterial);
    ring3.rotation.x = Math.PI * 0.55;
    ring3.rotation.z = Math.PI * 0.2;
    ringGroup.add(ring3);

    // 5. Layered Floating Dimensional Objects
    interface FloatingItem {
      mesh: THREE.Object3D;
      baseX: number;
      baseY: number;
      baseZ: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      floatSpeed: number;
      floatAmp: number;
      phase: number;
    }

    const floatingItems: FloatingItem[] = [];

    // Helper to add floating objects with dimensional lighting
    const addFloatingObject = (
      mesh: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      rotSpeed: { x: number; y: number; z: number },
      floatAmp = 0.3,
      floatSpeed = 0.8
    ) => {
      mesh.position.set(x, y, z);
      scene.add(mesh);
      floatingItems.push({
        mesh,
        baseX: x,
        baseY: y,
        baseZ: z,
        speedX: rotSpeed.x,
        speedY: rotSpeed.y,
        speedZ: rotSpeed.z,
        floatSpeed,
        floatAmp,
        phase: Math.random() * Math.PI * 2,
      });
    };

    // A. Foreground Glass Sphere (Closer to camera, creates deep cinematic parallax)
    const fgSphere = new THREE.Mesh(new THREE.SphereGeometry(0.75, 48, 48), glassMaterial);
    addFloatingObject(fgSphere, -4.5, -2.2, 3.2, { x: 0.003, y: 0.005, z: 0.002 }, 0.25, 0.7);

    // B. Midground Glass Sphere (Right side framing)
    const mgSphereRight = new THREE.Mesh(new THREE.SphereGeometry(0.9, 48, 48), glassMaterial);
    addFloatingObject(mgSphereRight, 4.8, 1.8, 0.5, { x: 0.004, y: 0.003, z: 0.002 }, 0.3, 0.6);

    // C. Top-Left Midground Sphere
    const mgSphereLeft = new THREE.Mesh(new THREE.SphereGeometry(0.6, 36, 36), glassMaterial);
    addFloatingObject(mgSphereLeft, -3.8, 2.8, -1.2, { x: 0.005, y: 0.004, z: 0.003 }, 0.2, 0.9);

    // D. Floating Icosahedron with Glowing Inner Wireframe
    const icosaGroup = new THREE.Group();
    const icosaGeom = new THREE.IcosahedronGeometry(0.85, 0);
    const icosaMesh = new THREE.Mesh(icosaGeom, glassMaterial);
    const icosaWire = new THREE.LineSegments(new THREE.WireframeGeometry(icosaGeom), wireframeMaterial);
    icosaGroup.add(icosaMesh);
    icosaGroup.add(icosaWire);
    addFloatingObject(icosaGroup, 3.8, -2.4, -0.8, { x: 0.007, y: 0.009, z: 0.004 }, 0.35, 0.75);

    // E. Floating Octahedron Crystal (Left Center)
    const octaGroup = new THREE.Group();
    const octaGeom = new THREE.OctahedronGeometry(0.7, 0);
    const octaMesh = new THREE.Mesh(octaGeom, glassMaterial);
    const octaWire = new THREE.LineSegments(new THREE.WireframeGeometry(octaGeom), purpleWireframeMaterial);
    octaGroup.add(octaMesh);
    octaGroup.add(octaWire);
    addFloatingObject(octaGroup, -4.2, 0.4, -2.0, { x: 0.008, y: 0.006, z: 0.005 }, 0.28, 0.85);

    // F. Hypnotic Torus Knot in Background
    const knotGeom = new THREE.TorusKnotGeometry(0.65, 0.18, 90, 16);
    const knotMesh = new THREE.Mesh(knotGeom, metallicRingMaterial);
    addFloatingObject(knotMesh, 0.2, 3.4, -3.5, { x: 0.006, y: 0.008, z: 0.003 }, 0.22, 0.5);

    // 6. Cosmic Glowing Dust Particles (Electric Cyan, Blue & Purple)
    const particleCount = 450;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00e5ff);
    const blueColor = new THREE.Color(0x008cff);
    const purpleColor = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 28;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const rand = Math.random();
      const col = rand > 0.6 ? cyanColor : rand > 0.3 ? blueColor : purpleColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particles);

    // 7. Mouse Interaction Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 8. Animation & Cinematic Camera Drift Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Mouse smooth lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // Cursor 3D Spotlight follows mouse
      cursorLight.position.x = mX * 7.0;
      cursorLight.position.y = mY * 4.5;

      // Cinematic Camera Motion: Slow push-in drift from 9.8 to ~7.4
      let targetCamZ = prefersReducedMotion ? 8.2 : 9.8 - Math.min(elapsedTime * 0.28, 2.4);

      if (isTransitioning) {
        // Final Transition: Smooth camera warp push-in
        targetCamZ = 3.8;
      }

      camera.position.z += (targetCamZ - camera.position.z) * 0.04;

      // Camera parallax perspective shift
      if (!prefersReducedMotion) {
        camera.position.x += (mX * 1.3 - camera.position.x) * 0.04;
        camera.position.y += (mY * 0.9 - camera.position.y) * 0.04;
      }
      camera.lookAt(0, 0, 0);

      // Rotate Orbital Rings with layered speeds
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.004;
      ring3.rotation.y += 0.005;

      ringGroup.rotation.y = mX * 0.25;
      ringGroup.rotation.x = -mY * 0.18;

      // Update Floating Dimensional Objects
      for (let i = 0; i < floatingItems.length; i++) {
        const item = floatingItems[i];
        item.mesh.rotation.x += item.speedX;
        item.mesh.rotation.y += item.speedY;
        item.mesh.rotation.z += item.speedZ;

        // Harmonic floating vertical bobbing
        const floatOffset = Math.sin(elapsedTime * item.floatSpeed + item.phase) * item.floatAmp;
        item.mesh.position.y = item.baseY + floatOffset;

        // Subtle parallax displacement
        item.mesh.position.x = item.baseX + mX * 0.35;
      }

      // Slowly drift starfield particles
      particles.rotation.y = elapsedTime * 0.02 + mX * 0.08;
      particles.rotation.x = mY * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 9. Thorough WebGL Resource Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ring3.geometry.dispose();
      fgSphere.geometry.dispose();
      mgSphereRight.geometry.dispose();
      mgSphereLeft.geometry.dispose();
      icosaGeom.dispose();
      octaGeom.dispose();
      knotGeom.dispose();
      particleGeom.dispose();

      // Dispose Materials
      metallicRingMaterial.dispose();
      glassMaterial.dispose();
      wireframeMaterial.dispose();
      purpleWireframeMaterial.dispose();
      particleMaterial.dispose();

      // Dispose Renderer
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    />
  );
};

export default ThreeIntroCanvas;
