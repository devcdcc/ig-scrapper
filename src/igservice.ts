const { V1: IG } = require('instagram-private-api');
//import {Promise} from 'bluebird'
import { MongoClient, Collection } from 'mongodb'
import config from './config'
import { Promise } from 'bluebird';
import * as Bluebird from 'bluebird';
// import Sequelize from "sequelize";
// import { any } from 'bluebird';

const credentials = config.credentials;

/***** CONFIGURACIÓN ******/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
process.env.UV_THREADPOOL_SIZE = "10";
/********* COOCKIES HANDLING*********/
var device = new IG.Device('danielc-laptop');
var storage = new IG.CookieFileStorage(__dirname + '/../cookies/someuser.json');

const mongo: Promise<MongoClient> = MongoClient.connect(config.db.url, config.db.options)
export function collection(collectionName: string) {
  return mongo.then(client => client.db(config.db.namespace)).then(db => db.collection(collectionName))
}
/**
 * Default class with connection
 */
export function removeKey(obj: any[] | any, ...keySet: Array<string>) {
  if (obj != null && (typeof obj.isArray == 'function' || typeof obj.map == 'function' || typeof obj.forEach == 'function')) {
    return obj.map((data: any) => removeKey(data, ...keySet))
  } else
    for (var prop in obj) {
      if (keySet.includes(prop))
        delete obj[prop];
      else if (typeof obj[prop] === 'object')
        removeKey(obj[prop], ...keySet);
    }
  return obj
}
export function asParentChildPair(parent: any, data: Array<any>) {
  return data.map(e => { return { 'parent': parent, 'child': e.id } });
}
export class IGService {
  defaultSize = Infinity
  // db = this.mongo.then(client => client.db(config.db.namespace))
  protected asParentChildPair(parent: any, data: Array<any>) {
    return data.map(e => { return { 'parent': parent, 'child': e.id } });
  }
  public dataStorage(keyMap: any, data: Array<any>, collectionName: string) {
    return collection(collectionName)
      .then(collection => collection.insertMany(
        [...removeKey(data.map(e => Object.assign(e._params, keyMap)), "_session", "account")])
      )
      .then(result =>
        result.insertedCount == data.length ?
          console.log(`All has been inserted ${result.insertedCount} records into ${collectionName}.`)
          :
          console.error(`Error, only has been inserted ${result.insertedCount} of ${data.length} records into ${collectionName}.`)
      ).catch(reason => console.error(`Error inserting ${data.length} records into ${collectionName}. Reason ${reason}`))
  }
  
  getAccount(doOnSuccess: (session: any, account: any) => any, doOnError: (ex: Error) => any = function (_) { }) {
    return Bluebird.Promise.resolve(IG.Session.create(device, storage, credentials.email, credentials.password))
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
      }).spread(doOnSuccess).catch(doOnError);
  }
  /**
   * Returns a Bluebird promise with a new session 
   */
  public siging() {
    return Promise.resolve(IG.Session.create(device, storage, credentials.email, credentials.password))
  }
  /**
   * 
   * returns a Bluebird<[session, account]>
   * you can use spread to map it as (session, account) tuple
   * spred will return a promise
   * 
   */
  public account() {
    this.siging().then(session => [session, IG.Account.showProfile(session)])
  }
  public login(doOnSuccess: (session: any) => any, doOnError: (ex: Error) => any = function (_) { }) {
    return Promise.resolve(IG.Session.create(device, storage, credentials.email, credentials.password))
      .then(doOnSuccess
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



  private prueba() {
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
    this.getAccount((session: any, account: any) => {
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

    this.getAccount((session: any, account: any) => {
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
    this.getAccount((session: any, account: any) => {
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