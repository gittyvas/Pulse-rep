import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  const handleGoogleSignIn = () => {
    // IMPORTANT: Make sure this client ID exactly matches the one in your Google Cloud Console and your backend .env
    const clientId = '228967078285-0l42l4j8q8nhg5mg7vpvph64jb7m643a.apps.googleusercontent.com';
    
    // IMPORTANT: Double-check the redirect URI. It must EXACTLY match one configured in Google Cloud Console.
    // Ensure 'pullse' vs 'pulse' and 'oauth2callback' vs 'oauth2callbck' is correct.
    const redirectUri = encodeURIComponent('https://1db5-102-90-97-173.ngrok-free.app/oauth2callback');
    
    // Updated to include all four scopes: email, profile, contacts.readonly, and contacts.other.readonly
    const scope = encodeURIComponent(
      'https://www.googleapis.com/auth/contacts.readonly ' +
      'https://www.googleapis.com/auth/contacts.other.readonly ' +
      'email ' +
      'profile'
    );
    
    const responseType = 'code';
    const accessType = 'offline';
    const prompt = 'consent'; // Ensures users are prompted for consent, even if previously granted, to get a fresh refresh token

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

    window.location.href = oauthUrl;
  };

  return (
    <AuthLayout title="Sign In to Pulse">
      <form className="space-y-4">
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
          Sign In
        </button>

        <div className="relative text-center py-3">
          <span className="text-xs text-gray-400">OR</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded p-2 hover:bg-gray-50"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm">Sign in with Google</span>
        </button>

        <p className="text-sm text-center pt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-emerald-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
