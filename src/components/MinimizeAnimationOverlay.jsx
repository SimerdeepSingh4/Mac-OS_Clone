import { useEffect, useRef } from "react";
import { useMinimizeAnimation } from "../context/MinimizeAnimationContext";
import "./MinimizeAnimationOverlay.scss";

const DURATION_MS = 280;

export default function MinimizeAnimationOverlay() {
  const { animation, finishMinimize } = useMinimizeAnimation();
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!animation) return;
    const el = overlayRef.current;
    if (!el) return;
    const { fromRect, toRect } = animation;
    const cx = fromRect.left + fromRect.width / 2;
    const cy = fromRect.top + fromRect.height / 2;
    const tx = toRect.left + toRect.width / 2;
    const ty = toRect.top + toRect.height / 2;
    const scale = Math.min(toRect.width / fromRect.width, toRect.height / fromRect.height) * 0.85;
    el.style.left = `${fromRect.left}px`;
    el.style.top = `${fromRect.top}px`;
    el.style.width = `${fromRect.width}px`;
    el.style.height = `${fromRect.height}px`;
    el.style.transform = `translate(0, 0) scale(1)`;
    el.style.opacity = "1";
    el.getBoundingClientRect();
    requestAnimationFrame(() => {
      el.style.transform = `translate(${tx - cx}px, ${ty - cy}px) scale(${scale})`;
      el.style.opacity = "0.6";
    });
    const t = setTimeout(finishMinimize, DURATION_MS);
    return () => clearTimeout(t);
  }, [animation, finishMinimize]);

  if (!animation) return null;

  return (
    <div
      ref={overlayRef}
      className="minimize-animation-overlay"
      aria-hidden="true"
    />
  );
}
