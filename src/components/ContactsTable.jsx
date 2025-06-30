import { useState, useEffect, useMemo } from "react"

export default function ContactsTable() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // Contact being edited

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contacts")
        const data = await res.json()
        setContacts(data)
      } catch (err) {
        console.error("Fetch failed", err)
      } finally {
        setLoading(false)
      }
    }
    fetchContacts()
  }, [])

  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts
    return contacts.filter((c) =>
      `${c.name} ${c.email} ${c.phone}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, contacts])

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  const handleDelete = async (id) => {
    if (!confirm("Delete this contact?")) return
    try {
      await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE",
      })
      setContacts((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      alert("Failed to delete")
    }
  }

  const handleEditSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error("Update failed")
      const updated = await res.json()
      setContacts((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      )
      setEditing(null)
    } catch (err) {
      alert("Failed to update contact")
    }
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg overflow-x-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search contacts..."
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />

      {loading ? (
        <div className="text-center text-gray-500">Loading contacts...</div>
      ) : (
        <>
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Contact</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Tags</th>
                <th className="p-2">Last Contacted</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="border-t">
                  <td className="p-2 flex items-center gap-2">
                    {contact.avatar ? (
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                        {getInitials(contact.name)}
                      </div>
                    )}
                    <span>{contact.name}</span>
                  </td>
                  <td className="p-2">{contact.email}</td>
                  <td className="p-2">{contact.phone}</td>
                  <td className="p-2">
                    <div className="flex gap-1 flex-wrap">
                      {contact.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2">{contact.lastContacted}</td>
                  <td className="p-2 text-center space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setEditing(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredContacts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No contacts found.
            </div>
          )}
        </>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={editing.email}
              onChange={(e) =>
                setEditing({ ...editing, email: e.target.value })
              }
            />
            <label className="block mb-2 text-sm font-medium">Phone</label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={editing.phone}
              onChange={(e) =>
                setEditing({ ...editing, phone: e.target.value })
              }
            />
            <label className="block mb-2 text-sm font-medium">Tags (comma-separated)</label>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={editing.tags?.join(", ") || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
