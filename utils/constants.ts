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
      type: 'spring',
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};

export const buttonVariants = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
  },
};


