import { ThumbsUp, Users } from "lucide-react";

import LoginButtons from "./LoginButtons";
import ThemeToggle from "./ThemeToggle";

export default function Login() {
  return (
    <div className="font-outfit relative flex min-h-screen items-center justify-center overflow-hidden bg-[#E8E9DC] p-4">
      {/* Decorative background circles */}
      <div className="absolute top-20 left-20 h-16 w-16 rounded-full bg-[#A8D5BA] opacity-50"></div>
      <div className="absolute right-32 bottom-32 h-20 w-20 rounded-full bg-[#B8D8E8] opacity-40"></div>

      {/* Theme toggle button */}
      {/* <ThemeToggle /> */}

      {/* Main login card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Logo and branding */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] shadow-md">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9688 8.39062V8.39062V8.39062M6.51562 9.98438V9.98438V9.98438M13.4531 7.59375C12.1406 8.3125 10.9844 9.20312 9.98438 10.2656C8.98438 9.20312 7.82812 8.3125 6.51562 7.59375C6.60938 6.375 7 5.02344 7.6875 3.53906C8.375 2.05469 9.15625 0.875 10.0312 0C12.125 2.09375 13.2656 4.625 13.4531 7.59375V7.59375M0 7.96875C2.125 7.96875 4.0625 8.48438 5.8125 9.51562C7.5625 10.5469 8.95312 11.8594 9.98438 13.4531C11.0156 11.8594 12.4062 10.5469 14.1562 9.51562C15.9062 8.48438 17.8438 7.96875 19.9688 7.96875C19.9688 10.5938 19.2266 12.9531 17.7422 15.0469C16.2578 17.1406 14.3281 18.6094 11.9531 19.4531C11.4219 19.6406 10.7656 19.8125 9.98438 19.9688C9.32812 19.875 8.67188 19.7031 8.01562 19.4531C5.64062 18.6094 3.71094 17.1406 2.22656 15.0469C0.742188 12.9531 0 10.5938 0 7.96875V7.96875"
                fill="#2BEE6C"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-800">
            BreatheClean
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Welcome to
          <br />
          BreatheClean
        </h1>
        <p className="mb-8 text-gray-500">Start your healthy journey today.</p>

        {/* Login buttons (client component) */}
        <LoginButtons />

        {/* Info banner */}
        <div className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] p-4">
          <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#059669]" />
          <p className="text-sm leading-relaxed text-[#065F46]">
            <span className="font-semibold">Join 50,000+ commuters</span>{" "}
            prioritizing health
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="absolute right-0 bottom-8 left-0 flex items-center justify-center gap-6 text-sm text-gray-600">
        <a href="#" className="transition-colors hover:text-gray-900">
          Privacy Policy
        </a>
        <a href="#" className="transition-colors hover:text-gray-900">
          Terms of Service
        </a>
        <a href="#" className="transition-colors hover:text-gray-900">
          Support
        </a>
      </div>
    </div>
  );
}
