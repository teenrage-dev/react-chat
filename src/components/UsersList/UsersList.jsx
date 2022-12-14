import css from './UsersList.module.css';

import toast, { Toaster } from 'react-hot-toast';

import { Logout } from 'components/Logout/Logout';

import { auth, db } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useUserData } from 'hooks/useUserData';
import { User } from 'components/User/User';
import { SendMessage } from 'components/SendMessage/SendMessage';
import { Message } from 'components/Message/Message';
import { ActiveUser } from 'components/ActiveUser/ActiveUser';
import { Filter } from 'components/Filter/Filter';

export default function UsersList() {
  const [user] = useAuthState(auth);

  const [usersList, setUsersList] = useState([]);
  const [filter, setFilter] = useState('');
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const user1 = auth.currentUser.uid;
  useUserData();

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let usersList = [];
      querySnapshot.forEach(doc => {
        usersList.push({ ...doc.data() });
        setUsersList(
          usersList.filter(user => {
            return user.uid !== auth.currentUser.uid;
          })
        );
      });
    });

    return () => unsubscribe;
  }, []);

  const handleChange = e => {
    const value = e.target.value.toLocaleLowerCase();

    setFilter(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (text === '') {
      toast.error('Please write the text', {
        style: {
          backgroundColor: '#eb4034a0',
          padding: '16px',
          color: '#fffaee',
        },
        iconTheme: {
          primary: '#eb4034',
          secondary: '#FFFAEE',
        },
      });
      return;
    }

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });

    const getRandomMsg = async () => {
      try {
        const msg = await fetch('https://api.chucknorris.io/jokes/random');
        const res = await msg.json();
        const data = await res.value;

        await addDoc(collection(db, 'messages', id, 'chat'), {
          text: data,
          from: user2,
          to: user1,
          createdAt: Timestamp.fromDate(new Date()),
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    setTimeout(() => {
      getRandomMsg();
    }, 10000);

    await setDoc(doc(db, 'lastMessage', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
    });

    setText('');
  };

  const getFilteredUsers = () => {
    if (!filter) {
      return usersList;
    }
    return usersList.filter(user =>
      user.username.toLocaleLowerCase().includes(filter)
    );
  };

  const selectUser = user => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const messagesRef = collection(db, 'messages', id, 'chat');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, querySnapshot => {
      let messages = [];
      querySnapshot.forEach(doc => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });
  };

  const renderUsersList = getFilteredUsers();

  return (
    <>
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

          <Filter
            filter={filter}
            handleChange={handleChange}
            usersList={usersList}
          />
        </div>

        <div className={css.ChatsUsers}>
          <h2 className={css.Title}>Chats</h2>
          <ul className={css.UsersList}>
            {usersList.length > 0 ? (
              renderUsersList.map(user => {
                return (
                  <User
                    key={user.uid}
                    user={user}
                    user1={user1}
                    selectUser={selectUser}
                    chat={chat}
                  />
                );
              })
            ) : (
              <h3>No user in the chat </h3>
            )}
          </ul>
        </div>
      </div>
      {usersList.length > 0 ? (
        <div className={css.MessagesContainer}>
          {chat ? (
            <div className={css.ActiveUserCntainer}>
              <ActiveUser chat={chat} />
              <div className={css.Messages}>
                {messages &&
                  messages.map((message, index) => (
                    <Message
                      key={index}
                      message={message}
                      user={chat}
                      user1={user1}
                    />
                  ))}
              </div>

              <SendMessage
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
              />
            </div>
          ) : (
            <h3>Select a user to start chatting</h3>
          )}
        </div>
      ) : null}
      <Toaster position="top-right" />
    </>
  );
}
