const reviews = require("../controllers/review.server.controllers")
const authenticationMiddleware = require("../lib/authentication")
module.exports = function(app){
    app.route("/review/:id")
        .post(authenticationMiddleware, reviews.review)
        .get(reviews.get_review);

}