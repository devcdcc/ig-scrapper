"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var igservice_1 = require("./igservice");
var IG = require('./instagram-private-api').V1;
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Media.prototype.userMediaHandler = function (userId) {
        var _this = this;
        return this.login().then(function (session) { return new IG.Feed.UserMedia(session, userId, _this.defaultSize).all(); });
    };
    /**
     * getMediaCommentsHandler
     */
    Media.prototype.getMediaCommentsHandler = function (mediaId) {
        var _this = this;
        return this.login().then(function (session) { return new IG.Feed.MediaComments(session, mediaId, _this.defaultSize).all(); });
    };
    /**
     * getMediaLikersHandler
     */
    Media.prototype.getMediaLikersHandler = function (mediaId) {
        var _this = this;
        return this.login().then(function (session) { return new IG.Media.likers(session, mediaId, _this.defaultSize).all(); });
    };
    return Media;
}(igservice_1.IGService));
exports.default = Media;
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
