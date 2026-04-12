import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; hue: number }[]>([]);
  const stateRef = useRef({
    x: -100, y: -100,
    ringX: -100, ringY: -100,
    visible: false, hovering: false, pressed: false,
    lastX: -100, lastY: -100,
    angle: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isTouch = "ontouchstart" in window;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        html[data-custom-cursor='enabled'] * { cursor: none !important; }
        html[data-custom-cursor='enabled'] a:hover svg,
        html[data-custom-cursor='enabled'] button:hover svg,
        html[data-custom-cursor='enabled'] [role='button']:hover svg,
        html[data-custom-cursor='enabled'] [data-cursor-hover]:hover svg {
          filter: drop-shadow(0 0 8px hsl(var(--primary) / 0.7)) drop-shadow(0 0 20px hsl(var(--primary) / 0.3));
          color: hsl(var(--primary)) !important;
          transition: filter 0.3s ease, color 0.3s ease;
        }
      }
    `;
    document.head.appendChild(style);
    if (!isTouch) document.documentElement.setAttribute("data-custom-cursor", "enabled");

    const spawnParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        particles.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 30 + Math.random() * 20,
          size: Math.random() * 3 + 1,
          hue: 160 + Math.random() * 40 - 20,
        });
      }
    };

    const tick = () => {
      const s = stateRef.current;
      s.ringX += (s.x - s.ringX) * 0.4;
      s.ringY += (s.y - s.ringY) * 0.4;
      s.angle += 0.03;

      // Spawn trail particles based on movement speed
      const dx = s.x - s.lastX;
      const dy = s.y - s.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (s.visible && speed > 2) {
        spawnParticles(s.x, s.y, Math.min(Math.floor(speed / 4), 4));
      }
      s.lastX = s.x;
      s.lastY = s.y;

      // Clear
      ctx.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);

      if (!s.visible) {
        // Still update particles even when not visible
        particles.current = particles.current.filter(p => {
          p.life -= 1 / p.maxLife;
          return p.life > 0;
        });
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      // Draw particles
      particles.current = particles.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = `hsl(${p.hue} 60% 50%)`;
        ctx.shadowColor = `hsl(${p.hue} 60% 50%)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      // Outer glow
      const glowSize = s.hovering ? 60 : 35;
      const glowAlpha = s.hovering ? 0.12 : 0.04;
      const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowSize);
      gradient.addColorStop(0, `hsla(160, 60%, 45%, ${glowAlpha})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting dots
      const orbitRadius = s.hovering ? 18 : 12;
      const orbitCount = s.hovering ? 4 : 3;
      for (let i = 0; i < orbitCount; i++) {
        const a = s.angle + (Math.PI * 2 / orbitCount) * i;
        const ox = s.ringX + Math.cos(a) * orbitRadius;
        const oy = s.ringY + Math.sin(a) * orbitRadius;
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = `hsl(${160 + i * 20} 60% 55%)`;
        ctx.shadowColor = `hsl(${160 + i * 20} 60% 55%)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ox, oy, s.hovering ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Ring
      const ringScale = s.pressed ? 14 : s.hovering ? 20 : 16;
      ctx.save();
      ctx.strokeStyle = s.hovering ? "hsla(160, 60%, 45%, 0.6)" : "hsla(160, 60%, 45%, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "hsl(160 60% 45%)";
      ctx.shadowBlur = s.hovering ? 15 : 5;
      ctx.beginPath();
      ctx.arc(s.ringX, s.ringY, ringScale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Center dot with inner glow
      const dotSize = s.pressed ? 3 : s.hovering ? 5 : 3.5;
      ctx.save();
      ctx.fillStyle = "hsl(160 60% 50%)";
      ctx.shadowColor = "hsl(160 60% 50%)";
      ctx.shadowBlur = s.hovering ? 20 : 10;
      ctx.beginPath();
      ctx.arc(s.x, s.y, dotSize, 0, Math.PI * 2);
      ctx.fill();
      // Inner bright core
      ctx.fillStyle = "hsl(160 80% 80%)";
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, dotSize * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const s = stateRef.current;
      s.x = e.clientX; s.y = e.clientY;
      s.visible = true;
      s.hovering = e.target instanceof Element && !!e.target.closest(INTERACTIVE_SELECTOR);
    };
    const onDown = () => { stateRef.current.pressed = true; spawnParticles(stateRef.current.x, stateRef.current.y, 12); };
    const onUp = () => { stateRef.current.pressed = false; };
    const onLeave = () => { const s = stateRef.current; s.visible = false; s.hovering = false; s.pressed = false; };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const s = stateRef.current;
      s.x = touch.clientX; s.y = touch.clientY;
      s.ringX = touch.clientX; s.ringY = touch.clientY;
      s.lastX = touch.clientX; s.lastY = touch.clientY;
      s.visible = true; s.pressed = true;
      s.hovering = e.target instanceof Element && !!e.target.closest(INTERACTIVE_SELECTOR);
      spawnParticles(touch.clientX, touch.clientY, 8);
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      stateRef.current.x = touch.clientX;
      stateRef.current.y = touch.clientY;
    };
    const onTouchEnd = () => {
      stateRef.current.pressed = false;
      setTimeout(() => { stateRef.current.visible = false; stateRef.current.hovering = false; }, 600);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    if (isTouch) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId.current);
      document.documentElement.removeAttribute("data-custom-cursor");
      style.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default CustomCursor;
