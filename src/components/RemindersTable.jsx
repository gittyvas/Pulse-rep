import { useState, useEffect, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function RemindersTable() {
  const [reminders, setReminders] = useState([])
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reminders")
        const data = await res.json()
        setReminders(data)
      } catch (err) {
        console.error("Failed to load reminders", err)
      }
    }
    fetchReminders()
  }, [])

  const filtered = useMemo(() => {
    return reminders.filter(r =>
      (r.text + r.date + r.contactName).toLowerCase().includes(search.toLowerCase())
    )
  }, [search, reminders])

  const handleDelete = async (id) => {
    if (!confirm("Delete this reminder?")) return
    try {
      await fetch(`http://localhost:5000/api/reminders/${id}`, { method: "DELETE" })
      setReminders(prev => prev.filter(r => r.id !== id))
    } catch {
      alert("Delete failed")
    }
  }

  const handleSave = async () => {
    const method = editing?.id ? "PUT" : "POST"
    const url = editing?.id
      ? `http://localhost:5000/api/reminders/${editing.id}`
      : "http://localhost:5000/api/reminders"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      const result = await res.json()
      setReminders(prev =>
        editing.id
          ? prev.map(r => (r.id === result.id ? result : r))
          : [...prev, result]
      )
      setEditing(null)
      setCreating(false)
    } catch {
      alert("Save failed")
    }
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between mb-4">
        <input
          className="border border-gray-300 rounded p-2 w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reminders..."
        />
        <button
          onClick={() => {
            setCreating(true)
            setEditing({ text: "", date: "", contactName: "" })
          }}
          className="ml-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          + Add Reminder
        </button>
      </div>

      <table className="w-full text-sm table-auto">
        <thead className="bg-gray-100 text-left text-gray-700">
          <tr>
            <th className="p-2">Reminder</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Date</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{r.text}</td>
              <td className="p-2">{r.contactName}</td>
              <td className="p-2">{r.date}</td>
              <td className="p-2 text-center space-x-3">
                <button
                  onClick={() => setEditing(r)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-6">
                No reminders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AnimatePresence>
        {editing && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-semibold mb-4">
                {creating ? "New Reminder" : "Edit Reminder"}
              </h2>

              <label className="block mb-2 text-sm">Reminder Text</label>
              <input
                className="w-full mb-4 p-2 border rounded"
                value={editing.text}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
              />

              <label className="block mb-2 text-sm">Contact Name</label>
              <input
                className="w-full mb-4 p-2 border rounded"
                value={editing.contactName}
                onChange={(e) => setEditing({ ...editing, contactName: e.target.value })}
              />

              <label className="block mb-2 text-sm">Reminder Date</label>
              <input
                type="date"
                className="w-full mb-6 p-2 border rounded"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setEditing(null)
                    setCreating(false)
                  }}
                  className="px-4 py-2 text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
