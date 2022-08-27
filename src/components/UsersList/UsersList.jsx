import css from './UsersList.module.css';

import { Logout } from 'components/Logout/Logout';

import { auth, db } from '../../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';

import { useUserData } from 'hooks/useUserData';

export default function UsersList() {
  const [user] = useAuthState(auth);

  const [usersList, setUsersList] = useState([]);
  const [filter, setFilter] = useState('');
  // const { username } = useUserData();

  useUserData();
  // console.log(user);
  console.log(usersList);

  const date = new Date();

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let usersList = [];
      querySnapshot.forEach(doc => {
        usersList.push({ ...doc.data() });
        setUsersList(usersList);
      });
    });

    return () => unsubscribe;
  }, []);

  const handleChange = e => {
    const value = e.target.value.toLocaleLowerCase();

    setFilter(value);
  };

  const getFilteredUsers = () => {
    if (!filter) {
      return usersList;
    }
    return usersList.filter(user =>
      user.username.toLocaleLowerCase().includes(filter)
    );
  };

  const renderUsersList = getFilteredUsers();

  return (
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

      <div className={css.ChatsUsers}>
        <h2 className={css.Title}>Chats</h2>
        <ul className={css.UsersList}>
          {usersList.length > 0
            ? renderUsersList.map(({ uid, photoURL, name }) => {
                return (
                  <li key={uid} className={css.UsersItem}>
                    <NavLink to={`/users/:${uid}`} className={css.UsersLink}>
                      <div className={css.UsersImgContainer}>
                        <img
                          src={photoURL}
                          alt={name}
                          width="50"
                          className={css.UsersImg}
                        />
                      </div>
                      <div className={css.UsersName}>
                        <h3 className={css.UsersTitle}>{name}</h3>
                        <p className={css.UsersMessage}>
                          Alice freeman is a chat.
                        </p>
                      </div>
                      <div className={css.UsersDate}>
                        {date.toLocaleTimeString()}
                      </div>
                    </NavLink>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}
