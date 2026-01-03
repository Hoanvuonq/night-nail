"use client";
import { useEffect, useState } from "react";

const FloatingParticles = () => {
  // Bắt đầu với mảng rỗng để khớp với Server Render (không có hạt nào)
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Chỉ tạo hạt sau khi đã mount vào trình duyệt
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37] animate-float shadow-[0_0_10px_#D4AF37]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            bottom: "-10px",
          }}
        />
      ))}
    </div>
  );
};

export const LuxuryBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#fffdfd] overflow-hidden">
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div
        className="absolute top-[40%] -right-[10%] w-[400px] h-[400px] bg-[#F59E0B]/10 rounded-full blur-[100px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[80px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      ></div>
      <FloatingParticles />
    </div>
  );
};
