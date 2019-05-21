import { IGService, removeKey, asParentChildPair, collection as collection } from './igservice'
const { V1: IG } = require('instagram-private-api');
import express from 'express';
import Bluebird = require("bluebird");

class User extends IGService {

  public account() {
    return IGService.login().then(IG.Account.showProfile)
  }
  public getAccount(accountId: number) {
    console.log("getting account")
    return IGService.login().then(session => IG.Account.getById(session, accountId))
  }
  /**
   *
   * @param username username on instagram
   * @returns [[Bluebird<account:any>]] where account contains accounts details.
   */
  public search(username: string) {
    return this.login().then(session => IG.Account.searchForUser(session, username))
  }
  public static userMedia(userId: number, cursorValue: any = 0) {

    return this.login().then((session: any) => {
      let userMedia = new IG.Feed.UserMedia(session, userId, this.defaultSize);
      userMedia.setCursor(cursorValue);
      let items = userMedia.getSimple();
      items.then(JSON.stringify).then(console.log);
      return items;
    })
  }
  public getLikersRaw(id: any, latest_reel_media: number = 0) {
    let that = this
    return this.login().then((session: any) => { return IG.Media.likersRaw(session, id, latest_reel_media) })
      .then(x => {
        let array: Array<any> = x.users.filter((user: any) =>
          Object.keys(user).indexOf("latest_reel_media") >= 0
        );


        let users:Array<any> =  x.users.map((_:any) => _.pk)
        console.log(
          users[0],
          users[users.length - 1], users.length
        // x.users.filter((user: any) =>
        // Object.keys(user).includes("latest_reel_media")).reverse()[0])
      )
    })
  }
  public getUserFollowers(userId: number, cursorValue: any = false) {
    return this.login().then(session => {
      let subject = new IG.Feed.AccountFollowers(session, userId, Infinity)
      return subject.getSimple(cursorValue)
    })
  }
  public getUserFollowing(userId: number) {
    return this.login().then(session => new IG.Feed.AccountFollowing(session, userId, this.defaultSize).all())
  }
}
const router = express.Router();

router.get("/:userId/media", async (req, res) => {
    let userId: number = req.params["userId"];
    let next_max_id: string = req.query["next_max_id"];

    res.send(await User.userMedia(userId, next_max_id))
});
export default router;