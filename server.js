const express=require('express');
const app=express();
const dotenv=require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
dotenv.config();

connectDb();

const port=process.env.PORT || 5000;


app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server Running on ${port}`);

})