import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db.js"
import multer from "multer";
import userRouter from "./routes/usersRoute.js";
import productRouter from "./routes/productRoute.js";
import {upload} from "./multer.js"




////////////////////////////////////////////////////////////////////////////
connectDB();
////////////////////////////////////////////////////////////////////////////
app.use(express.static("public"));
////////////////////////////////////////////////////////////////////////////
app.use(cors({
    origin:"*",
    Methods:"get post put patch delete"
    
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/// multer 


////////////////////////////////////////////////////////////////////////////
// userRouts
app.use("/",userRouter)
app.use("/",productRouter)

///////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello World!");
});
////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
