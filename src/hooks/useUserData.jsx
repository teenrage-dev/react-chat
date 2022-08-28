import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const documentRef = doc(db, 'users', user.uid);
      const getUserData = async () => {
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
          unsubscribe = onSnapshot(documentRef, doc => {
            setUsername(doc.data().username);
          });
        } else {
          await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName,
            email: user.email,
            username: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
          });
          setUsername(docSnap.data().username);
        }
      };
      getUserData();
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
