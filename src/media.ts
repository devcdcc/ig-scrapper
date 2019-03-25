import IGService from './igservice'
var IG = require('instagram-private-api').V1;

class Media extends IGService  {
    userMediaHandler(userId: number, handler: (dataArray: Array<any>) => any) {
        this.login((session) => {
            console.log("session started")
            new IG.Feed.UserMedia(session, userId, Infinity).all().then((data: Array<any>) => {
                handler(data)
            });
        })
    }
    userMediaStorage(userId:number) {
        this.userMediaHandler(375222529, function(data:Array<any>){
            console.log(data.length)
        })
    }
} {}
let media = new Media
console.log("iniciando TS File")
media.userMediaHandler(375222529, function(data:Array<any>){
    console.log(data.length)
})
console.log("ending TS file")