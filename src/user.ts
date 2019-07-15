import { IGService } from './igservice'
const { V1: IG } = require('instagram-private-api');
import express from 'express';
import { any } from 'bluebird';

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
      if(cursorValue)
        userMedia.setCursor(cursorValue);
      let items = userMedia.getSimple();
      return items;
    }).catch(_ => {})
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
  public static getUserFollowers(userId: number, cursorValue: any = false) {
    return this.login().then(session => {
      let subject = new IG.Feed.AccountFollowers(session, userId, IGService.defaultSize);
      return subject.getSimple(cursorValue)
    }).catch(_ => false)
  }
  public getUserFollowers(userId: number, cursorValue: any = false) {
    return User.getUserFollowers(userId, cursorValue)
  }
  public static getUserFollowing(userId: number, cursorValue: any = false) {
    return this.login().then(session => {
      let subject = new IG.Feed.AccountFollowing(session, userId, IGService.defaultSize);
      return subject.getSimple(cursorValue)
    }).catch(_ => false)
  }
  public getUserFollowing(userId: number) {
    return this.login().then(session => new IG.Feed.AccountFollowing(session, userId, this.defaultSize).all())
  }

  public static getRawById(userId: number){
    return User.login().then(session => new IG.Account.getRawById(session, userId)).catch(_ => false)
  }
  public static resolveUsername(username: string){
    return User.login().then(session => new IG.Account.searchRaw(session, username)).catch(_ => false)
  }
}
const router = express.Router();

function makeResponse(value:any, userId:number, res: express.Response, next_max_id: string = ""){
  if(!value)
    if(next_max_id) return res.status(404).json({"userId": userId, "next_max_id": next_max_id})
    else return res.status(404).json({"userId": userId})
  else res.send(value)
  
}
router.get("/:userId", async (req, res) => {
  let userId: number = req.params["userId"];
  User.getRawById(userId)
  .then(value=> makeResponse(value, userId, res));
  //res.send(userResponse)
});

router.get("/:userId/media", async (req, res) => {
  let userId: number = req.params["userId"];
  let next_max_id: string = req.query["next_max_id"];
  User.userMedia(userId, next_max_id)
  .then(value=> makeResponse(value, userId, res,next_max_id))
});

router.get("/:userId/followers", async (req, res) => {
  let userId: number = req.params["userId"];
  let next_max_id: string = req.query["next_max_id"];
   User.getUserFollowers(userId, next_max_id)
   .then(value=> makeResponse(value, userId, res,next_max_id))
});

router.get("/:userId/following", async (req, res) => {
  let userId: number = req.params["userId"];
  let next_max_id: string = req.query["next_max_id"];
  User.getUserFollowing(userId, next_max_id)
  .then(value=> makeResponse(value, userId, res,next_max_id))
});

router.get("/:username/resolve", async (req, res) => {
  let userId: string = req.params["username"];
  User.resolveUsername(userId).then(response => res.send(response))
});


export default router;