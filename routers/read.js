const express = require("express");
const { path } = require("express/lib/application");
const req = require("express/lib/request");
const postController=require("../controllers/postController");
const Post = require("../model/post");
const router= express.Router();

router.get("/read:id",async(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    const id=req.params.id.split(":")[1];
    const blogs=await Post.find({_id:id});
        
    console.log(blogs);
    res.render('read.ejs',{blogs:blogs[0],isLoggedIn,user});
});

module.exports=router;