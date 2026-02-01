import { useState } from "react";
import { createPortal } from "react-dom";
import "./ControlCenter.scss";

export default function ControlCenter({ open, rect, onClose }) {
  const [brightness, setBrightness] = useState(60);
  const [volume, setVolume] = useState(40);

  if (!open) return null;

  const panelWidth = 280;
  const panelStyle = rect
    ? {
        top: rect.bottom + 8,
        left: Math.min(Math.max(rect.right - panelWidth, 12), window.innerWidth - panelWidth - 12),
      }
    : { right: 12, bottom: 12 };

  const content = (
    <div className="control-center-backdrop" onClick={onClose} aria-hidden>
      <div
        className="control-center-panel"
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Control Center"
      >
        <div className="control-center-header">
          <div className="control-center-title">Control Center</div>
        </div>

        <div className="control-center-grid">
          <div className="control-center-tile">
            <div className="control-center-tile-icon brightness">☀️</div>
            <div className="control-center-tile-label">Brightness</div>
            <input
              className="control-center-slider"
              type="range"
              min={0}
              max={100}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              aria-label="Brightness"
            />
          </div>

          <div className="control-center-tile">
            <div className="control-center-tile-icon volume">🔊</div>
            <div className="control-center-tile-label">Sound</div>
            <input
              className="control-center-slider"
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
            />
          </div>
        </div>

        <div className="control-center-row">
          <div className="control-center-label">Wi‑Fi</div>
          <div className="control-center-value">Home Network</div>
        </div>

        <div className="control-center-row">
          <div className="control-center-label">Bluetooth</div>
          <div className="control-center-value">On</div>
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="button" className="about-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
