import { IGService, removeKey, asParentChildPair, collection as collection } from './igservice'
import * as Bluebird from 'bluebird'
const { V1: IG } = require('instagram-private-api');

export default class User extends IGService {
    public userMediaHandler(userId: number) {
        return this.siging().then((session: any) => new IG.Feed.UserMedia(session, userId, this.defaultSize).all())
    }
    // public userMediaStorage(userId: number) {
    //     this.userMediaHandler(userId, function (userId: number, data: Array<any>) {
    //         collection("media")
    //             .then(collection => collection.insertMany(removeKey(data.map(e => e._params), "_session", "account")))
    //             .then(result =>
    //                 result.insertedCount == data.length ?
    //                     console.log(`All has been inserted ${result.insertedCount} records.`)
    //                     :
    //                     console.error(`Error, only has been inserted ${result.insertedCount} of ${data.length} records.`)
    //             ).catch(reason => console.error(`Error inserting ${data.length} records. reason ${reason}`))
    //     })
    // }
    public getUserFollowers(userId: number) {
        return this.siging().then(session => new IG.Feed.AccountFollowers(session, userId, Infinity).all())
    }
    public getUserFollowing(userId: number) {
        return this.siging().then(session => new IG.Feed.AccountFollowing(session, userId, Infinity).all())
    }
}
let user = new User
//user.userMediaStorage(375222529)
user.userMediaHandler(375222529).then(value => console.log(`Data getted ${value.length}`))