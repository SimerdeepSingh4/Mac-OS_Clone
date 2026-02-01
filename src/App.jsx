import "./app.scss";
import { useState, useEffect } from "react";
import { MinimizeAnimationProvider } from "./context/MinimizeAnimationContext";
import Dock from "./components/Dock";
import Navbar from "./components/Nav";
import GitHub from "./components/windows/GitHub";
import Note from "./components/windows/Note";
import Resume from "./components/windows/Resume";
import Spotify from "./components/windows/Spotify";
import Cli from "./components/windows/Cli";
import LinkedIn from "./components/windows/LinkedIn";
import Calendar from "./components/windows/Calendar";
import DesktopContextMenu from "./components/DesktopContextMenu";
import BootScreen from "./components/BootScreen";
import Spotlight from "./components/Spotlight";
import ControlCenter from "./components/ControlCenter";
import AboutThisMac from "./components/AboutThisMac";
import MinimizeAnimationOverlay from "./components/MinimizeAnimationOverlay";
import WallpaperPicker from "./components/WallpaperPicker";

const DEFAULT_WALLPAPER = "url(/mac-wallpaper.jpg)";

function App() {
  const [booting, setBooting] = useState(true);
  const [desktopMenuPos, setDesktopMenuPos] = useState(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [controlCenter, setControlCenter] = useState(null);
  const [wallpaperPickerOpen, setWallpaperPickerOpen] = useState(false);
  const [wallpaper, setWallpaperState] = useState(() => {
    try {
      return localStorage.getItem("macos-wallpaper") || DEFAULT_WALLPAPER;
    } catch {
      return DEFAULT_WALLPAPER;
    }
  });

  const setWallpaper = (value) => {
    setWallpaperState(value);
    try {
      localStorage.setItem("macos-wallpaper", value);
    } catch {}
  };

  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
    linkedin: false,
    calendar: false,
  });

  const [minimizedWindows, setMinimizedWindows] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
    linkedin: false,
    calendar: false,
  });

  // track which windows are currently maximized
  const [maximizedWindows, setMaximizedWindows] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
    linkedin: false,
    calendar: false,
  });

  const [topZIndex, setTopZIndex] = useState(1);

  const windowsConfig = [
    { key: "github", component: GitHub },
    { key: "note", component: Note },
    { key: "resume", component: Resume },
    { key: "spotify", component: Spotify },
    { key: "cli", component: Cli },
    { key: "linkedin", component: LinkedIn },
    { key: "calendar", component: Calendar },
  ];

  const windowProps = {
    setWindowsState,
    topZIndex,
    setTopZIndex,
    minimizedWindows,
    setMinimizedWindows,
    maximizedWindows,
    setMaximizedWindows,
  }; 

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    if (e.target.closest(".mac-window-rnd") || e.target.closest(".dock")) return;
    setDesktopMenuPos({ x: e.clientX, y: e.clientY });
  };

  const closeDesktopMenu = () => setDesktopMenuPos(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeDesktopMenu();
        setSpotlightOpen(false);
        setControlCenter(null);
        setWallpaperPickerOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === " ") {
        e.preventDefault();
        setSpotlightOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openApp = (key) => {
    setWindowsState((s) => ({ ...s, [key]: true }));
    setSpotlightOpen(false);
  };

  return (
    <>
      {booting && <BootScreen onFinish={() => setBooting(false)} />}

      <div
        className="desktop-background"
        style={{ backgroundImage: wallpaper }}
      />
      <MinimizeAnimationProvider setMinimizedWindows={setMinimizedWindows}>
        <main
          onClick={() => {
            closeDesktopMenu();
            setControlCenter(null);
          }}
          onContextMenu={handleDesktopContextMenu}
          className={`${booting ? "app-hidden" : ""} ${Object.values(maximizedWindows).some(Boolean) ? "has-maximized" : ""}`}
        >
          <Navbar
            onOpenSpotlight={() => setSpotlightOpen(true)}
            onOpenControlCenter={(rect) => setControlCenter({ rect })}
            onMenuAction={(action) => {
              if (action === "about") setAboutOpen(true);
            }}
          />
          <div id="desktop">
      {/* hotspot to reveal dock when a window is maximized */}
      <div id="dock-hotspot" aria-hidden="true"></div>

      <Dock
        windowsState={windowsState}
        setWindowsState={setWindowsState}
        setMinimizedWindows={setMinimizedWindows}
      />

      {windowsConfig.map(({ key, component: WindowComponent }) =>
        windowsState[key] && !minimizedWindows[key] ? (
          <WindowComponent
            key={key}
            windowName={key}
            setWindowState={setWindowsState}
            windowProps={windowProps}
          />
        ) : null
      )}
    </div>
          <DesktopContextMenu
            position={desktopMenuPos}
            onClose={closeDesktopMenu}
            onAction={(action) => {
              if (action === "changeWallpaper") setWallpaperPickerOpen(true);
            }}
          />
        </main>

        <Spotlight
          open={spotlightOpen}
          onClose={() => setSpotlightOpen(false)}
          onOpenApp={openApp}
        />
        <ControlCenter
          open={!!controlCenter}
          rect={controlCenter?.rect ?? null}
          onClose={() => setControlCenter(null)}
        />
        <AboutThisMac open={aboutOpen} onClose={() => setAboutOpen(false)} />
        <WallpaperPicker
          open={wallpaperPickerOpen}
          onClose={() => setWallpaperPickerOpen(false)}
          currentWallpaper={wallpaper}
          onSelect={setWallpaper}
        />
        <MinimizeAnimationOverlay />
      </MinimizeAnimationProvider>
    </>
  );
}

export default App;