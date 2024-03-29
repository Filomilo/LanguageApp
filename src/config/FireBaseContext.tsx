import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth, db, storage } from './firebase-config';
import { onValue, push, ref, set, update,get } from 'firebase/database';
import {getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FireBaseContext = createContext({});

const FireBaseProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [usersListWorkingCopy, setUsersListWorkingCopy] = useState([]);
  const [activeUserNick, setActiveUserNick] = useState(null);
  const [activeUserData, setActiveUserData] = useState(null);
  const [wasRegistrtionSuccesful, setWasRegistrtionSuccesful] = useState(false);
  const [friendListRequest, setFriendListRequest] = useState([]);
  const [decksList, setDecksList] = useState([]);
  const [activeUserDecksList, setActiveUserDecksList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userStat, setUserStat] = useState([]);
  const basePhoto =
    'https://firebasestorage.googleapis.com/v0/b/languageapp-43a7b.appspot.com/o/basicProfile.jpg?alt=media&token=27f19efa-85cc-4543-a151-341535290cdb';

  const getActiveUserRef = () => {
    // if(activeUserNick===null)
    // throw("error couldnt retive nick")
    return ref(db, 'users/userData/' + activeUserNick);
  };

  const getActiveUserRecentDecksRef = () => {
    // if(activeUserNick===null)
    // throw("error couldnt retive nick")
    return ref(db, '/decks/deck_usage/' + activeUserNick);
  };

  const getUserRecentDecksRef = (nick) => {
    // if(activeUserNick===null)
    // throw("error couldnt retive nick")
    return ref(db, '/decks/deck_usage/' + nick);
  };
  const getActiveUserStatRef = () => {
    return ref(db, '/users/userStat/flashCards/' + activeUserNick);
  };

  const getActiveUserFriendListRef = () => {
    return ref(db, 'users/friends/friendsList/' + activeUserNick);
  };

  const getUserFriendListRef = (id :string) => {
    return ref(db, 'users/friends/friendsList/' + id);
  };

  const getDeckDataRef = (id: string) => {
    return ref(db, 'decks/decks_data/' + id);
  };

  const getDecksListRef = () => {
    //if(activeUserNick===null)
    //throw("error couldnt retive nick")
    return ref(db, 'decks/decks_list/');
  };

  const getUserRef = (nick) => {
    return ref(db, 'users/userData/' + nick);
  };

  useEffect(() => {
    //TODO SIMPLY IF ELSE
    if (isLogged) {
      if (activeUserData !== null && activeUserData !== undefined) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      if (activeUserNick !== null && activeUserNick !== undefined) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
      if (
        usersList !== null &&
        usersList !== undefined &&
        usersList.length > 0
      ) {
        setIsLoading(false);
      } else {
        // //console.log(JSON.stringify(usersList))
        setIsLoading(true);
      }
    }
  }, [activeUserData, activeUserNick, usersList]);

  const setDarskModeState=async (state: boolean)=>
  {
    try{
        await AsyncStorage.setItem(
          'darkMode',
          String(state),
        );
      } catch (error) {
        // Error saving data
      }
    
  
  }

  useEffect(() => {
    // //console.log("%%%%%%%%%%%%%%%%%% - " + activeUserNick);
    if (activeUserNick != null) {
      const unsubscribe = onValue(getActiveUserRef(), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setActiveUserData(data);
          setDarskModeState(data.isDarkMode);



        } else {
          console.error('active user darta doens not exist');
          setActiveUserData(null);
        }
      });

      let decksArray: any[] = [];
      const unsubscribeDecksList = onValue(
        getActiveUserRecentDecksRef(),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            decksArray = data ? Object.values(data) : [];
            setActiveUserDecksList(decksArray);
            // //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            //  //console.log(getActiveUserRecentDecksRef())
            //  //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
          } else {
            //console.log(
              //'active decks list data does not exist' +
              //  JSON.stringify(getActiveUserRecentDecksRef())
            //);
            setDecksList([]);
          }
        }
      );

      let statArray: any[] = [];
      const unsubscribeStatList = onValue(
        getActiveUserStatRef(),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            decksArray = data ? Object.values(data) : [];
            setUserStat(decksArray);
            //  //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            //  //console.log(getActiveUserRecentDecksRef())
            //  //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
          } else {
            //console.log(
            //  'active decks list data does not exist' +
          //     JSON.stringify(getActiveUserStatRef())
            //);
            setDecksList([]);
          }
        }
      );

      return () => {
        unsubscribe();
        unsubscribeDecksList();
        unsubscribeStatList();
      };
    }
  }, [activeUserNick]);

  const updateActiveUser = (nick: string) => {
    setActiveUserNick(nick);
  };

  const logOut = async () => {
    ////console.log("FireBAse LOGut")
    await auth.signOut();
    setWasRegistrtionSuccesful(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // //console.log('user',user);
      setIsLogged(user ? true : false);
      if (user) updateActiveUser(user.displayName);
    });
  }, []);

  const fireBaseLogin = async (email: string, password: string) => {
    let res="22";
    try{
      const response = await signInWithEmailAndPassword(auth, email, password)
      }
      catch(err)
      {
        res=err.code;
      }
      return res;
  };

  const getActiveUserNick = (): string => {
    return activeUserNick ? activeUserNick : 'error';
  };

  const validateNick = (nick: string): boolean => {
    const nickExists = usersList.some((element) => element.nick === nick);

    return !nickExists;
  };

  const getSearchFriends = (query: string): any[] => {
    searcheResult = usersList.filter((elemnet) => {
      return (
        elemnet.isSearchable &&
        !elemnet.isFriend &&
        elemnet.nick !== activeUserNick &&
        elemnet.nick.substring(0, query.length) === query
      );
    });

    return searcheResult;
  };

  const createUser = async (nick: string) => {

    const userListsTmp=(await get(usersListRef)).val();
   // //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
   // //console.log(JSON.stringify(userListsTmp));
  
    const newIndx = userListsTmp.length;
    let newData = { ...userListsTmp };
    newData[newIndx] = {
      isSearchable: false,
      nick: nick,
      profilePic: basePhoto,
    };
    await updateUserList(newData);



    let newUserData = {
      isDarkMode: true,
      isTurnFlashCardsByShaking: false,
      index: newIndx,
    };


    let empytArr={};
    //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
   
    await set(getActiveUserRecentDecksRef(),JSON.parse(JSON.stringify(empytArr)));
    await set(getActiveUserStatRef(),JSON.parse(JSON.stringify(empytArr)));
    await set(getActiveUserFriendListRef(),JSON.parse(JSON.stringify(empytArr)));
    //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    
    await setUserStat(empytArr);
    await setActiveUserNick(nick);
    await set(getUserRef(nick), newUserData).catch((err) => {
      console.error('Wrror when seData: ' + err);
    });
    await setActiveUserData(newUserData);
  };

  const register = async (nick: string, email: string, password: string) => {
    try {
      const nickUpdate = {
        displayName: nick,
      };
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async () => {
        await updateProfile(auth.currentUser, nickUpdate);
      });
      createUser(nick);
    } catch (ex) {
      console.error(er);
      logOut();
    }

    `          `;
  };

  const usersListRef = ref(db, '/users/usersList');
  useEffect(() => {
    if (activeUserNick !== null) {
      let friendsRequestArray = [];

      const unsubscribeReuqest = onValue(friendsRequestListRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          friendsRequestArray = data ? Object.values(data) : [];
          setFriendListRequest(friendsRequestArray);
          ////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(friendsRequestArray)+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        } else {
          console.error(
            'friends request data does not exist: ' + snapshot.toJSON()
          );
          setFriendListRequest([]);
        }
      });
      let friendsListArray: any[] = [];
      const unsubscribeFriendList = onValue(
        getActiveUserFriendListRef(),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            friendsListArray = data ? Object.values(data) : [];
            setFriendList(friendsListArray);
            console.log("()()()()()()()())()()()()()()()())" + JSON.stringify(friendsListArray)+"()()()()()()()())()()()()()()()())")
          } else {
            //console.log(
         //     'friends list data does not exist' +
         //       JSON.stringify(getActiveUserFriendListRef())
         //   );
            setFriendList([]);
          }
        }
      );

      let decksArray: any[] = [];
      const unsubscribeDecksList = onValue(getDecksListRef(), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          decksArray = data ? Object.values(data) : [];
          ////console.log("*******************************")
          // //console.log(decksArray)
          //  //console.log("*******************************")
          setDecksList(decksArray);
        } else {
          console.error(
            'decks list data does not exist' + JSON.stringify(getDecksListRef())
          );
          setDecksList([]);
        }
      });

      let usersArray: any[];

      const unsubscribe = onValue(usersListRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          usersArray = data ? Object.values(data) : [];
          setUsersList(usersArray);
          usersArray.forEach((element) => {
            if (
              friendsRequestArray.find((element2) => {
                return (
                  element2.to === element.nick &&
                  element2.from === activeUserNick
                );
              }) !== undefined
            ) {
              element.alreadySendRequest = true;
            } else element.alreadySendRequest = false;

            if (
              friendsListArray.find((element2) => {
                // //console.log("elemnt: " + element2.nick +"==="+element.nick);
                return element2.nick === element.nick;
              }) !== undefined
            ) {
              element.isFriend = true;
            } else element.isFriend = false;
          });
          // //console.log("setUSerList: "+ JSON.stringify(usersArray))
          setUsersListWorkingCopy(usersArray);
        } else {
          console.error('userslist data does not exist');
          setUsersList([]);
        }
      });

      return () => {
        unsubscribe();
        unsubscribeReuqest();
        unsubscribeFriendList();
        unsubscribeDecksList();
      };
    }
  }, [db, activeUserNick]);

  const friendsRequestListRef = ref(db, '/users/friends/requests');

  const getFindDeck = (sortby, filterLang1, filterLang2) => {
    console.log("data: "+JSON.stringify(decksList));

    //if(sortby===undefined)
    //return [];
    let res: any[] = decksList.filter((element) => {
      if(!element.visibilty)
        return false
        if(filterLang1!==undefined && filterLang1!=="-")
        {
           if(element.lang_1!==filterLang1)
           return false
        }

        if(filterLang2!==undefined && filterLang2!=="-")
        {
           if(element.lang_2!==filterLang2)
           return false
        }

      return true;
    });
  

      //console.log(res[1].usage)
    console.log("sort: "+ sortby)
    if(sortby==="amount of cards"){
     
      res.sort((a,b)=> b.amt_of_cards-a.amt_of_cards)
    }
    else
    {
      res.sort((a,b)=> (b.usage===undefined?0:b.usage) - (a.usage===undefined?0:a.usage))
    }
   // console.log("res: "+JSON.stringify(res))
    return res;
  };

  const updateActiveUserData = async (newData) => {
    await update(getActiveUserRef(), newData).then(
      //console.log('data active user Udpated')
    );
  };
  const updateUserList = async (newData) => {
    await set(usersListRef, newData).then(
      //console.log('data user list Udpated')
    );
  };


const increaseDeckUsage=(index: number)=>
{
  console.log("increse: "+ index);
  let deckArrayCopy=[...decksList];
  deckArrayCopy[index].usage=(deckArrayCopy[index].usage===undefined?0:deckArrayCopy[index].usage) +1;

set(getDecksListRef(),deckArrayCopy);
setDecksList(deckArrayCopy);

}

  const getActiveProfilePic = (): string => {
    // //console.log("***********************************PRIFOLE PIC")
    // //console.log(JSON.stringify(activeUserData));
    // //console.log(JSON.stringify(usersList[activeUserData.index]));
    try {
      return usersList &&
        activeUserData !== null &&
        activeUserData !== undefined &&
        usersList[activeUserData.index] !== undefined
        ? usersList[activeUserData.index].profilePic
        : basePhoto;
    } catch (er) {
      console.error(er);
      return basePhoto;
    }
    // return usersList[activeUserData.index].proflePic;
  };

  const setIsurnFlashCardsByShaking = (state: boolean) => {
    if (activeUserData) {
      const newData = { ...activeUserData, isTurnFlashCardsByShaking: state };
      setActiveUserData(newData);
      updateActiveUserData(newData);
      //console.log("**********************************]\n"+JSON.stringify(activeUserData))
    }
  };
  const setIsDarkMode = (state: boolean) => {
    if (activeUserData) {
      const newData = { ...activeUserData, isDarkMode: state };
      setActiveUserData(newData);
      updateActiveUserData(newData);
      setDarskModeState(state);
    }
  };

  const setIsSearchable = (state: boolean) => {
    if (activeUserData && usersList) {
      const newData = [...usersList];
      newData[activeUserData.index].isSearchable = state;
      setUsersList(newData);

      //  //console.log("srerachable updaet: " + JSON.stringify(usersList[activeUserData.index]));
      //  //console.log("srerachable updaet: " + JSON.stringify(newData[activeUserData.index]));
      updateUserList(newData);
    }
  };

  const getIsSearchable = (): boolean => {
    // //console.log("&&&&&&&&&&&&&&&&&&&&"+JSON.stringify(usersList.length)+"%%%%%%%%%%%%%%%%%%%")
    return usersList !== undefined &&
      activeUserData !== undefined &&
      usersList[activeUserData.index] !== undefined
      ? usersList[activeUserData.index].isSearchable
      : false;
  };
  const getIsDarkMode = (): boolean => {
    return activeUserData ? activeUserData.isDarkMode : false;
  };
  const getIsurnFlashCardsByShaking = (): boolean => {
    return activeUserData ? activeUserData.isTurnFlashCardsByShaking : false;
  };

  const getFriendsRequests = () => {
    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    //console.log(JSON.stringify(friendListRequest));

    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

    let arrayReuest = friendListRequest.filter((element) => {
      return element.to === activeUserNick && !element.isFriend;
    });
    arrayReuest.forEach((elemeent) => {
      elemeent.profilePic = usersList[elemeent.fromIndx].profilePic;
    });
    return arrayReuest;
  };

  const getYourFriends = () => {
    let array = friendList;
    console.log("******************************** friendList")
    console.log(getActiveUserFriendListRef())

    console.log("******************************** friendList")

    array.forEach((element) => {
      element.profilePic = usersListWorkingCopy[element.index].profilePic;
    });
    return array;
  };

  const getAvgFlashCards = () => {
    let count: number = 0;
    let amt: number = 0;
    if(userStat==null)
    return 0;

    userStat.forEach((element) => {
      count++;
      amt += element.amt;
    });
    return amt / count;
  };



  const getYourRecentDecks = () => {
   
    let res: any[] = [];
    let date: Date = new Date();
    let i = 0;

if(activeUserDecksList==null)
return [];
 
    console.log("activeUserDecksList: "+JSON.stringify(activeUserDecksList))
    console.log("decksList: "+JSON.stringify(decksList))

    activeUserDecksList.forEach((element) => {
      let tempObj: any = {};
      tempObj.author = decksList[element.index].author;
      tempObj.lang_1 = decksList[element.index].lang_1;
      tempObj.lang_2 = decksList[element.index].lang_2;
      tempObj.name = decksList[element.index].name;
      tempObj.id = decksList[element.index].ID;
      tempObj.amt_of_cards = decksList[element.index].amt_of_cards;

      let tmpDate =
        (date.getTime() - new Date(element.last_used).getTime()) /
          (1000 * 3600 * 24)
      ;
      tempObj.last_used = tmpDate;

      res.push(tempObj);
      i++;
    });
    console.log("res: "+ JSON.stringify(res))
    res.sort((a, b) => {
      return a.last_used - b.last_used;
    });
    //console.log(
   //   'res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res '
    //);

    //console.log(res);
    //console.log(
  //    'res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res '
   // );

    return res;
  };

  const getAmtOfDecks = () => {
    let count: number = 0;
    decksList.forEach((element) => {
      if (element.author === activeUserNick) count++;
    });
    return count;
  };

  const getStatData = async () => {
    //console.log("Data: " + 33)

    const updateUserStat=( await get(getActiveUserStatRef())).val();
    await setUserStat(updateUserStat);
    console.log(JSON.stringify(updateUserStat));
    if(updateUserStat==null)
    {
      return undefined
    }



    let date: Date = new Date();
    let data = {};
    data.labels = [];
    data.datasets = [];
    let datasetObject = {};
    datasetObject.data = [];
    for (let i = 0; i < 7; i++) {
      let currDate: Date = new Date();
      currDate.setDate(date.getDate() - (6 - i));
      data.labels.push(
        new String(
          new String(new Number(currDate.getMonth() + 1)) +
            '.' +
            currDate.getDate()
        )
      );
      let val = 0;
      updateUserStat.forEach((element) => {
        console.log(getDateFormatted(currDate)+"==="+element.date)
        if (
          getDateFormatted(currDate) === element.date
        ) {
         
          val += element.amt;
          console.log('corret: '+val );
        }
      });

      datasetObject.data.push(val);
    }

    /*
 userStat.forEach((element)=>{
        count++;
        amt+=element.amt
    });
*/

    //datasetObject.data = [1, 2, 3, 4, 5,6,7];
    data.datasets.push(datasetObject);

    //  //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    //  //console.log(JSON.stringify(data));
    //  //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

    /* data = {
        labels: [new String(date.getMonth()+"."+date.getDate()), "", "", "", "", "", ""],
        datasets: [
          {
            data: [50, 45, 28, 80, 99, 43,2]
          }
        ]
      };
*/

        console.log("statdata: " + JSON.stringify(data));

    return data;
  };

  const getIsCapableOfEdit = (id: number) => {
    // //console.log(decksList[id].author+ "===" + activeUserNick);
    return decksList[id].author === activeUserNick;
  };

  const getDeckData = async (id: string) => {
    let DeckData = {};
    DeckData = await new Promise((resolve, reject) => {
      const unsubscribe = onValue(
        getDeckDataRef(id),
        (snapshot) => {
          ////console.log('OPEN ' + id);
          if (snapshot.exists()) {
            const data = snapshot.val();
            // //console.log('^^^^^^^^^^^^^^^^^');

            //   //console.log(data);
            unsubscribe();
            resolve(data);
          } else {
            console.error(
              'deck: ' +
                id +
                ' data does not exist' +
                JSON.stringify(getDeckDataRef(id))
            );
            reject(new Error('Deck data does not exist'));
          }
        },
        {
          onlyOnce: true,
        }
      );
    });

    ////console.log('£££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££');
    // //console.log(DeckData);
    DeckData.name = decksList[DeckData.index].name;
    DeckData.lang_1 = decksList[DeckData.index].lang_1;
    DeckData.lang_2 = decksList[DeckData.index].lang_2;
    DeckData.visibilty = decksList[DeckData.index].visibilty;
    ////console.log(DeckData);
    // //console.log('£££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££');

    return DeckData;
  };

  const createDeck = async () => {
    ////console.log("deck creation");
    let id = uuid.v4();
    let newlistData = {
      ID: id,
      amt_of_cards: 0,
      author: activeUserNick,
      lang_1: 'none',
      lang_2: 'none',
      name: activeUserNick + "'s deck",
      visibilty: false,
    };

    let tmpdeckList = decksList;
    let index: Number = tmpdeckList.length;
    tmpdeckList.push(newlistData);
    await set(getDecksListRef(id), tmpdeckList);

    let neDeckData = {
      cards: [
        {
          word_1: '',
          word_2: '',
        },
      ],
      index: index,
    };
    await set(getDeckDataRef(id), neDeckData);

    let decksArray: any[] = [];
    await onValue(getActiveUserRecentDecksRef(), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        decksArray = data ? Object.values(data) : [];
        setActiveUserDecksList(decksArray);
        //  //console.log(getActiveUserRecentDecksRef())
        //console.log(
        //  'tmprecetnDeckList tmprecetnDeckList tmprecetnDeckList tmprecetnDeckList tmprecetnDeckList tmprecetnDeckList '
     //   );
        //console.log(decksArray);
        //console.log(
       //   'tmprecetnDeckList tmprecetnDeckList tmprecetnDeckList tmprecetnDeckList tmprecetnDeckList '
       // );
      }
    });

    let tmprecetnDeckList = decksArray;
    let newUsagedata = {
      index: index,
      last_used: new Date().toISOString(),
      name: id,
    };
    tmprecetnDeckList.push(newUsagedata);
    await set(getActiveUserRecentDecksRef(), tmprecetnDeckList);

    return id;
  };

  const saveDeckData = async (id: string, deckdata: {}) => {
    let newDeckData = { index: deckdata.index, cards: deckdata.cards };
    let deckarray = decksList;
    deckarray[deckdata.index].amt_of_cards = newDeckData.cards.length;
    deckarray[deckdata.index].lang_1 = deckdata.lang_1;
    deckarray[deckdata.index].lang_2 = deckdata.lang_2;
    deckarray[deckdata.index].name = deckdata.name;
    deckarray[deckdata.index].visibilty = deckdata.visibilty;
    await set(getDeckDataRef(id), newDeckData);
    await set(getDecksListRef(id), deckarray);
    await setDecksList(deckarray);

  };

  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const scarambleArrat=(arr) =>{
    for (let i = arr.length - 1; i > 0; i--) {
      const j = getRndInteger(0, arr.length);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    arr = arr.filter(function (element) {
        return element !== undefined && element !== null ;
      });
  
      //console.log("arr arr arr arr arr arr arr arr arr arr arr arr arr ")
      //console.log(JSON.stringify(arr));

      //console.log("arr arr arr arr arr arr arr arr arr arr arr arr arr ")

    return arr;
  }
  const getTestData = (cards) => {
    if (cards === undefined) {
      console.error('undefined decks');
      return [];
    }

    let amtOfOpenQuestion = 0;
    let amtOfClosedQuestions = 0;

    if (cards.length < 5) {
      amtOfOpenQuestion = cards.length;
    } else {
      amtOfOpenQuestion = ~~(cards.length * 0.5);
      amtOfClosedQuestions = ~~(cards.length * 0.3);
    }
    const openQuestionWords = new Set();

    while (openQuestionWords.size < amtOfOpenQuestion) {
      openQuestionWords.add(getRndInteger(0, cards.length - 1));
    }

    const closeduestionWords = new Set();

    while (closeduestionWords.size <= amtOfClosedQuestions) {
      closeduestionWords.add(getRndInteger(0, cards.length - 1));
    }

    const tstData = [];

    closeduestionWords.forEach((element) => {
      const amtoFAcnwser = 4;
      const nawsers = new Set();
      nawsers.add(element);

      while (nawsers.size < amtoFAcnwser) {
        nawsers.add(getRndInteger(0, cards.length - 1));
      }
      let arraytmp = [...nawsers];
      arraytmp = scarambleArrat(arraytmp);

      //console.log(nawsers);
      let anwsersObject = [];
      let i = 0;
      let correct = -1;
      arraytmp.forEach((element2) => {
        if (element2 != undefined) {
          if (element2 == element) {
            correct = i;
          }

          //console.log(closeduestionWords);
          //console.log(element2);
          let enrty = { value: cards[element2].word_2, id: i++ };
          anwsersObject.push(enrty);
        }
      });

      let newEntry = {
        word: cards[element].word_1,
        type: 'closed',
        anwsers: anwsersObject,
        selected: -1,
        corrected: correct,
      };

      if (newEntry !== null && newEntry !== undefined) {
        tstData.push(newEntry);
      }
    });

    openQuestionWords.forEach((element) => {
      let newEntry = {
        word: cards[element].word_1,
        type: 'open',
        correct: cards[element].word_2,
        filled: '',
      };
      if (newEntry != null && newEntry != undefined) {
        tstData.push(newEntry);
      }
    });

    scarmbled = scarambleArrat(tstData);

    scarmbled = scarmbled.filter(function (element) {
      return element !== undefined;
    });

    //return testDataExample;
    return scarmbled;
  };


  const uploadNewFile=async (uri: string)=>{
    //console.log(uri);


    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      //console.log(JSON.stringify(blob));

const uniqueFilename = `${uuid.v4()}.jpeg`;
const storageReferance= storageRef(storage,"images/"+uniqueFilename);
     // const storageRef = firebase.storage().ref().child(`images/${fileName}`);
     const snapshot = await uploadBytes(storageReferance, blob);
 
     const downloadURL = await getDownloadURL(storageReferance);

      let newData= [...usersList];
      newData.forEach((element)=>{
         if(element.nick===activeUserNick)
         {
          element.profilePic=downloadURL;
         }
      })

    updateUserList(newData);




    return true;
   
    } catch (error) {
      console.error('Error:', error);
      return false;
    }

  }

const getShouldShake=()=>{
  //console.log("(((((((((((((((((((((((((((((((((("+activeUserData.isTurnFlashCardsByShaking+"))))))))))))))))")
  return activeUserData.isTurnFlashCardsByShaking;
}
const getContactInfo=async (id)=>{

  let acualData={};
  userData=usersList.find((element)=> element.nick===id)
 
  let decskDaa= await getUserRecentDecks(userData.nick)
  userData.decks=decskDaa ;







  //console.log(JSON.stringify(decskDaa));
 
   return userData;
}





const getUserRecentDecks = async (nick) => {
  let res: any[] = [];
  let date: Date = new Date();
  let i = 0;
  let decks=[];

  await get(getUserRecentDecksRef(nick)).then((snapshot) => {
    if (snapshot.exists()) {
      decks  = snapshot.val();
      //console.log('Data:', decks);
    } else {
      //console.log('No data available');
    }
  }).catch((error) => {
    console.error('Error getting data:', error);
  });

  //console.log("###############################################")
  //console.log(decks)
  //console.log("###############################################")



  decks.forEach((element) => {
    let tempObj: any = {};
    tempObj.author = decksList[element.index].author;
    tempObj.lang_1 = decksList[element.index].lang_1;
    tempObj.lang_2 = decksList[element.index].lang_2;
    tempObj.name = decksList[element.index].name;
    tempObj.id = decksList[element.index].ID;
    tempObj.amt_of_cards = decksList[element.index].amt_of_cards;

    let tmpDate = Math.floor(
      (date.getTime() - new Date(element.last_used).getTime()) /
        (1000 * 3600 * 24)
    );
    tempObj.last_used = tmpDate;

    res.push(tempObj);
    i++;
  });
  res.sort((a, b) => {
    return a.last_used - b.last_used;
  });

  return res;
};


  const addFriend=async (to: string, frined: string)=>
  {
    let UserdataFrinedList= await get(getUserFriendListRef(to));
    
    let user=usersList.find((elem)=> elem.nick===frined );
    let indx= usersList.indexOf(user);
    let newEntry={
      nick: frined,
      index: indx
    }
    
    let arrayList;
    if(UserdataFrinedList.val()===null){
      arrayList=[ newEntry];

    }
    else
    {

      //console.log("UserdataFrinedListUserdataFrinedListUserdataFrinedListUserdataFrinedListUserdataFrinedList");

      //console.log(UserdataFrinedList);
      //console.log("UserdataFrinedListUserdataFrinedListUserdataFrinedListUserdataFrinedListUserdataFrinedList");

     arrayList=(UserdataFrinedList.val());
     arrayList.push(newEntry);
    }
    //console.log(arrayList);



   await set(getUserFriendListRef(to),arrayList);
  }

  const acceptFriendsRequest=async (from: string)=>{
      //todo: implement


      await addFriend(activeUserNick,from);
      await addFriend(from,activeUserNick);
      declineFriendsRequest(from);
     
    //console.log("accepting from: "+from )
  }




  const declineFriendsRequest=async (from: string)=>{
      //todo: implement\
      let tmp=[...friendListRequest];
          let elemntTODelete=tmp.find((value)=> value.from=== from)
          const indx=tmp.indexOf(elemntTODelete);
          tmp.splice(indx,1);
          setFriendListRequest(tmp);
          await set(friendsRequestListRef, tmp).then(()=>{//console.log('friendsRequestListRef Udpated')
          });
      



    //console.log("decline from: "+from )
    

  }

  const sendFriendRequest=async (to: string)=>{
    //todo: implement
    //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    //console.log(usersList)
    usersList.forEach((element)=>{
      if(element.nick===to)
      {
        //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        //console.log(element)
        //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

        element.alreadySendRequest=true;
      }
    })
let tmp=[...friendListRequest];
////console.log(JSON.stringify(tmp));

const newObj={from: activeUserNick, fromIndx: activeUserData.index, to: to};
    tmp.push(newObj);

    setFriendListRequest(tmp);
    await set(friendsRequestListRef, tmp).then(()=>{//console.log('friendsRequestListRef Udpated')
    });

    //console.log("sending friend request to from: "+to )
  }


  const setLastUsed=async (deck)=>
  {
    const date=new Date();
   
    //let deckData=decksList[deck.index];
    //console.log(JSON.stringify(deckData));

    increaseDeckUsage(deck.index);

    let newEntry={
      index: deck.index,
      last_used: date.toISOString(),
      name: deck.name
    }
    

    let activeDeckCopy=(await get(getActiveUserRecentDecksRef())).val();
    console.log("activeDeckCopy: "+ JSON.stringify(activeDeckCopy));
    if(activeDeckCopy==null)
    {
      activeDeckCopy=[]
    }
    let entryInDeckList=activeDeckCopy.find((elem)=> elem.index===deck.index );
    if(entryInDeckList!==undefined)
    {
      let indx=activeDeckCopy.indexOf(entryInDeckList);
      activeDeckCopy[indx]=newEntry;
    }
    else
    {
      activeDeckCopy.push(newEntry);
    }

    //console.log("new entry: "+ activeDeckCopy);
    console.log(JSON.stringify(activeDeckCopy));
   let newData={activeDeckCopy};
   
     await set(getActiveUserRecentDecksRef(), JSON.parse(JSON.stringify(activeDeckCopy)));
     setActiveUserDecksList(activeDeckCopy);
    
    //let entryToReplace=activeUserDecksList.find((elem)=> elem.)
    console.log("set last used: "+ JSON.stringify( activeDeckCopy));

    
  }


  const getDateFormatted=(date :Date)=>
  {
    let formatted= new String();
    formatted+= date.getFullYear().toString();
    formatted+= "-";
    formatted+= (date.getMonth()+1).toString();
    formatted+= "-";
    formatted+= date.getDate().toString();
console.log("date: "+ formatted);
return formatted;
  }

  const increaseAmtOFFlahsCardLearnt= async (amtOfFlashCards: number)=>{
    console.log("Increaing flash cards: "+amtOfFlashCards);



    let date: Date = new Date();
    let dateString= getDateFormatted(date);
    console.log("dateString: "+ dateString)
    let dataStat : any[]=(await get(getActiveUserStatRef())).val();
    if(dataStat==null)
       dataStat=[]
    console.log("dataStat: "+JSON.stringify(dataStat));

    let found=dataStat.find((elemnt)=>elemnt.date===dateString);
    if(found==undefined)
    {
      const netEntry={
        amt: amtOfFlashCards,
        "date": dateString
      }

      console.log("netEntry: "+ JSON.stringify(netEntry));
      dataStat.push(netEntry);
    }
    else{
      let indx=dataStat.indexOf(found);
      console.log("found : "+ JSON.stringify(dataStat[indx]));
      
      dataStat[indx].amt+=amtOfFlashCards;
    }
    console.log("dataStat: "+JSON.stringify(dataStat));
    await set((getActiveUserStatRef()),JSON.parse(JSON.stringify(dataStat)));







  }

  return (
    <FireBaseContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLogged,
        fireBaseLogin,
        logOut,
        validateNick,
        register,
        getActiveUserNick,
        getActiveProfilePic,
        setIsurnFlashCardsByShaking,
        getIsurnFlashCardsByShaking,
        setIsDarkMode,
        getIsDarkMode,
        setIsSearchable,
        getIsSearchable,
        activeUserData,
        wasRegistrtionSuccesful,
        getSearchFriends,
        getFriendsRequests,
        getYourFriends,
        getFindDeck,
        getYourRecentDecks,
        getAmtOfDecks,
        getAvgFlashCards,
        getStatData,
        getDeckData,
        saveDeckData,
        getIsCapableOfEdit,
        createDeck,
        getTestData,
        scarambleArrat,
        uploadNewFile,
        getShouldShake,
        getContactInfo,
        acceptFriendsRequest,
        declineFriendsRequest,
        sendFriendRequest,
        setLastUsed,
        increaseAmtOFFlahsCardLearnt
      }}
    >
      {children}
    </FireBaseContext.Provider>
  );
};

export { FireBaseContext, FireBaseProvider };
