import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';

export default function UsersList() {
  const [user] = useAuthState(auth);
  const [usersList, setUsersList] = useState([]);

  const currentUser = auth.currentUser;

  //Filter UsersList
  let filteredUsersList =
    usersList.length !== 0
      ? usersList
          .map(({ user }) => {
            // console.log(user);
            if (
              user.uid.toLowerCase().includes(currentUser.uid.toLowerCase())
            ) {
              return true;
            }
            return true;
          })
          .includes(true)
      : false;
  console.log(`Filtered Users LIST :${filteredUsersList}`);
  if (usersList.length === 0) {
    let filteredUsersList = true;
    console.log(`Filtered Users LIST :${filteredUsersList}`);
  }

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let usersList = [];
      querySnapshot.forEach(doc => {
        usersList.push({ ...doc.data() });
        setUsersList(usersList);
      });
    });

    return () => unsubscribe;
  }, []);

  useMemo(() => {
    const { uid, displayName, photoURL } = auth.currentUser;
    const addUsersList = async () => {
      await addDoc(collection(db, 'users'), {
        user: {
          uid: uid,
          photoURL: photoURL,
          displayName: displayName,
        },
      });
    };
    if (filteredUsersList === true) {
      console.log(`IF DONE`, Date.now());
      addUsersList();
    }
    // addUsersList();
  }, [filteredUsersList]);
  console.log(usersList);

  return (
    <div>
      {/* <h2>The designer are...</h2> */}
      <ul></ul>
    </div>
  );
}
