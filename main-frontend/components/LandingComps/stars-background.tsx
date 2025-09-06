"use client";
import { cn } from "@/lib/utils";
import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  useCallback,
} from "react";

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  hue: number; // Added hue for color variation
  saturation: number; // Added saturation
  lightness: number; // Added lightness
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
  minHue?: number; // Minimum hue value (for blue-purple range)
  maxHue?: number; // Maximum hue value (for blue-purple range)
  minSize?: number; // Minimum star size
  maxSize?: number; // Maximum star size
  forLightBackground?: boolean; // Whether to optimize for light backgrounds
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.0015,
  allStarsTwinkle = true,
  twinkleProbability = 0.8,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
  minHue = 230, // Default blue
  maxHue = 280, // Default purple
  minSize = 0.5,
  maxSize = 2,
  forLightBackground = true,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef: RefObject<HTMLCanvasElement | null> =
    useRef<HTMLCanvasElement | null>(null);

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;

        // Create variation in blue to purple hues
        const hue = minHue + Math.random() * (maxHue - minHue);

        // Adjust saturation and lightness based on background type
        const saturation = forLightBackground
          ? 70 + Math.random() * 30
          : 60 + Math.random() * 40;
        const lightness = forLightBackground
          ? 15 + Math.random() * 35
          : 60 + Math.random() * 30;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: minSize + Math.random() * (maxSize - minSize),
          opacity: 0.1 + Math.random() * 0.6, // Lower base opacity for light backgrounds
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          hue,
          saturation,
          lightness,
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
      minHue,
      maxHue,
      minSize,
      maxSize,
      forLightBackground,
    ]
  );

  useEffect(() => {
    const updateStars = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setStars(generateStars(width, height));
      }
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current);
      }
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    generateStars,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add a subtle glow effect
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(124, 58, 237, 0.5)"; // Purple glow

      stars.forEach((star) => {
        // Calculate current opacity based on twinkle effect
        const currentOpacity =
          star.twinkleSpeed !== null
            ? 0.1 +
              Math.abs(
                Math.sin((Date.now() * 0.001) / star.twinkleSpeed) *
                  star.opacity
              )
            : star.opacity;

        // Use HSL color for better control over the star appearance
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${currentOpacity})`;

        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add a subtle highlight/glow to larger stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${
            star.lightness + 10
          }%, ${currentOpacity * 0.3})`;
          ctx.fill();
        }

        // Update opacity for twinkling stars
        if (star.twinkleSpeed !== null) {
          star.opacity =
            0.1 +
            Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.6);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full absolute inset-0 z-0", className)}
    />
  );
};
