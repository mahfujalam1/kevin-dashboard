import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 font-sans select-none px-4">
      {/* Big 404 */}
      <h1 className="text-[160px] font-bold tracking-tighter text-gray-200 leading-none mb-2">
        404
      </h1>

      {/* Sad face icon */}
      <div className="mb-5">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="28" r="27" stroke="#d1d5db" strokeWidth="1.5" />
          <path
            d="M18 28 Q28 16 38 28"
            stroke="#9ca3af"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="21" cy="23" r="2.5" fill="#9ca3af" />
          <circle cx="35" cy="23" r="2.5" fill="#9ca3af" />
          <path
            d="M21 36 Q28 32 35 36"
            stroke="#9ca3af"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page not found
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 mb-8 text-center max-w-xs leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 active:scale-95 transition-all duration-150"
        >
          ← Back to home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-100 active:scale-95 transition-all duration-150"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default ErrorElement;
