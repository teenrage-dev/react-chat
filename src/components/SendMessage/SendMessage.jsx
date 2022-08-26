import css from './SendMessage.module.css';

import { MdOutlineSend } from 'react-icons/md';
import { useState } from 'react';

import { auth, db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const SendMessage = () => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);

    if (e.target.value === '') {
      setValue('');
    }
  };

  const handleSend = async e => {
    e.preventDefault();
    setValue('');
    if (value === '') {
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'messages'), {
      text: value,
      name: displayName,
      photoURL,
      uid,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className={css.SendMessageContainer}>
      <form onSubmit={handleSend} className={css.Form}>
        <div className={css.CustomInput}>
          <input
            autoFocus
            type="text"
            className={css.Input}
            value={value}
            placeholder="Type your message"
            onChange={handleChange}
          />
          <button className={css.Button} type="submit">
            <MdOutlineSend className={css.ButtonIco} size="2em" />
          </button>
        </div>
      </form>
    </div>
  );
};
