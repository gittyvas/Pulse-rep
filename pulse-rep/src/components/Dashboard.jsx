// CRM Dashboard internal page for Pulse after login
// Responsive, minimal, WhatsApp‑green accent (#25D366)
// Works in any React (Vite) project — no Framer‑specific APIs needed.
// ---------------------------------------------------------------
import { useState } from "react";

export default function Dashboard({
  darkMode = false,
  showDarkModeToggle = true,
  totalContacts = 128,
  remindersToday = 3,
  recentNotes = 7,
}) {
  const accent = "#25D366";
  const [isDark, setDark] = useState(darkMode);
  const sidebarLinks = [
    { label: "Dashboard", icon: "🏠" },
    { label: "Contacts", icon: "👥" },
    { label: "Reminders", icon: "⏰" },
    { label: "Notes", icon: "📝" },
    { label: "Search", icon: "🔍" },
    { label: "Profile", icon: "👤" },
    { label: "Settings", icon: "⚙️" },
  ];
  const [active, setActive] = useState(0);

  const Logo = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={accent}
        d="M24 4C13.51 4 5 12.51 5 23c0 3.93 1.2 7.57 3.25 10.6L5 44l10.77-3.11A19 19 0 0 0 24 42c10.49 0 19-8.51 19-19S34.49 4 24 4z"
      />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontSize="20"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fill="white"
      >
        P
      </text>
    </svg>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 480,
        background: isDark ? "#181C1F" : "#fff",
        color: isDark ? "#fff" : "#222",
        display: "flex",
        fontFamily: "Inter, sans-serif",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          minWidth: 180,
          background: isDark ? "#23272A" : "#F7F7F7",
          borderRight: `1px solid ${isDark ? "#23272A" : "#EEE"}`,
          display: "flex",
          flexDirection: "column",
          padding: "32px 0 0 0",
          gap: 4,
          position: "sticky",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 32px 32px 32px",
          }}
        >
          {Logo}
          <span
            style={{
              fontWeight: 700,
              fontSize: 22,
              color: accent,
              letterSpacing: -1,
            }}
          >
            Pulse
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sidebarLinks.map((link, i) => (
            <a
              key={link.label}
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 32px",
                fontWeight: 500,
                fontSize: 16,
                color: active === i ? accent : isDark ? "#fff" : "#222",
                borderLeft:
                  active === i ? `4px solid ${accent}` : "4px solid transparent",
                background:
                  active === i ? "rgba(37,211,102,0.08)" : "none",
                textDecoration: "none",
                borderRadius: "0 20px 20px 0",
                transition: "background 0.15s, color 0.15s",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(37,211,102,0.12)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  active === i ? "rgba(37,211,102,0.08)" : "none")
              }
            >
              <span style={{ fontSize: 20 }}>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <header
          style={{
            width: "100%",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            borderBottom: isDark ? "1px solid #23272A" : "1px solid #EEE",
            background: isDark ? "#181C1F" : "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 20, letterSpacing: -0.5 }}>
            Welcome, <span style={{ color: accent }}>Alex</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {showDarkModeToggle && (
              <button
                aria-label="Toggle dark mode"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 20,
                  color: accent,
                }}
                onClick={() => setDark((d) => !d)}
              >
                {isDark ? "🌙" : "☀️"}
              </button>
            )}
            <span
              style={{ fontSize: 22, color: isDark ? "#fff" : "#888" }}
              role="img"
              aria-label="Notifications"
            >
              🔔
            </span>
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                boxShadow: "0 2px 8px rgba(37,211,102,0.10)",
              }}
            >
              A
            </span>
          </div>
        </header>

        {/* Summary cards */}
        <section
          style={{
            display: "flex",
            gap: 24,
            padding: "32px 32px 0 32px",
            flexWrap: "wrap",
          }}
        >
          <SummaryCard
            icon="👥"
            label="Total Contacts"
            value={totalContacts}
            accent={accent}
            darkMode={isDark}
          />
          <SummaryCard
            icon="⏰"
            label="Reminders Today"
            value={remindersToday}
            accent={accent}
            darkMode={isDark}
          />
          <SummaryCard
            icon="📝"
            label="Recent Notes"
            value={recentNotes}
            accent={accent}
            darkMode={isDark}
          />
        </section>

        {/* Main content placeholder */}
        <main style={{ flex: 1, padding: 32, minHeight: 0 }}>
          <div>
            <p style={{ fontSize: 16, color: isDark ? "#ccc" : "#555" }}>
              Dashboard content goes here.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, accent, darkMode }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 180,
        background: darkMode ? "#23272A" : "#F7F7F7",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        alignItems: "center",
        gap: 18,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        minHeight: 80,
      }}
    >
      <span
        style={{
          fontSize: 32,
          background: accent,
          color: "#fff",
          borderRadius: 12,
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(37,211,102,0.10)",
        }}
      >
        {icon}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: 26,
            color: accent,
            letterSpacing: -1,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontWeight: 500,
            fontSize: 15,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
