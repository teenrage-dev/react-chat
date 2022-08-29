import css from './ActiveUser.module.css';

import React from 'react';

export const ActiveUser = ({ chat }) => {
  return (
    <div className={css.ActiveUser}>
      <div className={css.ActiveUserInfo}>
        <div className={css.ActiveUserImgBox}>
          <img
            src={chat.photoURL}
            alt={chat.name}
            width="50"
            className={css.ActiveUserImg}
          />
          <div
            className={`${css.Status} ${
              chat.isOnline ? `${css.online}` : `${css.offline}`
            }`}
          ></div>
        </div>

        <h2 className={css.ActiveUserTitle}>{chat.name}</h2>
      </div>
    </div>
  );
};
