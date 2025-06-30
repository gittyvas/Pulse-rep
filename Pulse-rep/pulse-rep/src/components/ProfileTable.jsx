import { useState, useMemo } from "react"

export default function ProfileTable({
  profiles = [],
  accentColor = "#21CC5F",
  headerColor = "#F9FAFB",
  textColor = "#0F172A",
  borderColor = "#E2E8F0",
  searchPlaceholder = "Search profiles...",
  showSearch = true,
  compactMode = false,
  onDelete = () => {},
}) {
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState(profiles)

  const filtered = useMemo(() => {
    if (!query) return rows
    return rows.filter((p) =>
      `${p.name} ${p.email}`.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, rows])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setRows((prev) => prev.filter((p) => p.id !== id))
      onDelete(id)
    }
  }

  return (
    <div className="font-sans w-full flex flex-col gap-3">
      {showSearch && (
        <input
          className="p-2 border rounded-md text-sm"
          style={{
            borderColor,
            fontSize: compactMode ? 13 : 15,
          }}
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      <div className="overflow-x-auto border rounded-lg" style={{ borderColor }}>
        <table className="w-full text-sm table-auto">
          <thead style={{ background: headerColor, color: textColor }}>
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Last Active</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t" style={{ borderColor }}>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {p.avatar ? (
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ background: accentColor }}
                      >
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {p.name}
                  </div>
                </td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">{p.role || "-"}</td>
                <td className="p-3">{p.lastSeen || "-"}</td>
                <td className="p-3 text-red-600 cursor-pointer">
                  <button onClick={() => handleDelete(p.id)} title="Delete profile">
                    🗑
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  No profiles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
