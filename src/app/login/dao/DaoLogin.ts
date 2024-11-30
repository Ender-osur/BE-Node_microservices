import { Response } from "express";
import encode from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Access from "../entity/Access";
import InfoToken from "../entity/InfoToken";
import pool from "../../../config/connection/debConnection";
import { SQL_Access } from "../repository/sql_access";

dotenv.config({path: "variables.env"});

class DaoLogin {
  protected static async login(AccessObj: Access, res: Response): Promise<any> {
    await pool
      .task(async (ask) => {
        let action = 1;
        let token = new InfoToken();
        let testObj;
        let correctPassword = false;

        let info: any = await ask.result(SQL_Access.DATA_TOKEN, AccessObj.accessEmail);
        console.log("INFO", info.rows.length);
        if ((info.rows.length != 0)) {
          testObj = info.rows.shift();
          console.log("TESTOBJ: ", testObj);
          correctPassword = encode.compareSync(AccessObj.accessKey, testObj.accessKey);

          if (correctPassword) {
            action = 2;
            console.log("ACCESS", AccessObj.userCod);
            info = await ask.result(SQL_Access.DATA_TOKEN, AccessObj.accessEmail);
            testObj = info.rows.shift();
            delete testObj.accessKey;
            token = testObj as InfoToken;
            console.log("TOKEN", token);
            await ask.none(SQL_Access.REGISTER_INPUT, token.userCod);
            await ask.none(SQL_Access.UPDATE_UUID, token.userCod);
          }
        }

        return { action, token };
      })
      .then(({ action, token }) => {
        switch (action) {
          case 1:
            res.status(403).json({ response: "Credentials error" });
            break;
          case 2:
            const tokenOk = jwt.sign(token, process.env.JWT_SECRET as string, { expiresIn: "8h" });
            res.status(200).json(tokenOk);
            break;
        }
      })
      .catch((myError) => {
        console.log("DaoLogin.ts:::::ERROR: ", myError);
        res.status(400).json({ response: "Sign in error" });
      });
  }

  constructor() {}
}

export default DaoLogin;
