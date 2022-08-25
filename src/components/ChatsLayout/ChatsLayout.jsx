import css from './ChatsLayout.module.css';

import { AiOutlineSearch } from 'react-icons/ai';

import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DebounceInput } from 'react-debounce-input';
import { useEffect, useState } from 'react';

import { Logout } from 'components/Logout/Logout';
import { NavLink } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { SendMessage } from 'components/SendMessage/SendMessage';
import { Loader } from 'components/Loader/Loader';

export const ChatsLayout = () => {
  const [filter, setFilter] = useState('');
  const [user, loading] = useAuthState(auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log(q, querySnapshot);
      let messages = [];
      querySnapshot.forEach(doc => {
        console.log(doc);
        messages.push({ ...doc.data(), id: doc.id });
        setMessages(messages);
      });
    });
    return () => unsubscribe;
  }, []);

  const handleChange = e => {
    const value = e.target.value.toLocaleLowerCase();

    setFilter(value);
  };
  const date = new Date();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user ? (
        <div>
          <div className={css.ChatsLayout}>
            <div className={css.ChatsHeader}>
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

              <div className={css.ChatsUsers}>
                <h2 className={css.Title}>Chats</h2>
                <ul className={css.UsersList}>
                  <li className={css.UsersItem}>
                    <NavLink to="/users/:userId">
                      <div className={css.UsersImgContainer}>
                        <img
                          src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
                          alt="qwe"
                          width="50"
                        />
                      </div>
                      <div className={css.UsersName}>
                        <h3 className={css.UsersTitle}>AliceFreeman</h3>
                        <p className={css.UsersMessage}>
                          Alice freeman is a chat.
                        </p>
                      </div>
                      <div className={css.UsersDate}>
                        {' '}
                        {date.toLocaleTimeString()}
                      </div>
                    </NavLink>
                  </li>
                  <li className={css.UsersItem}>
                    <NavLink to="/users/:userId">
                      <div className={css.UsersImgContainer}>
                        <img
                          src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
                          alt="wqe"
                          width="50"
                        />
                      </div>
                      <div className={css.UsersName}>
                        <h3 className={css.UsersTitle}>AliceFreeman</h3>
                        <p className={css.UsersMessage}>
                          Alice freeman is a chat.
                        </p>
                      </div>
                      <div className={css.UsersDate}>
                        {' '}
                        {date.toLocaleTimeString()}
                      </div>
                    </NavLink>
                  </li>
                  <li className={css.UsersItem}>
                    <NavLink to="/users/:userId">
                      <div className={css.UsersImgContainer}>
                        <img
                          src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
                          alt="ewq"
                          width="50"
                        />
                      </div>
                      <div className={css.UsersName}>
                        <h3 className={css.UsersTitle}>AliceFreeman</h3>
                        <p className={css.UsersMessage}>
                          Alice freeman is a chat.
                        </p>
                      </div>
                      <div className={css.UsersDate}>
                        {date.toLocaleTimeString()}
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className={css.MessagesContainer}>
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
                      console.log(message.uid, user.uid);
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
            </div>
          </div>
        </div>
      ) : (
        <div>Sorry User Not Found</div>
      )}
    </>
  );
};
