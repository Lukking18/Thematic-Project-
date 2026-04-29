const reviewModel = require("../models/review.server.models");
const MovieModel = require("../models/core.server.models")
const AuthModel = require("../models/user.authentication.models")
const Joi = require("joi");

const review = (req, res) => {    
    const token = req.headers["x-authorization"];
    const schema = Joi.object({
        review_body: Joi.string().trim().min(1).required()
    });

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({error_message: error.details[0].message});
    }

    if(!token){
        return res.status(401).json({error_message: "Token not found"});
    }
    

    AuthModel.getIdFromToken(token,(err,id)=>{
        if(err || id === null){
            return res.status(401).json({error_message: "Session token not found"})
        } 
    
    
        const user_id = id;
    

    MovieModel.getSingleMovie(req.params.movie_id,(err,row) =>{
        if(err){
            return res.status(500).json({error_message: "Internal Server Error"});
        } if(!row){
            return res.status(404).json({error_message: "Movie not found"});
        }
    

    reviewModel.add_review(req.params.movie_id, user_id, req.body.review_body,(err) =>{
        if(err){
            return res.status(500).json({error_message: "Internal Server Error"})
        }

        return res.status(200).json({message: "Review published!"});
    })
})
    })
}

const get_review = (req, res) => {
    let get_reviewPromise = new Promise (function(resolve,reject){
    reviewModel.get_all_reviews(req.params.movie_id,(err,reviews) => {
        if(err){
            reject("Internal Server error");
        } else {
        resolve(reviews)
        }
    })
})

get_reviewPromise.then(
    function(reviews){
        return res.json(reviews)
    },
    function(err){
        return res.status(500).json({error_message: err})
    }
)
}



module.exports = {
    review: review,
    get_review: get_review,
}

