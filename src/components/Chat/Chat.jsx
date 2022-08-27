import css from './Chat.module.css';

import { ChatsLayout } from 'components/ChatsLayout/ChatsLayout';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Chat = () => {
  const [user] = useAuthState(auth);

  // if (user) {
  //   console.log(user.uid);
  // }
  // const currentUser = auth.currentUser;
  // // console.log(auth.currentUser);

  // useEffect(() => {
  //   console.log(user);
  //   const addUsersList = async () => {
  //     await addDoc(collection(db, 'users'), {
  //       user: {
  //         uid: currentUser.uid,
  //         photoURL: currentUser.photoURL,
  //         displayName: currentUser.displayName,
  //       },
  //     });
  //   };
  //   addUsersList();
  // }, [user, currentUser]);

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
