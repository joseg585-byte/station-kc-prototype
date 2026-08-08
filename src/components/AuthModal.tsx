"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, User, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabaseClient";

type Step = "email" | "signup" | "sent";

export default function AuthModal() {
  const modalOpen = useAuth((s) => s.modalOpen);
  const closeModal = useAuth((s) => s.closeModal);
  const profile = useAuth((s) => s.profile);
  const sendMagicLink = useAuth((s) => s.sendMagicLink);
  const signInWithGoogle = useAuth((s) => s.signInWithGoogle);
  const verifyDemo = useAuth((s) => s.verifyDemo);

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailErr, setEmailErr] = useState("");

  useEffect(() => {
    if (!modalOpen) {
      const t = setTimeout(() => {
        setStep("email");
        setEmail("");
        setFirstName("");
        setLastName("");
        setEmailErr("");
      }, 350);
      return () => clearTimeout(t);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, closeModal]);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleEmailContinue = () => {
    if (!isValidEmail(email)) {
      setEmailErr("Enter a valid email address");
      return;
    }
    setEmailErr("");
    const isNew = !profile || profile.email !== email.trim().toLowerCase();
    if (isNew && !supabaseConfigured) {
      setStep("signup");
    } else {
      sendMagicLink(email.trim());
      setStep("sent");
    }
  };

  const handleSignup = () => {
    if (!firstName.trim()) return;
    sendMagicLink(email.trim(), firstName.trim(), lastName.trim());
    setStep("sent");
  };

  if (!modalOpen) return null;

  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-[70] bg-charcoal/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-x-4 top-[12vh] z-[71] mx-auto max-w-md rounded-2xl bg-paper shadow-lift"
            role="dialog"
            aria-modal="true"
            aria-label="Sign in to the station"
          >
            <div className="flex items-center justify-between border-b border-green-ink/10 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-green font-display text-sm font-bold text-cream">
                  S
                </span>
                <p className="font-display text-base font-semibold text-ink">
                  {step === "email" && "Welcome back"}
                  {step === "signup" && "Create your account"}
                  {step === "sent" && "Check your email"}
                </p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full text-ink-soft/50 transition-colors hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5">
              {step === "email" && (
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <p className="text-sm text-ink-soft/75">
                    Enter your email to sign in or create an account. We&rsquo;ll send you a magic link — no password needed.
                  </p>
                  <label className="block">
                    <span className="overline text-[0.62rem] text-ink-soft/60">Email Address</span>
                    <div className="relative mt-1.5">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailErr) setEmailErr("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleEmailContinue()}
                        placeholder="you@example.com"
                        autoFocus
                        className={`focus-ring w-full rounded-lg border bg-cream/70 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/35 ${
                          emailErr ? "border-red-accent/60" : "border-green-ink/15"
                        }`}
                      />
                    </div>
                    {emailErr && <p className="mt-1 text-xs text-red-accent">{emailErr}</p>}
                  </label>

                  <button
                    onClick={handleEmailContinue}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green py-3 text-sm font-semibold text-cream transition-all hover:bg-green-deep active:scale-95"
                  >
                    Continue with Email
                    <ArrowRight size={15} />
                  </button>

                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-green-ink/10" />
                    <span className="text-xs text-ink-soft/50">or</span>
                    <div className="h-px flex-1 bg-green-ink/10" />
                  </div>

                  <button
                    onClick={() => signInWithGoogle()}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-green-ink/15 bg-paper py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream-deep"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M23.49 12.27c0-.85-.08-1.66-.22-2.44H12v4.62h6.46c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.55-5.17 3.55-8.8Z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.93l-3.88-3c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1C3.25 21.3 7.31 24 12 24Z"/>
                      <path fill="#FBBC05" d="M5.27 14.27A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.27v-3.1H1.27A11.98 11.98 0 0 0 0 12c0 1.94.47 3.77 1.27 5.37l4-3.1Z"/>
                      <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.25 2.7 1.27 6.63l4 3.1C6.22 6.88 8.87 4.77 12 4.77Z"/>
                    </svg>
                    Continue with Google
                  </button>
                  {!supabaseConfigured && (
                    <p className="text-center text-[11px] text-ink-soft/45">
                      Demo mode — Supabase isn&apos;t configured, so this signs you in with a placeholder identity.
                    </p>
                  )}
                </motion.div>
              )}

              {step === "signup" && (
                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <p className="text-sm text-ink-soft/75">First time here? Tell us your name to finish creating your account.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="overline text-[0.62rem] text-ink-soft/60">First Name</span>
                      <div className="relative mt-1.5">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/40" />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Jordan"
                          autoFocus
                          className="focus-ring w-full rounded-lg border border-green-ink/15 bg-cream/70 py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft/35"
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className="overline text-[0.62rem] text-ink-soft/60">Last Name</span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Smith"
                        className="focus-ring mt-1.5 w-full rounded-lg border border-green-ink/15 bg-cream/70 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/35"
                      />
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("email")}
                      className="rounded-full border border-green-ink/20 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-green hover:text-ink"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSignup}
                      className="flex-1 rounded-full bg-green py-2.5 text-sm font-semibold text-cream transition-all hover:bg-green-deep active:scale-95"
                    >
                      Create Account &amp; Send Link
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "sent" && (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 text-center">
                  <div className="flex justify-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="grid h-16 w-16 place-items-center rounded-full bg-green/15 text-green"
                    >
                      <CheckCircle size={32} />
                    </motion.span>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">Link sent to</p>
                    <p className="mt-0.5 text-sm font-medium text-green-deep">{email}</p>
                  </div>
                  <p className="text-sm text-ink-soft/70">
                    Check your inbox and click the link to sign in.
                    {!supabaseConfigured && " (Logged to the browser console for this demo.)"}
                  </p>

                  {!supabaseConfigured && (
                    <div className="rounded-xl border border-amber/40 bg-cream p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-deep">
                        <Sparkles size={13} />
                        Demo shortcut
                      </div>
                      <p className="mt-1.5 text-xs text-ink-soft/70">
                        In production the link arrives by email via Supabase Auth. For this demo, click below to auto-verify instantly.
                      </p>
                      <button
                        onClick={verifyDemo}
                        className="mt-3 w-full rounded-full bg-amber py-2.5 text-sm font-bold text-ink transition-all hover:bg-amber-deep active:scale-95"
                      >
                        Verify &amp; Sign In Now →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
