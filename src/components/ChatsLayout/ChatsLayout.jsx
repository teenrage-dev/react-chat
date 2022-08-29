import css from './ChatsLayout.module.css';

import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useEffect } from 'react';

import { doc, updateDoc } from 'firebase/firestore';

import { Loader } from 'components/Loader/Loader';
import UsersList from 'components/UsersList/UsersList';
import { useNavigate } from 'react-router-dom';

export const ChatsLayout = () => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const updateIsOnline = async () => {
        try {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: true,
          });
        } catch (error) {}
      };
      updateIsOnline();
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user ? (
        <div className={css.ChatsLayout}>
          <UsersList />
        </div>
      ) : (
        navigate('/', {
          replace: true,
        })
      )}
    </>
  );
};
