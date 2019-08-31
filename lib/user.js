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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.account = function () {
        return igservice_1.IGService.login().then(IG.Account.showProfile);
    };
    User.prototype.getAccount = function (accountId) {
        console.log("getting account");
        return igservice_1.IGService.login().then(function (session) { return IG.Account.getById(session, accountId); });
    };
    /**
     *
     * @param username username on instagram
     * @returns [[Bluebird<account:any>]] where account contains accounts details.
     */
    User.prototype.search = function (username) {
        return this.login().then(function (session) { return IG.Account.searchForUser(session, username); });
    };
    User.userMedia = function (userId, cursorValue) {
        var _this = this;
        if (cursorValue === void 0) { cursorValue = 0; }
        return this.login().then(function (session) {
            var userMedia = new IG.Feed.UserMedia(session, userId, _this.defaultSize);
            if (cursorValue)
                userMedia.setCursor(cursorValue);
            var items = userMedia.getSimple();
            return items;
        }).catch(function (_) { });
    };
    User.prototype.getLikersRaw = function (id, latest_reel_media) {
        if (latest_reel_media === void 0) { latest_reel_media = 0; }
        var that = this;
        return this.login().then(function (session) { return IG.Media.likersRaw(session, id, latest_reel_media); })
            .then(function (x) {
            var array = x.users.filter(function (user) {
                return Object.keys(user).indexOf("latest_reel_media") >= 0;
            });
            var users = x.users.map(function (_) { return _.pk; });
            console.log(users[0], users[users.length - 1], users.length
            // x.users.filter((user: any) =>
            // Object.keys(user).includes("latest_reel_media")).reverse()[0])
            );
        });
    };
    User.getUserFollowers = function (userId, cursorValue) {
        if (cursorValue === void 0) { cursorValue = false; }
        return this.login().then(function (session) {
            var subject = new IG.Feed.AccountFollowers(session, userId, igservice_1.IGService.defaultSize);
            return subject.getSimple(cursorValue);
        }).catch(function (_) { return false; });
    };
    User.prototype.getUserFollowers = function (userId, cursorValue) {
        if (cursorValue === void 0) { cursorValue = false; }
        return User.getUserFollowers(userId, cursorValue);
    };
    User.getUserFollowing = function (userId, cursorValue) {
        if (cursorValue === void 0) { cursorValue = false; }
        return this.login().then(function (session) {
            var subject = new IG.Feed.AccountFollowing(session, userId, igservice_1.IGService.defaultSize);
            return subject.getSimple(cursorValue);
        }).catch(function (_) { return false; });
    };
    User.prototype.getUserFollowing = function (userId) {
        var _this = this;
        return this.login().then(function (session) { return new IG.Feed.AccountFollowing(session, userId, _this.defaultSize).all(); });
    };
    User.getRawById = function (userId) {
        return User.login().then(function (session) { return new IG.Account.getRawById(session, userId); }).catch(function (_) { return false; });
    };
    User.resolveUsername = function (username) {
        return User.login().then(function (session) { return new IG.Account.searchRaw(session, username); }).catch(function (_) { return false; });
    };
    return User;
}(igservice_1.IGService));
exports.default = User;
