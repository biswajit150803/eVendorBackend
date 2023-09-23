require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
// const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8009;
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const web3Route = require("./routes/Web3route");
const customerRoute = require("./routes/customer");
const itemModelRoute=require("./routes/itemRoute");
app.use(express.json());
app.use(cookiParser());
app.use(cors());
// app.use(router);

app.use("/api/customers", customerRoute);

app.use("/api/web3", web3Route);

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);
app.use("/api/items",itemModelRoute);

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})