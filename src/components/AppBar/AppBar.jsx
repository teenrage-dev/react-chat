import css from './AppBar.module.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

import { Login } from 'components/Login/Login';
import { Loader } from 'components/Loader/Loader';

export const AppBar = () => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }
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
