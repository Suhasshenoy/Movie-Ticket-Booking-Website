const User = require("../models/User");


exports.getUserById = async (req,res,next,id) => {

    try{
        let [result, _] = await User.findById(id);
        let user = result[0];
        req.profile = user;
        next();
    }
    catch(err){
        return res.status(400).json({
            error: "NO USER WAS FOUND IN DB"
        });
    }
}