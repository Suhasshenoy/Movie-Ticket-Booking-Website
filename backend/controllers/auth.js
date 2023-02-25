const User = require("../models/User");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param : errors.array()[0].param
        })
    }
    
    try {
       
        let {name,email,password} = req.body;

        let user = new User(name,email,password);

        user = await user.save();

        res.json({
            message:"sign-up successful"
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
            
            error:"NOT able to save user in DB"
        });
      }

}

exports.signin = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param : errors.array()[0].param
        })
    }
    try {
        const {email,password} = req.body;
    
        let [result, _] = await User.findByEmail(email);
        let user = result[0];
        if(!User.authenticate(password,user.salt,user.encry_pass)){
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }
        const token = jwt.sign({_id:user.user_id},process.env.SECRET);

        //put token in cookie- sent by server
        res.cookie("token",token,{expire:new Date()+9999});

        //send response to front end

        const {user_id,name,role} = user;

        return res.json({token,user:{user_id,name,email,role}});
        

        // res.status(200).json({ post: post[0] });
      } catch (error) {
        return res.status(400).json({
            error: "USER EMAIL DOES NOT EXIST"
        });
        
      }

}
exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "user signout successful"
    });
};

exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty: "auth" // adds auth in req ,req.auth._id will contain the id of the user who is signed in
    
});

//custom middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile.user_id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        });
    }
    next();
}
exports.isAdmin = (req,res,next) => {
    if(req.profile.role ===0){
        res.status(403).json({
            error: "You are not ADMIN"
        });
    }
    next();
}

