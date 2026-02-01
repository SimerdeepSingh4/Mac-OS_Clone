import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { useMinimizeAnimation } from "../../context/MinimizeAnimationContext";
import "./window.scss";

const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const displayTitle = (name) =>
  name === "cli"
    ? "Terminal"
    : name === "linkedin"
      ? "LinkedIn"
      : name === "calendar"
        ? "Calendar"
        : titleCase(name);

const MacWindow = ({ children, width = "42vw", height = "45vh", windowName, setWindowState, windowProps }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [fullTopOffset, setFullTopOffset] = useState(0);
    const title = displayTitle(windowName);
    const windowRef = useRef(null);
    const minimizeAnim = useMinimizeAnimation?.();

    const handleClose = () => {
        if (typeof setWindowState === 'function') {
            setWindowState(state => ({ ...state, [windowName]: false }));
        }
        if (windowProps && typeof windowProps.setMinimizedWindows === 'function') {
            windowProps.setMinimizedWindows(s => ({ ...s, [windowName]: false }));
        }
        // clear maximized state if present
        if (windowProps && typeof windowProps.setMaximizedWindows === 'function') {
            windowProps.setMaximizedWindows(s => ({ ...s, [windowName]: false }));
        }
    };

    const handleMinimize = () => {
        if (windowProps && typeof windowProps.setMaximizedWindows === "function") {
            windowProps.setMaximizedWindows((s) => ({ ...s, [windowName]: false }));
        }
        setIsMaximized(false);
        if (minimizeAnim?.startMinimize && windowRef.current) {
            const rect = windowRef.current.getBoundingClientRect();
            minimizeAnim.startMinimize(windowName, rect);
        } else if (windowProps?.setMinimizedWindows) {
            windowProps.setMinimizedWindows((s) => ({ ...s, [windowName]: true }));
        }
    };

    const handleMaximize = () => {
        const newVal = !isMaximized;
        setIsMaximized(newVal);
        // update global maximized state so App can react
        if (windowProps && typeof windowProps.setMaximizedWindows === 'function') {
            windowProps.setMaximizedWindows(s => ({ ...s, [windowName]: newVal }));
        }
        // bring to top
        if (windowProps && typeof windowProps.setTopZIndex === 'function') {
            windowProps.setTopZIndex(z => z + 1);
        }

        // compute nav offset when maximizing
        if (newVal) {
            const navEl = document.querySelector('.nav');
            const navHeight = navEl ? navEl.offsetHeight : 56;
            setTimeout(() => {
                setFullTopOffset(navHeight);
            }, 0);
        }
    };

    // if maximized, render as fixed full-screen window under the navbar
    if (isMaximized) {
        const zIdx = windowProps && windowProps.topZIndex ? windowProps.topZIndex + 1000 : 9999;
        return (
            <div className="mac-window-full" style={{ zIndex: zIdx, top: fullTopOffset ? `${fullTopOffset}px` : undefined }}>
                <div ref={windowRef} className="window">
                    <div className='navs'>
                        <div className="dots">
                            <div className="dot red" onClick={handleClose} title="Close" aria-label="Close window" role="button" tabIndex={0} />
                            <div className="dot yellow" onClick={handleMinimize} title="Minimize" aria-label="Minimize window" role="button" tabIndex={0} />
                            <div className="dot green" onClick={handleMaximize} title="Maximize" aria-label="Maximize window" role="button" tabIndex={0} />
                        </div>
                        <div className="title" onDoubleClick={handleMaximize}>
                            {title}
                        </div>
                    </div>
                    <div className="main-content">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Rnd
            className="mac-window-rnd"
            cancel=".dot, .dot *"
            dragHandleClassName="title"
            default={{ width, height, x: 280, y: 180 }}
            minWidth={320}
            minHeight={240}
            size={undefined}
            disableDragging={false}
            enableResizing={true}
            onMouseDown={() => windowProps?.setTopZIndex?.(z => z + 1)}
        >
            <div ref={windowRef} className="window">
                <div className="navs">
                    <div className="dots">
                        <div className="dot red" onClick={handleClose} title="Close" aria-label="Close window" role="button" tabIndex={0} />
                        <div className="dot yellow" onClick={handleMinimize} title="Minimize" aria-label="Minimize window" role="button" tabIndex={0} />
                        <div className="dot green" onClick={handleMaximize} title="Maximize" aria-label="Maximize window" role="button" tabIndex={0} />
                    </div>
                    <div className="title" onDoubleClick={handleMaximize}>
                        {title}
                    </div>
                </div>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow