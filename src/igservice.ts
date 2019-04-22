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
  /**
   * 
   * returns a Bluebird<[session, account]>
   * you can use spread to map it as (session, account) tuple
   * spred will return a promise
   * 
   */
  public user() {
    return this.login().then(session => [session, IG.Account.showProfile(session)])
  }
  /**
   * Returns a Bluebird promise with a new session 
   */
  public login() {
    return Promise.resolve(IG.Session.create(device, storage, credentials.email, credentials.password))
  }
}