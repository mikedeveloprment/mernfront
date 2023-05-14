import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ imageUrl, name, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={imageUrl || '/noavatar.png'} alt={name} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.additional}>{additionalText.slice(5,16).replace("-", ".").replace("T", "-")}</span>
      </div>
    </div>
  );
};
