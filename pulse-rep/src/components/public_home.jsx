import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// ⏩ Public (unauthenticated) landing page for Pulse CRM
//    • WhatsApp‑green (#25D366) accent
//    • Responsive hero, features grid, footer
//    • Expects a `onLogin` prop (opens Google OAuth)
// -----------------------------------------------------------------------------
export default function PublicHome({ onLogin }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#25D366"
              d="M24 4C13.51 4 5 12.51 5 23c0 3.93 1.2 7.57 3.25 10.6L5 44l10.77-3.11A19 19 0 0 0 24 42c10.49 0 19-8.51 19-19S34.49 4 24 4z"
            />
            <text
              x="24"
              y="30"
              text-anchor="middle"
              font-size="18"
              fill="white"
              font-family="Arial, sans-serif"
              font-weight="bold"
            >P</text>
          </svg>
          <span className="font-semibold text-lg">Pulse</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-emerald-600">Features</a>
          <a href="#pricing" className="hover:text-emerald-600">Pricing</a>
          <a href="#faq" className="hover:text-emerald-600">FAQ</a>
          <a href="/about" className="hover:text-emerald-600">About</a>
          <a href="/privacy" className="hover:text-emerald-600">Privacy</a>
          <a href="/terms" className="hover:text-emerald-600">Terms</a>
          <a href="/login" className="hover:text-emerald-600">Login</a>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 px-6 md:px-12 lg:px-24 pt-12 pb-16 flex-grow">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Stay <span className="text-emerald-600">closer</span> to the
            people who matter.
          </h1>
          <p className="text-lg mb-8 max-w-lg mx-auto md:mx-0">
            Pulse CRM helps you remember birthdays, follow‑ups, and important
            moments — all synced from your Google Contacts.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl px-8 py-6 rounded-2xl text-lg"
            onClick={onLogin}
          >
            Sign in / Sign up
          </Button>
        </div>

        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/illustrations/dashboard-green.svg"
          alt="Pulse dashboard screenshot"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        />
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-12 lg:px-24 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Features that connect you</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Smart Search",
              desc: "Find any contact in seconds with fuzzy matching and tags.",
              icon: "search",
            },
            {
              title: "Reminders",
              desc: "Birthday and follow‑up nudges so you never lose touch.",
              icon: "bell",
            },
            {
              title: "Notes & Timeline",
              desc: "Keep context — jot down memories, last talks, and next steps.",
              icon: "file-text",
            },
            {
              title: "Calendar Sync",
              desc: "See upcoming events across calendars, right beside contacts.",
              icon: "calendar",
            },
            {
              title: "Privacy First",
              desc: "Your data lives in your account. Export or delete anytime.",
              icon: "shield",
            },
            {
              title: "Instant Setup",
              desc: "Sign in with Google — no downloads, no chrome extensions.",
              icon: "zap",
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-full bg-emerald-100">
                <i className={`lucide lucide-${icon} text-emerald-600`}></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 py-10 text-sm text-gray-500 bg-white border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Pulse CRM</p>
          <div className="flex gap-6">
            <a href="/about" className="hover:text-emerald-600">About</a>
            <a href="/privacy" className="hover:text-emerald-600">Privacy Policy</a>
            <a href="/terms" className="hover:text-emerald-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
