import css from './Chat.module.css';

import { ChatsLayout } from 'components/ChatsLayout/ChatsLayout';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Chat = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <main>
        <div className={css.Chat}>
          <h2>Chat</h2>
          <ChatsLayout />
        </div>
      </main>
    </>
  );
};
