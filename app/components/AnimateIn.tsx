"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimateIn({ children, delay = 0, className = "" }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Bij "minder beweging" staat alles direct op zijn plek
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(12px)",
        transition: `opacity 0.4s cubic-bezier(0.2, 0, 0, 1) ${delay}ms, transform 0.4s cubic-bezier(0.2, 0, 0, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
