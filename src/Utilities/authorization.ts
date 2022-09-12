
import dbConfig from "../Config/config";
import dbconnection from "./db"
import * as sequelize from "sequelize";
const sq = new sequelize.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  define: {
    timestamps: false
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
console.log(dbConfig)

const db:any = {};

db.Sequelize = sequelize.Sequelize;
db.sequelize = sq;

db.uc3 = dbconnection.uc3(sq, sequelize.Sequelize);
db.customer = dbconnection.customer(sq, sequelize.Sequelize);

export default db ;  









