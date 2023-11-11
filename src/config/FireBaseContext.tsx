import React, { createContext, useState } from "react";


const FireBaseContext=createContext({});


const FireBaseProvider=({children})=>{
    const [isLogged,setIsLogged]= useState(false);

    const fireBaseLogin=(email: string, password: string)=>{
        console.log("FireBase LOGIn: "+ email+ password);
        
    }

    return(
        <FireBaseContext.Provider 
        value={{
            isLogged,
            fireBaseLogin
        }}
        >
        {children}
        </FireBaseContext.Provider>
        
    )

}


export  {FireBaseContext,FireBaseProvider}
