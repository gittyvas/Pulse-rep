import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'

// Pages wrapping tables
import ContactsPage from './pages/Contacts'
import NotesPage from './pages/Notes'
import RemindersPage from './pages/Reminders'
import SettingsPage from './pages/Settings'
import ProfilePage from './pages/Profile'
import SearchPage from './pages/Search'
import DashboardPage from './pages/Dashboard'

// Static
import Privacy from './pages/Privacy'

// Scroll to top on route change
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

// 404 fallback page
function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center text-center p-6 text-gray-600">
      <div>
        <h1 className="text-3xl font-bold mb-2">404 – Page Not Found</h1>
        <p className="mb-4">Oops, we couldn't find what you're looking for.</p>
        <a href="/" className="text-emerald-600 underline">Go Home</a>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
