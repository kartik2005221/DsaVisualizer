"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@/app/contexts/UserContext';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push('/');
};

  // Load theme from localStorage on mount and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-[calc(100%-2rem)] mx-4 mt-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 text-black dark:text-white z-50 transition-all duration-300 ${
        isScrolled ? "shadow-xl" : "shadow-md"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="text-xl md:text-2xl items-center flex font-bold tracking-tight hover:text-blue-500 transition duration-300"
          onClick={closeMobileMenu}
        >
          DSA<span className="text-blue-500">Visualizer</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          <li>
            <Link
              href="/#hero"
              className="text-sm lg:text-base font-medium hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#features"
              className="text-sm lg:text-base font-medium hover:text-blue-400 transition duration-300"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/#about"
              className="text-sm lg:text-base font-medium hover:text-blue-400 transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#faq"
              className="text-sm lg:text-base font-medium hover:text-blue-400 transition duration-300"
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              href="/#testimonial"
              className="text-sm lg:text-base font-medium hover:text-blue-400 transition duration-300"
            >
              Reviews
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="text-sm lg:text-base font-medium hover:text-blue-400 transition duration-300"
            >
              Blogs
            </Link>
          </li>
          {/* Login Button for Desktop */}
          <li>
            {user ? (
              <>
                <span className="text-sm lg:text-base font-medium text-green-600">
                  Welcome, {user.email.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Login/Signup
              </Link>
            )}
          </li>
          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              )}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col space-y-15 px-6">
          <li>
            <Link
              href="/#hero"
              className="block py-2 font-medium hover:text-blue-400 transition duration-300"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#features"
              className="block py-2 font-medium hover:text-blue-400 transition duration-300"
              onClick={closeMobileMenu}
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/#about"
              className="block py-2 font-medium hover:text-blue-400 transition duration-300"
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#faq"
              className="block py-2 font-medium hover:text-blue-400 transition duration-300"
              onClick={closeMobileMenu}
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="block py-2 font-medium hover:text-blue-400 transition duration-300"
              onClick={closeMobileMenu}
            >
              Blogs
            </Link>
          </li>
          <li>
            {user ? (
              <>
                <span className="text-sm lg:text-base font-medium text-green-600">
                  Welcome, {user.email.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md mt-2"
                onClick={closeMobileMenu}
              >
                Login/Signup
              </Link>
            )}
          </li>
          <li className="pt-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 py-2 font-medium hover:text-blue-400 transition duration-300 w-full"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                  Dark Mode
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                  Light Mode
                </>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}