"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Aspect-aware rounded-rectangle outline that traces the container's edges
// and is revealed by a soft circle near the mouse (ShapeBlur look, adapted
// to non-square cards).
const fragmentShader = /* glsl */ `
precision highp float;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}
float sdCircle(vec2 p, vec2 c) {
    return length(p - c);
}
float fillC(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}
float strokeAA(float x, float size, float w, float edge) {
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 res = u_resolution;
    float aspect = res.x / res.y;

    vec2 uv = gl_FragCoord.xy / res;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    vec2 mpx = u_mouse * u_pixelRatio;
    vec2 m = mpx / res;
    vec2 pm = (vec2(m.x, 1.0 - m.y) - 0.5) * vec2(aspect, 1.0);

    vec2 b = vec2(0.5 * aspect, 0.5) * u_shapeSize;
    float r = min(u_roundness, min(b.x, b.y));

    float d = sdRoundedBox(p, b, r);
    float circle = fillC(sdCircle(p, pm), u_circleSize, u_circleEdge);
    float line = strokeAA(d, 0.0, u_borderSize, circle);

    gl_FragColor = vec4(vec3(1.0), line);
}
`;

interface ShapeBlurProps {
  className?: string;
  pixelRatioProp?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
}

const ShapeBlur = ({
  className = "",
  pixelRatioProp = 2,
  shapeSize = 0.92,
  roundness = 0.12,
  borderSize = 0.015,
  circleSize = 0.3,
  circleEdge = 0.5,
}: ShapeBlurProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let active = true;
    let animationFrameId: number;
    let time = 0;
    let lastTime = 0;

    const vMouse = new THREE.Vector2();
    const vMouseDamp = new THREE.Vector2();
    const vResolution = new THREE.Vector2();

    let w = 1;
    let h = 1;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: vMouseDamp },
        u_resolution: { value: vResolution },
        u_pixelRatio: { value: pixelRatioProp },
        u_shapeSize: { value: shapeSize },
        u_roundness: { value: roundness },
        u_borderSize: { value: borderSize },
        u_circleSize: { value: circleSize },
        u_circleEdge: { value: circleEdge },
      },
      transparent: true,
    });

    const quad = new THREE.Mesh(geo, material);
    scene.add(quad);

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      vMouse.set(e.clientX - rect.left, e.clientY - rect.top);
    };
    document.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      if (!active) return;
      w = mount.clientWidth;
      h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);

      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);

      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();

      quad.scale.set(w, h, 1);
      vResolution.set(w, h).multiplyScalar(dpr);
      material.uniforms.u_pixelRatio.value = dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const ro = new ResizeObserver(() => {
      if (active) resize();
    });
    ro.observe(mount);

    const update = () => {
      if (!active) return;
      time = performance.now() * 0.001;
      const dt = time - lastTime;
      lastTime = time;
      vMouseDamp.x = THREE.MathUtils.damp(vMouseDamp.x, vMouse.x, 8, dt);
      vMouseDamp.y = THREE.MathUtils.damp(vMouseDamp.y, vMouse.y, 8, dt);
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geo.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);

  return (
    <div
      className={className}
      ref={mountRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ShapeBlur;
