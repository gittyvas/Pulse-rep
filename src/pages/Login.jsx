import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  const handleGoogleSignIn = () => {
    // 👇️ Make sure this matches your actual Google OAuth client ID
    const clientId = '299613772961-p51fdus5h4j280c159kq907s1c9rb1ct.apps.googleusercontent.com';

    // This is your production backend route that starts the OAuth flow
    const backendOauthUrl = 'https://pulse.gitthit.com.ng/auth/google';

    // Redirect user to backend to handle OAuth
    window.location.href = backendOauthUrl;
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
