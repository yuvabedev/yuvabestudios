import type { Variants } from "framer-motion";

// Stagger container — orchestrates entry timing across all card slots in the grid.
export const gridContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Applied to each card slot wrapper inside the grid so stagger propagates correctly.
export const cardEntryVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};