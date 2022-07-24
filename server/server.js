import express from "express";
import cors from "cors";
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    console.log("This is my own middleware...");
    next();
});

app.get("/", (req, res) => {
    res.send("Wellcome to our application ");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
