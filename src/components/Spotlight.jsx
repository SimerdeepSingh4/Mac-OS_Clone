import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Spotlight.scss";

const ICONS = {
  github: "/doc-icons/github.svg",
  note: "/doc-icons/note.svg",
  resume: "/doc-icons/pdf.svg",
  spotify: "/doc-icons/spotify.svg",
  cli: "/doc-icons/cli.svg",
  linkedin: "/doc-icons/linkedin_v2.svg",
  calender: "/doc-icons/calender.svg",
  mail: "/doc-icons/mail.svg"
};

const APPS = [
  { key: "github", label: "GitHub" },
  { key: "note", label: "Notes" },
  { key: "resume", label: "Resume" },
  { key: "spotify", label: "Spotify" },
  { key: "cli", label: "Terminal" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "calender", label: "Calender" },
  { key: "mail", label: "Mail" },
];

export default function Spotlight({ open, onClose, onOpenApp }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Enter") {
        const first = filtered[0];
        if (first) onOpenApp?.(first.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query]);

  if (!open) return null;

  const filtered = APPS.filter((a) =>
    a.label.toLowerCase().includes(query.trim().toLowerCase()) || a.key.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleOpen = (key) => {
    onOpenApp?.(key);
    onClose?.();
  };

  const content = (
    <div className="spotlight-backdrop" onClick={onClose} aria-hidden>
      <div className="spotlight-panel" onClick={(e) => e.stopPropagation()}>
        <div className="spotlight-search">
          <div className="spotlight-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="6"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
          <input
            ref={inputRef}
            className="spotlight-input"
            placeholder="Search apps, files, and more"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Spotlight Search"
          />
        </div>

        <div className="spotlight-results">
          <div className="spotlight-section-label">Applications</div>
          {filtered.length === 0 ? (
            <div className="spotlight-empty">No results</div>
          ) : (
            filtered.map((app) => (
              <button
                key={app.key}
                type="button"
                className="spotlight-row"
                onClick={() => handleOpen(app.key)}
              >
                <div className={`spotlight-row-icon ${app.key}`} aria-hidden>
                  <img src={ICONS[app.key] ?? '/doc-icons/link.svg'} alt="" />
                </div>
                <div>{app.label}</div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
