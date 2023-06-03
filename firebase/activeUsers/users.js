import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, set, remove, onValue } from 'firebase/database';
import { useContext, useState } from 'react';
import { createContext } from 'react';

const db = getDatabase();
const auth = getAuth();
const UsersContext = createContext();
export const useDatabase = () => useContext(UsersContext);
export const UsersProvider = ({children}) => {
    const [activeUsersData, setActiveUersData] = useState();
    const currentDate = new Date();
    const id = currentDate.getTime();

    const activeUsersTracker = () => {
        const activeUsersRef = ref(db, 'activeUsers');

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("user signed in")
                const { uid, displayName, photoURL } = user;
                set(child(activeUsersRef, uid), { displayName, photoURL, id });
            } else {
                remove(child(activeUsersRef, user.uid))
            }
        })
    }

    const getActiveUsers = () => {
        const activeUsersRef = ref(db, 'activeUsers');
        return onValue(activeUsersRef, (snap) => {
            const activeUsers = [];
            snap.forEach((childSnapshot) => {
                const uid = childSnapshot.key;
                const { displayName, photoURL } = childSnapshot.val();
                activeUsers.push({ uid, displayName, photoURL} );
            })
                setActiveUersData(activeUsers)
        })
    }

return(
    <UsersContext.Provider value={{activeUsersTracker, getActiveUsers, activeUsersData}}>
         {children}
    </UsersContext.Provider>
)
}