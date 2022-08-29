import css from './Message.module.css';
import Moment from 'react-moment';
import { useRef } from 'react';
import { useEffect } from 'react';

export const Message = ({ message, user1, user }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [message]);

  console.log(user1);
  return (
    <div
      className={`${css.Message} ${
        message.from === user1 ? `${css.Own}` : `${css.OtherUser}`
      }`}
      ref={scrollRef}
    >
      {message.from !== user1 ? (
        <img
          src={user.photoURL}
          alt={user.name}
          width="50"
          className={css.UserPhoto}
        />
      ) : null}
      <div className={css.MessageWraper}>
        <p
          className={`${css.MessageText} ${
            message.from === user1 ? `${css.Me}` : `${css.Friend}`
          }`}
        >
          {message.text}
        </p>
        <p
          className={css.Date}
          style={
            message.from === user1
              ? { textAlign: 'right' }
              : { textAlign: 'left' }
          }
        >
          <Moment format="M/D/YY">{message.createdAt.toDate()}</Moment>
        </p>
      </div>
    </div>
  );
};
