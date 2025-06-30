#!/bin/bash

set -e

COMPONENTS_DIR="components"
PAGES_DIR="pages"

echo "📦 Creating Header.jsx..."
cat > "$COMPONENTS_DIR/Header.jsx" <<EOF
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
EOF

echo "📦 Creating Layout.jsx..."
cat > "$COMPONENTS_DIR/Layout.jsx" <<EOF
import Header from "./Header"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
EOF

# ✅ Pages to update
PAGES=("Contacts" "Notes" "Reminders" "Dashboard" "Settings" "Profile" "Search")

for PAGE in "${PAGES[@]}"; do
  FILE="$PAGES_DIR/$PAGE.jsx"
  if [ -f "$FILE" ]; then
    echo "🛠️  Updating $PAGE.jsx..."
    cat > "$FILE" <<EOF
import Layout from "../components/Layout"

export default function $PAGE() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">$PAGE</h1>
      {/* TODO: Add component for $PAGE content */}
    </Layout>
  )
}
EOF
  else
    echo "⚠️  Skipping: $PAGE.jsx not found"
  fi
done

echo "✅ All matching pages are wrapped with <Layout />!"
