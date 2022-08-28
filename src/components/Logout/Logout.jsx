import css from './Logout.module.css';

import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';

export const Logout = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });

    auth
      .signOut()
      .then(() => {
        navigate('/', {
          replace: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <button className={css.LogoutBtn} onClick={signOut}>
      Logout
    </button>
  );
};
