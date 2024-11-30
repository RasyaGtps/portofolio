// src/components/CursorTrail.tsx
"use client";
import React, { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionsRef = useRef<{ x: number; y: number; hue: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hueRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInHomeSection = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    setCanvasSize();

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      positionsRef.current = [];
    };

    const checkIfInHomeSection = (mouseY: number) => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        isInHomeSection.current = mouseY >= rect.top && mouseY <= rect.bottom;
      }
    };

    const animate = () => {
      if (!isInHomeSection.current) {
        clearCanvas();
        requestAnimationFrame(animate);
        return;
      }

      hueRef.current = (hueRef.current + 0.5) % 360;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(clearCanvas, 100);

      positionsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        hue: hueRef.current,
      });

      if (positionsRef.current.length > 50) {
        positionsRef.current.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < positionsRef.current.length - 1; i++) {
        const pos = positionsRef.current[i];
        const nextPos = positionsRef.current[i + 1];

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(nextPos.x, nextPos.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = `hsla(${pos.hue}, 100%, 50%, 0.8)`;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
      }

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
      checkIfInHomeSection(e.clientY);
    };

    const handleScroll = () => {
      checkIfInHomeSection(mouseRef.current.y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setCanvasSize);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setCanvasSize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" style={{ mixBlendMode: "lighten" }} />;
};

export default CursorTrail;
