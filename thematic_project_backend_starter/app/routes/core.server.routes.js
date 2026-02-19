const movies = require("../controllers/core.server.controllers")

module.exports = function(app){
    app.route("/search")
        .get(movies.search);

    app.route("/movie/:id")
        .get(movies.get_movie);

}