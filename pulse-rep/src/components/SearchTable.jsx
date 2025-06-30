import React, { useState, useEffect, useCallback, useMemo } from "react"

const kindIcon = {
  contact: "👤",
  note: "🗒️",
  reminder: "⏰",
}

export default function SearchTable({
  results = [],
  accentColor = "#25D366",
  emptyText = "No results found.",
  onSelect = () => {},
  placeholder = "Search..."
}) {
  const [active, setActive] = useState(0)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return results.filter(r =>
      r.title.toLowerCase().includes(q) || r.snippet.toLowerCase().includes(q)
    )
  }, [query, results])

  const handleKeyDown = useCallback(
    (e) => {
      if (!filtered.length) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((i) => (i + 1) % filtered.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((i) => (i - 1 + filtered.length) % filtered.length)
      } else if (e.key === "Enter") {
        onSelect(filtered[active].id)
      }
    },
    [filtered, active, onSelect]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const highlight = (text) =>
    text.replace(
      /(pulse|crm|contact|note|reminder)/gi,
      (match) => `<b style="color:${accentColor}">${match}</b>`
    )

  return (
    <div className="w-full font-sans space-y-4">
      {/* Search Box */}
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
        }}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-400 p-6">{emptyText}</div>
      ) : (
        <div className="grid gap-2">
          {filtered.map((r, idx) => (
            <div
              key={r.id}
              className={`flex gap-3 items-start p-3 rounded-lg border cursor-pointer ${
                idx === active
                  ? "bg-emerald-50 border-emerald-500"
                  : "bg-white border-gray-200"
              }`}
              onClick={() => onSelect(r.id)}
              onMouseEnter={() => setActive(idx)}
            >
              <div className="text-xl w-7 text-center">{kindIcon[r.kind]}</div>
              <div className="flex-1">
                <div
                  className="font-semibold mb-1"
                  dangerouslySetInnerHTML={{ __html: highlight(r.title) }}
                />
                <div
                  className="text-sm text-slate-500"
                  dangerouslySetInnerHTML={{ __html: highlight(r.snippet) }}
                />
              </div>
              {r.updatedAt && (
                <div className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(r.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
