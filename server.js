require('dotenv').config();
const express = require('express');
const DBConnection = require('./src/config/dbcon');
const app = express();

DBConnection();

//Create a json
app.use(express.json());

//Order Router
const inventotyRouter=require('./src/router/inventory.router');
app.use("/api",inventotyRouter);

const port =process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is running ${port}`)
})


















































