import React from 'react';

import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';


const Footer = () => {

  return (
    <div className={styles["footer"]}>
      <Link to="/" title="Plamen Dimitrov" className={styles["description-link"]}>© 2023 Created by Plamen Dimitrov.</Link>
      <Link to="\github.com/plamdimitrov" title="Github" className={styles["description-link"]}>Github Repo</Link>
    </div>
  )
}

export default Footer;