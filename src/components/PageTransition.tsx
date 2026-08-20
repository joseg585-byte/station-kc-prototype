"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Wraps every route's rendered content so navigations glide instead of
// snap. Lives in the root layout (persistent across navigations) so
// AnimatePresence can actually run the exit animation on the outgoing page
// before the incoming one mounts — a local AnimatePresence inside each page
// would unmount along with the page itself and never get to animate out.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
