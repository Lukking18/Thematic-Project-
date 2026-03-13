const reviewModel = require("../models/review.server.models");

const review = (req, res) => {
    // add check to see if user is signed in here...

    const schema = Joi.object({
        review_body: Joi.string().trim().min(1).required()
    });

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({error_message: error.details[0].message});
    }

    //if no token check here

    //get id from token model call here

    //get item call here

    reviewModel.add_review(req.params.movie_id, user_id, req.body.review_body,(err) =>{
        if(err){
            return res.status(500).json({error_message: "Internal Server Error"})
        }

        return res.status(200).json({message: "Review published!"});
    })
}

const get_review = (req, res) => {
    reviewModel.get_all_reviews(req.params.review_id,(err,reviews) => {
        if(err){
            return res.status(500).json({error_message: "Internal Server Error"})
        }
        return res.status(200).json(reviews);
    })
}

const bookmark = (req, res) => {
    return res.sendStatus(500);
}

module.exports = {
    review: review,
    get_review: get_review,
    bookmark: bookmark
}

