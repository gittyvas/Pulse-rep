import { Link } from 'react-router-dom';

export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500">Pulse CRM — stay close to who matters</p>
        </div>
        {children}
        <div className="text-center text-xs text-gray-400">
          <Link to="/privacy" className="hover:text-emerald-600">Privacy</Link> · <Link to="/terms" className="hover:text-emerald-600">Terms</Link>
        </div>
      </div>
    </div>
  );
}
