import User from './user'
import Media from './media'
import { Promise } from 'bluebird';
let user = new User
let media = new Media
let userMedia = user.search('luna2d').then(tempUser => user.userMedia(tempUser.id))
// userMedia.then(tempMedia => console.log(tempMedia[0]))
// let account = user
let followers = user.account()
  .then((account: any) => user.getUserFollowers(account.id))
  .then((accounts: Array<any>) => Promise.all(accounts.map(account => user.getAccount(account.id))))
let following = user.account()
  .then((account: any) => user.getUserFollowing(account.id))
  .then((accounts: Array<any>) => Promise.all(accounts.map(account => user.getAccount(account.id))))
let mediaComments = userMedia.map((_: any) => _.id)
  .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaCommentsHandler(id))))
let mediaLikers = userMedia.map((_: any) => _.id)
  .then((ids: Array<any>) => Promise.all(ids.map(id => media.getMediaLikersHandler(id))))


// media.login().then(session=>IG.Account.searchForUser(session, 'luna2d').then((user: any) => {
//     media.userMediaHandler(user.id).then(data => {
//       console.log(Object.keys(data[0]))
//       console.log(Object.keys(data[0]).length)
//       console.log(data[0])
//     })
//   })
// )