import React, { useState, useRef, useEffect } from "react";
import "./nav.scss";
import DateTime from "./DateTime";
import MenuDropdown from "./MenuDropdown";

const MENUS = {
  apple: [
    { label: "About This Mac", action: "about" },
    "System Settings…",
    "App Store…",
    "—",
    "Recent Items",
    "—",
    "Force Quit…",
    "—",
    "Sleep",
    "Restart…",
    "Shut Down…",
    "—",
    "Lock Screen",
    "Log Out…",
  ],
  app: ["About Simerdeep Singh", "Preferences…", "—", "Services", "Hide Others", "Show All", "—", "Quit"],
  file: ["New Finder Window", "New Folder", "—", "Open…", "Get Info", "—", "Close Window"],
  window: ["Minimize", "Zoom", "—", "Bring All to Front", "—", "Enter Full Screen"],
  help: ["macOS Help", "—", "Report an Issue"],
};

function isMenuItem(item) {
  return typeof item === "object" && item !== null && "label" in item;
}

const Nav = ({
  onOpenSpotlight,
  onOpenControlCenter,
  onMenuAction,
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !e.target.closest(".menu-dropdown-portal") &&
        !e.target.closest(".control-center-panel")
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMenuClick = (key, e) => {
    e.stopPropagation();
    setOpenMenu(openMenu === key ? null : key);
  };

  const handleMenuItemClick = (item) => {
    if (isMenuItem(item) && item.action) {
      onMenuAction?.(item.action);
      setOpenMenu(null);
    }
  };

  const getRect = () => {
    if (!openMenu || !navRef.current) return null;
    const el = navRef.current.querySelector(`[data-menu="${openMenu}"]`);
    return el ? el.getBoundingClientRect() : null;
  };

  const openCC = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onOpenControlCenter?.(rect);
  };

  return (
    <nav ref={navRef} className="nav" role="menubar">
      <div className="left">
        <button
          type="button"
          className="nav-item apple-icon"
          data-menu="apple"
          onClick={(e) => handleMenuClick("apple", e)}
          aria-haspopup="true"
          aria-expanded={openMenu === "apple"}
          aria-label="Apple menu"
        >
          <img src="/navbar-icons/apple.svg" alt="" />
        </button>
        <button
          type="button"
          className="nav-item"
          data-menu="app"
          onClick={(e) => handleMenuClick("app", e)}
          aria-haspopup="true"
          aria-expanded={openMenu === "app"}
        >
          Simerdeep Singh
        </button>
        <button
          type="button"
          className="nav-item"
          data-menu="file"
          onClick={(e) => handleMenuClick("file", e)}
          aria-haspopup="true"
          aria-expanded={openMenu === "file"}
        >
          File
        </button>
        <button
          type="button"
          className="nav-item"
          data-menu="window"
          onClick={(e) => handleMenuClick("window", e)}
          aria-haspopup="true"
          aria-expanded={openMenu === "window"}
        >
          Window
        </button>
        <button
          type="button"
          className="nav-item"
          data-menu="help"
          onClick={(e) => handleMenuClick("help", e)}
          aria-haspopup="true"
          aria-expanded={openMenu === "help"}
        >
          Help
        </button>
      </div>
      <div className="right">
        <button
          type="button"
          className="nav-item nav-icon"
          onClick={onOpenSpotlight}
          aria-label="Spotlight Search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button
          type="button"
          className="nav-item nav-icon control-center-trigger"
          onClick={openCC}
          aria-label="Battery"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="7" width="14" height="10" rx="2" />
            <path d="M20 10v4" strokeWidth="1.5" />
            <path d="M6 10v4h6V10" fill="currentColor" fillOpacity="0.9" />
          </svg>
        </button>
        <button
          type="button"
          className="nav-item nav-icon control-center-trigger"
          onClick={openCC}
          aria-label="Sound"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </button>
        <div className="nav-icon" aria-hidden="true">
          <img src="/navbar-icons/wifi.svg" alt="" />
        </div>
        <div className="nav-item nav-datetime" aria-label="Date and time">
          <DateTime />
        </div>
      </div>

      <MenuDropdown rect={getRect()}>
        {openMenu &&
          MENUS[openMenu]?.map((item, i) =>
            item === "—" ? (
              <div key={`${openMenu}-sep-${i}`} className="menu-sep" />
            ) : isMenuItem(item) ? (
              <button
                key={`${openMenu}-${i}`}
                type="button"
                className="menu-item menu-item-action"
                onClick={() => handleMenuItemClick(item)}
              >
                {item.label}
              </button>
            ) : (
              <div key={`${openMenu}-${i}`} className="menu-item">
                {item}
              </div>
            )
          )}
      </MenuDropdown>
    </nav>
  );
};

export default Nav;