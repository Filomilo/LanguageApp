
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
const firebaseConfig = {

  apiKey: "AIzaSyC7nwVQbFZbmBfvCCHXYdyFT7AK5M45gUg",

  authDomain: "languageapp-43a7b.firebaseapp.com",

  databaseURL: "https://languageapp-43a7b-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "languageapp-43a7b",

  storageBucket: "languageapp-43a7b.appspot.com",

  messagingSenderId: "133422769946",

  appId: "1:133422769946:web:975fd78f0fca2c2be4aea3"

};



//import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const app = initializeApp(firebaseConfig);
const db= getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const storage = getStorage(app);
export {db,auth,storage};