import { IGService } from './igservice'
const { V1: IG } = require('instagram-private-api');

class Media extends IGService {
    public userMediaHandler(userId: number, handler: (dataArray: Array<any>) => any) {
        this.login((session) => {
            new IG.Feed.UserMedia(session, userId, this.defaultSize).all().then((data: Array<any>) => {
                handler(data.map(_ => _.params))
            });
        })
    }
    public userMediaStorage(userId: number) {
        let _vm = this
        this.userMediaHandler(userId, function (data: Array<any>) {
            console.log(data.length)
        })
    }
    /**
     * getMediaCommentsHandler
     */
    public getMediaCommentsHandler(mediaId: string, handler: (media: string, dataArray: Array<any>) => any) {
        this.login((session) => {
            console.log("session started")
            let feed = new IG.Feed.MediaComments(
                session,
                mediaId,
            );
            feed.all().then((data: Array<any>) => {
                handler(mediaId, data)
            })
        })
    }
    /**
     * getMediaLikersHandler
     */
    public getMediaLikersHandler(mediaId: string, handler: (media: string, dataArray: Array<any>) => any) {
        this.login((session) => {
            let feed = new IG.Media.likers(
                session,
                mediaId
            );
            feed.all().then((data: Array<any>) => {
                handler(mediaId, data)
            })
        })
    }

}
let media = new Media
console.log("iniciando TS File")
function removeKey(obj: Array<any> | any, ...keyElement: Array<string>) {
    if (typeof obj.isArray == 'function' || typeof obj.map == 'function' || typeof obj.forEach == 'function') {
        return obj.map((data: any) => removeKey(data, ...keyElement))
    } else
        for (var prop in obj) {
            if (keyElement.includes(prop))
                delete obj[prop];
            else if (typeof obj[prop] === 'object')
                removeKey(keyElement, obj[prop]);
        }
    return obj
}
function handler(mediaId: string, data: Array<any>) {
    console.log(
        JSON.stringify(
            data.map(e => { return { 'media': mediaId, 'user': e.id } })
        )
    )
}
media.login(function (session: any) {
    IG.Account.searchForUser(session, 'luna2d').then((user: any) => {
        media.userMediaHandler(user.id, function (data: Array<any>) {
            console.log(Object.keys(data[0]))
            console.log(Object.keys(data[0]).length)
            console.log(data[0])
        })
    })
})
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