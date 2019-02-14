import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as logger from "morgan";

import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";

const postRouter = new PostController();
const userRouter = new UserController();

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    // tslint:disable-next-line:max-line-length
    const MONGO_URI: string = "";
    mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
    })
    .then(() => {
      // tslint:disable-next-line:no-console
      console.log("MongoDB connection successful");
    })
    .catch((err) => {
      throw err;
    });

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    this.app.use((_, res: express.Response, next: express.NextFunction) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use("/", router);
    this.app.use("/api/v1/posts", postRouter.router);
    this.app.use("/api/v1/users", userRouter.router);
  }
}

export default new Server().app;
