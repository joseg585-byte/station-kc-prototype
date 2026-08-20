"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";

const DISMISS_KEY = "thestation-install-dismissed";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // Safari's non-standard flag for "added to home screen".
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

// Small floating "install this app" toast — supports the standard
// `beforeinstallprompt` flow (Chrome/Android/desktop) and a nudge with
// instructions on iOS Safari, which has no programmatic install prompt.
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === "1" || isStandalone()) return;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    if (isIos()) {
      setShowIosHint(true);
      setVisible(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    dismiss();
  };

  return (
    <div className="pb-safe fixed inset-x-4 bottom-20 z-30 mx-auto max-w-sm rounded-2xl border border-green-ink/10 bg-paper p-4 shadow-lift transition-transform lg:bottom-6">
      <button
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="focus-ring absolute right-2 top-2 rounded-full p-1 text-ink-soft/60 hover:bg-cream-deep hover:text-ink"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3 pr-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green/10 text-green-deep">
          <Download className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="font-display text-sm font-bold text-ink">Install this app</p>
          {showIosHint ? (
            <p className="mt-1 text-xs text-ink-soft">
              Tap <Share className="inline h-3.5 w-3.5 -translate-y-0.5" /> then &quot;Add to Home
              Screen&quot; for one-tap ordering.
            </p>
          ) : (
            <p className="mt-1 text-xs text-ink-soft">
              Add the station to your home screen for one-tap ordering.
            </p>
          )}
          {!showIosHint && (
            <button
              onClick={install}
              className="focus-ring mt-3 rounded-full bg-green px-4 py-2 text-xs font-bold uppercase tracking-wide text-cream transition-transform hover:scale-[1.02] active:scale-95"
            >
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
