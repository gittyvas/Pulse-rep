import React from "react"

export default function SettingsTable({
  exportLabel = "Export My Data",
  deleteLabel = "Delete Account",
  accentColor = "#21CC5F",
  onExport,
  onDelete,
}) {
  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4">
      <button
        onClick={onExport}
        className="w-full py-3 font-semibold text-white rounded-lg"
        style={{ backgroundColor: accentColor }}
      >
        {exportLabel}
      </button>

      <button
        onClick={onDelete}
        className="w-full py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
      >
        {deleteLabel}
      </button>
    </div>
  )
}
