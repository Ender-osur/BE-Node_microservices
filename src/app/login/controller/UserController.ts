import { Request, Response } from "express";
import DaoRegisterUser from "../dao/DaoRegisterUser";

class UserController extends DaoRegisterUser {
  public createNewUser(req: Request, res: Response): void {
    const accessObj = req.body;
    UserController.register(accessObj, res);
  }
}

const userController = new UserController();
export default userController;