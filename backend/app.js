const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//import routes
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const theatreRoutes = require("./routes/theatre");
const screenRoutes = require("./routes/screen");
const showRoutes = require("./routes/show");
const seatRoutes = require("./routes/seat");
const reviewRoutes = require("./routes/review");
const paymentRoutes = require("./routes/payment");



//DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED");
});

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.send("WORKING");
});

app.use("/",authRoutes);
app.use("/",movieRoutes);
app.use("/",theatreRoutes);
app.use("/",screenRoutes);
app.use("/",showRoutes);
app.use("/",seatRoutes);
app.use("/",reviewRoutes);
app.use("/",paymentRoutes)


const port = process.env.PORT||8000;

//server starting
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
});