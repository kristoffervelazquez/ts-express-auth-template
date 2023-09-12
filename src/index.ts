import dotenv from "dotenv";
import Server from "./models/server";
dotenv.config();

const main = () => {
  const server = new Server();
  server.listen();
};
main();
