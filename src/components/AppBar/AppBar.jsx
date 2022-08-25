import css from './AppBar.module.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

import { Login } from 'components/Login/Login';

export const AppBar = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  return (
    <div className={css.AppBar}>
      <div className={css.LoginContainer}>
        {user ? (
          navigate('/login', {
            replace: true,
          })
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};
