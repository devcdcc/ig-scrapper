import { IGService } from './igservice'
const { V1: IG } = require('./instagram-private-api');

export default class Media extends IGService {
  public userMediaHandler(userId: number) {
    return this.login().then(session => new IG.Feed.UserMedia(session, userId, this.defaultSize).all())
  }
  /**
   * getMediaCommentsHandler
   */
  public getMediaCommentsHandler(mediaId: string) {
    return this.login().then(session => new IG.Feed.MediaComments(session, mediaId,this.defaultSize).all())
  }
  /**
   * getMediaLikersHandler
   */
  public getMediaLikersHandler(mediaId: string) {
    return this.login().then(session => new IG.Media.likers(session, mediaId, this.defaultSize).all())
  }
}
// media.getMediaCommentsHandler('2007515707617454139_375222529', function (media: string, data: Array<any>) {
//     let out: Array<string> = []
//     for (var prop in data[0].params) {
//         out.push(prop)
//         //console.log(prop+":")
//         //console.log(data[0].params[prop])
//     }
//     console.log(out)
//     console.log(JSON.stringify(removeKey(data.map(e=>e.params), "user", "account", "session" )[0]))
//     //console.log(removeKey(data, "user", "account", "session", "_session", "_events"))
//     //console.log(JSON.stringify(data[0].params))
//     //console.log(`${media}:${JSON.stringify(removeKey(data, "getAllCookies"))}`)
// })
// media.getMediaLikersHandler('2007515707617454139_375222529', function (media: string, data: Array<any>) {
//     let out: Array<string> = []
//     for (var prop in data[0].params) {
//         out.push(prop)
//         //console.log(prop+":")
//         //console.log(data[0].params[prop])
//     }
//     console.log(out)
//     console.log(JSON.stringify(removeKey(data.map(e=>e.params), "user", "account", "session" )[0]))
//     //console.log(removeKey(data, "user", "account", "session", "_session", "_events"))
//     //console.log(JSON.stringify(data[0].params))
//     //console.log(`${media}:${JSON.stringify(removeKey(data, "getAllCookies"))}`)
// })