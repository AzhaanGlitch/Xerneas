import React, { useEffect, useRef } from "react";

/**
 * GatewayFlowBackground
 * Pure HTML5 Canvas rendering of the Nexus Gateway flow paths.
 * Renders on a solid pitch-black background (#000000).
 */
export default function GatewayFlowBackground({ speed = 1, opacity = 1, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let explosions = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      explosions.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        life: 1,
      });
    };
    canvas.addEventListener("click", handleClick);

    const paths = [];
    const numPaths = 70;

    for (let i = 0; i < numPaths; i++) {
      paths.push({
        isLeft: i % 2 === 0,
        startY: (i / numPaths) * (height || 800) * 1.4 - (height || 800) * 0.2,
        particles: [
          {
            t: Math.random(),
            speed: (0.0012 + Math.random() * 0.0018) * speed,
          },
        ],
      });
    }

    function getBezierPoint(t, p0, p1, p2, p3) {
      const u = 1 - t;
      return {
        x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
        y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
      };
    }

    function render() {
      // Clear with pitch black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      explosions.forEach((exp) => {
        exp.radius += 14;
        exp.life -= 0.015;
      });
      explosions = explosions.filter((exp) => exp.life > 0);

      paths.forEach((path) => {
        const p0 = { x: path.isLeft ? 0 : width, y: path.startY };
        const p1 = { x: path.isLeft ? centerX * 0.45 : width - centerX * 0.45, y: path.startY };
        const p2 = { x: path.isLeft ? centerX * 0.8 : width - centerX * 0.8, y: centerY };
        const p3 = { x: centerX, y: centerY };

        // Subtle dotted trajectory lines (crisp white threads)
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * opacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        path.particles.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            path.startY += (Math.random() - 0.5) * 10;
          }

          const pos = getBezierPoint(p.t, p0, p1, p2, p3);

          let dxTotal = 0;
          let dyTotal = 0;
          explosions.forEach((exp) => {
            const dx = pos.x - exp.x;
            const dy = pos.y - exp.y;
            const dist = Math.hypot(dx, dy);
            if (dist < exp.radius + 120 && dist > exp.radius - 120) {
              const force = (1 - Math.abs(dist - exp.radius) / 120) * exp.life;
              dxTotal += (dx / dist) * force * 70;
              dyTotal += (dy / dist) * force * 70;
            }
          });

          pos.x += dxTotal;
          pos.y += dyTotal;

          // Larger moving dots in dark maroon (#660000 / rgb(102, 0, 0))
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(102, 0, 0, ${0.98 * opacity})`;
          ctx.shadowColor = 'rgba(70, 0, 0, 0.7)';
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
    };
  }, [speed, opacity]);

  return (
    <div className={`relative w-full h-full bg-[#000000] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-[#000000]" />
    </div>
  );
}
