import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import { Button } from "@/components/ui/button";
import { Search, Bell, Calendar, Shield, Zap, FileText } from "lucide-react";

export default function Home() {
  const navigate = useNavigate(); // ✅ INITIALIZE HOOK

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between shadow-sm bg-white">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#25D366" d="M24 4C13.51 4 5 12.51 5 23c0 3.93 1.2 7.57 3.25 10.6L5 44l10.77-3.11A19 19 0 0 0 24 42c10.49 0 19-8.51 19-19S34.49 4 24 4z" />
            <text x="24" y="30" textAnchor="middle" fontSize="18" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold">P</text>
          </svg>
          <span className="font-semibold text-lg">Pulse</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-emerald-600">Features</a>
          <a href="#pricing" className="hover:text-emerald-600">Pricing</a>
          <a href="#faq" className="hover:text-emerald-600">FAQ</a>
          <a href="/about" className="hover:text-emerald-600">About</a>
          <a href="/privacy" className="hover:text-emerald-600">Privacy</a>
          <a href="/terms" className="hover:text-emerald-600">Terms</a>
          <a href="/login" className="hover:text-emerald-600">Login</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-20 pb-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Stay <span className="text-emerald-600">closer</span> to the people who matter.
          </h1>
          <p className="text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0 text-gray-600">
            Organize your network, remember special moments, and never forget to follow up. Pulse CRM syncs with your Google Contacts to keep your relationships strong.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl px-8 py-5 rounded-2xl text-lg transition"
            onClick={() => navigate("/signup")} // ✅ REDIRECT TO SIGNUP
          >
            Sign in / Sign up
          </Button>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6 max-w-md mx-auto md:mx-0">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src="/illustrations/dashboard-green.png"
            alt="Pulse dashboard"
            className="rounded-2xl shadow-lg border border-gray-200 w-full h-auto object-contain"
          />
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src="/illustrations/dashboard-analytics.png"
            alt="Analytics dashboard"
            className="rounded-2xl shadow-lg border border-gray-200 w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-12 lg:px-24 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-14">Features that connect you</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Smart Search", desc: "Find any contact in seconds with fuzzy matching and tags.", icon: <Search className="w-6 h-6 text-emerald-600" /> },
            { title: "Reminders", desc: "Birthday and follow‑up nudges so you never lose touch.", icon: <Bell className="w-6 h-6 text-emerald-600" /> },
            { title: "Notes & Timeline", desc: "Jot down memories, last talks, and next steps.", icon: <FileText className="w-6 h-6 text-emerald-600" /> },
            { title: "Calendar Sync", desc: "See upcoming events beside your contacts.", icon: <Calendar className="w-6 h-6 text-emerald-600" /> },
            { title: "Privacy First", desc: "Your data lives in your account. Export or delete anytime.", icon: <Shield className="w-6 h-6 text-emerald-600" /> },
            { title: "Instant Setup", desc: "Sign in with Google — no extensions required.", icon: <Zap className="w-6 h-6 text-emerald-600" /> },
          ].map(({ title, desc, icon }) => (
            <div key={title} className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-emerald-100">
                {icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 lg:px-24 bg-white border-t text-sm text-center text-gray-500">
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
