const req = require("express/lib/request");
const user = require("../model/user");
const bcrypt = require("bcrypt");

exports.logout = async (req, res) => {

    await req.session.destroy();

    res.redirect("/");
};

exports.postSignUp = async (req, res) => {
    // console.log("In post signup");


    let pass = req.body.password;
    let hashedPassword = await bcrypt.hash(pass, 12);

    user.create({
        name: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        admin: true,
        username: req.body.email.split(['@'])[0],
        posts: [{}]
    })

    req.session.isLoggedIn = true;
    req.session.username = req.body.email.split(['@'])[0];
    res.redirect("/");
};

exports.postLogin = async (req, res) => {

    let pass = req.body.password;
    let hashedPassword = await bcrypt.hash(pass, 12);

    let User = await user.findOne({ email: req.body.email });

    if (User) {

        const result = await bcrypt.compare(pass, hashedPassword);
        if (result) {
            req.session.isLoggedIn = true;
            req.session.username = User.username;
            res.redirect("/");
        }
        else {
            await req.flash("message", "Invalid email or password");
            console.log("wrong password");
            res.redirect("/login");
        }
    }
    else {
        await req.flash("message", "Invalid email or password");
        console.log("wrong username");
            
        res.redirect("/login");

    }
};