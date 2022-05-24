const express=require("express");
const bodyparser=require("body-parser");
const mongodb=require("mongoose");
const path=require("path");
const session = require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
const req = require("express/lib/request");

const authRoutes=require("./routers/auth");
const registerRoutes=require("./routers/register");
const postRoutes=require("./routers/post");
const createRoutes=require("./routers/create");
const readRoutes=require("./routers/read");
const profileRoutes=require("./routers/profile");

const MONGODB_URI = "mongodb://localhost:27017/collegeApp"

const store=new MongoDBStore({uri:MONGODB_URI,collection:"sessions"});

const app=express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));

app.get('/',(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    res.render("home.ejs",{isLoggedIn,user});
});

app.use(registerRoutes);
app.use(postRoutes);
app.use(createRoutes);
app.use(authRoutes);
app.use(readRoutes);
app.use(profileRoutes);
app.listen(3000,()=>{
    console.log("connected");
});

mongodb.connect("mongodb://localhost:27017/CollegeEngagementApp",()=>{
    console.log("Connected to mongoose");
});
