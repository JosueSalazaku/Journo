export default function AuthCodeError() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-4 text-gray-600">
          We couldn’t log you in. Please try again or contact support.
        </p>
        <a
          href="/login"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Login
        </a>
      </div>
    );
  }
  