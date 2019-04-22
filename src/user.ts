import { IGService, removeKey, asParentChildPair, collection as collection } from './igservice'
const { V1: IG } = require('instagram-private-api');

export default class User extends IGService {
  
  public account() {
    return this.login().then(IG.Account.showProfile)
  }
  /**
   * 
   * @param username username on instagram
   * @returns [[Bluebird<account:any>]] where account contains accounts details.
   */
  public search(username:string) {
    return this.login().then(session => IG.Account.searchForUser(session, username))
  }
  public userMedia(userId: number) {
    return this.login().then((session: any) => new IG.Feed.UserMedia(session, userId, this.defaultSize).all())
  }
  public getUserFollowers(userId: number) {
    return this.login().then(session => new IG.Feed.AccountFollowers(session, userId, Infinity).all())
  }
  public getUserFollowing(userId: number) {
    return this.login().then(session => new IG.Feed.AccountFollowing(session, userId, Infinity).all())
  }
}