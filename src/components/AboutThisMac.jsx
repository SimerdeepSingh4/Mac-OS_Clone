import { createPortal } from "react-dom";
import VibeLogo from "../../public/navbar-icons/AppleIcon";
import "./AboutThisMac.scss";
import pkg from "../../package.json";

export default function AboutThisMac({ open, onClose }) {
    if (!open) return null;

    const cpuCores = navigator.hardwareConcurrency || "Unknown";
    // deviceMemory is not available in all browsers
    const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unknown";

    const content = (
        <div className="about-backdrop" onClick={onClose} aria-hidden>
            <div className="about-panel" onClick={(e) => e.stopPropagation()} role="dialog">
                <div className="about-header">
                    <VibeLogo className="about-logo" size={120} />
                    <h1 className="about-title">Mac OS Clone</h1>
                    <p className="about-version">Version {pkg.version}</p>
                </div>

                <div className="about-specs">
                    <div className="about-row">
                        <div className="about-label">Processor</div>
                        <div className="about-value">{cpuCores}‑core</div>
                    </div>
                    <div className="about-row">
                        <div className="about-label">Memory</div>
                        <div className="about-value">{memory}</div>
                    </div>

                </div>

                <div className="about-description">
                    <p>
                        This project is a web-based clone of the MacOS desktop environment, built using React and Vite. It aims to replicate the look and feel of MacOS, including the desktop, dock, and various UI elements. This is a personal project to showcase front-end development skills.
                    </p>
                </div>

                <div>
                    <button type="button" className="about-button" onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
}
