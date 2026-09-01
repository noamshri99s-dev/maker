import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * רקע תלת־מימד עדין להירו — רשת wireframe של כדור/טורוס בכתום,
 * מסתובבת לאט עם זוהר קל. שקוף חלקית, לא מפריע לקריאה.
 * במובייל / reduced-motion — פריים סטטי בלבד (בלי לולאת אנימציה) לביצועים.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion =
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      document.documentElement.classList.contains("a11y-stop-animations");
    const isMobile = window.innerWidth < 768;
    const staticOnly = reducedMotion || isMobile;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !staticOnly,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.setAttribute("tabindex", "-1");
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const primary = new THREE.Color("#f5a83b");
    const group = new THREE.Group();

    // כדור wireframe מרכזי
    const sphereGeo = new THREE.IcosahedronGeometry(2.1, 3);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: primary,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphere);

    // טורוס חיצוני להוספת עומק
    const torusGeo = new THREE.TorusGeometry(3.1, 0.02, 8, 120);
    const torusMat = new THREE.MeshBasicMaterial({
      color: primary,
      transparent: true,
      opacity: 0.18,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2.6;
    group.add(torus);

    // נקודות זוהר עדינות
    const pointsGeo = new THREE.IcosahedronGeometry(2.55, 2);
    const pointsMat = new THREE.PointsMaterial({
      color: primary,
      size: 0.045,
      transparent: true,
      opacity: 0.4,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    group.rotation.x = 0.3;
    scene.add(group);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    let frameId = 0;
    if (staticOnly) {
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        group.rotation.y += 0.0016;
        group.rotation.x += 0.0006;
        torus.rotation.z += 0.0009;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      sphereGeo.dispose();
      sphereMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ opacity: 0.9 }}
    />
  );
}
