import Header from "./Header"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
