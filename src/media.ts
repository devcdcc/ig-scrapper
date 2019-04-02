import IGService from './igservice'
var IG = require('instagram-private-api').V1;

class Media extends IGService {
    public userMediaHandler(userId: number, handler: (dataArray: Array<any>) => any) {
        this.login((session) => {
            console.log("session started")
            new IG.Feed.UserMedia(session, userId, Infinity).all().then((data: Array<any>) => {
                handler(data)
            });
        })
    }
    userMediaStorage(userId: number) {
        this.userMediaHandler(userId, function (data: Array<any>) {
            console.log(data.length)
        })
    }
}
let media = new Media
console.log("iniciando TS File")
function removeKey(keyElement: string, obj: any) {
    for (var prop in obj) {
        if (prop === keyElement)
            delete obj[prop];
        else if (typeof obj[prop] === 'object')
            removeKey(keyElement, obj[prop]);
    }
    return obj
}
media.userMediaHandler(375222529, function (data: Array<any>) {
    
    console.log(
        JSON.stringify(
            data.map(e => removeKey('_session',e))[5]
        )
    )
})
console.log("ending TS file")