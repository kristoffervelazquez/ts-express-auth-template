import express, { Application } from "express";
import authRouter from "../routes/authRouter.js";
import conectarDB from "../config/db.js";
class Server {
  private app: Application;
  private port: string;
  private routes = {
    auth: "api/auth",
  };
  constructor() {
    this.app = express();
    this.routing();
    this.connectDB();
    this.port = "3000"; //env file not available
    this.middlewares();
  }

  routing = () => {
    this.app.use(this.routes.auth, authRouter);
  };

  connectDB = async () => {
    await conectarDB();
  };

  listen = () => {
    this.app.listen(this.port, () => {
      console.log("Server is running on port 3000");
    });
  };

  middlewares = () => {
    this.app.use(express.json());
  };
}

export default Server;
