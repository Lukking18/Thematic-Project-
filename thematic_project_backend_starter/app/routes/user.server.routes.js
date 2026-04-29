const users = require("../controllers/user.server.controllers")
const authenticationMiddleware = require("../lib/authentication")


module.exports = function(app){
    app.route("/users")
        .post(users.create_account);

    app.route("/login")
        .post(users.login);

    app.route("/logout")
        .post(authenticationMiddleware, users.logout);
}
















