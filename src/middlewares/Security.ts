import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as consts from "../utils/constants";


class Security {
  public checkToken(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      res.status(401).json({
        response: {
          message: "Unauthorized access",
        },
      });
    } else {
      try {
        const token: string = req.headers.authorization.split(" ")[1] as string;
        console.log(`Token: ${token}`);
        
        const data: string | JwtPayload = jwt.verify(token, consts.SECRET_KEY);

        req.body.data = data;
        next();
      } catch (error) {
        console.log(`Error: ${error}`);
        res.status(401).json({
          response: {
            message: "Failed authorization attempt",
          },
        });
      }
    }
  }
}

const security = new Security();

export default security;
