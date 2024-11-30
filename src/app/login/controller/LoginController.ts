import { Request, Response } from "express";
import DaoLogin from "../dao/DaoLogin";
import Access from "../entity/Access";


class LoginController extends DaoLogin {
  public login(req: Request, res: Response): void {
    console.log("REQ: ",req.body);
    const accessObj: Access = req.body;
    LoginController.login(accessObj, res);
  }

}

const loginController = new LoginController();
export default loginController;

