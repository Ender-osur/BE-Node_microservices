import cors from "cors";
import morgan from "morgan";
import express from "express";
import chalk from "chalk";

class Server {
  public app: express.Application;
  
  constructor() {
    this.app = express();
    this.loadConfig();
    this.loadRoutes();
  
  }
  public loadConfig(): void {
    this.app.set("PORT", 3123);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({limit: "100mb"}));
    this.app.use(express.urlencoded({extended: true}));
  }

  public loadRoutes():void {
    // this.app.use("/api/user");
    // this.app.use("/api");
  }

  public start(): void {
    
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Backend is running 🚀 in this PORT: ", this.app.get("PORT"));
      console.log("ᕦ( ᴼ ڡ ᴼ )ᕤ");
      console.log(chalk.green.bold("🠆 "), "Local: ", chalk.cyan.underline(`http://localhost:${chalk.cyan.bold(`${this.app.get("PORT")}`)}`));
      console.log(chalk.green.bold("🠆 "), chalk.green("You can use this styles with Chalk"));
      console.log(chalk.green.bold("🠆 "), chalk.green(`Visit my github: ${chalk.black.bold.bgCyan.underline("https://github.com/Ender-osur")}`));
    });
  }
}

export default Server;