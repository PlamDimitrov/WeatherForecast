import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

import styles from './Logo.module.scss';


const Logo = () => {

  const animation = {
    initial: {
      display: "inline-block",
      scale: 1,
    },
    zoom: {
      scale: [1, 2, 1],
      rotate: [0, 360, 0],
      transition: {
        type: "linear",
        duration: 2,
        repeat: Infinity,
        repeatType: "reverce",
        repeatDelay: 60
      }
    },
  }

  return (
    <p className={styles["logo"]}>
      W
      <motion.span
        initial="initial"
        animate="zoom"
        variants={animation}
      >
        i
      </motion.span>
      NDY.
      <span className={styles["last"]}>
        eu
      </span>
    </p>
  )
}

export default Logo;