const db = require("../../database");

const add_review = (movie_id, user_id, review, done) => {

    const sql = "INSERT INTO reviews (review_body, posted_by, movie_id) VALUES (?,?,?)";
    const values = [review,user_id,movie_id];

    db.run(sql,values,function(err){
        if(err){
            return done(err);
        } return done(null, this.lastID);
    })
}

const get_all_reviews = (movie_id, done) => {
    const sql = "SELECT * FROM reviews WHERE movie_id = ?";

    db.all(sql,[movie_id],(err,row) =>{
        if(err){
            return done(err);
        } return done(null,row);
    })
}


module.exports = {

    add_review,
    get_all_reviews,

};