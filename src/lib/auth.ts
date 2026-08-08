"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CustomerProfile } from "./types-auth";
import { getSupabaseBrowserClient, supabaseConfigured } from "./supabaseClient";

interface AuthState {
  profile: CustomerProfile | null;
  modalOpen: boolean;
  pendingEmail: string;

  openModal: () => void;
  closeModal: () => void;

  // Real Supabase magic link when configured; otherwise a local demo flow
  // that logs the link to the console (mirrors the Anthony's prototype).
  sendMagicLink: (email: string, firstName?: string, lastName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;

  // Demo-only: instantly "verify" the pending email without a real click.
  // No-op (and hidden in the UI) when Supabase is configured.
  verifyDemo: () => void;

  setLocalProfile: (profile: CustomerProfile | null) => void;
  logout: () => void;
}

function genId(): string {
  return `cust-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      modalOpen: false,
      pendingEmail: "",

      openModal: () => set({ modalOpen: true }),
      closeModal: () => set({ modalOpen: false }),

      sendMagicLink: async (email, firstName, lastName) => {
        const trimmed = email.trim().toLowerCase();
        set({ pendingEmail: trimmed });

        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          await supabase.auth.signInWithOtp({
            email: trimmed,
            options: {
              emailRedirectTo:
                typeof window !== "undefined" ? window.location.origin : undefined,
              data: firstName ? { first_name: firstName, last_name: lastName } : undefined,
            },
          });
          return;
        }

        // Local demo fallback — no backend configured.
        console.log(`[MAGIC LINK] (demo) sign-in link for ${trimmed}`);
        console.log(
          "  Set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY to send real emails."
        );
        const existing = get().profile;
        const isSameUser = existing && existing.email === trimmed;
        if (!isSameUser && firstName) {
          set({
            profile: {
              id: genId(),
              email: trimmed,
              firstName: firstName.trim(),
              lastName: (lastName ?? "").trim(),
              createdAt: Date.now(),
            },
          });
        }
      },

      signInWithGoogle: async () => {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
            },
          });
          return;
        }
        console.log(
          "[GOOGLE OAUTH] (demo) Set Supabase env vars + enable the Google provider to go live."
        );
        // Local demo: same as verifying instantly with a placeholder identity.
        set({
          profile: {
            id: genId(),
            email: "demo.google.user@gmail.com",
            firstName: "Demo",
            lastName: "User",
            createdAt: Date.now(),
          },
          modalOpen: false,
        });
      },

      verifyDemo: () => {
        if (supabaseConfigured) return;
        const email = get().pendingEmail;
        if (!email) return;
        const existing = get().profile;
        const isSameUser = existing && existing.email === email;
        if (!isSameUser) {
          set({
            profile: {
              id: genId(),
              email,
              firstName: "Guest",
              lastName: "",
              createdAt: Date.now(),
            },
            modalOpen: false,
          });
        } else {
          set({ modalOpen: false });
        }
      },

      setLocalProfile: (profile) => set({ profile }),

      logout: () => {
        const supabase = getSupabaseBrowserClient();
        if (supabase) supabase.auth.signOut();
        set({ profile: null });
      },
    }),
    {
      name: "thestation-auth-v1",
      partialize: (s) => ({ profile: s.profile }),
    }
  )
);
