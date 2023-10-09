import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 5000;
import express from "express";
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db.js"
import favicon from 'serve-favicon'
import userRouter from "./routes/usersRoute.js";
import productRouter from "./routes/productRoute.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




////////////////////////////////////////////////////////////////////////////
connectDB();
////////////////////////////////////////////////////////////////////////////
app.use(express.static("public"));
app.use(favicon(path.join(__dirname,"public",'favicon.ico')))
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
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
