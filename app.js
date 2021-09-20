import dotenv  from "dotenv";
dotenv.config()

import mongoose from 'mongoose';
import  express from 'express';
const app = express()
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';

//DB CONNECTION...
mongoose.connect(process.env.DATABASE, 
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}
).then(()=>{
    console.log("DB CONNECTED")
});

//middleware
app.use(bodyParser.json());
app.use(cookieParser()) //helps to add or delete some value to cookies...
app.use(cors())

//My Routes
app.use("/api",authRoutes)




//Ports
const port=process.env.PORT || 8000;


//starting server
app.listen(port,()=>{
 console.log(`app is running at ${port}`)
})

