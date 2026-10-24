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

    // 1. Scene, Fog & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting Rig (Deep Navy, Electric Blue, Cyan)
    const ambientLight = new THREE.AmbientLight(0x040e28, 1.4);
    scene.add(ambientLight);

    // Key Electric Blue Light
    const keyBlueLight = new THREE.PointLight(0x008cff, 8.0, 35);
    keyBlueLight.position.set(4, 2.5, 4);
    scene.add(keyBlueLight);

    // Vivid Cyan Accent Light
    const cyanLight = new THREE.PointLight(0x00e5ff, 6.0, 28);
    cyanLight.position.set(1.5, -2.5, 3.5);
    scene.add(cyanLight);

    // Backstage Cobalt Rim Light
    const rimLight = new THREE.PointLight(0x0044cc, 4.5, 25);
    rimLight.position.set(5.5, 3.5, -3);
    scene.add(rimLight);

    // Left ambient fill
    const leftFill = new THREE.DirectionalLight(0x0033aa, 1.6);
    leftFill.position.set(-6, 4, 3);
    scene.add(leftFill);

    // Interactive Mouse Point Light
    const mouseLight = new THREE.PointLight(0x008cff, 2.5, 16);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. Materials
    // Ribbon Surface Material: Translucent physical glass with electric-blue reflection
    const ribbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0047ba,
      emissive: 0x001f7a,
      emissiveIntensity: 0.5,
      roughness: 0.12,
      metalness: 0.32,
      transmission: 0.68,
      thickness: 0.75,
      transparent: true,
      opacity: 0.82,
      ior: 1.48,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
    });

    // Luminous Cyan Ribbon Edge Highlight Material
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    // Outer Thin Cyan Ribbon Material
    const cyanRibbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00a3ff,
      emissive: 0x0088ff,
      emissiveIntensity: 0.65,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.75,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });

    // Floating Sphere Material
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x021c56,
      emissive: 0x0033aa,
      emissiveIntensity: 0.55,
      roughness: 0.14,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      transmission: 0.35,
    });

    // 4. Ribbon Construction Helper
    // Builds a continuous smooth 3D curved band with top/bottom glowing edge lines
    const createCurvedRibbon = (
      points: THREE.Vector3[],
      width: number,
      twistCount: number = 0
    ) => {
      const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal');
      const segments = 160;
      const frames = curve.computeFrenetFrames(segments, true);

      const positions: number[] = [];
      const indices: number[] = [];
      const edge1Positions: number[] = [];
      const edge2Positions: number[] = [];

      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const p = curve.getPointAt(u);
        const n = frames.normals[i % segments];
        const b = frames.binormals[i % segments];

        // Subtle twist along the curve
        const angle = u * Math.PI * 2 * twistCount;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        // Vector spanning ribbon width
        const spanX = (b.x * cosA + n.x * sinA) * (width * 0.5);
        const spanY = (b.y * cosA + n.y * sinA) * (width * 0.5);
        const spanZ = (b.z * cosA + n.z * sinA) * (width * 0.5);

        const v1x = p.x + spanX;
        const v1y = p.y + spanY;
        const v1z = p.z + spanZ;

        const v2x = p.x - spanX;
        const v2y = p.y - spanY;
        const v2z = p.z - spanZ;

        positions.push(v1x, v1y, v1z);
        positions.push(v2x, v2y, v2z);

        edge1Positions.push(v1x, v1y, v1z);
        edge2Positions.push(v2x, v2y, v2z);

        if (i < segments) {
          const row1 = i * 2;
          const row2 = (i + 1) * 2;
          indices.push(row1, row1 + 1, row2);
          indices.push(row1 + 1, row2 + 1, row2);
        }
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setIndex(indices);
      geom.computeVertexNormals();

      const edge1Geom = new THREE.BufferGeometry();
      edge1Geom.setAttribute('position', new THREE.Float32BufferAttribute(edge1Positions, 3));

      const edge2Geom = new THREE.BufferGeometry();
      edge2Geom.setAttribute('position', new THREE.Float32BufferAttribute(edge2Positions, 3));

      return { geom, edge1Geom, edge2Geom };
    };

    // 5. 3D Orbital System Group (Sphere + Multiple Ribbons)
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // ── A. Large Luminous Blue Sphere ──
    const mainSphereGeom = new THREE.SphereGeometry(1.4, 64, 64);
    const mainSphere = new THREE.Mesh(mainSphereGeom, sphereMaterial);
    orbitalGroup.add(mainSphere);

    // Inner glowing core
    const coreGeom = new THREE.SphereGeometry(1.15, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const coreSphere = new THREE.Mesh(coreGeom, coreMat);
    orbitalGroup.add(coreSphere);

    // Ethereal atmospheric rim glow (corona)
    const coronaGeom = new THREE.SphereGeometry(1.58, 48, 48);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const coronaSphere = new THREE.Mesh(coronaGeom, coronaMat);
    orbitalGroup.add(coronaSphere);

    // ── B. Multiple Curved Orbital Ribbons Surrounding the Sphere ──
    const ribbonGroups: { group: THREE.Group; speedX: number; speedY: number; speedZ: number }[] = [];

    // Ribbon 1: Dramatic equatorial / diagonal sweeping arc
    const pts1 = [
      new THREE.Vector3(2.4, 0.4, 0.2),
      new THREE.Vector3(1.7, 1.4, 1.5),
      new THREE.Vector3(-0.3, 1.9, 1.7),
      new THREE.Vector3(-2.2, 0.9, 0.8),
      new THREE.Vector3(-2.6, -0.6, -0.5),
      new THREE.Vector3(-1.6, -1.8, -1.6),
      new THREE.Vector3(0.5, -2.0, -1.4),
      new THREE.Vector3(2.1, -1.1, -0.4),
    ];
    const r1Data = createCurvedRibbon(pts1, 0.42, 0.5);
    const r1Mesh = new THREE.Mesh(r1Data.geom, ribbonMaterial);
    const r1Edge1 = new THREE.LineLoop(r1Data.edge1Geom, edgeMaterial);
    const r1Edge2 = new THREE.LineLoop(r1Data.edge2Geom, edgeMaterial);

    const r1Group = new THREE.Group();
    r1Group.add(r1Mesh, r1Edge1, r1Edge2);
    orbitalGroup.add(r1Group);
    ribbonGroups.push({ group: r1Group, speedX: 0.001, speedY: 0.0035, speedZ: 0.0008 });

    // Ribbon 2: Steeply inclined polar orbital ribbon
    const pts2 = [
      new THREE.Vector3(0.2, 2.6, 0.3),
      new THREE.Vector3(1.4, 1.8, -1.3),
      new THREE.Vector3(2.2, 0.2, -1.7),
      new THREE.Vector3(1.6, -1.6, -1.0),
      new THREE.Vector3(-0.2, -2.5, 0.2),
      new THREE.Vector3(-1.5, -1.8, 1.3),
      new THREE.Vector3(-2.1, 0.2, 1.6),
      new THREE.Vector3(-1.3, 1.8, 0.9),
    ];
    const r2Data = createCurvedRibbon(pts2, 0.35, 0.5);
    const r2Mesh = new THREE.Mesh(r2Data.geom, ribbonMaterial);
    const r2Edge1 = new THREE.LineLoop(r2Data.edge1Geom, edgeMaterial);
    const r2Edge2 = new THREE.LineLoop(r2Data.edge2Geom, edgeMaterial);

    const r2Group = new THREE.Group();
    r2Group.add(r2Mesh, r2Edge1, r2Edge2);
    orbitalGroup.add(r2Group);
    ribbonGroups.push({ group: r2Group, speedX: 0.0028, speedY: -0.004, speedZ: 0.0015 });

    // Ribbon 3: Outer sweeping celestial ribbon
    const pts3 = [
      new THREE.Vector3(3.2, 0.2, -0.6),
      new THREE.Vector3(2.2, 2.0, 0.8),
      new THREE.Vector3(0.2, 2.9, 1.8),
      new THREE.Vector3(-2.4, 1.7, 1.2),
      new THREE.Vector3(-3.2, -0.4, -0.3),
      new THREE.Vector3(-2.0, -2.1, -1.4),
      new THREE.Vector3(0.4, -2.8, -1.2),
      new THREE.Vector3(2.6, -1.8, 0.5),
    ];
    const r3Data = createCurvedRibbon(pts3, 0.26, 1);
    const r3Mesh = new THREE.Mesh(r3Data.geom, ribbonMaterial);
    const r3Edge1 = new THREE.LineLoop(r3Data.edge1Geom, edgeMaterial);
    const r3Edge2 = new THREE.LineLoop(r3Data.edge2Geom, edgeMaterial);

    const r3Group = new THREE.Group();
    r3Group.add(r3Mesh, r3Edge1, r3Edge2);
    orbitalGroup.add(r3Group);
    ribbonGroups.push({ group: r3Group, speedX: -0.0018, speedY: 0.0024, speedZ: -0.002 });

    // Ribbon 4: Fine luminous cyan orbital tracer ribbon
    const pts4 = [
      new THREE.Vector3(1.9, 0.8, -0.5),
      new THREE.Vector3(0.6, 2.0, 0.4),
      new THREE.Vector3(-1.1, 1.8, 1.0),
      new THREE.Vector3(-2.0, 0.3, 0.6),
      new THREE.Vector3(-1.7, -1.1, -0.4),
      new THREE.Vector3(-0.4, -2.0, -0.8),
      new THREE.Vector3(1.2, -1.6, -0.5),
      new THREE.Vector3(2.1, -0.4, 0.2),
    ];
    const r4Data = createCurvedRibbon(pts4, 0.14, 0);
    const r4Mesh = new THREE.Mesh(r4Data.geom, cyanRibbonMaterial);
    const r4Edge1 = new THREE.LineLoop(r4Data.edge1Geom, edgeMaterial);
    const r4Edge2 = new THREE.LineLoop(r4Data.edge2Geom, edgeMaterial);

    const r4Group = new THREE.Group();
    r4Group.add(r4Mesh, r4Edge1, r4Edge2);
    orbitalGroup.add(r4Group);
    ribbonGroups.push({ group: r4Group, speedX: 0.002, speedY: 0.0055, speedZ: -0.001 });

    // 6. Floating Blue Spheres (Distributed in depth, sizes, subtle drift)
    interface FloatingSphere {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speedX: number;
      speedY: number;
      floatSpeed: number;
      floatAmp: number;
      phase: number;
    }

    const floatingSpheres: FloatingSphere[] = [];
    const sphereConfigs = [
      // Left side field (behind/framing text)
      { x: -5.8, y: -2.4, z: 2.2, r: 0.45, amp: 0.28, speed: 0.8 },
      { x: -4.5, y: 2.8, z: -1.2, r: 0.35, amp: 0.22, speed: 0.95 },
      { x: -6.2, y: 1.2, z: 0.4, r: 0.28, amp: 0.32, speed: 0.7 },
      { x: -3.8, y: -3.2, z: -0.8, r: 0.38, amp: 0.25, speed: 0.85 },
      { x: -2.8, y: 3.5, z: -2.5, r: 0.22, amp: 0.18, speed: 1.1 },
      { x: -5.0, y: -0.8, z: -3.2, r: 0.25, amp: 0.3, speed: 0.65 },
      { x: -7.0, y: -1.8, z: -1.5, r: 0.42, amp: 0.35, speed: 0.6 },
      // Deep central background
      { x: -1.2, y: -3.4, z: -4.5, r: 0.3, amp: 0.2, speed: 0.75 },
      { x: 0.4, y: 3.2, z: -3.8, r: 0.24, amp: 0.22, speed: 0.8 },
      { x: -0.8, y: 0.6, z: -5.2, r: 0.18, amp: 0.16, speed: 0.9 },
      // Right side surrounding large sphere
      { x: 5.6, y: 2.6, z: 1.5, r: 0.48, amp: 0.3, speed: 0.75 },
      { x: 4.8, y: -2.8, z: 1.2, r: 0.42, amp: 0.26, speed: 0.8 },
      { x: 6.4, y: -1.2, z: -1.4, r: 0.32, amp: 0.34, speed: 0.7 },
      { x: 2.2, y: 3.6, z: -1.8, r: 0.26, amp: 0.2, speed: 0.85 },
      { x: 5.2, y: 0.5, z: -3.5, r: 0.36, amp: 0.24, speed: 0.9 },
      { x: 3.6, y: -3.5, z: -2.0, r: 0.28, amp: 0.28, speed: 0.7 },
      { x: 6.8, y: 1.8, z: -2.8, r: 0.22, amp: 0.18, speed: 1.05 },
      { x: 1.8, y: -3.2, z: 2.0, r: 0.2, amp: 0.22, speed: 0.95 },
    ];

    sphereConfigs.forEach((cfg, idx) => {
      const geom = new THREE.SphereGeometry(cfg.r, 32, 32);
      const mesh = new THREE.Mesh(geom, sphereMaterial);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      scene.add(mesh);

      floatingSpheres.push({
        mesh,
        baseX: cfg.x,
        baseY: cfg.y,
        baseZ: cfg.z,
        speedX: 0.003 + (idx % 4) * 0.002,
        speedY: 0.004 + (idx % 3) * 0.002,
        floatSpeed: cfg.speed,
        floatAmp: cfg.amp,
        phase: Math.random() * Math.PI * 2,
      });
    });

    // 7. Subtle Cosmic Dust / Micro Particle Field (Cyan & Electric Blue)
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colCyan = new THREE.Color(0x00e5ff);
    const colBlue = new THREE.Color(0x008cff);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 32;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const col = Math.random() > 0.5 ? colCyan : colBlue;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 8. Responsive Layout Updates
    const updateSceneLayout = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Responsive positioning of the 3D orbital structure
      if (width >= 1024) {
        // Desktop: Luminous sphere and ribbons occupy the right side
        orbitalGroup.position.set(3.2, 0.1, 0.2);
        orbitalGroup.scale.set(1.0, 1.0, 1.0);
        camera.position.z = 9.4;
      } else if (width >= 768) {
        // Tablet: Shifted slightly right and scaled
        orbitalGroup.position.set(1.8, 0.3, -0.6);
        orbitalGroup.scale.set(0.85, 0.85, 0.85);
        camera.position.z = 10.0;
      } else {
        // Mobile: Centered, pushed into background, scaled down
        orbitalGroup.position.set(0.0, 1.4, -2.4);
        orbitalGroup.scale.set(0.68, 0.68, 0.68);
        camera.position.z = 10.8;
      }
    };

    updateSceneLayout();

    // 9. Mouse Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateSceneLayout);

    // 10. Continuous Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.045;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.045;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // Mouse interactive light tracks cursor smoothly
      mouseLight.position.x = mX * 7.5;
      mouseLight.position.y = mY * 4.8;

      // Camera motion: base positioning + smooth parallax
      let targetZ = width < 768 ? 10.8 : width < 1024 ? 10.0 : 9.4;
      if (isTransitioning) {
        targetZ = 3.6; // Cinematic forward warp push-in on transition
      }

      camera.position.z += (targetZ - camera.position.z) * 0.04;

      if (!prefersReducedMotion) {
        const targetCamX = mX * 1.1;
        const targetCamY = mY * 0.8;
        camera.position.x += (targetCamX - camera.position.x) * 0.035;
        camera.position.y += (targetCamY - camera.position.y) * 0.035;
      }
      camera.lookAt(0, 0, 0);

      // Sphere rotation
      mainSphere.rotation.y += 0.002;
      coreSphere.rotation.y -= 0.003;

      // Continuous subtle orbital ribbon rotation
      for (let i = 0; i < ribbonGroups.length; i++) {
        const r = ribbonGroups[i];
        r.group.rotation.x += r.speedX;
        r.group.rotation.y += r.speedY;
        r.group.rotation.z += r.speedZ;
      }

      // Parallax reaction on the orbital group
      orbitalGroup.rotation.y = mX * 0.18;
      orbitalGroup.rotation.x = -mY * 0.12;

      // Floating spheres: gentle harmonic bobbing and drifting
      for (let i = 0; i < floatingSpheres.length; i++) {
        const s = floatingSpheres[i];
        s.mesh.rotation.x += s.speedX;
        s.mesh.rotation.y += s.speedY;

        const floatOffset = Math.sin(elapsedTime * s.floatSpeed + s.phase) * s.floatAmp;
        s.mesh.position.y = s.baseY + floatOffset;
        s.mesh.position.x = s.baseX + Math.cos(elapsedTime * s.floatSpeed * 0.6 + s.phase) * (s.floatAmp * 0.4) + mX * 0.25;
      }

      // Subtle starfield drift
      particles.rotation.y = elapsedTime * 0.015 + mX * 0.05;
      particles.rotation.x = mY * 0.03;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 11. Resource Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSceneLayout);
      cancelAnimationFrame(animationFrameId);

      // Geometries
      mainSphereGeom.dispose();
      coreGeom.dispose();
      coronaGeom.dispose();
      r1Data.geom.dispose();
      r1Data.edge1Geom.dispose();
      r1Data.edge2Geom.dispose();
      r2Data.geom.dispose();
      r2Data.edge1Geom.dispose();
      r2Data.edge2Geom.dispose();
      r3Data.geom.dispose();
      r3Data.edge1Geom.dispose();
      r3Data.edge2Geom.dispose();
      r4Data.geom.dispose();
      r4Data.edge1Geom.dispose();
      r4Data.edge2Geom.dispose();
      particleGeom.dispose();

      floatingSpheres.forEach((s) => s.mesh.geometry.dispose());

      // Materials
      ribbonMaterial.dispose();
      edgeMaterial.dispose();
      cyanRibbonMaterial.dispose();
      sphereMaterial.dispose();
      coreMat.dispose();
      coronaMat.dispose();
      particleMat.dispose();

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
