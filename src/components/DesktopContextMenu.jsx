import { createPortal } from "react-dom";
import "./desktop-context-menu.scss";

const MENU_ITEMS = [
  { label: "New Folder" },
  { label: "Get Info" },
  { label: "Change Desktop Background", action: "changeWallpaper" },
  { label: "Use Stacks" },
  { label: "Sort By" },
  { label: "Clean Up" },
  { label: "Clean Up By" },
  { label: "Show View Options" },
];

export default function DesktopContextMenu({ position, onClose, onAction }) {
  if (!position) return null;

  const handleItemClick = (item) => {
    if (item.action) onAction?.(item.action);
    onClose();
  };

  return createPortal(
    <div
      className="desktop-context-menu"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div className="d-c-container">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className="dropdown-item"
            onClick={() => handleItemClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>,
    document.body,
  );
}