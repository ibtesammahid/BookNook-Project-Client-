
"use client";

// ==========================================
// 1. IMPORTS
// ==========================================

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import logo from "@/assets/NavLogo/Modern Book Nook Logo.png";

import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

// ==========================================
// 2. BRAND COLOR
// ==========================================

const BRAND = "#8C2B22";

// ==========================================
// 3. NAVIGATION ITEMS
// ==========================================

type NavItem = {
  label: string;
  href: string;
  children?: string[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Books",
    href: "#",
    children: ["New Arrivals", "Best Sellers", "Fiction", "Non-Fiction"],
  },
  {
    label: "My Books",
    href: "#",
  },
  {
    label: "My Borrows",
    href: "#",
  },
  {
    label: "Add Book",
    href: "/addbooks",
  },
];

// ==========================================
// 4. AUTH BUTTONS
// Displayed when the user is logged out
// ==========================================

function AuthButtons({ className = "" }: { className?: string }) {
  // const [googleError, setGoogleError] = useState("");

  // // Handle Google authentication
  // const handleGoogleLogin = async () => {
  //   setGoogleError("");

  //   const { error } = await authClient.signIn.social({
  //     provider: "google",
  //     callbackURL: "/",
  //   });

  //   if (error) {
  //     setGoogleError(error.message || "Google login failed.");
  //   }
  // };

  return (
    <div className={`flex flex-col items-end gap-1 ${className}`}>
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Login page link */}
        <Link
          href="/login"
          className="rounded-full border px-4 py-2 text-xs font-bold tracking-wider transition-colors hover:bg-gray-50 sm:px-5 sm:text-sm"
          style={{ borderColor: BRAND, color: BRAND }}
        >
          SIGN IN
        </Link>

        {/* Registration page link */}
        <Link
          href="/register"
          className="rounded-full px-4 py-2 text-xs font-bold tracking-wider text-white transition-opacity hover:opacity-90 sm:px-5 sm:text-sm"
          style={{ backgroundColor: BRAND }}
        >
          SIGN UP
        </Link>
      </div>

      {/* Google authentication error
      {googleError && (
        <p className="text-xs text-red-600">{googleError}</p>
      )} */}
    </div>
  );
}

// ==========================================
// 5. ACCOUNT DROPDOWN
// Displayed when the user is logged in
// ==========================================

type AccountDropdownProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

function AccountDropdown({
  user,
  className = "",
}: AccountDropdownProps & { className?: string }) {

  // Dropdown visibility state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Next.js router
  const router = useRouter();

  // Sign-out loading state
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Sign-out error state
  const [signOutError, setSignOutError] = useState("");

  // ======================================
  // 5.1 HANDLE SIGN OUT
  // ======================================

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setSignOutError("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setSignOutError(error.message || "Unable to sign out.");
        return;
      }

      // Close dropdown
      setDropdownOpen(false);

      // Navigate to homepage
      router.replace("/");
    } catch (error) {
      console.error("Sign-out error:", error);
      setSignOutError("Something went wrong. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className={`relative ${className}`}>

      {/* ==================================
          5.2 PROFILE BUTTON
          Opens and closes dropdown
      ================================== */}

      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-expanded={dropdownOpen}
        aria-haspopup="menu"
        aria-label="Open user menu"
        className="flex cursor-pointer items-center gap-2 rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:gap-3"
      >

        {/* User profile image */}
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User profile"}
            width={40}
            height={40}
            unoptimized
            className="h-9 w-9 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          // Default avatar when no profile image exists
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        )}

        {/* User name */}
        <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
          {user.name}
        </span>

        {/* Dropdown arrow */}
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ==================================
          5.3 DROPDOWN MENU
          Visible when dropdownOpen is true
      ================================== */}

      {dropdownOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
        >

          {/* User information */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-gray-800">
              {user.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          {/* ==================================
              5.4 PROFILE LINK
          ================================== */}

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <CircleUserRound className="h-4 w-4" />
            My Profile
          </Link>

          {/* ==================================
              5.5 SIGN OUT BUTTON
          ================================== */}

          <button
            type="button"
            role="menuitem"
            disabled={isSigningOut}
            onClick={handleSignOut}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />

            {isSigningOut ? "Signing out..." : "Sign Out"}
          </button>

          {/* Sign-out error */}
          {signOutError && (
            <p className="px-4 pb-2 text-xs text-red-600">
              {signOutError}
            </p>
          )}

        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. MAIN NAVBAR COMPONENT
// ==========================================

export default function Navbar() {

  // Get Better Auth session
  const { data: session, isPending } = authClient.useSession();

  // Get authenticated user
  const user = session?.user;

  // Check authentication status
  const isLoggedIn = !!user;

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mobile submenu state
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">

      {/* ======================================
          7. TOP NAVBAR
          Logo + Authentication
      ====================================== */}

      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6">

          {/* BookNook logo */}
          <Link
            href="/"
            aria-label="Book Nook home"
            className="shrink-0"
          >
            <Image
              src={logo}
              alt="Book Nook"
              width={2112}
              height={745}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          {/* ==================================
              7.1 AUTHENTICATION DISPLAY
          ================================== */}

          <div className="ml-auto">

            {/* Session loading state */}
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-full bg-gray-100" />
            ) : isLoggedIn && user ? (

              // Logged-in user dropdown
              <AccountDropdown user={user} />

            ) : (

              // Login, Register and Google buttons
              <AuthButtons />

            )}

          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="ml-3 cursor-pointer rounded-md p-2 md:hidden"
            style={{ color: BRAND }}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

        </div>
      </div>

      {/* ======================================
          8. DESKTOP NAVIGATION
      ====================================== */}

      <nav
        className="hidden md:block"
        style={{ backgroundColor: BRAND }}
      >
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">

          <ul className="flex items-center gap-7">

            {NAV_ITEMS.map(({ label, href, children }) => (
              <li key={label} className="group relative">

                {/* Main navigation link */}
                <Link
                  href={href}
                  className="flex items-center gap-1 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                >
                  {label}

                  {/* Dropdown arrow */}
                  {children && (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </Link>

                {/* Desktop submenu */}
                {children && (
                  <ul className="invisible absolute left-0 top-full z-10 min-w-48 rounded-b-md bg-white py-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">

                    {children.map((child) => (
                      <li key={child}>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1F3864]"
                        >
                          {child}
                        </Link>
                      </li>
                    ))}

                  </ul>
                )}

              </li>
            ))}

          </ul>

        </div>
      </nav>

      {/* ======================================
          9. MOBILE NAVIGATION DRAWER
      ====================================== */}

      {mobileOpen && (
        <nav
          className="md:hidden"
          style={{ backgroundColor: BRAND }}
        >
          <ul className="mx-auto max-w-7xl px-4 pb-4">

            {NAV_ITEMS.map(({ label, href, children }) => (
              <li
                key={label}
                className="border-b border-white/10 last:border-b-0"
              >

                <div className="flex items-center justify-between">

                  {/* Mobile navigation link */}
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 text-sm font-medium text-white"
                  >
                    {label}
                  </Link>

                  {/* Mobile submenu toggle */}
                  {children && (
                    <button
                      type="button"
                      aria-label={`Toggle ${label} submenu`}
                      aria-expanded={expanded === label}
                      onClick={() =>
                        setExpanded(expanded === label ? null : label)
                      }
                      className="cursor-pointer p-2 text-white"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expanded === label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                </div>

                {/* Mobile submenu */}
                {children && expanded === label && (
                  <ul className="pb-2 pl-4">

                    {children.map((child) => (
                      <li key={child}>
                        <Link
                          href="#"
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-white/80"
                        >
                          {child}
                        </Link>
                      </li>
                    ))}

                  </ul>
                )}

              </li>
            ))}

          </ul>
        </nav>
      )}

    </header>
  );
}
