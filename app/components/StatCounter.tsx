"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: string;
  label: string;
}

export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numeric));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [started, numeric]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-sm tabular-nums">
        {count}{suffix}
      </div>
      <div className="font-body text-white/80 text-xs sm:text-sm mt-1.5 tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
}
