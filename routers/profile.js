const express = require("express");
const post = require("../model/post");

const router=express.Router();

router.get("/profile",async(req,res)=>{
    const user=req.session.username;
    const isLoggedIn=req.session.isLoggedIn;
    const blogs=await post.find({author:user});
    console.log(blogs);
    res.render('blog.ejs',{blogs,isLoggedIn,user});
})

module.exports=router;