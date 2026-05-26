// Lightweight CSS-only particles — no JS animation overhead
const FloatingParticles = ({ count = 8 }: { count?: number }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 13 + 7) % 100,
    y: (i * 17 + 11) % 100,
    size: 2 + (i % 3),
    delay: (i * 0.7) % 5,
    dur: 4 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `floatUp ${p.dur}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
