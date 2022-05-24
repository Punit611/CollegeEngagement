const req = require("express/lib/request"); // this is for login /log out
const Post=require("../model/post");


exports.getAllBlogs=async(req,res)=>{
    const index = require("../index");
    const isLoggedIn= req.session.isLoggedIn;
    const user=req.session.username;

    try{
        const blogs=await Post.find({});
        res.setHeader("Set-Cookie","blogs=[{a,b,c}]");
        console.log(isLoggedIn," in blogs ");
        res.render("blog.ejs",{blogs,isLoggedIn,user});
    }
    catch(err){
        console.log("error in controllers/postController.js");
    }
}

exports.getAllNotices=(req,res)=>{
    const index = require("../index");
    const isLoggedIn= req.session.isLoggedIn;
    const user=req.session.username;

    console.log(isLoggedIn," in notice ");
    res.render("notice.ejs",{isLoggedIn,user});
}