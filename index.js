import express, { Router, query } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";
import db from "./koneksi.js";
import router from "./routes/routes.js"
import dotenv from "dotenv"
const app = express()
dotenv.config();
const PORT = process.env.PORT

console.log(PORT)
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//////////////

app.use("/",router)
app.listen(PORT, () => {
    console.log(`server sedang berjalan di port ${PORT}`)
})