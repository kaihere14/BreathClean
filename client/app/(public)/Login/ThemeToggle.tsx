"use client";

import { Sun } from "lucide-react";

export default function ThemeToggle() {
  const handleToggle = () => {
    // Theme toggle logic will go here
    console.log("Theme toggle clicked");
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg"
    >
      <Sun className="h-6 w-6 text-gray-700" />
    </button>
  );
}
