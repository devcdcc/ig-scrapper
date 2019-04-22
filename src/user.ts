import { IGService, removeKey, asParentChildPair, collection as collection } from './igservice'
const { V1: IG } = require('instagram-private-api');

export default class User extends IGService {
  public search() {
    return this.login().then((session:any) => IG.Account.searchForUser(session, 'luna2d'))
  }
  public userMediaHandler(userId: number) {
    return this.login().then((session: any) => new IG.Feed.UserMedia(session, userId, this.defaultSize).all())
  }
  public getUserFollowers(userId: number) {
    return this.login().then(session => new IG.Feed.AccountFollowers(session, userId, Infinity).all())
  }
  public getUserFollowing(userId: number) {
    return this.login().then(session => new IG.Feed.AccountFollowing(session, userId, Infinity).all())
  }
}
let user = new User
//user.userMediaStorage(375222529)
let userMedia = user.userMediaHandler(375222529)
userMedia.then(value => console.log(`Data getted ${value.length}`))
userMedia.then(value => console.log(`Data getted ${value.length}`))