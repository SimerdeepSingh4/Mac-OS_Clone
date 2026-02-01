import { createPortal } from "react-dom";
import "./WallpaperPicker.scss";

const WALLPAPERS = [
  { id: "mac", label: "Default", value: "url(/mac-wallpaper.jpg)" },
  { id: "gradient-blue", label: "Blue Night", value: "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" },
  { id: "gradient-sunset", label: "Sunset", value: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #e94560 100%)" },
  { id: "gradient-forest", label: "Forest", value: "linear-gradient(180deg, #0d1b0d 0%, #1b3d1b 40%, #2d5a27 100%)" },
  { id: "gradient-midnight", label: "Midnight", value: "linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)" },
  { id: "solid-dark", label: "Dark", value: "#1c1c1e" },
];

export default function WallpaperPicker({ open, onClose, currentWallpaper, onSelect }) {
  if (!open) return null;

  const handleSelect = (w) => {
    onSelect?.(w.value);
    onClose();
  };

  const content = (
    <div className="wallpaper-picker-backdrop" onClick={onClose} aria-hidden="true">
      <div className="wallpaper-picker-panel" onClick={(e) => e.stopPropagation()}>
        <div className="wallpaper-picker-header">
          <h2 className="wallpaper-picker-title">Change Desktop Background</h2>
          <button type="button" className="wallpaper-picker-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="wallpaper-picker-grid">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`wallpaper-picker-option ${currentWallpaper === w.value ? "selected" : ""}`}
              onClick={() => handleSelect(w)}
            >
              <span
                className="wallpaper-picker-thumb"
                style={{ background: w.value }}
              />
              <span className="wallpaper-picker-label">{w.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
