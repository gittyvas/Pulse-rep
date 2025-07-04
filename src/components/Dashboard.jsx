import { useState, useEffect } from "react"; // Import useEffect for lifecycle hooks

export default function Dashboard({
  darkMode = false,
  showDarkModeToggle = true,
}) {
  const accent = "#25D366";
  const [isDark, setDark] = useState(darkMode);
  const [active, setActive] = useState(0); // State for active sidebar link
  const [userProfile, setUserProfile] = useState(null); // State to store user profile (e.g., name, email)
  const [contacts, setContacts] = useState([]); // State to store fetched contacts
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  // --- Backend API Base URL ---
  // Replace with your actual deployed Render backend URL
  const BACKEND_BASE_URL = "https://pullse.gitthit.com.ng"; // Make sure this is your correct backend URL

  // --- Effect to extract JWT, fetch user profile, and contacts on component mount ---
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      const urlParams = new URLSearchParams(window.location.search);
      const appJwt = urlParams.get('token');

      let currentJwt = localStorage.getItem('app_jwt');

      // If a new token is in the URL, use it. Otherwise, use the stored one.
      if (appJwt) {
        localStorage.setItem('app_jwt', appJwt);
        currentJwt = appJwt; // Use the new token immediately
        // Clean the URL to remove the token from the address bar
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (!currentJwt) {
        console.warn("No JWT found. User needs to log in.");
        // Redirect to your login page if no token is available
        // window.location.href = '/login';
        setError("Please log in to access the dashboard.");
        setLoading(false);
        return;
      }

      // --- Fetch User Profile (if you have a /api/me or /api/user endpoint) ---
      // Your backend might not have this, so this part is optional.
      // If your backend provides user info via the JWT itself, you can decode it.
      try {
          // Example of decoding JWT if user name is in it (requires a JWT library like 'jwt-decode')
          // import { jwtDecode } from 'jwt-decode';
          // const decoded = jwtDecode(currentJwt);
          // setUserProfile({ name: decoded.user_name || 'User', email: decoded.user_email });

          // If you have a backend endpoint for user profile:
          const userProfileResponse = await fetch(`${BACKEND_BASE_URL}/api/me`, { // Assuming /api/me endpoint
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${currentJwt}`,
                  'Content-Type': 'application/json'
              }
          });

          if (userProfileResponse.status === 401) {
              console.error("User profile session expired. Logging out.");
              handleLogout(); // Log out if token is invalid for profile
              return;
          }
          if (!userProfileResponse.ok) {
              throw new Error(`Failed to fetch user profile: ${userProfileResponse.statusText}`);
          }
          const profileData = await userProfileResponse.json();
          setUserProfile(profileData); // Assuming profileData has a 'name' field
      } catch (profileError) {
          console.warn("Could not fetch user profile (this might be expected if no /api/me endpoint):", profileError);
          setUserProfile({ name: 'User' }); // Fallback
      }


      // --- Fetch Contacts ---
      try {
        const contactsResponse = await fetch(`${BACKEND_BASE_URL}/api/contacts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${currentJwt}`,
            'Content-Type': 'application/json',
          },
        });

        if (contactsResponse.status === 401) {
          console.error("Contacts session expired. Logging out.");
          handleLogout(); // Log out if token is invalid for contacts
          return;
        }

        if (!contactsResponse.ok) {
          throw new Error(`Failed to fetch contacts: ${contactsResponse.statusText}`);
        }

        const contactsData = await contactsResponse.json();
        setContacts(contactsData);
        console.log("Fetched Contacts:", contactsData);

      } catch (contactsError) {
        console.error("Error fetching contacts:", contactsError);
        setError("Failed to load contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run only once on component mount

  // --- Logout Function ---
  const handleLogout = () => {
    localStorage.removeItem('app_jwt'); // Clear the JWT
    // Optionally clear other user-related data from local storage
    // Redirect to your login page
    window.location.href = '/login'; // Or your actual login route
  };


  const sidebarLinks = [
    { label: "Dashboard", icon: "🏠", path: "#dashboard" },
    { label: "Contacts", icon: "👥", path: "#contacts" },
    { label: "Reminders", icon: "⏰", path: "#reminders" },
    { label: "Notes", icon: "📝", path: "#notes" },
    { label: "Search", icon: "🔍", path: "#search" },
    { label: "Profile", icon: "👤", path: "#profile" },
    { label: "Settings", icon: "⚙️", path: "#settings" },
    { label: "Logout", icon: "🚪", action: handleLogout }, // Add logout link
  ];

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
              href={link.path || "#"} // Use link.path or default to #
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
                if (link.action) { // If there's an action, execute it (e.g., logout)
                  link.action();
                } else if (link.path) {
                    // Handle internal navigation for other links if you have routing
                    // For now, just change active state
                }
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
            Welcome,{" "}
            <span style={{ color: accent }}>
              {userProfile ? userProfile.name : "User"}
            </span>{" "}
            {/* Display fetched user name */}
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
            {/* User Avatar - You might want to display userProfile.picture here if available */}
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
              {userProfile && userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
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
            value={loading ? "..." : error ? "Error" : contacts.length} {/* Display actual total contacts */}
            accent={accent}
            darkMode={isDark}
          />
          <SummaryCard
            icon="⏰"
            label="Reminders Today"
            value={0} // Placeholder: You'll need an API for this
            accent={accent}
            darkMode={isDark}
          />
          <SummaryCard
            icon="📝"
            label="Recent Notes"
            value={0} // Placeholder: You'll need an API for this
            accent={accent}
            darkMode={isDark}
          />
        </section>

        {/* Main content area for Contacts */}
        <main style={{ flex: 1, padding: 32, minHeight: 0, overflowY: 'auto' }}>
          <h2>Your Google Contacts</h2>
          {loading && <p>Loading contacts...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && contacts.length === 0 && (
            <p>No contacts found. Make sure you granted Google Contacts permission.</p>
          )}
          {!loading && !error && contacts.length > 0 && (
            <div id="contacts-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {contacts.map((contact) => (
                <div
                  key={contact.resource_name} // Use resource_name as a unique key
                  style={{
                    border: `1px solid ${isDark ? "#333" : "#EEE"}`,
                    borderRadius: '8px',
                    padding: '15px',
                    background: isDark ? "#2A2E31" : "#FDFDFD",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                >
                  {contact.photo_url ? (
                    <img
                      src={contact.photo_url}
                      alt={contact.name || 'Contact Photo'}
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '60px', height: '60px', borderRadius: '50%', background: accent,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '24px', fontWeight: 'bold'
                      }}
                    >
                      {contact.name ? contact.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: isDark ? '#FFF' : '#222' }}>{contact.name || 'Unknown Contact'}</h3>
                    {contact.emails && contact.emails.length > 0 && (
                      <p style={{ margin: '0', fontSize: '14px', color: isDark ? '#CCC' : '#555' }}>
                        Email: {contact.emails.join(', ')}
                      </p>
                    )}
                    {contact.phones && contact.phones.length > 0 && (
                      <p style={{ margin: '0', fontSize: '14px', color: isDark ? '#CCC' : '#555' }}>
                        Phone: {contact.phones.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// SummaryCard component remains largely the same
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
