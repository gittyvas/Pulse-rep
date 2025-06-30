import { useState, useEffect, useMemo } from "react"

export default function NoteTable() {
  const [notes, setNotes] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notes")
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setNotes(data)
      } catch (err) {
        console.error("Failed to load notes:", err.message)
        alert("Error loading notes")
      }
    }
    fetchNotes()
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return notes.filter((n) =>
      (n.title + n.body + n.author).toLowerCase().includes(q)
    )
  }, [query, notes])

  const LetterAvatar = ({ name }) => {
    const letter = name.charAt(0).toUpperCase()
    return (
      <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
        {letter}
      </div>
    )
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Search notes…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="w-full text-sm">
        <thead className="bg-emerald-500 text-white">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left w-32">Last Edited</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((note) => (
            <tr key={note.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <div className="font-semibold">{note.title}</div>
                <div className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {note.body.slice(0, 80)}…
                </div>
              </td>
              <td className="p-2 flex items-center gap-2">
                {note.avatar ? (
                  <img src={note.avatar} className="w-8 h-8 rounded-full" />
                ) : (
                  <LetterAvatar name={note.author} />
                )}
                <span>{note.author}</span>
              </td>
              <td className="p-2">{new Date(note.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-500">
                No notes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
