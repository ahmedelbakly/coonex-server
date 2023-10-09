import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 5000;
import express from "express";
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db.mjs"
import favicon from 'serve-favicon'
import userRouter from "./routes/productRoute.mjs"
import productRouter from "./routes/productRoute.mjs";
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
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   
    
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/// multer 

//console.log("ahmed");
////////////////////////////////////////////////////////////////////////////
// userRouts
//app.use("/api",userRouter)
app.use("/api", productRouter)
//app.use("/api",productRouter)
app.use("/api", userRouter)


///////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello coonex!");
});
////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
 
// coonex app