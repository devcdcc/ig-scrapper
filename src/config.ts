import { MongoClientOptions } from "mongodb";


let dbOptions: MongoClientOptions = {
  autoReconnect: true,
  reconnectTries: Infinity,
  // auth: {
  //   user: "",
  //   password: ""
  // }
}
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
}
export = config;