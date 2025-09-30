"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-black px-6 py-3 text-white">
      {/* Logo */}
      <div className="text-xl font-bold">DPM.LOL</div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium">
        <a href="#" className="hover:text-gray-300">
          Tierlist & Builds
        </a>
        <a href="#" className="hover:text-gray-300">
          Classements
        </a>
        <a href="#" className="hover:text-gray-300">
          Esports
        </a>
        <a href="#" className="hover:text-gray-300">
          Data Studio
        </a>
        <a href="#" className="hover:text-gray-300">
          Matchups
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300">
          <span>Account</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.25 7.5l4.5 4.5 4.5-4.5H5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden ml-4 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="absolute top-14 left-0 w-full bg-black flex flex-col items-center space-y-4 py-6 md:hidden">
          <a href="#" className="hover:text-gray-300">
            Tierlist & Builds
          </a>
          <a href="#" className="hover:text-gray-300">
            Classements
          </a>
          <a href="#" className="hover:text-gray-300">
            Esports
          </a>
          <a href="#" className="hover:text-gray-300">
            Data Studio
          </a>
          <a href="#" className="hover:text-gray-300">
            Matchups
          </a>
        </nav>
      )}
    </header>
  );
}
