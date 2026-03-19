const db = require('../../database')


const searchMovies = (searchTitle, searchGenre, searchReleaseDate, searchBudgetMin, searchBudgetMax,  done) => {
    let sql = "SELECT * FROM Movies WHERE 1=1";

    const params = [];

    if (searchTitle) {
        sql += " AND title LIKE ?";
        params.push(`%${searchTitle}%`);
    }

    if (searchGenre) {
        sql += " AND genres LIKE ?"
        params.push(`%${searchGenre}%`);
    }

    if (searchReleaseDate) {
        sql += " AND release_date LIKE ?"
        params.push(`%${searchReleaseDate}%`);
    }

    if (searchBudgetMin && !searchBudgetMax) {
        sql += " AND budget > ?"
        params.push(Number(searchBudgetMin));
    }

    if (!searchBudgetMin && searchBudgetMax) {
        sql += " AND budget < ?"
        params.push(Number(searchBudgetMax));
    }

    if (searchBudgetMin && searchBudgetMax) {
        sql += " AND budget BETWEEN ? AND ?"
        params.push(Number(searchBudgetMin), Number(searchBudgetMax));
    }

   
    db.all(sql, params, (err, rows) => {
        if (err) return done(err); 
        return done(null, rows); 
    });
};

// Films which generated revenue within a selected range 

// Films starring selected actors 
// Films directed by a selected director 
// Search for a specific film title, actor or director. 

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