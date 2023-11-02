

class DataBaseManagerClass{
    getContactInfo(id: any) {
       const data={
        nick: 'test NICk',
        photoUri: 'https://thispersondoesnotexist.com/',
            decks: [
              {
                "Id": 1,
                "cards": [
                  {
                    "word_1": "pralka",
                    "word_2": "washing machine"
                  },
                  {
                    "word_1": "table",
                    "word_2": "stol"
                  },
                  {
                    "word_1": "pralka",
                    "word_2": "washing machine"
                  },
                  {
                    "word_1": "table",
                    "word_2": "stol"
                  },
                  {
                    "word_1": "pralka",
                    "word_2": "washing machine"
                  },
                  {
                    "word_1": "table",
                    "word_2": "stol"
                  },
                  {
                    "word_1": "pralka",
                    "word_2": "washing machine"
                  },
                  {
                    "word_1": "table",
                    "word_2": "stol"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 1",
                "visibilty": "public"
              },
              {
                "Id": 2,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              },
               {
                "Id": 3,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              },
               {
                "Id": 4,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              },
               {
                "Id": 5,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              },
               {
                "Id":6,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              },
               {
                "Id": 7,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              },
               {
                "Id": 8,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              },
               {
                "Id": 9,
                "cards": [
                  {
                    "word_1": "apple",
                    "word_2": "jablko"
                  },
                  {
                    "word_1": "bike",
                    "word_2": "rower"
                  }
                ],
                "creator": "test",
                "lang_1": "eng",
                "lang_2": "pl",
                "name": "Deck 2",
                "visibilty": "public"
              }
            ]
          }
       return data;
    }

    constructor()
    {

    }


    getProfilePic()
    {
        return 'https://thispersondoesnotexist.com/';
    }
    getUserName()
    {
        return 'userName';
    }

    getFriendRequests(){
        const data={
            requests: [
                {
                    name: 'user',
                    id: 2, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },
                {
                    name: 'user3',
                    id: 3, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },   {
                    name: 'user6',
                    id: 4, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },  {
                    name: 'user0',
                    id: 9, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },
            ]
            
        }
        return data;
    }



    getSearchedFriends(){
        const data={
            list: [
                {
                    name: 'user',
                    id: 2, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },
                {
                    name: 'user3',
                    id: 3, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },   {
                    name: 'user6',
                    id: 4, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },  {
                    name: 'user0',
                    id: 10, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                }, {
                    name: 'user0',
                    id: 11, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                }, {
                    name: 'user0',
                    id: 119, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                }, {
                    name: 'user0',
                    id: 129, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                }, {
                    name: 'user0',
                    id: 29, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },
            ]
            
        }
        return data;
    }

    getYourFriends(){
        const data={
            list: [
                {
                    name: 'user',
                    id: 2, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },
                {
                    name: 'user3',
                    id: 3, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },   {
                    name: 'user6',
                    id: 4, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },  {
                    name: 'user0',
                    id: 9, 
                    photoURi:  'https://thispersondoesnotexist.com/'
                },
            ]
            
        }
        return data;
    }

}

const DataBaseManager =new DataBaseManagerClass;

export default DataBaseManager;