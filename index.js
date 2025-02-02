const authRoute = require("./routes/auth.route")
const connectDB = require("./MongoDB/connectDB")
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL, // Frontend origin
    credentials: true, // Allow credentials (cookies)
}));
app.use(morgan("dev"));

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.send("Hello Backend")
})
app.use("/api/auth/", authRoute)

const PORT = process.env.PORT
const HOST = process.env.HOST 
app.listen(PORT, () => {
    console.log("Server is runnning at http://" + HOST + ":" + PORT)
})