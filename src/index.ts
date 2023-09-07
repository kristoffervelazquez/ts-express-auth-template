import express from "express";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";


const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});


app.use('/api/auth', authRouter)


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});