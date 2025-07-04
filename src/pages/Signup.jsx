import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Signup() {
  const handleGoogleSignup = () => {
    // IMPORTANT: Make sure this client ID exactly matches the one in your Google Cloud Console and your backend .env
    const clientId = '228967078285-0l42l4j8q8nhg5mg7vpvph64jb7m643a.apps.googleusercontent.com';
    
    // IMPORTANT: Double-check the redirect URI. It must EXACTLY match one configured in Google Cloud Console.
    // Ensure 'pullse' vs 'pulse' and 'oauth2callback' vs 'oauth2callbck' is correct.
    const redirectUri = encodeURIComponent('https://pullse.gitthit.com.ng/oauth2callback');
    
    // Updated to include all four scopes: email, profile, contacts.readonly, and contacts.other.readonly
    const scope = encodeURIComponent(
      'https://www.googleapis.com/auth/contacts.readonly ' +
      'https://www.googleapis.com/auth/contacts.other.readonly ' +
      'email ' +
      'profile'
    );
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  return (
    <AuthLayout title="Create your Pulse account">
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700"
        >
          Sign Up
        </button>

        <div className="text-center text-gray-500 text-sm">or</div>

        {/* ✅ Google OAuth button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 p-2 rounded hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        <p className="text-sm text-center pt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
