import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { readdirSync } from "fs";
const morgan = require("morgan");
require("dotenv").config();
//database connection
mongoose
    .connect(process.env.DATABASE)
    .then((res) => console.log("Database connection successfull"))
    .catch((error) =>
        console.log("Database connection failed" + error.message)
    );
// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    console.log("This is my own middleware...");
    next();
});
//routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
//port
const port = process.env.PORT || 8000;
//listen
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
