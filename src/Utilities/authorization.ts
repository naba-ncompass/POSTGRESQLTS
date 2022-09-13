
import dbConfig from "../Config/config";
import dbconnection from "./db"
import * as sequelize from "sequelize"; 
const sqConnect = new sequelize.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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

const dbConnect:any = {};
dbConnect.Sequelize = sequelize.Sequelize;
dbConnect.sequelize = sqConnect;
dbConnect.device = dbconnection.device(sqConnect, sequelize.Sequelize);
dbConnect.customer = dbconnection.customer(sqConnect, sequelize.Sequelize);

export default dbConnect ;  









