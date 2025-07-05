import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Signup() {
  const handleGoogleSignup = () => {
    // 👇️ Point to your backend OAuth route
    const backendOauthUrl = 'https://pulse.gitthit.com.ng/auth/google';

    // 🔁 Send user to backend to handle OAuth
    window.location.href = backendOauthUrl;
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
