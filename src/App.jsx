import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Terms from './pages/Terms'; // ✅ Make sure this is present!
import Privacy from './pages/Privacy';
import ContactsPage from './pages/Contacts';
import NotesPage from './pages/Notes';
import RemindersPage from './pages/Reminders';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/Profile';
import SearchPage from './pages/Search';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <Router>
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
        <Route path="/terms" element={<Terms />} /> {/* ✅ Here */}
      </Routes>
    </Router>
  );
}

export default App;
