"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var IG = require('./instagram-private-api').V1;
//import {Promise} from 'bluebird'
var mongodb_1 = require("mongodb");
var config_1 = __importDefault(require("./config"));
var bluebird_1 = require("bluebird");
var events_1 = __importDefault(require("events"));
// import Sequelize from "sequelize";
// import { any } from 'bluebird';
var credentials = config_1.default.credentials;
var events = new events_1.default();
/***** CONFIGURACIÓN ******/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
process.env.UV_THREADPOOL_SIZE = "10";
/********* COOCKIES HANDLING*********/
var device = new IG.Device('danielc-laptop');
var storage = new IG.CookieFileStorage(__dirname + '/../cookies/someuser.json');
var mongo = mongodb_1.MongoClient.connect(config_1.default.db.url, config_1.default.db.options);
function collection(collectionName) {
    return mongo.then(function (client) { return client.db(config_1.default.db.namespace); }).then(function (db) { return db.collection(collectionName); });
}
exports.collection = collection;
/**
 * Default class with connection
 */
function removeKey(obj) {
    var keySet = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keySet[_i - 1] = arguments[_i];
    }
    if (obj != null && (typeof obj.isArray == 'function' || typeof obj.map == 'function' || typeof obj.forEach == 'function')) {
        return obj.map(function (data) { return removeKey.apply(void 0, [data].concat(keySet)); });
    }
    else
        for (var prop in obj) {
            if (keySet.includes(prop))
                delete obj[prop];
            else if (typeof obj[prop] === 'object')
                removeKey.apply(void 0, [obj[prop]].concat(keySet));
        }
    return obj;
}
exports.removeKey = removeKey;
function asParentChildPair(parent, data) {
    return data.map(function (e) { return { 'parent': parent, 'child': e.id }; });
}
exports.asParentChildPair = asParentChildPair;
var IGService = /** @class */ (function () {
    function IGService() {
        this.defaultSize = IGService.defaultSize;
    }
    IGService.prototype.setDefaultSize = function (size) { this.defaultSize = size; };
    IGService.getEventEmiter = function () { return events; };
    IGService.prototype.getEventEmiter = function () { return events; };
    // db = this.mongo.then(client => client.db(config.db.namespace))
    IGService.prototype.asParentChildPair = function (parent, data) {
        return data.map(function (e) { return { 'parent': parent, 'child': e.id }; });
    };
    IGService.prototype.dataStorage = function (keyMap, data, collectionName) {
        if (keyMap === void 0) { keyMap = {}; }
        return IGService.dataStorage(keyMap, data, collectionName);
    };
    IGService.dataStorage = function (keyMap, data, collectionName) {
        if (keyMap === void 0) { keyMap = {}; }
        return collection(collectionName)
            .then(function (collection) { return collection.insertMany(removeKey(data.map(function (e) { return Object.assign(e._params, keyMap); }), "_session", "account").slice()); })
            .then(function (result) {
            return result.insertedCount == data.length ?
                console.log("All has been inserted " + result.insertedCount + " records into " + collectionName + ".")
                :
                    console.error("Error, only has been inserted " + result.insertedCount + " of " + data.length + " records into " + collectionName + ".");
        }).catch(function (reason) { return console.error("Error inserting " + data.length + " records into " + collectionName + ". Reason " + reason); });
    };
    /**
     * Returns a Bluebird promise with a new session
     */
    IGService.prototype.login = function () {
        return IGService.login();
    };
    IGService.login = function () {
        return bluebird_1.Promise.resolve(IG.Session.create(device, storage, credentials.email, credentials.password));
    };
    IGService.defaultSize = 10;
    return IGService;
}());
exports.IGService = IGService;
