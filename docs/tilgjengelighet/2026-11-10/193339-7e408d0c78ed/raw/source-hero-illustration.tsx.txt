"use client";
import { useState } from "react";
import { LogoMark } from "./logo-mark";
export function HeroIllustration() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      className="hero-art"
      data-paused={paused}
      aria-label={
        paused
          ? "Start animasjonen i forsideillustrasjonen"
          : "Pause animasjonen i forsideillustrasjonen"
      }
      onClick={() => setPaused((value) => !value)}
    >
      <span className="hero-art-visual" aria-hidden="true">
        <span className="hero-art-ring hero-art-ring-inner" />
        <span className="hero-art-ring hero-art-ring-cross" />
        <span className="hero-art-ring hero-art-ring-diagonal" />
        <span className="hero-art-halo" />
        <i className="hero-art-node hero-art-node-one" />
        <i className="hero-art-node hero-art-node-two" />
        <LogoMark />
      </span>
    </button>
  );
}
