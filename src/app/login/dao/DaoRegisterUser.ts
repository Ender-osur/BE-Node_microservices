import encode from "bcryptjs";
import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";

import Access from "../entity/Access";
import InfoToken from "../entity/InfoToken";
import pool from "../../../config/connection/debConnection";
import { SQL_Access } from "../repository/sql_access";
import { SQL_User } from "../repository/sql_register";

dotenv.config({path: "variables.env"});

class DaoRegisterUser {
  protected static async register(AccessObj: Access, res: Response): Promise<any> {
    await pool
      .task(async (ask) => {
        let action = 1;
        let token = new InfoToken();

        const amount = await ask.one(SQL_User.AMOUNT_EMAIL, AccessObj.accessEmail);
        if (amount.founded == 0) {
          action = 2;
          const encoded = encode.hashSync(AccessObj.accessKey as string);
          const user = await ask.one(SQL_User.CREATE_USER, [
            AccessObj.userCod.userNames,
            AccessObj.userCod.userLastNames,
          ]);
          const newUserCod = user.userCod;
          await ask.none(SQL_User.CREATE_ACCESS, [newUserCod, AccessObj.accessEmail, encoded]);

          await ask.none(SQL_Access.REGISTER_INPUT, newUserCod);
          const fullInfo: any = await ask.result(SQL_Access.DATA_TOKEN, AccessObj.accessEmail);
          const infoKey = fullInfo.rows.shift();
          delete infoKey.claveAcceso;
          token = infoKey;
        }
        return { action: action, token: token };
      })
      .then(({ action, token }) => {
        switch (action) {
          case 1:
            res.status(400).json({respuesta: "The email already exists"});
            break;
          case 2:
            const tokenOk = jwt.sign(token, process.env.JWT_SECRET as string, {expiresIn: "8h"});
            res.status(200).json(tokenOk);
            break;
        }
      })
      .catch((myError) => {
        console.log("DaoRegisterUser:::::ERROR", myError);
        res.status(400).json({ response: "Error creating user" });
      });
  }
}

export default DaoRegisterUser;