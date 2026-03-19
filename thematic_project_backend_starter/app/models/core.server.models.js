const db = require('../../database')


const searchMovies = (searchText, done) => {
    const sql = "SELECT * FROM Movies WHERE title LIKE ? OR genres LIKE ?";

    const params = [`%${searchText}%`, `%${searchText}%`];

    db.all(sql, params, (err, rows) => {
        if (err) return done(err); 
        return done(null, rows); 
    });
};


const getSingleMovie = (movie_id, done) => {

    const sql = "SELECT * FROM Movies WHERE movie_id = ?"

    db.get(sql, [movie_id],(err,row) => {
        if(err){
            return done(err);
        } if(!row){
            return done(null,null);
        }else{
            return done(null,row);
        }
    
    });
}
module.exports = {
    searchMovies,
    getSingleMovie
}