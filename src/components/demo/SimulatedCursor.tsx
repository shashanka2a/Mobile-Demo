'use client';

import React from 'react';

interface SimulatedCursorProps {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  isTapping: boolean;
  visible: boolean;
}

export function SimulatedCursor({ x, y, isTapping, visible }: SimulatedCursorProps) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute z-50 transition-all duration-700 ease-in-out"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Ripple on Tap */}
      {isTapping && (
        <span className="absolute -inset-4 animate-ping rounded-full bg-[#FF6633]/60 opacity-75" />
      )}

      {/* Main Touch Indicator */}
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/90 bg-[#FF6633]/80 shadow-[0_4px_15px_rgba(255,102,51,0.5)] backdrop-blur-sm transition-transform duration-200 ${
          isTapping ? 'scale-75 bg-[#FF6633]' : 'scale-100'
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-white" />
      </div>
    </div>
  );
}
