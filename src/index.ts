import User from './user'
import Media from './media'
import { Promise } from 'bluebird';
import { IGService } from './igservice';
let user = new User
// let media = new Media
user.setDefaultSize(10)
let userMedia = user.search('luna2d').then(tempUser => tempMediaExecutor(tempUser.id))

function tempMediaExecutor(originalUser: number, next = false) {
    (!next ? user.getUserFollowers(originalUser): user.getUserFollowers(originalUser, next)) .then(data => {
    console.log(data[0], data[data.length - 1].pk)
    tempMediaExecutor(originalUser, data[data.length - 1].next_max_id)
  })
}
let account = user.account().then((account: any) =>
  user.getAccount(account.id).then(account => IGService.getEventEmiter().emit("media", account))
)

// function handleWithDelay<T>(delayProcess: number = 500, dataSet: Array<any>, handler: (parameter: any) => T) {
//   type mapFutureType = { acum: number, values: Array<any> }
//   let initialValue: mapFutureType = { acum: 0, values: [] }
//   let outData: mapFutureType = dataSet.reduce(function (acc, current) {
//     let currentTimeOut = acc.acum + delayProcess
//     return {
//       acum: currentTimeOut,
//       values: acc.values.concat(Promise.delay(currentTimeOut, handler(current)))
//     }
//   }, initialValue);
//   return outData.values
// }

// // let userMedia = user.search('luna2d').then(tempUser => user.userMedia(tempUser.id))
// // userMedia.then(tempMedia => tempMedia.forEach((media: any) => IGService.getEventEmiter().emit("media", media)))
// // let account = user.account().then((account: any) =>
// //   user.getAccount(account.id).then(account => IGService.getEventEmiter().emit("media", account))
// // )


// let followers = user.search("luna2d")
//   .then((account: any) => user.getUserFollowers(account.id))

// followers.then((accounts: Array<any>) =>
//   accounts.forEach(account => IGService.getEventEmiter().emit("user", account))
// )




// let fullFollwers = followers
//   .then((accounts: Array<any>) => handleWithDelay(2000, accounts.map(_ => _.id), user.getAccount))
// fullFollwers.then(_ => _.forEach(e => e.then(console.log)))
// fullFollwers.then(array => array.forEach(element => {
//   element.then((account: any) => account._params).then((value: any) => IGService.getEventEmiter().emit("user", value))

// }))


// let fullFollwers = followers
//   .then((accounts: Array<any>) => Promise.all(accounts.map(account => user.getAccount(account.id))))
// followers.then(_ => console.log(_.length))
// console.log(user.getAccount)
// fullFollwers.then(value => console.log("all has been Processed" + value.length))



// let following = user.account()
//   .then((account: any) => user.getUserFollowing(account.id))

// following.then((accounts: Array<any>) =>
//   accounts.forEach(account => IGService.getEventEmiter().emit("user", account))
// )




// let fullFollowin = following
//   .then((accounts: Array<any>) => handleWithDelay(2000, accounts.map(_ => _.id), user.getAccount))

// fullFollowin.then(array => array.forEach(element => {
//   element.then((account: any) => account._params).then((value: any) => IGService.getEventEmiter().emit("user", value))

// }))
// // let fullFollowin = following
// //   .then((accounts: Array<any>) => Promise.all(accounts.map(account => user.getAccount(account.id))))

// // let mediaComments = userMedia.map((_: any) => _.id)
// //   .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaCommentsHandler(id))))

// // let mediaLikers = userMedia.map((_: any) => _.id)
// //   .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaLikersHandler(id))))

// // followers.then((dataSet => dataSet.slice(2))).then(console.log)






// let mediaComments = userMedia.map((_: any) => _.id)
//   .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaCommentsHandler(id))))

// let mediaLikers = userMedia.map((_: any) => _.id)
//   .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaLikersHandler(id))))

// followers.then((dataSet => dataSet.slice(2))).then(console.log)
// let keyMedia = "media"
// IGService.getEventEmiter().on(keyMedia, (data:any)=>{
//   IGService.dataStorage({}, data, keyMedia)
// })
// let keyUser = "user"
// IGService.getEventEmiter().on(keyUser, (data:any)=>{
//   IGService.dataStorage({}, data, keyUser)

// })
// let keyFollowing = "following"
// IGService.getEventEmiter().on(keyFollowing, (data:any)=>{
//   IGService.dataStorage({}, data, keyFollowing)

// })
// let keyFollower = "follower"
// IGService.getEventEmiter().on(keyFollowing, (data:any)=>{
//   IGService.dataStorage({}, data, keyFollower)

// })