"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/NavLogo/Modern Book Nook Logo.png";
import {
  ChevronDown,
  Heart,
  Menu,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

/** Brick red sampled from the reference navbar. */
const BRAND = "#8C2B22";

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
  { label: "Blog", href: "#" },
  {
    label: "Categories",
    href: "#",
    children: ["Fiction", "Self Help", "Children", "Academic"],
  },
  {
    label: "My Account",
    href: "#",
    children: ["Orders", "Wishlist", "Settings"],
  },
  {
    label: "Pages",
    href: "#",
    children: ["About Us", "FAQs", "Privacy Policy", "Terms & Conditions"],
  },
  
];

function AuthButtons({ className = "" }: { className?: string }) {
  const { signIn, signUp } = useAuth();
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <button
        type="button"
        onClick={signIn}
        className="cursor-pointer rounded-full border px-4 py-2 text-xs font-bold tracking-wider transition-colors sm:px-5 sm:text-sm"
        style={{ borderColor: BRAND, color: BRAND }}
      >
        SIGN IN
      </button>
      <button
        type="button"
        onClick={signUp}
        className="cursor-pointer rounded-full px-4 py-2 text-xs font-bold tracking-wider text-white transition-opacity hover:opacity-90 sm:px-5 sm:text-sm"
        style={{ backgroundColor: BRAND }}
      >
        SIGN UP
      </button>
    </div>
  );
}

function AccountIcons({ className = "" }: { className?: string }) {
  const { signOut } = useAuth();
  const links = [
    { label: "Account", icon: User },
    { label: "Wishlist", icon: Heart },
    { label: "Cart", icon: ShoppingBag },
  ];
  return (
    <div className={`flex items-center gap-4 sm:gap-7 ${className}`}>
      {links.map(({ label, icon: Icon }) => (
        <Link
          key={label}
          href="#"
          className="flex flex-col items-center gap-0.5 text-[#1F3864] transition-opacity hover:opacity-70"
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
          <span className="text-xs font-semibold">{label}</span>
        </Link>
      ))}
      {/* Placeholder so the signed-in state is easy to leave during dev. */}
      <button
        type="button"
        onClick={signOut}
        title="Sign out (dev only)"
        className="hidden text-xs text-gray-400 underline-offset-2 hover:underline lg:block"
      >
        (sign out)
      </button>
    </div>
  );
}

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Row 1 — logo + auth (white) */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
          <Link href="/" aria-label="Book Nook home" className="shrink-0">
            <Image
              src={logo}
              alt="Book Nook"
              width={2112}
              height={745}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          {isLoggedIn ? <AccountIcons className="ml-auto" /> : <AuthButtons className="ml-auto" />}

          {/* Hamburger — links below md live in the drawer */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="ml-3 cursor-pointer rounded-md p-2 md:hidden"
            style={{ color: BRAND }}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Row 2 — nav links (brick red) */}
      <nav className="hidden md:block" style={{ backgroundColor: BRAND }}>
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map(({ label, href, children }) => (
              <li key={label} className="group relative">
                <Link
                  href={href}
                  className="flex items-center gap-1 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                >
                  {label}
                  {children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
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

      {/* Mobile drawer — nav links below md */}
      {mobileOpen && (
        <nav className="md:hidden" style={{ backgroundColor: BRAND }}>
          <ul className="mx-auto max-w-7xl px-4 pb-4">
            {NAV_ITEMS.map(({ label, href, children }) => (
              <li key={label} className="border-b border-white/10 last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 text-sm font-medium text-white"
                  >
                    {label}
                  </Link>
                  {children && (
                    <button
                      type="button"
                      aria-label={`Toggle ${label} submenu`}
                      onClick={() => setExpanded(expanded === label ? null : label)}
                      className="cursor-pointer p-2 text-white"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expanded === label ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
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
            <li className="pt-4">
             
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
