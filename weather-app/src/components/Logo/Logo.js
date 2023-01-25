import React from 'react';


import styles from './Logo.module.css';


const Logo = () => {

  return (
    <p className={styles["logo"]}>W<span>i</span>NDY.<span className={styles["last"]}>eu</span></p>
  )
}

export default Logo;