"use client";

import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import TabBar from "./TabBar";
import InstallPrompt from "./InstallPrompt";

// Renders global overlays that need to live at the root of every page.
// Imported in layout.tsx (server component) via a client boundary.
export default function GlobalProviders() {
  return (
    <>
      <AuthModal />
      <CartDrawer />
      <TabBar />
      <InstallPrompt />
    </>
  );
}
