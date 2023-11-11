import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
import { onValue, push, ref, set, update } from "firebase/database";


const FireBaseContext = createContext({});


const FireBaseProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [activeUserNick, setActiveUserNick] = useState(null);
    const [activeUserData, setActiveUserData] = useState(null);
    const [wasRegistrtionSuccesful, setWasRegistrtionSuccesful] = useState(false);

    const basePhoto = "https://firebasestorage.googleapis.com/v0/b/languageapp-43a7b.appspot.com/o/basicProfile.jpg?alt=media&token=27f19efa-85cc-4543-a151-341535290cdb";


    const getActiveUserRef = () => {
        if(activeUserNick===null)
        throw("error couldnt retive nick")
        return ref(db, "users/userData/" + activeUserNick);
    }
   const  getUserRef=(nick)=>{
    return ref(db, "users/userData/" + nick);
    }
    

    useEffect(() => {
        console.log("%%%%%%%%%%%%%%%%%% - " + activeUserNick);
        if (activeUserNick != null) {
            const unsubscribe = onValue(getActiveUserRef(), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setActiveUserData(data);
                    console.log("activeu se data: " + JSON.stringify(activeUserData));
                }
                else {
                    console.error("active user darta doens not exist");
                    setActiveUserData(null);
                }

            })
        }

    }, [activeUserNick]);

    const updateActiveUser = (nick: string) => {

        setActiveUserNick(nick);
    }

    const logOut = async () => {
        //console.log("FireBAse LOGut")
        await auth.signOut();
        setWasRegistrtionSuccesful(false)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // console.log('user',user);
            setIsLogged(user ? true : false);
            if (user)
                updateActiveUser(user.displayName);

        })
    }, [])


    const fireBaseLogin = async (email: string, password: string) => {
        console.log("FireBase LOGIn: " + email + "____" + password);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // console.log(JSON.stringify(users));
        }
        catch (err) {
            throw (JSON.stringify(err))
        }

    }

    const getActiveUserNick = (): string => {
        return activeUserNick ? activeUserNick : "error";
    }

    const validateNick = (nick: string): boolean => {

        const nickExists = usersList.some((element) => element.nick === nick);


        return !nickExists;
    }

    const getSearchFriends=(query: string): any[] =>{
        searcheResult=usersList.filter((elemnet)=>{
            return elemnet.isSearchable && elemnet.nick!==activeUserNick && elemnet.nick.substring(0,query.length)===query;
        })
        
        return searcheResult;
    }


    const createUser=async (nick: string)=>
    {
        const newIndx=usersList.length;
        let newData={...usersList};
        newData[newIndx]={
            "isSearchable": false,
        "nick": nick,
		"profilePic": basePhoto
        };
       await updateUserList(newData);

        let newUserData={
            "isDarkMode": true,
            "isTurnFlashCardsByShaking": false,
            "index": newIndx
        };

       
    await setActiveUserNick(nick);
      await set(getUserRef(nick),newUserData).catch((err)=>{
        console.error("Wrror when seData: "+ err);
      })
      await setActiveUserData(newUserData);
    }

    const register =async (nick: string, email: string, password: string) => {
        

try{
        const nickUpdate={
            displayName: nick
          };
          const response= await createUserWithEmailAndPassword(auth,email,password).then(async ()=>{
           await updateProfile(auth.currentUser,nickUpdate);
          });
          createUser(nick);
        }
        catch(ex)
        {
            console.error(er);
            logOut();
        }
          
`          `


    }

    const usersListRef = ref(db, '/users/usersList');
    useEffect(() => {





        const unsubscribe = onValue(usersListRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const usersArray: any[] = data ? Object.values(data) : [];
                setUsersList(usersArray);
            }
            else {
                console.error('userslist data does not exist');
                setUsersList([]);
            }

        }
        )

        return () => {
            unsubscribe();
        };
    }, [db])


    const updateActiveUserData = async (newData) => {
        await update(getActiveUserRef(), newData).then(console.log("data active user Udpated"));

    }
    const updateUserList = async (newData) => {
        await set(usersListRef, newData).then(console.log("data user list Udpated"));
    }


    const getActiveProfilePic = (): string => {
        // console.log("***********************************PRIFOLE PIC")
        // console.log(JSON.stringify(activeUserData));
        // console.log(JSON.stringify(usersList[activeUserData.index]));
        try {
            return (usersList && activeUserData) ? usersList[activeUserData.index].profilePic : basePhoto;
        }
        catch (er) {
            console.error(er);
            return basePhoto;
        }
        // return usersList[activeUserData.index].proflePic;
    }

    const setIsurnFlashCardsByShaking = (state: boolean) => {
        if (activeUserData) {
            const newData = { ...activeUserData, isTurnFlashCardsByShaking: state };
            setActiveUserData(newData);
            updateActiveUserData(newData);
        }



    }
    const setIsDarkMode = (state: boolean) => {
        if (activeUserData) {
            const newData = { ...activeUserData, isDarkMode: state };
            setActiveUserData(newData);
            updateActiveUserData(newData);
        }
    }

    const setIsSearchable = (state: boolean) => {
        if (activeUserData && usersList) {
            const newData = [...usersList];
            newData[activeUserData.index].isSearchable = state;
            setUsersList(newData);

            console.log("srerachable updaet: " + JSON.stringify(usersList[activeUserData.index]));
            console.log("srerachable updaet: " + JSON.stringify(newData[activeUserData.index]));
            updateUserList(newData);
        }
    }

    const getIsSearchable = (): boolean => {
        return (usersList && activeUserData) ? usersList[activeUserData.index].isSearchable : false;
    }
    const getIsDarkMode = (): boolean => {
        return activeUserData ? activeUserData.isDarkMode : false;
    }
    const getIsurnFlashCardsByShaking = (): boolean => {
        return activeUserData ? activeUserData.isTurnFlashCardsByShaking : false;
    }
    return (
        <FireBaseContext.Provider
            value={{
                isLogged,
                fireBaseLogin,
                logOut,
                validateNick,
                register,
                getActiveUserNick,
                getActiveProfilePic,
                setIsurnFlashCardsByShaking, getIsurnFlashCardsByShaking,
                setIsDarkMode, getIsDarkMode,
                setIsSearchable, getIsSearchable,
                activeUserData,
                wasRegistrtionSuccesful,
                getSearchFriends
            }}
        >
            {children}
        </FireBaseContext.Provider>

    )

}


export { FireBaseContext, FireBaseProvider }
