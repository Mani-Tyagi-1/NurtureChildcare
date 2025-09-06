"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  opacity: number; // Added opacity for better visibility control
  tailLength: number; // Added varying tail length
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  glowColor?: string; // Added glow color option
  starWidth?: number;
  starHeight?: number;
  maxStars?: number; // Added support for multiple stars
  className?: string;
  forLightBackground?: boolean; // Flag for light background optimization
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const width = typeof window !== "undefined" ? window.innerWidth : 1000;
  const height = typeof window !== "undefined" ? window.innerHeight : 1000;
  const offset = Math.random() * width;

  switch (side) {
    case 0: // Top
      return { x: offset, y: -20, angle: Math.random() * 90 + 225 };
    case 1: // Right
      return { x: width + 20, y: offset, angle: Math.random() * 90 + 135 };
    case 2: // Bottom
      return { x: offset, y: height + 20, angle: Math.random() * 90 + 45 };
    case 3: // Left
      return { x: -20, y: offset, angle: Math.random() * 90 + 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 15,
  maxSpeed = 35,
  minDelay = 1000,
  maxDelay = 3800,
  starColor = "#7C3AED", // More visible purple from your variables
  trailColor = "#2563EB", // Primary blue from your variables
  glowColor = "rgba(124, 58, 237, 0.8)", // Glow color matching accent-glow
  starWidth = 12,
  starHeight = 2,
  maxStars = 3, // Support multiple stars
  className,
  forLightBackground = true,
}) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Adjust colors for light backgrounds if needed
  const finalStarColor = forLightBackground ? starColor : starColor;
  const finalTrailColor = forLightBackground ? trailColor : trailColor;
  const finalGlowColor = forLightBackground ? glowColor : glowColor;

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const tailLength = Math.random() * 0.5 + 0.5; // Random tail length factor (0.5 to 1.0)

      const newStar: ShootingStar = {
        id: Date.now() + Math.random() * 1000, // Ensure unique IDs
        x,
        y,
        angle,
        scale: Math.random() * 0.5 + 0.8, // Varied initial scale
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
        opacity: Math.random() * 0.3 + 0.7, // Random opacity for variety
        tailLength: tailLength,
      };

      setStars((prevStars) => {
        // Only add if we're under the max stars limit
        if (prevStars.length < maxStars) {
          return [...prevStars, newStar];
        }
        return prevStars;
      });

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    // Start with initial creation
    createStar();

    return () => {};
  }, [minSpeed, maxSpeed, minDelay, maxDelay, maxStars]);

  useEffect(() => {
    const moveStars = () => {
      setStars((prevStars) => {
        if (!prevStars.length) return prevStars;

        return prevStars
          .map((star) => {
            const newX =
              star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
            const newY =
              star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
            const newDistance = star.distance + star.speed;
            // Make scale change more gradually
            const newScale = star.scale + star.speed * 0.005;

            // Check if the star is still on screen with a buffer
            const width =
              typeof window !== "undefined" ? window.innerWidth : 1000;
            const height =
              typeof window !== "undefined" ? window.innerHeight : 1000;

            if (
              newX < -100 ||
              newX > width + 100 ||
              newY < -100 ||
              newY > height + 100
            ) {
              return null; // Remove this star
            }

            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
              scale: newScale,
            };
          })
          .filter(Boolean) as ShootingStar[]; // Remove null entries
      });
    };

    const animationFrame = requestAnimationFrame(moveStars);
    return () => cancelAnimationFrame(animationFrame);
  }, [stars]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute rounded inset-0 z-10", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Define multiple gradients for each star for better variation */}
        {stars.map((star) => (
          <React.Fragment key={`defs-${star.id}`}>
            <linearGradient
              id={`gradient-${star.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: finalTrailColor,
                  stopOpacity: 0,
                }}
              />
              <stop
                offset={`${50 + star.tailLength * 40}%`}
                style={{
                  stopColor: finalTrailColor,
                  stopOpacity: star.opacity * 0.8,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: finalStarColor,
                  stopOpacity: star.opacity,
                }}
              />
            </linearGradient>

            {/* Add a filter for the glow effect */}
            <filter
              id={`glow-${star.id}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </React.Fragment>
        ))}
      </defs>

      {/* Render each star */}
      {stars.map((star) => {
        // Calculate actual tail width based on scale and tailLength factor
        const actualWidth = starWidth * star.scale * (1 + star.tailLength * 3);

        return (
          <g key={star.id}>
            {/* Subtle glow effect for the star head */}
            <rect
              x={star.x}
              y={star.y - (starHeight * star.scale) / 2 - 1}
              width={starWidth * 0.4 * star.scale}
              height={starHeight * star.scale + 2}
              fill={finalGlowColor}
              filter={`url(#glow-${star.id})`}
              opacity={star.opacity * 0.7}
              rx={starHeight}
              transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
            />

            {/* Main shooting star */}
            <rect
              x={star.x - actualWidth + starWidth * star.scale}
              y={star.y - (starHeight * star.scale) / 2}
              width={actualWidth}
              height={starHeight * star.scale}
              fill={`url(#gradient-${star.id})`}
              rx={starHeight / 2}
              transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
            />
          </g>
        );
      })}
    </svg>
  );
};
