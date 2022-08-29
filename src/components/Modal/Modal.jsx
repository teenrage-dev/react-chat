import css from './Modal.module.css';

import React from 'react';

export const Modal = () => {
  return (
    <div className={css.Modal}>
      <div className={css.Content}></div>
    </div>
  );
};
