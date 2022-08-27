import css from './Logout.module.css';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  const signOut = () => {
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
