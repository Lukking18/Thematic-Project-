const reviews = require("../controllers/review.server.controllers")

module.exports = function(app){
    app.route("/review/:id")
        .post(reviews.review);

    app.route("/review/:id")
        .get(reviews.get_review);

    app.route("/bookmark/:id")
        .post(reviews.bookmark)

}