var IG = require('instagram-private-api').V1;
import config from './config'
import {Sequelize} from "sequelize-typescript";
// import Sequelize from "sequelize";
// import { any } from 'bluebird';

const credentials = config.credentials;

/***** CONFIGURACIÓN ******/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
process.env.UV_THREADPOOL_SIZE = "10";
/********* COOCKIES HANDLING*********/
var device = new IG.Device('danielc-laptop');
var storage = new IG.CookieFileStorage(__dirname + '/../cookies/someuser.json');
/**
 * Default class with connection
 */
class IGSerice {
  sequelize = new Sequelize(config.dbAuth.namespace, config.dbAuth.user, config.dbAuth.password, config.database);
  getAccount() {
    return IG.Session.create(device, storage, credentials.email, credentials.password)
      .then((session: any) => {
        // console.log(session)
        // IG.Account.showProfile(session).then((selfAccount: any) => {
        //   // console.log(selfAccount)
        // })
        // Now you have a session, we can follow / unfollow, anything...
        // And we want to follow Instagram official profile
        // let account = IG.Account.searchForUser(session, 'dev.cdcc')
        let account = IG.Account.showProfile(session)
        return [session, account]
      });
  }
  login(doOnSucces: (session: any) => any, doOnError: (ex: Error) => any = function (_) { }) {
    IG.Session.create(device, storage, credentials.email, credentials.password)
      .then(doOnSucces
        //   (session: any) => {
        //   // console.log(session)
        //   doOnSucces(session)
        //   // IG.Account.showProfile(session).then((selfAccount: any) => {
        //   //   // console.log(selfAccount)
        //   // })
        //   // // Now you have a session, we can follow / unfollow, anything...
        //   // // And we want to follow Instagram official profile
        //   // // let account = IG.Account.searchForUser(session, 'dev.cdcc')
        //   // let account = IG.Account.showProfile(session)
        //   // return [session, account]
        // }
      ).catch(doOnError)
  }



  prueba() {
    // const Sequelize = require('sequelize');


    // sequelize
    //   .authenticate()
    //             // console.log(selfAccount)
    //   .then(() => {

    //     console.log('Connection has been established successfully.');
    //   }).catch((exception:Error)=>{
    //       console.log(exception)
    //     console.log("se ha encontrado un error")
    //   })


    // const credentials = {
    //     email: 'devcdcc@gmail.com',
    //     password: 'bekk21306802_'
    // };
    // And go for login




    // result
    // .spread((session:any, account:any) =>{
    //   console.log("###############################################################")
    //     // console.log(account._params)
    //     console.log(account)
    //     let feed = new IG.Feed.AccountFollowers(session, '375222529',Infinity);
    //     feed.all().then((data:any) => {
    //       data.forEach((account:any) => {
    //           console.log(JSON.stringify(account._params))
    //       });
    //   });
    //     return feed;
    //     // return IG.Account.getById(session, 375222529)
    //     // return IG.Relationship.create(session, account.id);
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
    let a = Array(false, false)
    let b = 0







    this.login((session) => {

      console.log("session started")
      let feed = new IG.Feed.UserMedia(session, 375222529, Infinity);
      // console.log(feed)
      feed.all().then((data: Array<any>) => {
        data = data.map((json: any) => json._params)
        console.log(Object.keys(data[3]))
        console.log("###############################################################")
        console.log(Object.keys(data[0]))
        data.forEach((account: any) => {
          if (b < 7) {
            b = b + 1

            // try{console.log(JSON.stringify(account))}
            // catch(e){console.error(new Set(Object.keys(account)))}
          }
        });
      });
    })
    this.getAccount().spread((session: any, account: any) => {
      console.log("###############################################################")
      let feed = new IG.Feed.UserMedia(session, 375222529, 5);
      feed.all().then((data: any) => {
        data.forEach((account: any) => {
          if (b < 5) {
            b = b + 1
            // console.log(JSON.stringify(account._params))
          }
        });
      });
      return feed;
    })

    this.getAccount()
      .spread((session: any, account: any) => {
        console.log("###############################################################")
        let feed = new IG.Feed.AccountFollowers(session, account.id, Infinity);
        // let feed = new IG.Feed.AccountFollowers(session, '375222529',Infinity);
        feed.all().then((data: any) => {
          data.forEach((account: any) => {
            if (!a[0]) {
              a[0] = true
              // console.log(JSON.stringify(account._params))
            }
          });
        });
        return feed;
      })
    this.getAccount()
      .spread((session: any, account: any) => {
        console.log("###############################################################")
        let feed = new IG.Feed.AccountFollowing(session, account.id, Infinity);
        feed.get().then((data: any) => {
          data.forEach((account: any) => {
            if (a[1]) {
              a[1] = true
              // console.log(JSON.stringify(account._params))
            }
          });
        });
        return feed;
      })
  }
}
export = IGSerice