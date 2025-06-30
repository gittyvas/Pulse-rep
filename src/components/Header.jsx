import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <Link to="/" className="text-xl font-bold text-emerald-600">Pulse</Link>
      <nav className="space-x-4 text-sm text-gray-700">
        <Link to="/contacts" className="hover:text-emerald-600">Contacts</Link>
        <Link to="/notes" className="hover:text-emerald-600">Notes</Link>
        <Link to="/reminders" className="hover:text-emerald-600">Reminders</Link>
        <Link to="/settings" className="hover:text-emerald-600">Settings</Link>
      </nav>
    </header>
  )
}
