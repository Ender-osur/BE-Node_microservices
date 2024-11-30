import { Router } from "express";
import userController from "../controller/UserController";

class UserRoute {
  public userApiRoute: Router;

  constructor() {
    this.userApiRoute = Router();
    this.loadRoute();
  }

  private loadRoute(): void {
    this.userApiRoute.post("/add", userController.createNewUser)
  }
}

const userRoute = new UserRoute();
export default userRoute.userApiRoute;