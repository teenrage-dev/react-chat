import css from './Login.module.css';
import { auth } from '../../firebase';

import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

export const Login = () => {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className={css.Login}>
      <h1 className={css.Login__Title}>Let's Go To Chat</h1>
      <p className={`${css.Animation} ${css.Login__Text}`}>&#128071;</p>
      <GoogleButton onClick={googleLogin} />
    </div>
  );
};
