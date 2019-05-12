import { IGService, removeKey, asParentChildPair, collection as collection } from './igservice'
const { V1: IG } = require('instagram-private-api');

export default class User extends IGService {

  public account() {
    return IGService.login().then(IG.Account.showProfile)
  }
  public getAccount(accountId:number) {
    console.log("getting account")
    return IGService.login().then(session=>IG.Account.getById(session,accountId))
  }
  /**
   * 
   * @param username username on instagram
   * @returns [[Bluebird<account:any>]] where account contains accounts details.
   */
  public search(username:string) {
    return this.login().then(session => IG.Account.searchForUser(session, username))
  }
  public userMedia(userId: number, cursorValue:any = 0) {
   
    return this.login().then((session: any) => {
      let userMedia = new IG.Feed.UserMedia(session, userId, this.defaultSize)
      userMedia.setCursor(cursorValue)
      return userMedia.all()})
  }
  public getUserFollowers(userId: number, cursorValue:any = false) {
    return this.login().then(session => {
      let subject = new IG.Feed.AccountFollowers(session, userId, Infinity)
      return subject.getSimple(cursorValue)})
  }
  public getUserFollowing(userId: number) {
    return this.login().then(session => new IG.Feed.AccountFollowing(session, userId, this.defaultSize).all())
  }
}