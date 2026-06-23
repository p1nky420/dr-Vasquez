"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useCallback, useRef } from "react";

interface SwipeableCardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SWIPE_THRESHOLD = 60;

export function SwipeableCard({
  children,
  href,
  className = "",
}: SwipeableCardProps) {
  const router = useRouter();
  const startX = useRef(0);
  const startY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!href) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = e.changedTouches[0].clientY - startY.current;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if ("vibrate" in navigator) navigator.vibrate(10);
        router.push(href);
      }
    },
    [href, router]
  );

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={className}
    >
      {children}
    </div>
  );
}
