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
  // const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  // console.log(messages);

  useEffect(() => {
    if (user) {
      const updateIsOnline = async () => {
        try {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: true,
          });
          console.log(`UserOnline`);
        } catch (error) {
          console.log(error);
        }
      };
      updateIsOnline();
    }
  }, [user]);

  // useEffect(() => {
  //   const q = query(collection(db, 'messages'), orderBy('timestamp'));
  //   const unsubscribe = onSnapshot(q, querySnapshot => {
  //     let messages = [];
  //     querySnapshot.forEach(doc => {
  //       messages.push({ ...doc.data(), id: doc.id });
  //       setMessages(messages);
  //     });
  //   });
  //   return () => unsubscribe;
  // }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user ? (
        <div className={css.ChatsLayout}>
          <UsersList />

          {/* <div className={css.MessagesContainer}>
              <div className={css.ActiveUserCntainer}>
                <div className={css.ActiveUser}>
                  <div className={css.ActiveUserInfo}>
                    <img
                      src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
                      alt="User"
                      width="50"
                    />
                    <h2 className={css.ActiveUserTitle}>UserName</h2>
                  </div>
                  <hr className={css.Line} />
                </div>
                <div className={css.Messages}>
                  {messages &&
                    messages.map(message => {
                      console.log(message);
                      return (
                        <div
                          key={message.id}
                          className={css.message}
                          style={
                            user.uid === message.uid
                              ? {
                                  border: '1px solid #0f0',
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }
                              : {
                                  border: '1px solid #f00',
                                }
                          }
                        >
                          {message.text}
                        </div>
                      );
                    })}
                </div>
              </div>
              <SendMessage />
            </div> */}
        </div>
      ) : (
        navigate('/', {
          replace: true,
        })
      )}
    </>
  );
};
