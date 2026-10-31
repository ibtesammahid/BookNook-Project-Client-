"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Mock auth state for the BookNook UI.
 *
 * There is no backend in this project yet — `signIn` / `signUp` / `signOut`
 * simply toggle a flag persisted in localStorage so the navbar can switch
 * between the signed-out (SIGN IN / SIGN UP) and signed-in (Account /
 * Wishlist / Cart) variants.
 *
 * localStorage is read via useSyncExternalStore (not an effect) to satisfy
 * the react-hooks/set-state-in-effect rule and avoid hydration mismatches.
 */

const STORAGE_KEY = "booknook:isLoggedIn";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Fires for changes made in other tabs.
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return false;
}

function persist(value: boolean) {
  window.localStorage.setItem(STORAGE_KEY, String(value));
  listeners.forEach((listener) => listener());
}

export type User = { name: string; email: string };

/**
 * Mock identity until real auth (JWT/proxy) is wired up — used for the
 * read-only name/email fields on the Add Book form.
 */
const MOCK_USER: User = { name: "Book Nook Reader", email: "reader@booknook.com" };

type AuthContextValue = {
  isLoggedIn: boolean;
  /** Logged-in user, or null when signed out. */
  user: User | null;
  signIn: () => void;
  signUp: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const isLoggedIn = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const signIn = useCallback(() => persist(true), []);
  const signUp = useCallback(() => persist(true), []);
  const signOut = useCallback(() => persist(false), []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user: isLoggedIn ? MOCK_USER : null,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
