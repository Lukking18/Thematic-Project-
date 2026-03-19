const movies = require("../models/core.server.models");
const Joi = require("joi");

const search = (req, res) => {
    const schema = Joi.object({
        searchTitle: Joi.string().allow("").optional(),
        searchGenre: Joi.string().allow("").optional(),
        searchReleaseDate: Joi.string().allow("").optional(),
        searchBudgetMin: Joi.number().optional(),
        searchBudgetMax: Joi.number().optional(),

    });

    console.log(schema.validate(req.body));

    const {error} = schema.validate(req.query);
    if (error) return res.status(400).json({ error_message : error.details[0].message });

    const searchTitle = req.query.searchTitle || "";
    const searchGenre = req.query.searchGenre || "";
    const searchReleaseDate = req.query.searchReleaseDate || "";
    const searchBudgetMin = req.query.searchBudgetMin;
    const searchBudgetMax = req.query.searchBudgetMax;



    movies.searchMovies( searchTitle, searchGenre, searchReleaseDate, searchBudgetMin, searchBudgetMax, (err, results) => {
        if(err) return res.sendStatus(500)
        return res.status(200).json(results);
    });
}


//do we even need this?
const get_movie = (req, res) => {
    

    movies.getSingleMovie(req.params.movie_id, (err,row) => {
        if(err){
            return res.status(500).json({error_message: "Internal Server Error"});
        }
        if(!row){
            return res.status(404).json({error_message: "Movie not found"})
        }
    })
}

module.exports = {
    search: search,
    get_movie: get_movie
}