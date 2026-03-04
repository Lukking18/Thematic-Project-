const search = (req, res) => {
    const schema = Joi.object({
        searchText: Joi.string().allow(""),
    });

    console.log(schema.validate(req.body));

    const {error} = schema.validate(req.query);
    if (error) return res.status(400).json({ error_message : error.details[0].message });

    const searchText = req.query.searchText || "";



    items.searchMovies(searchText, (err, results) => {
        if(err) return res.sendStatus(500)
        return res.status(200).json(results);
    });
}

const get_movie = (req, res) => {
    return res.sendStatus(500);
}

module.exports = {
    search: search,
    get_movie: get_movie
}