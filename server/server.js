import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { readdirSync } from "fs";
const morgan = require("morgan");
import csrf from "csurf";
import cookieParser from "cookie-parser";
require("dotenv").config();
const csrfProtection = csrf({ cookie: true });
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
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
    console.log("This is my own middleware...");
    next();
});
//routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
app.use(csrfProtection);
app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
//port
const port = process.env.PORT || 8000;
//listen
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
