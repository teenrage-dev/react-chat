import css from './ChatsLayout.module.css';

import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { SendMessage } from 'components/SendMessage/SendMessage';
import { Loader } from 'components/Loader/Loader';
import UsersList from 'components/UsersList/UsersList';

export const ChatsLayout = () => {
  const [user, loading] = useAuthState(auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let messages = [];
      querySnapshot.forEach(doc => {
        messages.push({ ...doc.data(), id: doc.id });
        setMessages(messages);
      });
    });
    return () => unsubscribe;
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user ? (
        <div>
          <div className={css.ChatsLayout}>
            <UsersList />
            {/* <div className={css.ChatsHeader}>
              <div className={css.Wrapper}>
                <div className={css.UserImgContainer}>
                  <img
                    src={user.photoURL}
                    alt="User"
                    width="50"
                    className={css.UserImg}
                  />
                  <Logout />
                </div>

                <div className={css.InputFilterContainer}>
                  <AiOutlineSearch
                    size="2em"
                    color="rgb(102, 102, 102)"
                    className={css.SearchIcon}
                  />
                  <DebounceInput
                    minLength={1}
                    debounceTimeout={500}
                    autoFocus
                    type="text"
                    value={filter}
                    placeholder="Search or start new chat"
                    onChange={handleChange}
                    className={css.InputFilter}
                  />
                </div>
              </div>
              <hr className={css.Line} />
              <UsersList />
            </div> */}
            {/* <div className={css.MessagesContainer}>
              <div className={css.ActiveUserCntainer}>
                <div className={css.ActiveUser}>
                  <div className={css.ActiveUserInfo}>
                    <img
                      src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
                      alt="User"
                      width="50"
                    />
                    <h2 className={css.ActiveUserTitle}>UserName</h2>
                  </div>
                  <hr className={css.Line} />
                </div>
                <div className={css.Messages}>
                  {messages &&
                    messages.map(message => {
                      console.log(message);
                      return (
                        <div
                          key={message.id}
                          className={css.message}
                          style={
                            user.uid === message.uid
                              ? {
                                  border: '1px solid #0f0',
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }
                              : {
                                  border: '1px solid #f00',
                                }
                          }
                        >
                          {message.text}
                        </div>
                      );
                    })}
                </div>
              </div>
              <SendMessage />
            </div> */}
          </div>
        </div>
      ) : (
        <div>Sorry User Not Found</div>
      )}
    </>
  );
};
