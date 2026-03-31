const movies = require("../models/core.server.models");
const Joi = require("joi");

const search = (req, res) => {
    const schema = Joi.object({
        searchTitle: Joi.string().allow("").optional(),
        searchGenre: Joi.string().allow("").optional(),
        searchReleaseDate: Joi.string().allow("").optional(),
        searchBudgetMin: Joi.number().optional(),
        searchBudgetMax: Joi.number().optional(),
        searchRevenueMin: Joi.number().optional(),
        searchRevenueMax: Joi.number().optional(),

    });

    console.log(schema.validate(req.body));

    const {error} = schema.validate(req.query);
    if (error) return res.status(400).json({ error_message : error.details[0].message });

    const searchTitle = req.query.searchTitle || "";
    const searchGenre = req.query.searchGenre || "";
    const searchReleaseDate = req.query.searchReleaseDate || "";
    const searchBudgetMin = req.query.searchBudgetMin;
    const searchBudgetMax = req.query.searchBudgetMax;
    const searchRevenueMin = req.query.searchRevenueMin;
    const searchRevenueMax = req.query.searchRevenueMax;



    movies.searchMovies( searchTitle, searchGenre, searchReleaseDate, searchBudgetMin, searchBudgetMax, searchRevenueMin, searchRevenueMax, (err, results) => {
        if(err) return res.sendStatus(500)
        return res.status(200).json(results);
    });
}


//do we even need this?
const get_movie = (req, res) => {
    
    const getMoviePromise = new Promise(function(resolve,reject) {

    movies.getSingleMovie(req.params.movie_id, (err,row) => {
        if(err){
            reject(err)
        }
         else if(!row){
            reject("Movie not found");
        } else{
            resolve(row);
        }
    })
})

getMoviePromise.then(
    function(row){
        return res.json(row);
    },
    function(err){
        if(err === "Movie not found"){
           return res.status(404).json({error_message: err});
    } else{
        return res.status(500).json({error_message:"Internal server error"});
    }
    }
);
};

module.exports = {
    search: search,
    get_movie: get_movie
}