export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition ${className}`}
    >
      {children}
    </button>
  )
}
