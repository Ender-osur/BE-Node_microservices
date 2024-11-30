import { Router } from "express";
import loginController from "../controller/LoginController";

class LoginRoute {
  public LoginApiRoute: Router;

  constructor() {
    this.LoginApiRoute = Router();
    this.loadRoutes();
  }

  private loadRoutes(): void {
    this.LoginApiRoute.post("/login", loginController.login);
  }
}

const userRoute = new LoginRoute();
export default userRoute.LoginApiRoute;