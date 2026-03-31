const AuthModel = require("../models/user.authentication.models")

function authentication(req,res,next){
    const token = req.headers['x-authorization'];

    if(!token){
        return res.status(401).json({error_message: "Not logged in"});
    }

    AuthModel.getIdFromToken(token,(err,id)=>{
        if(err){
            return res.status(500).json({error_message: "Internal server error"})
        } if(!id){
            return res.status(401).json({error_message: "Session token not found"})
        }
        next()
    });
}

module.exports = authentication