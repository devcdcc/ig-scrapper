import User from './user'
import Media from './media'
import { Promise } from 'bluebird';
import { IGService } from './igservice';
let user = new User
let media = new Media


function handleWithDelay<T>(delayProcess: number = 500, dataSet: Array<any>, handler: (parameter: any) => T) {
  type mapFutureType = { acum: number, values: Array<any> }
  let initialValue: mapFutureType = { acum: 0, values: [] }
  let outData: mapFutureType = dataSet.reduce(function (acc, current) {
    let currentTimeOut = acc.acum + delayProcess
    return {
      acum: currentTimeOut,
      values: acc.values.concat(Promise.delay(currentTimeOut).then(_ => Promise.resolve(handler(current))))
    }
  }, initialValue);
  return outData.values
}

// let userMedia = user.search('luna2d').then(tempUser => user.userMedia(tempUser.id))
// userMedia.then(tempMedia => console.log(tempMedia[0]))
// let account = user
// user.account().then((account:any) => user.getAccount(account.id)).then(console.log)


let followers = user.search("luna2d")
  .then((account: any) => user.getUserFollowers(account.id))
// let fullFollwers = followers
//   .then((accounts: Array<any>) => Promise.all(accounts.map(account => user.getAccount(account.id))))
// followers.then(_ => console.log(_.length))
// console.log(user.getAccount)

// fullFollwers.then(value => console.log("all has been Processed" + value.length))



let following = user.account()
  .then((account: any) => user.getUserFollowing(account.id))
// let fullFollowin = following
//   .then((accounts: Array<any>) => Promise.all(accounts.map(account => user.getAccount(account.id))))

// let mediaComments = userMedia.map((_: any) => _.id)
//   .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaCommentsHandler(id))))

// let mediaLikers = userMedia.map((_: any) => _.id)
//   .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaLikersHandler(id))))

// followers.then((dataSet => dataSet.slice(2))).then(console.log)