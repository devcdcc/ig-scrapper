"use strict";
var dbOptions = {
    autoReconnect: true,
    reconnectTries: Infinity,
};
var config = {
    db: {
        options: dbOptions,
        namespace: "test",
        url: 'mongodb://localhost:27017'
    },
    credentials: {
        email: 'danielc@acmecomunicacion.com',
        password: 'vQPvqTPLBPX74bQ'
    }
};
module.exports = config;
