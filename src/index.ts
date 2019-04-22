import User from './user'
import Media from './media'
let user = new User
let media = new Media
user.user().spread((session, user)=>{
  media.userMediaHandler(user.id).then(data => {
    console.log(Object.keys(data[0]))
    console.log(Object.keys(data[0]).length)
    console.log(data[0])
  })

})
// media.login().then(session=>IG.Account.searchForUser(session, 'luna2d').then((user: any) => {
//     media.userMediaHandler(user.id).then(data => {
//       console.log(Object.keys(data[0]))
//       console.log(Object.keys(data[0]).length)
//       console.log(data[0])
//     })
//   })
// )