import { createPortal } from "react-dom";
import "./WallpaperPicker.scss";



const WALLPAPERS = [
  { id: "mac", label: "Default", value: "url(/mac-wallpaper.jpg)" },
  { id: "midnight-city", label: "Midnight City", value: "url(/mac-wallpaper2.jpg)" },
  { id: "mount-fuji", label: "Mount Fuji", value: "url(/mac-wallpaper3.jpeg)" },
  { id: "cinque-terre", label: "Cinque Terre", value: "url(/mac-wallpaper4.jpeg)" },
  { id: "red-autumn", label: "Red Autumn", value: "url(/mac-wallpaper5.jpg)" },
  { id: "pink-supermoon", label: "Pink Moon", value: "url(/mac-wallpaper8.jpg)" },
  { id: "golden-peak", label: "Golden Peak", value: "url(/mac-wallpaper7.jpg)" },
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
