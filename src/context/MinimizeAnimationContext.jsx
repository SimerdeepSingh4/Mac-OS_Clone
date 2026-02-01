import { createContext, useContext, useRef, useState, useCallback } from "react";

const MinimizeAnimationContext = createContext(null);

export function MinimizeAnimationProvider({ children, setMinimizedWindows }) {
  const dockIconRefs = useRef({});
  const [animation, setAnimation] = useState(null);

  const registerDockIcon = useCallback((key, el) => {
    if (key) dockIconRefs.current[key] = el;
  }, []);

  const startMinimize = useCallback((appKey, fromRect) => {
    const iconEl = dockIconRefs.current[appKey];
    const toRect = iconEl ? iconEl.getBoundingClientRect() : null;
    setMinimizedWindows((s) => ({ ...s, [appKey]: true }));
    if (!toRect) return;
    setAnimation({ appKey, fromRect, toRect });
  }, [setMinimizedWindows]);

  const finishMinimize = useCallback(() => {
    setAnimation(null);
  }, []);

  const value = {
    registerDockIcon,
    startMinimize,
    animation,
    finishMinimize,
  };

  return (
    <MinimizeAnimationContext.Provider value={value}>
      {children}
    </MinimizeAnimationContext.Provider>
  );
}

export function useMinimizeAnimation() {
  return useContext(MinimizeAnimationContext) ?? {};
}
