export const container_values = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.2, delayChildren: 0.1}},
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 50,
    },
  },
};

export const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 10,
  },
};


