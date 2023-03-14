import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = "postgres";

const sequelizeConnection = new Sequelize(dbName,dbUsername,dbPassword,{
    host: dbHost,
    dialect: dbDialect
})

const testDb = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();
  } catch (error: unknown) {
    console.log(`Unable to Connect to Database: ${error}`);
  }
};

testDb();
export default sequelizeConnection;