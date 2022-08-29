import css from './User.module.css';

import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Moment from 'react-moment';

export const User = ({ user, selectUser, user1, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState('');

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsubscribe = onSnapshot(doc(db, 'lastMessage', id), doc => {
      setData(doc.data());
    });
    return () => unsubscribe();
  }, [user1, user2]);

  return (
    <>
      <li className={css.UsersItem} onClick={() => selectUser(user)}>
        <div className={css.UsersLink}>
          <div className={css.UsersImgContainer}>
            <img
              src={user.photoURL}
              alt={user.name}
              width="50"
              className={css.UsersImg}
            />
            <div
              className={`${css.Status} ${
                user.isOnline ? `${css.online}` : `${css.offline}`
              }`}
            ></div>
          </div>
          <div className={css.UsersName}>
            <h3 className={css.UsersTitle}>{user.name}</h3>
            {data && <p className={css.UsersMessage}>{data.text}</p>}
          </div>
          {data && (
            <div className={css.UsersDate}>
              <Moment format="MMM D, YYYY">{data.createdAt.toDate()}</Moment>
            </div>
          )}
        </div>
      </li>
      <hr className={css.Line} />
    </>
  );
};
