import { IGService, removeKey, asParentChildPair, collection as collection } from './igservice'
const { V1: IG } = require('instagram-private-api');

export default class User extends IGService {
    private mediaInsert(userId: number, data: Array<any>) {
        return collection("media")
            .then(collection => collection.insertMany(removeKey(data.map(e => Object.assign(e._params, { userId: userId })), "_session", "account")))
            .then(result =>
                result.insertedCount == data.length ?
                    console.log(`All has been inserted ${result.insertedCount} records.`)
                    :
                    console.error(`Error, only has been inserted ${result.insertedCount} of ${data.length} records.`)
            ).catch(reason => console.error(`Error inserting ${data.length} records. reason ${reason}`))
    }
    public userMediaHandler<T>(userId: number, onSuccess: (userId: number, dataArray: Array<any>) => T | Promise<any> = this.mediaInsert) {
        return this.login((session) => {
            new IG.Feed.UserMedia(session, userId, this.defaultSize).all().then((data: Array<any>) => {
                onSuccess(userId, data)
            });
        })
    }
    public userMediaStorage(userId: number) {
        this.userMediaHandler(userId, function (userId: number, data: Array<any>) {
            collection("media")
                .then(collection => collection.insertMany(removeKey(data.map(e => e._params), "_session", "account")))
                .then(result =>
                    result.insertedCount == data.length ?
                        console.log(`All has been inserted ${result.insertedCount} records.`)
                        :
                        console.error(`Error, only has been inserted ${result.insertedCount} of ${data.length} records.`)
                ).catch(reason => console.error(`Error inserting ${data.length} records. reason ${reason}`))
        })
    }
    public getFollowers(onSuccess: (dataArray: Array<any>) => any) {
        this.getAccount((session: any, account: any) => {
            let feed = new IG.Feed.AccountFollowers(session, account.id, Infinity);
            feed.get().then((data: Array<any>) => { onSuccess(asParentChildPair(account.id, data)) });
            return feed;
        })
    }
    public getUserFollowers(userId: number, onSuccess: (dataArray: Array<any>) => any) {
        this.login((session) => {
            let feed = new IG.Feed.AccountFollowers(session, userId, Infinity);
            feed.get().then((data: Array<any>) => onSuccess(asParentChildPair(userId, data)));
        })
    }
    public getFollowing(onSuccess: (dataArray: Array<any>) => any) {
        this.getAccount((session: any, account: any) => {
            let feed = new IG.Feed.AccountFollowing(session, account.id, Infinity);
            feed.get().then((data: Array<any>) => { onSuccess(asParentChildPair(account.id, data)) });
            return feed;
        })
    }
    public getUserFollowing(userId: number, onSuccess: (dataArray: Array<any>) => any) {
        this.login((session) => {
            let feed = new IG.Feed.AccountFollowing(session, userId, Infinity);
            feed.get().then((data: Array<any>) => { onSuccess(asParentChildPair(userId, data)) });
        })
    }
}
let user = new User
//user.userMediaStorage(375222529)
user.userMediaStorage(375222529)