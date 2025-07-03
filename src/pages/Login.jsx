import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  const handleGoogleSignIn = () => {
    const clientId = '228967078285-ii28bkm997qm3adj20ilivj1f27ui1n0.apps.googleusercontent.com';
    const redirectUri = encodeURIComponent('http://127.0.0.1:5000/oauth2callback');
    const scope = encodeURIComponent('https://www.googleapis.com/auth/contacts.readonly email profile');
    const responseType = 'code';
    const accessType = 'offline';
    const prompt = 'consent';

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
