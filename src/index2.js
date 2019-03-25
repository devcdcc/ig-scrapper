var Client = require('instagram-private-api').V1;
var device = new Client.Device('danielc@acmecomunicacion.com');
var storage = new Client.CookieFileStorage(__dirname + '/../cookies/someuser.json');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
/***** CONFIGURACIÓN ******/
process.env.UV_THREADPOOL_SIZE = "10";
const credentials = {
    email: 'danielc@acmecomunicacion.com',
    password: 'vQPvqTPLBPX74bQ'
};
let count = 0;
// And go for login
Client.Session.create(device, storage, credentials.email, credentials.password)
    .then((session) => {

        // Client.Account.searchForUser(session, 'luna2d').then(acc => {
        //     Client.Account.getById(session, acc.id).then(account=>{
        //         console.log(account._params)
        //     })
            
        // })
        feed = new Client.Feed.AccountFollowers(session, '375222529',Infinity);
        feed.all().then(data => {
            data.forEach(account => {
                count++;
                console.log(count)
            });
        });
        // Now you have a session, we can follow / unfollow, anything...
        // And we want to follow Instagram official profile
        return [session, Client.Account.searchForUser(session, 'luna2d')]
    })
    .spread((session, account) => {
        let userMedia = Client.Feed.UserMedia(session, account.id, Infinity)
        return Client.Relationship.get(session, account.id);
    })
    .then((relationship) => {
        console.log(relationship)
        // console.log(relationship.params)
        // {followedBy: ... , following: ... }
        // Yey, you just followed @instagram
    }).catch((error)=>{
        console.log("malditoMaduro")
        console.log(error)
    });

// class Student {
//     fullName : string;
//     constructor(public firstName: string, public middleInitial: string, public lastName: string) {
//         this.fullName = firstName + " " + middleInitial + " " + lastName;
//     }
// }
// console.log(new Student("Carlos", "Daniel", "Cañon Carrero"))