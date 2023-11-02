

class DataBaseManagerClass{

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