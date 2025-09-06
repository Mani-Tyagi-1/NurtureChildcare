"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";
import { motion } from "framer-motion";

interface InteractiveCubeProps {
  images: string[];
  size?: number;
  /** starting tilt */
  initialRotation?: { x: number; y: number };
  /** deg of rotation per pixel dragged */
  dragSensitivity?: number;
  /** default idle spin (deg / s around Y) */
  idleYawDegPerSec?: number;
  /** momentum friction 0‑1 (lower = slows quicker) */
  inertiaFriction?: number;
}

const InteractiveCube: React.FC<InteractiveCubeProps> = ({
  images,
  size = 200,
  initialRotation = { x: -30, y: 30 },
  dragSensitivity = 0.25,
  idleYawDegPerSec = 15,
  inertiaFriction = 0.94,
}) => {
  /* ---------------- state ---------------- */
  const [rotation, setRotation] = useState(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  /* ---------------- refs ----------------- */
  const cubeRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null) as MutableRefObject<number | null>;

  /** degrees / frame velocities (mutable) */
  const vel = useRef({ x: 0, y: idleYawDegPerSec / 60 });

  const half = size / 2;

  /* ------------ face images -------------- */
  const defaultFace = "https://via.placeholder.com/200/CCCCCC/000000?Text=Face";
  const faceImages = Array(6)
    .fill(null)
    .map((_, i) => images?.[i] || `${defaultFace}${i + 1}`);

  const faceTransforms = [
    `rotateY(  0deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY( 90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX( 90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  /* ------------- drag helpers ------------ */
  const startDrag = useCallback((x: number, y: number) => {
    setIsDragging(true);
    setLastMousePos({ x, y });
    document.body.style.userSelect = "none";
  }, []);

  const drag = useCallback(
    (x: number, y: number) => {
      if (!isDragging) return;
      const dx = x - lastMousePos.x;
      const dy = y - lastMousePos.y;

      // update rotation immediately
      setRotation((prev) => ({
        x: prev.x - dy * dragSensitivity,
        y: prev.y + dx * dragSensitivity,
      }));

      // store velocity for inertia (deg per frame)
      vel.current = {
        x: -dy * dragSensitivity,
        y: dx * dragSensitivity,
      };

      setLastMousePos({ x, y });
    },
    [isDragging, lastMousePos, dragSensitivity]
  );

  const endDrag = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.userSelect = "";
      // if user barely moved, fall back to idle spin
      if (Math.abs(vel.current.x) + Math.abs(vel.current.y) < 0.2) {
        vel.current = { x: 0, y: idleYawDegPerSec / 60 };
      }
    }
  }, [isDragging, idleYawDegPerSec]);

  /* ------------- animation loop ---------- */
  useEffect(() => {
    const animate = () => {
      // inertia only when not dragging
      if (!isDragging) {
        setRotation((p) => ({
          x: p.x + vel.current.x,
          y: p.y + vel.current.y,
        }));

        // apply friction
        vel.current.x *= inertiaFriction;
        vel.current.y *= inertiaFriction;

        // once slowed almost to a stop -> idle yaw
        if (
          Math.abs(vel.current.x) + Math.abs(vel.current.y) <
          idleYawDegPerSec / 60
        ) {
          vel.current = { x: 0, y: idleYawDegPerSec / 60 };
        }
      }

      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [isDragging, inertiaFriction, idleYawDegPerSec]);

  /* ------------- mouse listeners --------- */
  useEffect(() => {
    const onMove = (e: MouseEvent) => drag(e.clientX, e.clientY);
    const onUp = () => endDrag();
    if (isDragging) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("mouseleave", onUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onUp);
    };
  }, [isDragging, drag, endDrag]);

  /* ------------- touch listeners --------- */
  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 1)
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
    },
    [startDrag]
  );
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        drag(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [drag]
  );
  const onTouchEnd = useCallback(() => endDrag(), [endDrag]);

  useEffect(() => {
    const scene = cubeRef.current?.parentElement;
    if (!scene) return;
    scene.addEventListener("touchstart", onTouchStart, { passive: false });
    scene.addEventListener("touchmove", onTouchMove, { passive: false });
    scene.addEventListener("touchend", onTouchEnd);
    scene.addEventListener("touchcancel", onTouchEnd);
    return () => {
      scene.removeEventListener("touchstart", onTouchStart);
      scene.removeEventListener("touchmove", onTouchMove);
      scene.removeEventListener("touchend", onTouchEnd);
      scene.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd]);

  /* ---------------- render --------------- */
  return (
    <div
      className="cursor-grab active:cursor-grabbing"
      style={{ perspective: `${size * 5}px` }}
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
    >
      <motion.div
        ref={cubeRef}
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? "none" : "transform 0.12s linear",
        }}
      >
        {faceImages.map((src, i) => (
          <div
            key={i}
            className="absolute bg-cover bg-center"
            style={{
              width: size,
              height: size,
              backgroundImage: `url(${src})`,
              transform: faceTransforms[i],
              backfaceVisibility: "hidden",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default InteractiveCube;
