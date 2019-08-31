"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('./instagram-private-api').V1;
var device = new Client.Device('danielc-laptop');
var config_1 = __importDefault(require("./config"));
var storage = new Client.CookieFileStorage(__dirname + '/../cookies/someuser.json');
// const Sequelize = require('sequelize');
// import  {Sequelize}  from "sequelize";
// const sequelize = new Sequelize(config.dbAuth.namespace, config.dbAuth.user, config.dbAuth.password, config.database);
// sequelize
//   .authenticate()
//             // console.log(selfAccount)
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   }).catch((exception:Error)=>{
//       console.log(exception)
//     console.log("se ha encontrado un error")
//   })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
/***** CONFIGURACIÓN ******/
process.env.UV_THREADPOOL_SIZE = "10";
// const credentials = {
//     email: 'devcdcc@gmail.com',
//     password: 'bekk21306802_'
// };
var credentials = config_1.default.credentials;
// And go for login
function getAccount() {
    return Client.Session.create(device, storage, credentials.email, credentials.password)
        .then(function (session) {
        // console.log(session)
        Client.Account.showProfile(session).then(function (selfAccount) {
            // console.log(selfAccount)
        });
        // Now you have a session, we can follow / unfollow, anything...
        // And we want to follow Instagram official profile
        // let account = Client.Account.searchForUser(session, 'dev.cdcc')
        var account = Client.Account.showProfile(session);
        return [session, account];
    });
}
// result
// .spread((session:any, account:any) =>{
//   console.log("###############################################################")
//     // console.log(account._params)
//     console.log(account)
//     let feed = new Client.Feed.AccountFollowers(session, '375222529',Infinity);
//     feed.all().then((data:any) => {
//       data.forEach((account:any) => {
//           console.log(JSON.stringify(account._params))
//       });
//   });
//     return feed;
//     // return Client.Account.getById(session, 375222529)
//     // return Client.Relationship.create(session, account.id);
// })
// .then((account:any) => {
//   console.log("###############################################################")
//   console.log(account)
//     // console.log(relationship)
//     // console.log(relationship.params)
//     // {followedBy: ... , following: ... }
//     // Yey, you just followed @instagram
// });
// class Student {
//     fullName : string;
//     constructor(public firstName: string, public middleInitial: string, public lastName: string) {
//         this.fullName = firstName + " " + middleInitial + " " + lastName;
//     }
// }
// console.log(new Student("Carlos", "Daniel", "Cañon Carrero"))
var a = Array(false, false);
var b = 0;
function login(f) {
    Client.Session.create(device, storage, credentials.email, credentials.password)
        .then(function (session) {
        // console.log(session)
        f(session);
        Client.Account.showProfile(session).then(function (selfAccount) {
            // console.log(selfAccount)
        });
        // Now you have a session, we can follow / unfollow, anything...
        // And we want to follow Instagram official profile
        // let account = Client.Account.searchForUser(session, 'dev.cdcc')
        var account = Client.Account.showProfile(session);
        return [session, account];
    });
}
login(function (session) {
    console.log("session started");
    var feed = new Client.Feed.UserMedia(session, 375222529, Infinity);
    // console.log(feed)
    feed.all().then(function (data) {
        data = data.map(function (json) { return json._params; });
        console.log(Object.keys(data[3]));
        console.log("###############################################################");
        console.log(Object.keys(data[0]));
        data.forEach(function (account) {
            if (b < 7) {
                b = b + 1;
                // try{console.log(JSON.stringify(account))}
                // catch(e){console.error(new Set(Object.keys(account)))}
            }
        });
    });
});
getAccount().spread(function (session, account) {
    console.log("###############################################################");
    var feed = new Client.Feed.UserMedia(session, 375222529, 5);
    feed.all().then(function (data) {
        data.forEach(function (account) {
            if (b < 5) {
                b = b + 1;
                // console.log(JSON.stringify(account._params))
            }
        });
    });
    return feed;
});
getAccount()
    .spread(function (session, account) {
    console.log("###############################################################");
    var feed = new Client.Feed.AccountFollowers(session, account.id, Infinity);
    // let feed = new Client.Feed.AccountFollowers(session, '375222529',Infinity);
    feed.all().then(function (data) {
        data.forEach(function (account) {
            if (!a[0]) {
                a[0] = true;
                // console.log(JSON.stringify(account._params))
            }
        });
    });
    return feed;
});
getAccount()
    .spread(function (session, account) {
    console.log("###############################################################");
    var feed = new Client.Feed.AccountFollowing(session, account.id, Infinity);
    feed.get().then(function (data) {
        data.forEach(function (account) {
            if (a[1]) {
                a[1] = true;
                // console.log(JSON.stringify(account._params))
            }
        });
    });
    return feed;
});
