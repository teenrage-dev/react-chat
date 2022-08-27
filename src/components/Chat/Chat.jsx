import css from './Chat.module.css';

import { ChatsLayout } from 'components/ChatsLayout/ChatsLayout';

export const Chat = () => {
  return (
    <>
      <main>
        <div className={css.Chat}>
          <ChatsLayout />
        </div>
      </main>
    </>
  );
};
