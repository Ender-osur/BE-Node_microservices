import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({ path: "variables.env" });

const HOST_F = String(process.env.HOST);
const PORT_F = Number(process.env.PORT);
const DB_F = String(process.env.DB);
const DB_USER_F = String(process.env.DB_USER);
const DB_PASSWORD_F = String(process.env.DB_PASSWORD);

const pgp = pgPromise(optionsPG);

const pool = pgp({
  user: DB_USER_F,
  host: HOST_F,
  port: PORT_F,
  password: DB_PASSWORD_F,
  database: DB_F,
});

pool
  .connect()
  .then((myConn) => {
    console.log("Connected to data base ", DB_F);
    myConn.done();
  })
  .catch((myError) => {
    console.log("debConnection:::::ERROR: ", myError);
  });

export default pool;
