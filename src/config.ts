import { Dialect, Options, OperatorsAliases } from "sequelize/types";

let dbOptions : Options | OperatorsAliases = {
  host: 'localhost',
  port:3306,
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
} 
var config = {
    database: dbOptions,
      dbAuth :{
        namespace:`instagramData`,
        user: `root`,
        password:`root`,
        host:`localhost`,
        port:`3306`,
        dialect: 'mysql'
    },
    credentials : {
        email: 'danielc@acmecomunicacion.com',
        password: 'vQPvqTPLBPX74bQ'
    }
}
export = config;